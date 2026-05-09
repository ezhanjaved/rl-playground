import { useSceneStore } from "../../stores/useSceneStore";
import { useGraphStore } from "../../stores/useGraphStore";
import buildObsSpace, { nearestDistance } from "../runtime/observationBuilder";

export default function BehaviorGraphEval(agentId, preObs) {
  const { assignments, entities } = useSceneStore.getState();
  const { graphs } = useGraphStore.getState();

  const graphId = assignments[agentId]?.assignedGraphId;
  const config = assignments[agentId]?.assignedConfig;
  const graph = graphs?.[graphId];

  if (!graph || !entities || !assignments) return;

  const agent = entities[agentId];
  let visitedNodes = new Set();
  const postObs = buildObsSpace(agent); //post action obs

  let ctxObj = {
    reward: 0,
    done: false,
    truncated: false,
    _stop: false, // internal traversal-stop flag, separate from done/truncated
    facts: {
      position: agent.position,
      rotation: agent.rotation,
      capabilities: agent.capabilities,
      last_action: agent.last_action,
      state_space: agent.state_space,
      obs_space: agent.observation_space,
    },
    maxSteps: 300,
    stepCount: 0,
    visitedNodes,
    config,
    preObs, //pre action obs passed as parameter
    postObs,
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
  if (ctxObj._stop) return;
  if (ctxObj.stepCount > ctxObj.maxSteps) {
    ctxObj.truncated = true;
    ctxObj._stop = true;
    return;
  }
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
    ctxObj._stop = true;
    return;
  }

  if (currentNodeData.type === "TruncateEpisodeNode") {
    ctxObj.truncated = true;
    ctxObj._stop = true;
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
      return idx === -1 ? null : ctxObj.preObs[idx];
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

  if (currentNodeData.type === "IsDeltaXLessNode") {
    const deltaXCheck = 0.05;
    let deltaX = false;
    // Delta X POS means object is left
    // Delta X NEG means object is right
    // If current Delta will be bigger it means there is significant deviation and agent will not find obj in its path
    const entityOne = currentNodeData.data.entityOne;
    const entityTwo = currentNodeData.data.entityTwo;
    const isAgent1 = entityOne === "Agent";
    const isAgent2 = entityTwo === "Agent";

    if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) return;

    const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
    const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");
    const hasDepositor = ctxObj.facts?.capabilities?.includes("Depositor");
    const hasNavigator = ctxObj.facts?.capabilities.includes("Navigator");

    const getObs = (key) => {
      const idx = ctxObj?.facts?.obs_space.indexOf(key);
      return idx === -1 ? null : ctxObj.preObs[idx];
    };

    if (entityTwo === "Target Object") {
      const currentDeltaX = getObs("delta_x_to_target");
      if (currentDeltaX !== null && Math.abs(currentDeltaX) <= deltaXCheck)
        deltaX = true;
    }

    if (entityTwo === "Pickable Object") {
      if (hasHolder) {
        const currentDeltaX = getObs("delta_x_to_pickable");
        if (currentDeltaX !== null && Math.abs(currentDeltaX) <= deltaXCheck)
          deltaX = true;
      } else if (hasCollector) {
        const currentDeltaX = getObs("delta_x_to_collectable");
        if (currentDeltaX !== null && Math.abs(currentDeltaX) <= deltaXCheck)
          deltaX = true;
      } else {
        return;
      }
    }

    if (entityTwo === "Navigator Object") {
      if (hasNavigator) {
        const currentDeltaX = getObs("delta_x_to_obstacle");
        if (currentDeltaX !== null && Math.abs(currentDeltaX) <= deltaXCheck)
          deltaX = true;
      } else {
        return;
      }
    }

    if (entityTwo === "Deposit Object") {
      if (hasDepositor) {
        const currentDeltaX = getObs("delta_x_to_deposit");
        if (currentDeltaX !== null && Math.abs(currentDeltaX) <= deltaXCheck)
          deltaX = true;
      } else {
        return;
      }
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      deltaX
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  if (currentNodeData.type === "IsDeltaZPosNode") {
    const deltaZCheck = 0.05;
    let deltaZ = false;
    // Delta Z POS means object is forward
    // If current Delta will be pos it means target is indeed ahead. If not we can penalize the agent for being ahead.
    const entityOne = currentNodeData.data.entityOne;
    const entityTwo = currentNodeData.data.entityTwo;
    const isAgent1 = entityOne === "Agent";
    const isAgent2 = entityTwo === "Agent";

    if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) return;

    const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
    const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");
    const hasDepositor = ctxObj.facts?.capabilities?.includes("Depositor");
    const hasNavigator = ctxObj.facts?.capabilities.includes("Navigator");

    const getObs = (key) => {
      const idx = ctxObj?.facts?.obs_space.indexOf(key);
      return idx === -1 ? null : ctxObj.preObs[idx];
    };

    if (entityTwo === "Target Object") {
      const currentDeltaZ = getObs("delta_z_to_target");
      if (currentDeltaZ !== null && currentDeltaZ > deltaZCheck) deltaZ = true;
    }

    if (entityTwo === "Pickable Object") {
      if (hasHolder) {
        const currentDeltaZ = getObs("delta_z_to_pickable");
        if (currentDeltaZ !== null && currentDeltaZ > deltaZCheck)
          deltaZ = true;
      } else if (hasCollector) {
        const currentDeltaZ = getObs("delta_z_to_collectable");
        if (currentDeltaZ !== null && currentDeltaZ > deltaZCheck)
          deltaZ = true;
      } else {
        return;
      }
    }

    if (entityTwo === "Navigator Object") {
      if (hasNavigator) {
        const currentDeltaZ = getObs("delta_z_to_obstacle");
        if (currentDeltaZ !== null && currentDeltaZ > deltaZCheck)
          deltaZ = true;
      } else {
        return;
      }
    }

    if (entityTwo === "Deposit Object") {
      if (hasDepositor) {
        const currentDeltaZ = getObs("delta_z_to_deposit");
        if (currentDeltaZ !== null && currentDeltaZ > deltaZCheck)
          deltaZ = true;
      } else {
        return;
      }
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      deltaZ
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
    const obstaclePredicate = (e) =>
      e.isDecor === true || e.isDecor === "true" || e.isDecor === 1;

    const diffCal = (predicate, key) => {
      const agentCurrentPos = ctxObj?.facts?.position;
      const previousDistance = ctxObj?.facts?.state_space?.[key]; // normalized, from obs vector
      const { entities } = useSceneStore.getState();
      const rotation = ctxObj?.facts?.rotation;
      const { min: currentDistance } = nearestDistance(
        agentCurrentPos,
        rotation,
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

    if (entityTwo === "Non-State Object") {
      diffCal(obstaclePredicate, "previous_distance_obstacle");
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

  if (currentNodeData.type === "NumericObsNode") {
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
    const mode = currentNodeData.data?.mode ?? "Pre";
    const obsVector = mode === "Post" ? ctxObj.postObs : ctxObj.preObs;

    if (obsKey && Number.isFinite(obsValue) && operator) {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(obsKey);
      if (idx !== -1) {
        const currentVal = obsVector?.[idx];
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

  if (currentNodeData.type === "BoolObsNode") {
    const obsKey = currentNodeData.data?.obsKey;
    const expectedStatus = currentNodeData.data?.status ?? "True";
    const expectedBool = expectedStatus === "True" || expectedStatus === true;
    const mode = currentNodeData.data?.mode ?? "Pre";
    const obsVector = mode === "Post" ? ctxObj.postObs : ctxObj.preObs;

    if (obsKey) {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(obsKey);
      if (idx !== -1) {
        const currentVal = obsVector?.[idx];
        if (currentVal != null) {
          const asBool = currentVal === true || currentVal === 1;
          const result = asBool === expectedBool;
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
    return;
  }

  if (currentNodeData.type === "IsObstacleInPath") {
    const direction = currentNodeData.data?.direction ?? "Forward";
    const hasNavigator = ctxObj.facts?.capabilities?.includes("Navigator");
    if (!hasNavigator) return;

    const directionKeyMap = {
      Left: "obstacle_left",
      Right: "obstacle_right",
      Forward: "obstacle_forward",
    };

    const OBSTACLE_DIST_THRESHOLD = 0.15;
    const distKey = directionKeyMap[direction];

    const getObs = (key) => {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(key);
      return idx === -1 ? null : ctxObj.preObs?.[idx];
    };

    const directionalDist = getObs(distKey);
    const inPath = getObs("obstacle_in_path");

    const inPathBool = inPath === true || inPath === 1;
    const isBlocked =
      directionalDist !== null &&
      directionalDist <= OBSTACLE_DIST_THRESHOLD &&
      inPathBool;

    const edges = findEdges(NodeId, graph);
    const chosenEdge = edges.find((e) =>
      isBlocked
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    if (chosenEdge) visitNode(chosenEdge.target, graph, ctxObj);
    return;
  }

  const edges = findEdges(NodeId, graph);
  for (const edge of edges) {
    visitNode(edge.target, graph, ctxObj);
    if (ctxObj._stop) return;
  }
}

function findEdges(NodeId, graph) {
  return graph.edges.filter((e) => e.source === NodeId);
}
