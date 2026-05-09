export function validateGraphWithStore(graph, addGraphError, removeGraphError) {
  if (!graph) return;

  const errors = [];
  const { nodes = [], edges = [], id } = graph;

  if (!id) return;

  const onEpisodeNodes = nodes.filter((n) => n.type === "OnEpisodeStartNode");
  const onStepNodes = nodes.filter((n) => n.type === "OnStepNode");

  if (onEpisodeNodes.length === 0) {
    errors.push("Missing OnEpisodeStartNode");
  } else if (onEpisodeNodes.length > 1) {
    errors.push("Multiple OnEpisodeStartNode instances found");
  }

  if (onStepNodes.length === 0) {
    errors.push("Missing OnStepNode");
  } else if (onStepNodes.length > 1) {
    errors.push("Multiple OnStepNode instances found");
  }

  if (errors.length > 0) {
    addGraphError(id, errors);
    return;
  }

  const onEpisodeId = onEpisodeNodes[0].id;
  const onStepId = onStepNodes[0].id;

  const hasConnection = edges.some(
    (e) => e.source === onEpisodeId && e.target === onStepId,
  );

  if (!hasConnection) {
    errors.push("OnEpisodeStartNode is not connected to OnStepNode");
  }

  const episodeConnections = edges.filter(
    (e) => e.source === onEpisodeId || e.target === onEpisodeId,
  );

  const invalidConnections = episodeConnections.filter(
    (e) =>
      !(
        (e.source === onEpisodeId && e.target === onStepId) ||
        (e.target === onEpisodeId && e.source === onStepId)
      ),
  );

  if (invalidConnections.length > 0) {
    errors.push("OnEpisodeStart must only connect to OnStep");
  }

  if (errors.length > 0) {
    addGraphError(id, errors);
  } else {
    removeGraphError(id);
  }
}
