import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";

export function EndEpisodeNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const nodeId = id;
  const deleteNode = useGraphStore((s) => s.deleteNode);

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="event-node"
    >
      <span>{data?.label}</span>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: "10px",
          height: "10px",
          border: "none",
          background: "#000",
        }}
      />
    </div>
  );
}

export function TruncateEpisodeNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const deleteNode = useGraphStore((s) => s.deleteNode);

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, id)}
      className="event-node"
    >
      <span className="node-heading">{data?.label ?? "Truncate Episode"}</span>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: "10px",
          height: "10px",
          border: "none",
          background: "#000",
        }}
      />
    </div>
  );
}

export function AddRewardNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function updateRewardValue(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        rewardValue: event.target.value,
      },
    });
  }
  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="effect-node"
    >
      <span className="node-heading">{data?.label}</span>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: "10px",
          height: "10px",
          border: "none",
          background: "#000",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: "10px",
          height: "10px",
          border: "none",
          background: "#000",
        }}
      />
      <div className="effect-data-form">
        <span>Reward Value</span>
        <input
          type="number"
          value={data?.rewardValue}
          onChange={updateRewardValue}
        />
        <br />
      </div>
    </div>
  );
}
