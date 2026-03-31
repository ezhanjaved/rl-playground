def extract_agent_list(dataObj):
    return list(dataObj.assignment)


def extact_graph_per_agent(dataObj, agentList):
    assignments = dataObj.assignments
    graphs = dataObj.graphs
    graph_per_agent = {}  # python dict
    for agent in agentList:
        assignment = assignments.get(agent)
        if not assignment:
            continue
        graph_id = assignment.graph_id
        graph = graphs.get(graph_id)
        if graph:
            graph_per_agent[agent] = graph

    return graph_per_agent
