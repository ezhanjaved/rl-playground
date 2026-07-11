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

  // Per-agent running totals, mirroring Python's runTimeSnap.cumulative_shaping_reward /
  // cumulative_terminal_reward dicts keyed by aid. Persisted on the agent entity itself
  // since there's no separate runtime-snapshot object on the JS side.
  agent.cumulativeShapingReward = agent.cumulativeShapingReward ?? 0;
  agent.cumulativeTerminalReward = agent.cumulativeTerminalReward ?? 0;

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
    cumulativeShapingReward: agent.cumulativeShapingReward,
    cumulativeTerminalReward: agent.cumulativeTerminalReward,
    info: {
      shaping_cum: agent.cumulativeShapingReward,
      terminal_cum: agent.cumulativeTerminalReward,
    },
  };

  const start = graph.nodes.find((e) => e.type === "OnStepNode");
  if (!start) return { reward: 0, terminated: false };
  visitNode(start.id, graph, ctxObj);

  // Persist updated cumulative totals back onto the agent for the next step.
  agent.cumulativeShapingReward = ctxObj.cumulativeShapingReward;
  agent.cumulativeTerminalReward = ctxObj.cumulativeTerminalReward;

  return {
    reward: ctxObj.reward,
    terminated: ctxObj.terminated,
    truncated: ctxObj.truncated,
    postObs: postActionBehaviorOBSvector,
    info: ctxObj.info,
  };
}

