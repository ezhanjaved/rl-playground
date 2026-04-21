import { useSceneStore } from "../../stores/useSceneStore";
import { useGraphStore } from "../../stores/useGraphStore";
import { nearestDistance } from "../runtime/observationBuilder";

export default function BehaviorGraphEval(agentId, obsVector) {
  const { assignments, entities } = useSceneStore.getState();
  const { graphs } = useGraphStore.getState();

  const graphId = assignments[agentId]?.assignedGraphId;
  const config = assignments[agentId]?.assignedConfig;
  const graph = graphs?.[graphId];

  if (!graph || !entities || !assignments) return;

  const agent = entities[agentId];
  let visitedNodes = new Set();

  let ctxObj = {
    reward: 0,
    done: false,
    truncated: false,
    facts: {
      position: agent.position,
      capabilities: agent.capabilities,
      last_action: agent.last_action,
      state_space: agent.state_space,
      obs_space: agent.observation_space,
    },
    maxSteps: 50,
    stepCount: 0,
    visitedNodes,
    config,
    obsVector,
  };

  const start = graph.nodes.find((e) => e.type === "OnStepNode");
  if (!start) return { reward: 0, done: false };
  visitNode(start.id, graph, ctxObj);
  return {
    reward: ctxObj.reward,
    done: ctxObj.done,
    truncated: ctxObj.truncated,
  };
}

