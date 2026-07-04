import { useSceneStore } from "../../stores/useSceneStore";
import { useGraphStore } from "../../stores/useGraphStore";
import buildObsSpace, { nearestDistance } from "../runtime/observationBuilder";
import { BehaviorBuilder } from "../runtime/behaviorBuilder";

export default function BehaviorGraphEval(agentId, preObs, currentEpisodeStep) {
  const { assignments, entities } = useSceneStore.getState();
  const { graphs } = useGraphStore.getState();

  const graphId = assignments[agentId]?.assignedGraphId;
  const config = assignments[agentId]?.assignedConfig;
  const graph = graphs?.[graphId];

  if (!graph || !entities || !assignments) return;
  const agent = useSceneStore.getState().entities?.[agentId];
  let visitedNodes = new Set();

  const postObsRaw = buildObsSpace(agent);
  const { behaviorOBSvector: postActionBehaviorOBSvector, behaviorOBSspace } =
    BehaviorBuilder(postObsRaw, agent);

  let ctxObj = {
    reward: 0,
    terminated: false,
    truncated: false,
    _stop: false,
    facts: {
      position: agent.position,
      rotation: agent.rotation,
      capabilities: agent.capabilities,
      last_action: agent.last_action,
      state_space: agent.state_space,
      obs_space: behaviorOBSspace,
    },
    maxSteps: 300,
    stepCount: 0,
    visitedNodes,
    config,
    preObs,
    postObs: postActionBehaviorOBSvector,
    currentEpisodeStep,
  };

  const start = graph.nodes.find((e) => e.type === "OnStepNode");
  if (!start) return { reward: 0, terminated: false };
  visitNode(start.id, graph, ctxObj);
  return {
    reward: ctxObj.reward,
    terminated: ctxObj.terminated,
    truncated: ctxObj.truncated,
    postObs: postActionBehaviorOBSvector,
    info: {},
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
    ctxObj.terminated = true;
    ctxObj._stop = true;
    return;
  }

  if (currentNodeData.type === "TruncateEpisodeNode") {
    const maxSteps = parseInt(currentNodeData.data?.maxSteps ?? 500);
    const currentSteps = ctxObj.currentEpisodeStep;
    if (currentSteps >= maxSteps) {
      ctxObj.truncated = true;
      ctxObj._stop = true;
    }
    return;
  }

  if (currentNodeData.type === "StateEqualsToNode") {
    const key = currentNodeData.data?.entityState;
    const expected = currentNodeData.data?.StateStatus;
    const expectedBool = expected === true || expected === "true";
    const value = ctxObj.facts.state_space?.[key];
    const result = value === expectedBool;

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      result
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
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
    const chosenEdges = edges.filter((e) =>
      result
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "CompareStateNode") {
    const operations = {
      "Less Than": (a, b) => a < b,
      "Higher Than": (a, b) => a > b,
      "Less Than Equal To": (a, b) => a <= b,
      "Higher Than Equal To": (a, b) => a >= b,
      "Equal To": (a, b) => a === b,
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
    const chosenEdges = edges.filter((e) =>
      result
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "InRadiusNode") {
    const getObs = (key) => {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(key);
      return idx === -1 ? null : ctxObj.preObs?.[idx];
    };

    const inRadiusRaw = getObs("in_radius_current_goal");
    const inRadius = inRadiusRaw === 1 || inRadiusRaw === true;

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      inRadius
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsDeltaXLessNode") {
    const deltaXCheck = 0.05;
    let deltaX = false;
    // Delta X POS: object is to the left.
    // Delta X NEG: object is to the right.
    // If |deltaX| > threshold, there is meaningful lateral deviation.

    const getObs = (key) => {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(key);
      return idx === -1 ? null : ctxObj.preObs?.[idx];
    };

    const currentDeltaX = getObs("delta_x_to_current_goal");
    if (currentDeltaX !== null && Math.abs(currentDeltaX) <= deltaXCheck)
      deltaX = true;

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      deltaX
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsDeltaZPosNode") {
    const deltaZCheck = 0.05;
    let deltaZ = false;
    // Delta Z POS: target is ahead (forward of the agent).

    const getObs = (key) => {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(key);
      return idx === -1 ? null : ctxObj.preObs?.[idx];
    };

    const currentDeltaZ = getObs("delta_z_to_current_goal");
    if (currentDeltaZ !== null && currentDeltaZ > deltaZCheck) deltaZ = true;

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      deltaZ
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsDistanceLessNode") {
    let distanceLess = false;
    let mode = currentNodeData.data.mode ?? "Best Record";

    const getObs = (key) => {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(key);
      return idx === -1 ? null : ctxObj.preObs?.[idx];
    };

    // Resolve active goal: predicate for nearestDistance + state_space key.
    const goalCtx = resolveGoalContext(getObs);
    if (!goalCtx) return; // no recognized goal flag set; skip node

    const agentCurrentPos = ctxObj.facts?.position;
    const rotation = ctxObj.facts?.rotation;
    const { entities } = useSceneStore.getState();

    const { min: currentDistance } = nearestDistance(
      agentCurrentPos,
      rotation,
      goalCtx.predicate,
      "both",
      entities,
    );

    if (mode === "Best Record") {
      // Per-capability state_space key, selected by goal flag.
      // These keys exist unchanged on both client and Python.
      const bestDistance = ctxObj.facts?.state_space?.[goalCtx.stateKey];
      if (currentDistance !== null && currentDistance < bestDistance) {
        distanceLess = true;
      }
    }

    if (mode === "Raw Distance") {
      // previousDistance from behavior OBS (pre-action dist to current goal).
      const previousDistance = getObs("dist_to_current_goal");
      if (currentDistance !== null && currentDistance < previousDistance) {
        distanceLess = true;
      }
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      distanceLess
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsDistanceMoreNode") {
    let distanceMore = false;
    const tolerance = 0.2;

    const getObs = (key) => {
      const idx = (ctxObj.facts?.obs_space ?? []).indexOf(key);
      return idx === -1 ? null : ctxObj.preObs?.[idx];
    };

    const goalCtx = resolveGoalContext(getObs);
    if (!goalCtx) return;

    const agentCurrentPos = ctxObj.facts?.position;
    const rotation = ctxObj.facts?.rotation;
    const { entities } = useSceneStore.getState();

    const { min: currentDistance } = nearestDistance(
      agentCurrentPos,
      rotation,
      goalCtx.predicate,
      "both",
      entities,
    );

    // previousDistance: the stored per-capability reference distance.
    const previousDistance = ctxObj.facts?.state_space?.[goalCtx.stateKey];

    if (
      currentDistance !== null &&
      currentDistance > previousDistance + tolerance
    ) {
      distanceMore = true;
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      distanceMore
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
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
            const chosenEdges = edges.filter((e) =>
              result
                ? e.sourceHandle?.toLowerCase().includes("true")
                : e.sourceHandle?.toLowerCase().includes("false"),
            );
            for (const chosenEdge of chosenEdges) {
              visitNode(chosenEdge.target, graph, ctxObj);
              if (ctxObj._stop) return;
            }
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
          const chosenEdges = edges.filter((e) =>
            result
              ? e.sourceHandle?.toLowerCase().includes("true")
              : e.sourceHandle?.toLowerCase().includes("false"),
          );
          for (const chosenEdge of chosenEdges) {
            visitNode(chosenEdge.target, graph, ctxObj);
            if (ctxObj._stop) return;
          }
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
    const chosenEdges = edges.filter((e) =>
      isBlocked
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  const edges = findEdges(NodeId, graph);
  for (const edge of edges) {
    visitNode(edge.target, graph, ctxObj);
    if (ctxObj._stop) return;
  }
}

function resolveGoalContext(getObs) {
  if (getObs("goal_is_target") === 1 || getObs("goal_is_target") === true) {
    return {
      predicate: (e) =>
        e.isTarget === true || e.isTarget === "true" || e.isTarget === 1,
      stateKey: "previous_distance_target",
    };
  }
  if (
    getObs("goal_is_collectable") === 1 ||
    getObs("goal_is_collectable") === true
  ) {
    return {
      predicate: (e) =>
        e.isCollectable === true ||
        e.isCollectable === "true" ||
        e.isCollectable === 1,
      stateKey: "previous_distance_collect",
    };
  }
  if (getObs("goal_is_holding") === 1 || getObs("goal_is_holding") === true) {
    return {
      predicate: (e) =>
        e.isPickable === true || e.isPickable === "true" || e.isPickable === 1,
      stateKey: "previous_distance_pickable",
    };
  }
  if (getObs("goal_is_deposit") === 1 || getObs("goal_is_deposit") === true) {
    return {
      predicate: (e) =>
        e.isDeposit === true || e.isDeposit === "true" || e.isDeposit === 1,
      stateKey: "previous_distance_deposit",
    };
  }
  if (getObs("goal_is_gate") === 1 || getObs("goal_is_gate") === true) {
    return {
      predicate: (e) =>
        e.isGate === true || e.isGate === "true" || e.isGate === 1,
      stateKey: "previous_distance_gate",
    };
  }
  if (
    getObs("goal_is_destroyable") === 1 ||
    getObs("goal_is_destroyable") === true
  ) {
    return {
      predicate: (e) =>
        e.isDestroyable === true ||
        e.isDestroyable === "true" ||
        e.isDestroyable === 1,
      stateKey: "previous_distance_destroyable",
    };
  }
  return null;
}

function findEdges(NodeId, graph) {
  return graph.edges.filter((e) => e.source === NodeId);
}