// Mirrors Python's _get_obs(key, ctx, use_post=False).
function getObsValue(ctxObj, key, usePost = false) {
  const obsSpace = ctxObj.facts?.obs_space ?? [];
  const obsVector = usePost ? ctxObj.postObs : ctxObj.preObs;
  const idx = obsSpace.indexOf(key);
  if (idx === -1) return null;
  const val = obsVector?.[idx];
  return val === undefined ? null : val;
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
    const rewardValue = Number(currentNodeData?.data?.rewardValue ?? 0) || 0;
    const rewardType = currentNodeData?.data?.typeOfReward || "Shaping";

    if (rewardType === "Shaping") {
      ctxObj.cumulativeShapingReward += rewardValue;
    } else if (rewardType === "Terminal") {
      ctxObj.cumulativeTerminalReward += rewardValue;
    }

    ctxObj.info.shaping_cum = ctxObj.cumulativeShapingReward;
    ctxObj.info.terminal_cum = ctxObj.cumulativeTerminalReward;
    ctxObj.reward += rewardValue * multiplier;
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
    const mode = currentNodeData.data?.mode ?? "Upon Entrance";
    const inRadiusRawPre = getObsValue(ctxObj, "in_radius_current_goal", false);
    const inRadiusRawPost = getObsValue(ctxObj, "in_radius_current_goal", true);
    let inRadius = false;

    if (mode === "Upon Entrance") {
      if (inRadiusRawPre === 0.0 && inRadiusRawPost === 1.0) inRadius = true;
    }
    if (mode === "Within Radius") {
      if (inRadiusRawPre === 1.0) inRadius = true;
    }
    if (mode === "Upon Exit") {
      if (inRadiusRawPre === 1.0 && inRadiusRawPost === 0.0) inRadius = true;
    }

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

    const currentDeltaX = getObsValue(ctxObj, "delta_x_to_current_goal", false);
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

    const currentDeltaZ = getObsValue(ctxObj, "delta_z_to_current_goal", false);
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
    const mode = currentNodeData.data?.mode ?? "Best Record";
    const getObsPre = (key) => getObsValue(ctxObj, key, false);
    const goalCtx = resolveGoalContext(getObsPre);
    if (!goalCtx) return; // no recognized goal flag set; skip node

    let distanceLess = false;

    if (mode === "Best Record") {
      // Best Record now reads the post-action distance straight from the
      // behavior OBS vector rather than recomputing via nearestDistance.
      const currentDistance = getObsValue(ctxObj, "dist_to_current_goal", true);
      const bestDistance = ctxObj.facts?.state_space?.[goalCtx.stateKey];
      if (
        currentDistance !== null &&
        bestDistance !== null &&
        bestDistance !== undefined
      ) {
        if (currentDistance < bestDistance) distanceLess = true;
      }
    }

    if (mode === "Raw Distance") {
      // pre-action and post-action distances from behavior OBS.
      const previousDist = getObsValue(ctxObj, "dist_to_current_goal", false);
      const currentDistance = getObsValue(ctxObj, "dist_to_current_goal", true);
      if (currentDistance !== null && previousDist !== null) {
        if (currentDistance < previousDist) distanceLess = true;
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

    const getObsPre = (key) => getObsValue(ctxObj, key, false);
    const goalCtx = resolveGoalContext(getObsPre);
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
      previousDistance !== null &&
      previousDistance !== undefined &&
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

    if (!obsKey || !Number.isFinite(obsValue) || !operator) return;

    let currentVal = getObsValue(ctxObj, obsKey, mode === "Post");
    if (currentVal === null) return;
    currentVal = Number(currentVal);
    if (!Number.isFinite(currentVal)) return;

    const opFn = operations[operator];
    if (!opFn) return;
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
    return;
  }

  if (currentNodeData.type === "BoolObsNode") {
    const obsKey = currentNodeData.data?.obsKey;
    if (!obsKey) return;

    const expectedStatus = currentNodeData.data?.status ?? "True";
    const expectedBool = expectedStatus === "True" || expectedStatus === true;
    const mode = currentNodeData.data?.mode ?? "Pre";

    const currentVal = getObsValue(ctxObj, obsKey, mode === "Post");
    if (currentVal === null) return;

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
    return;
  }

  if (currentNodeData.type === "IsObstacleInPath") {
    if (!ctxObj.facts?.capabilities?.includes("Navigator")) return;

    const direction = currentNodeData.data?.direction ?? "Forward";
    const mode = currentNodeData.data?.mode ?? "While Blocked";
    const directionKeyMap = {
      Left: "obstacle_left",
      Right: "obstacle_right",
      Forward: "obstacle_forward",
    };
    const OBSTACLE_DIST_THRESHOLD_UPPER = 0.35;
    const OBSTACLE_DIST_THRESHOLD_LOWER = 0.4;

    const distKey = directionKeyMap[direction];
    if (!distKey) return;

    const directionalDistPre = getObsValue(ctxObj, distKey, false);
    const directionalDistPost = getObsValue(ctxObj, distKey, true);
    const inPathPre = getObsValue(ctxObj, "obstacle_in_path", false);
    const inPathPost = getObsValue(ctxObj, "obstacle_in_path", true);

    const inPathBoolPre = inPathPre === true || inPathPre === 1;
    const inPathBoolPost = inPathPost === true || inPathPost === 1;

    let firesUp = false;

    if (mode === "Upon Leaving") {
      if (inPathBoolPre === true && inPathBoolPost === false) firesUp = true;
    }

    if (mode === "Upon Getting Blocked") {
      if (inPathBoolPre === false && inPathBoolPost === true) firesUp = true;
    }

    if (mode === "While Blocked") {
      if (inPathBoolPost === true) firesUp = true;
    }

    if (mode === "Upon Approaching") {
      const distanceDecreased =
        directionalDistPost !== null &&
        directionalDistPre !== null &&
        directionalDistPost < directionalDistPre;

      const enteredApproachBand =
        directionalDistPre !== null &&
        directionalDistPost !== null &&
        directionalDistPre >= OBSTACLE_DIST_THRESHOLD_LOWER &&
        directionalDistPost < OBSTACLE_DIST_THRESHOLD_LOWER &&
        directionalDistPost > OBSTACLE_DIST_THRESHOLD_UPPER;

      if (
        !inPathBoolPre &&
        !inPathBoolPost &&
        distanceDecreased &&
        enteredApproachBand
      ) {
        firesUp = true;
      }
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      firesUp
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "FootballEventNode") {
    const mode = currentNodeData.data?.mode ?? "Team Scored Goal";
    const teamGoalScoredPre = getObsValue(ctxObj, "team_goals_scored", false);
    const teamGoalScoredPost = getObsValue(ctxObj, "team_goals_scored", true);
    const teamGoalConcededPre = getObsValue(ctxObj, "team_goals_conceded", false);
    const teamGoalConcededPost = getObsValue(ctxObj, "team_goals_conceded", true);
    const myGoalsScoredPre = getObsValue(ctxObj, "my_goals_scored", false);
    const myGoalsScoredPost = getObsValue(ctxObj, "my_goals_scored", true);
    const myOwnGoalsScoredPre = getObsValue(ctxObj, "my_own_goals_scored", false);
    const myOwnGoalsScoredPost = getObsValue(ctxObj, "my_own_goals_scored", true);

    let firesUp = false;
    if (mode === "Team Scored Goal") {
      if (teamGoalScoredPre < teamGoalScoredPost) firesUp = true;
    }

    if (mode === "Team Conceded Goal") {
      if (teamGoalConcededPre < teamGoalConcededPost) firesUp = true;
    }

    if (mode === "Player Scored Goal") {
      if (myGoalsScoredPre < myGoalsScoredPost) firesUp = true;
    }

    if (mode === "Player Scored Own Goal") {
      if (myOwnGoalsScoredPre < myOwnGoalsScoredPost) firesUp = true;
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      firesUp
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsPlayerAlignedNode") {
    const mode = currentNodeData.data?.mode ?? "While Aligned";
    const isAlignedPre = getObsValue(ctxObj, "alignment_to_goal", false);
    const isAlignedPost = getObsValue(ctxObj, "alignment_to_goal", true);
    let firesUp = false;

    if (mode === "Upon Aligning") {
      if (isAlignedPre === 0.0 && isAlignedPost === 1.0) firesUp = true;
    }

    if (mode === "While Aligned") {
      if (isAlignedPre === 1.0 && isAlignedPost === 1.0) firesUp = true;
    }

    if (mode === "Leaving Alignment") {
      if (isAlignedPre === 1.0 && isAlignedPost === 0.0) firesUp = true;
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      firesUp
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsBallNearPostNode") {
    const mode = currentNodeData.data?.mode ?? "While In Danger";
    const isDangerPre = getObsValue(ctxObj, "ball_in_own_goal_danger_zone", false);
    const isDangerPost = getObsValue(ctxObj, "ball_in_own_goal_danger_zone", true);
    let firesUp = false;

    if (mode === "Entered Danger Zone") {
      if (isDangerPre === 0.0 && isDangerPost === 1.0) firesUp = true;
    }

    if (mode === "While In Danger") {
      if (isDangerPre === 1.0 && isDangerPost === 1.0) firesUp = true;
    }

    if (mode === "Left Danger Zone") {
      if (isDangerPre === 1.0 && isDangerPost === 0.0) firesUp = true;
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      firesUp
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "ProgressToPost") {
    const mode = currentNodeData.data?.mode ?? "Best Record";
    const getObsPre = (key) => getObsValue(ctxObj, key, false);
    const goalCtx = resolveGoalContext(getObsPre);
    if (!goalCtx) return; // no recognized goal flag active; skip node

    let distanceLess = false;

    if (mode === "Best Record") {
      const currentDistance = getObsValue(ctxObj, "dist_to_target_goal", true);
      const bestDistance = ctxObj.facts?.state_space?.["previous_distance_goal"];
      if (
        currentDistance !== null &&
        bestDistance !== null &&
        bestDistance !== undefined
      ) {
        if (currentDistance < bestDistance) distanceLess = true;
      }
    }

    if (mode === "Raw Distance") {
      const previousDist = getObsValue(ctxObj, "dist_to_target_goal", false);
      const currentDistance = getObsValue(ctxObj, "dist_to_target_goal", true);
      if (currentDistance !== null && previousDist !== null) {
        if (currentDistance < previousDist) distanceLess = true;
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

  if (currentNodeData.type === "IsPlayerNearPost") {
    const DIST_THRESHOLD_TO_POST = 0.15;
    const currentDistToGoalPost = getObsValue(ctxObj, "dist_to_target_goal", true);
    let firesUp = false;

    if (
      currentDistToGoalPost !== null &&
      currentDistToGoalPost < DIST_THRESHOLD_TO_POST
    ) {
      firesUp = true;
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      firesUp
        ? e.sourceHandle?.toLowerCase().includes("true")
        : e.sourceHandle?.toLowerCase().includes("false"),
    );
    for (const chosenEdge of chosenEdges) {
      visitNode(chosenEdge.target, graph, ctxObj);
      if (ctxObj._stop) return;
    }
    return;
  }

  if (currentNodeData.type === "IsBallProgressing") {
    const previousDistToGoalPost = getObsValue(ctxObj, "ball_dist_to_enemy_goal", false);
    const currentDistToGoalPost = getObsValue(ctxObj, "ball_dist_to_enemy_goal", true);
    let firesUp = false;

    if (
      previousDistToGoalPost !== null &&
      currentDistToGoalPost !== null &&
      currentDistToGoalPost < previousDistToGoalPost
    ) {
      firesUp = true;
    }

    const edges = findEdges(NodeId, graph);
    const chosenEdges = edges.filter((e) =>
      firesUp
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
  if (getObs("goal_is_football") === 1 || getObs("goal_is_football") === true) {
    return {
      predicate: (e) => e.isBall === true || e.isBall === "true" || e.isBall === 1,
      stateKey: "previous_distance_ball",
    };
  }
  return null;
}

function findEdges(NodeId, graph) {
  return graph.edges.filter((e) => e.source === NodeId);
}
