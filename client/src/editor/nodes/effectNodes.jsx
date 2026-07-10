import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";
import { useRunTimeStore } from "../../stores/useRunTimeStore";

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
  const updateNode = useGraphStore((s) => s.updateNode);
  const setMaxStepPerEp = useRunTimeStore((s) => s.setMaxStepPerEp);

  function updateValue(e) {
    setMaxStepPerEp(Number(e.target.value));
    updateNode(activeGraphId, id, {
      data: { ...data, maxSteps: Number(e.target.value) },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, id)}
      className="conditional-node"
      style={{ width: "250px" }}
    >
      <span className="node-heading">{data?.label ?? "Truncate Episode"}</span>
      <label>Number of Max Steps</label>
      <input type="number" value={data?.maxSteps ?? 0} onChange={updateValue} />

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

  function updateMode(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, typeOfReward: e.target.value },
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
        <span>Reward Type</span>
        <select onChange={updateMode} value={data?.typeOfReward ?? "Shaping"}>
          <option key="Shaping" value="Shaping">
            Shaping Reward
          </option>
          <option key="Terminal" value="Terminal">
            Terminal Reward
          </option>
        </select>

        <br />
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
