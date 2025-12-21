// Walks the graph, evaluates nodes per tick
import { useSceneStore } from "../../stores/useSceneStore";
import { useGraphStore } from "../../stores/useGraphStore";

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
        facts: { capabilities: agent.capabilities, last_action: agent.last_action, state_space: agent.state_space, obs_space: agent.observation_space },
        maxSteps: 50,
        stepCount: 0,
        visitedNodes,
        config,
        obsVector
    }

    const start = graph.nodes.find(e => e.type === "OnStepNode")
    if (!start) return { reward: 0, done: false }
    visitNode(start.id, graph, ctxObj);
    return { reward: ctxObj.reward, done: ctxObj.done };
}

function visitNode(NodeId, graph, ctxObj) {
    if (ctxObj.done) return;
    if (ctxObj.stepCount > ctxObj.maxSteps) return;
    if (ctxObj.visitedNodes.has(NodeId)) return;
    ctxObj.visitedNodes.add(NodeId);
    ctxObj.stepCount++;

    const currentNodeData = graph.nodes.find(e => e.id === NodeId);
    if (!currentNodeData) return;

    // if (currentNodeData.type === "OnEpisodeStartNode" || currentNodeData.type === "OnStepNode") {
    // }

    if (currentNodeData.type === "AddRewardNode") {
        const multiplier = ctxObj?.config?.rewardMultiplier ?? 1;
        ctxObj.reward += (currentNodeData?.data?.rewardValue ?? 0) * multiplier; //Will do proper calculation with assignmentConfig but for now this works!
    }

    if (currentNodeData.type === "EndEpisodeNode") {
        ctxObj.done = true;
        return;
    }

    if (currentNodeData.type === "StateEqualsToNode") {
        const key = currentNodeData.data?.entityState //holding
        const expected = currentNodeData.data?.StateStatus //true or false
        const expectedBool = (expected === true || expected === "true");
        const value = ctxObj.facts.state_space?.[key]
        const result = value === expectedBool;

        const edges = findEdges(NodeId, graph);
        const chosenEdge = edges.find(e => result ? e.sourceHandle?.toLowerCase().includes("true") : e.sourceHandle?.toLowerCase().includes("false"));
        if (chosenEdge) {
            visitNode(chosenEdge.target, graph, ctxObj);
        }
        return;
    }

    if (currentNodeData.type === "LastActionIsNode") {
        const actionPicked = currentNodeData?.data?.entityAction;
        const actionStatus = currentNodeData?.data?.actionStatus;
        const expected = (actionStatus === true || actionStatus === "true");
        const currentLastAction = ctxObj.facts.last_action;
        const value = (currentLastAction === actionPicked);
        const result = (expected === value);

        const edges = findEdges(NodeId, graph);
        const chosenEdge = edges.find(e => result ? e.sourceHandle?.toLowerCase().includes("true") : e.sourceHandle?.toLowerCase().includes("false"));
        if (chosenEdge) {
            visitNode(chosenEdge.target, graph, ctxObj);
        }
        return;
    }

    if (currentNodeData.type === "CompareStateNode") {

        const operations = {
            "Less Than": (a, b) => a < b,
            "Higher Than": (a, b) => a > b,
            "Less Than Equal To": (a, b) => a <= b,
            "Higher Than Equal To": (a, b) => a >= b,
        }

        const key = currentNodeData?.data?.entityState; //This is state in question
        const numericValue = Number(currentNodeData?.data?.StateValue);
        if (!Number.isFinite(numericValue)) return;
        if (typeof numericValue !== "number") return;
        
        const currentStateRaw = ctxObj.facts.state_space?.[key];
        const currentState = Number(currentStateRaw);
        if (!Number.isFinite(currentState)) return;

        const operator = currentNodeData?.data?.Operator; //This is operator
        const opFunction = operations[operator];
        if (!opFunction) return;
        const result = opFunction(currentState, numericValue);

        const edges = findEdges(NodeId, graph);
        const chosenEdge = edges.find(e => result ? e.sourceHandle?.toLowerCase().includes("true") : e.sourceHandle?.toLowerCase().includes("false"));
        if (chosenEdge) {
            visitNode(chosenEdge.target, graph, ctxObj);
        }
        return;
    }

    if (currentNodeData.type === "InRadiusNode") {
        const radiusCheck = 1; //Engine Defined - we are not taking input from user
        let inRadius = false;
        const entityOne = currentNodeData.data.entityOne; //Will make sure EntityOne is always Agent - at least for POC
        const entityTwo = currentNodeData.data.entityTwo;

        const isAgent1 = entityOne === "Agent";
        const isAgent2 = entityTwo === "Agent";

        const hasHolder = ctxObj.facts?.capabilities?.includes("Holder");
        const hasCollector = ctxObj.facts?.capabilities?.includes("Collector");

        if ((isAgent1 && isAgent2) || (!isAgent1 && !isAgent2)) {
            return; //For distance to be calculated at least ONE entity has to be an agent!
            //Also both can not be Agent as well - at least for POC!
        }

        const getObs = (key) => {
            const idx = ctxObj?.facts?.obs_space.indexOf(key);
            return idx === -1 ? null : ctxObj.obsVector[idx]
        }

        if (entityTwo === "Target Object") {
                //proceed further
                const actualDistanceToTarget = getObs("dist_to_nearest_target")
                if (actualDistanceToTarget !== null && actualDistanceToTarget <= radiusCheck) {
                    inRadius = true;
                }
        }

        if (entityTwo === "Pickable Object") {
            if (hasHolder) {
                const actualDistanceToPickable = getObs("dist_to_nearest_pickable");
                if (actualDistanceToPickable !== null && actualDistanceToPickable <= radiusCheck) {
                    inRadius = true;
                }
            } else if (hasCollector) {
                const actualDistanceToCollector = getObs("dist_to_nearest_collectable");
                if (actualDistanceToCollector !== null && actualDistanceToCollector <= radiusCheck) {
                    inRadius = true;
                }
            } else {
                return;
            }
        }

        const edges = findEdges(NodeId, graph);
        const chosenEdge = edges.find(e => inRadius ? e.sourceHandle?.toLowerCase().includes("true") : e.sourceHandle?.toLowerCase().includes("false"));
        if (chosenEdge) {
            visitNode(chosenEdge.target, graph, ctxObj);
        }
        return;
    }

    const edges = findEdges(NodeId, graph); // We will get edges that are going out from the node to another nodes - we will use it traverse other nodes
    for (const edge of edges) {
        visitNode(edge.target, graph, ctxObj);
        if (ctxObj.done) return;
    }
}

function findEdges(NodeId, graph) {
    const edges = graph.edges;
    const edgesofNode = edges.filter(e => e.source === NodeId);
    return edgesofNode;
}