function visitNode(NodeId, graph, ctxObj) {
  if (ctxObj.done) return;
  if (ctxObj.stepCount > ctxObj.maxSteps) return;
  if (ctxObj.visitedNodes.has(NodeId)) return;
  ctxObj.visitedNodes.add(NodeId);
  ctxObj.stepCount++;

  const currentNodeData = graph.nodes.find((e) => e.id === NodeId);
  if (!currentNodeData) return;

  if (currentNodeData.type === "AddRewardNode") {
    const multiplier = ctxObj?.config?.rewardMultiplier ?? 1;
    ctxObj.reward += (currentNodeData?.data?.rewardValue ?? 0) * multiplier;
  }

  if (currentNodeData.type === "EndEpisodeNode") {
    ctxObj.done = true;
    return;
  }

  if (currentNodeData.type === "StateEqualsToNode") {
    const key = currentNodeData.data?.entityState;
    const expected = currentNodeData.data?.StateStatus;
    const expectedBool = expected === true || expected === "true";
    const value = ctxObj.facts.state_space?.[key];
    const result = value === expectedBool;

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      result
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "LastActionIsNode") {
    const actionPicked = currentNodeData?.data?.entityAction;
    const actionStatus = currentNodeData?.data?.actionStatus;
    const expected = actionStatus === true || actionStatus === "true";
    const currentLastAction = ctxObj.facts.last_action;
    const value = currentLastAction === actionPicked;
    const result = expected === value;

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      result
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "CompareStateNode") {
    const operations = {
      "Less Than": (a, b) => a < b,
      "Higher Than": (a, b) => a > b,
      "Less Than Equal To": (a, b) => a <= b,
      "Higher Than Equal To": (a, b) => a >= b,
    };

    const key = currentNodeData?.data?.entityState;
    const numericValue = Number(currentNodeData?.data?.StateValue);
    if (!Number.isFinite(numericValue)) return;

    const currentStateRaw = ctxObj.facts.state_space?.[key];
    const currentState = Number(currentStateRaw);
    if (!Number.isFinite(currentState)) return;

    const operator = currentNodeData?.data?.Operator;
    const opFunction = operations[operator];
    if (!opFunction) return;
    const result = opFunction(currentState, numericValue);

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      result
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "InRadiusNode") {
    const MAX_DIST = 40.0;
    const radiusCheck = 1.5 / MAX_DIST;
    let inRadius = false;

    const entityOne = currentNodeData.data.entityOne;
    const entityTwo = currentNodeData.data.entityTwo;
    const isAgent1 = entityOne === "Agent";
    const isAgent2 = entityTwo === "Agent";

    if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) return;

    const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
    const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");
    const hasDepositor = ctxObj.facts?.capabilities?.includes("Depositor");

    const getObs = (key) => {
      const idx = ctxObj?.facts?.obs_space.indexOf(key);
      return idx === -1 ? null : ctxObj.obsVector[idx];
    };

    if (entityTwo === "Target Object") {
      const dist = getObs("dist_to_nearest_target");
      if (dist !== null && dist <= radiusCheck) inRadius = true;
    }

    if (entityTwo === "Pickable Object") {
      if (hasHolder) {
        const dist = getObs("dist_to_nearest_pickable");
        if (dist !== null && dist <= radiusCheck) inRadius = true;
      } else if (hasCollector) {
        const dist = getObs("dist_to_nearest_collectable");
        if (dist !== null && dist <= radiusCheck) inRadius = true;
      } else {
        return;
      }
    }

    if (entityTwo === "Deposit Object") {
      if (hasDepositor) {
        const dist = getObs("dist_to_nearest_deposit");
        if (dist !== null && dist <= radiusCheck) inRadius = true;
      } else {
        return;
      }
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      inRadius
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "IsDistanceLessNode") {
    let distanceLess = false;

    const entityOne = currentNodeData.data.entityOne;
    const entityTwo = currentNodeData.data.entityTwo;
    const isAgent1 = entityOne === "Agent";
    const isAgent2 = entityTwo === "Agent";

    if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) return;

    const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
    const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");
    const hasDepositor = ctxObj.facts?.capabilities?.includes("Depositor");

    const targetPredicate = (e) =>
      e.isTarget === true || e.isTarget === "true" || e.isTarget === 1;
    const pickablePredicate = (e) =>
      e.isPickable === true || e.isPickable === "true" || e.isPickable === 1;
    const collectPredicate = (e) =>
      e.isCollectable === true ||
      e.isCollectable === "true" ||
      e.isCollectable === 1;
    const depositPredicate = (e) =>
      e.isDeposit === true || e.isDeposit === "true" || e.isDeposit === 1;

    const diffCal = (predicate, key) => {
      const agentCurrentPos = ctxObj?.facts?.position;
      const previousDistance = ctxObj?.facts?.state_space?.[key]; // normalized, from obs vector
      const { entities } = useSceneStore.getState();
      const { min: currentDistance } = nearestDistance(
        agentCurrentPos,
        predicate,
        "both",
        entities,
      );

      if (currentDistance !== null && currentDistance < previousDistance) {
        distanceLess = true;
      }
    };

    if (entityTwo === "Target Object") {
      diffCal(targetPredicate, "previous_distance_target");
    }

    if (entityTwo === "Pickable Object") {
      if (hasHolder) {
        diffCal(pickablePredicate, "previous_distance_pickable");
      } else if (hasCollector) {
        diffCal(collectPredicate, "previous_distance_collect");
      } else {
        return;
      }
    }

    if (entityTwo === "Deposit Object") {
      if (hasDepositor) {
        diffCal(depositPredicate, "previous_distance_deposit");
      } else {
        return;
      }
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      distanceLess
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "IsDistanceXLessNode") {
    let distanceXLess = false;

    const entityOne = currentNodeData.data.entityOne;
    const entityTwo = currentNodeData.data.entityTwo;
    const isAgent1 = entityOne === "Agent";
    const isAgent2 = entityTwo === "Agent";

    if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) return;

    // const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
    // const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");
    // const hasDepositor = ctxObj.facts?.capabilities?.includes("Depositor");

    const targetPredicate = (e) =>
      e.isTarget === true || e.isTarget === "true" || e.isTarget === 1;
    // const pickablePredicate = (e) =>
    //   e.isPickable === true || e.isPickable === "true" || e.isPickable === 1;
    // const collectPredicate = (e) =>
    //   e.isCollectable === true ||
    //   e.isCollectable === "true" ||
    //   e.isCollectable === 1;
    // const depositPredicate = (e) =>
    //   e.isDeposit === true || e.isDeposit === "true" || e.isDeposit === 1;

    const diffCal = (predicate, key) => {
      const agentCurrentPos = ctxObj?.facts?.position;
      const previousDistance = ctxObj?.facts?.state_space?.[key]; // normalized, from obs vector
      const { entities } = useSceneStore.getState();
      const { min: currentDistance } = nearestDistance(
        agentCurrentPos,
        predicate,
        "x",
        entities,
      );

      if (currentDistance !== null && currentDistance < previousDistance) {
        distanceXLess = true;
      }
    };

    if (entityTwo === "Target Object") {
      diffCal(targetPredicate, "previous_distance_target_x");
    }

    // if (entityTwo === "Pickable Object") {
    //   if (hasHolder) {
    //     diffCal(pickablePredicate, "previous_distance_pickable");
    //   } else if (hasCollector) {
    //     diffCal(collectPredicate, "previous_distance_collect");
    //   } else {
    //     return;
    //   }
    // }

    // if (entityTwo === "Deposit Object") {
    //   if (hasDepositor) {
    //     diffCal(depositPredicate, "previous_distance_deposit");
    //   } else {
    //     return;
    //   }
    // }

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      distanceXLess
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "IsDistanceZLessNode") {
    let distanceZLess = false;

    const entityOne = currentNodeData.data.entityOne;
    const entityTwo = currentNodeData.data.entityTwo;
    const isAgent1 = entityOne === "Agent";
    const isAgent2 = entityTwo === "Agent";

    if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) return;

    // const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
    // const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");
    // const hasDepositor = ctxObj.facts?.capabilities?.includes("Depositor");

    const targetPredicate = (e) =>
      e.isTarget === true || e.isTarget === "true" || e.isTarget === 1;
    // const pickablePredicate = (e) =>
    //   e.isPickable === true || e.isPickable === "true" || e.isPickable === 1;
    // const collectPredicate = (e) =>
    //   e.isCollectable === true ||
    //   e.isCollectable === "true" ||
    //   e.isCollectable === 1;
    // const depositPredicate = (e) =>
    //   e.isDeposit === true || e.isDeposit === "true" || e.isDeposit === 1;

    const diffCal = (predicate, key) => {
      const agentCurrentPos = ctxObj?.facts?.position;
      const previousDistance = ctxObj?.facts?.state_space?.[key]; // normalized, from obs vector
      const { entities } = useSceneStore.getState();
      const { min: currentDistance } = nearestDistance(
        agentCurrentPos,
        predicate,
        "z",
        entities,
      );

      if (currentDistance !== null && currentDistance < previousDistance) {
        distanceZLess = true;
      }
    };

    if (entityTwo === "Target Object") {
      diffCal(targetPredicate, "previous_distance_target_z");
    }

    // if (entityTwo === "Pickable Object") {
    //   if (hasHolder) {
    //     diffCal(pickablePredicate, "previous_distance_pickable");
    //   } else if (hasCollector) {
    //     diffCal(collectPredicate, "previous_distance_collect");
    //   } else {
    //     return;
    //   }
    // }

    // if (entityTwo === "Deposit Object") {
    //   if (hasDepositor) {
    //     diffCal(depositPredicate, "previous_distance_deposit");
    //   } else {
    //     return;
    //   }
    // }

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      distanceZLess
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "TruncateEpisodeNode") {
    ctxObj.done = true;
    ctxObj.truncated = true;
    return;
  }

  if (currentNodeData.type === "ObsValueNode") {
    const operations = {
      "Less Than": (a, b) => a < b,
      "Higher Than": (a, b) => a > b,
      "Less Than Equal To": (a, b) => a <= b,
      "Higher Than Equal To": (a, b) => a >= b,
      "Equal To": (a, b) => a === b,
    };
    const obsKey = currentNodeData.data?.obsKey;
    const obsValue = Number(currentNodeData.data?.ObsValue);
    const operator = currentNodeData.data?.Operator;
    if (obsKey && Number.isFinite(obsValue) && operator) {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(obsKey);
      if (idx !== -1) {
        const currentVal = ctxObj.obsVector?.[idx];
        if (currentVal != null && Number.isFinite(currentVal)) {
          const opFn = operations[operator];
          if (opFn) {
            const result = opFn(currentVal, obsValue);
            const edges = findEdges(NodeId, graph);
            const chosenEdge = edges.find((e) =>
              result
                ? e.sourceHandle?.toLowerCase().includes("true")
                : e.sourceHandle?.toLowerCase().includes("false"),
            );
            if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
          }
        }
      }
    }
    return;
  }

  const edges = findEdges(NodeId, graph);
  for (const edge of edges) {
    visitNode(edge.target, graph, ctxObj);
    if (ctxObj.done) return;
  }
}

function findEdges(NodeId, graph) {
  return graph.edges.filter((e) => e.source === NodeId);
}
