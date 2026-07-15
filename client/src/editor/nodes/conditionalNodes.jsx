import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";
import { useState, useEffect } from "react";

export function InRadiusNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if agent is within radius!
        </span>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "Upon Entrance"}
        >
          <option value="Upon Exit">Upon Exit</option>
          <option value="Within Radius">While In Radius</option>
          <option value="Upon Entrance">Upon Entrance</option>
        </select>
      </div>
    </div>
  );
}

export function LastActionIsNode({ data, id }) {
  const [selectedOptions, setOption] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  const moveableAction = ["move_up", "move_right", "move_left", "idle"];
  const holderAction = ["pick", "drop"];
  const collectorAction = ["collect", ""];
  const depositAction = ["deposit", ""];
  const finderAction = ["interact", ""];
  const destroyerAction = ["destroy", ""];
  const openerAction = ["open", ""];
  const footballerAction = ["kick", ""];

  const actionMap = {
    Moveable: moveableAction,
    Holder: holderAction,
    Collector: collectorAction,
    Depositor: depositAction,
    Finder: finderAction,
    Destroyer: destroyerAction,
    Opener: openerAction,
    Footballer: footballerAction,
  };

  const handleCapabilityChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setOption(values);
  };

  const capabilityOptions = Object.keys(actionMap);

  useEffect(() => {
    const allActions = selectedOptions.flatMap((option) => actionMap[option]);
    const uniqueActions = [...new Set(allActions)];
    setAllActions(uniqueActions);
  }, [selectedOptions]);

  function updateAgentAction(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        agentCapability: selectedOptions,
        entityAction: event.target.value,
      },
    });
  }

  function updateAgentActionStatus(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        actionStatus: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
      style={{ width: "450px" }}
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if agent picked this particular action
        </span>

        <br></br>
        <span>Agent Capabilities</span>
        <select
          value={selectedOptions}
          onChange={handleCapabilityChange}
          className="capability-select"
        >
          {capabilityOptions.map((cap) => (
            <option key={cap} value={cap}>
              {cap}
            </option>
          ))}
        </select>

        <br />

        <span>Action Performed</span>
        <select onChange={updateAgentAction} value={data?.entityAction}>
          {allActions.map((action, i) => (
            <option key={i} value={action}>
              {action}
            </option>
          ))}
        </select>

        <br />

        <span>Action Status</span>
        <select onChange={updateAgentActionStatus} value={data?.actionStatus}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>
  );
}

export function StateEqualsToNode({ data, id }) {
  const [selectedOptions, setOption] = useState([]);
  const [allStates, setAllStates] = useState([]);

  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  const finderState = ["targetReached"];
  const holderState = ["holding", "lastPickSuccess"];
  const collectorState = ["lastPickSuccess"];
  const depositorState = ["nearDeposit", "lastDepositSuccess"];
  const destroyerState = ["nearDestroyable", "lastDestroySuccess"];
  const openerState = ["nearGate", "lastOpenSuccess"];
  const footballerState = ["lastKickSuccess", "last_goal_type "];

  const stateMap = {
    Finder: finderState,
    Holder: holderState,
    Collector: collectorState,
    Depositor: depositorState,
    Destroyer: destroyerState,
    Opener: openerState,
    Footballer: footballerState,
  };

  const handleCapabilityChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setOption(values);
  };

  const capabilityOptions = Object.keys(stateMap);

  useEffect(() => {
    setAllStates([]);
    const allStates = selectedOptions.flatMap((option) => stateMap[option]);
    const uniqueStates = [...new Set(allStates)];
    setAllStates(uniqueStates);
  }, [selectedOptions]);

  function updateEntityState(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityCapability: selectedOptions,
        entityState: event.target.value,
      },
    });
  }

  function updateEntityStatusStatus(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        StateStatus: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />
      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks against selected boolean state value
        </span>

        <br></br>
        <span>Entity Capabilities</span>
        <select
          value={selectedOptions}
          onChange={handleCapabilityChange}
          className="capability-select"
        >
          {capabilityOptions.map((cap) => (
            <option key={cap} value={cap}>
              {cap}
            </option>
          ))}
        </select>

        <br />

        <span>Entity State</span>
        <select onChange={updateEntityState} value={data?.entityState}>
          {allStates.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>

        <br />

        <span>State Status</span>
        <select onChange={updateEntityStatusStatus} value={data?.StateStatus}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
    </div>
  );
}

export function CompareStateNode({ data, id }) {
  const [selectedOptions, setOption] = useState([]);
  const [allStates, setAllStates] = useState([]);

  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  const finderState = ["previous_distance_target"];
  const holderState = ["previous_distance_pickable"];
  const collectorState = [
    "previous_distance_collect",
    "items_collected",
    "keys_collected",
    "total_items_collected",
  ];
  const depositorState = ["items_deposited", "previous_distance_deposit"];
  const destroyerState = ["previous_distance_destroyable", "items_destroyed"];
  const openerState = ["previous_distance_gate", "gates_open"];
  const footballerState = [
    "previous_distance_ball",
    "previous_distance_goal",
    "my_own_goals_scored",
    "my_goals_scored",
    "team_goals_conceded",
    "team_goals_scored",
  ];

  const stateMap = {
    Finder: finderState,
    Holder: holderState,
    Collector: collectorState,
    Depositor: depositorState,
    Destroyer: destroyerState,
    Opener: openerState,
    Footballer: footballerState,
  };

  const handleCapabilityChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setOption(values);
  };

  const capabilityOptions = Object.keys(stateMap);

  useEffect(() => {
    setAllStates([]);
    const allStates = selectedOptions.flatMap((option) => stateMap[option]);
    const uniqueStates = [...new Set(allStates)];
    setAllStates(uniqueStates);
  }, [selectedOptions]);

  function updateEntityState(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityCapability: selectedOptions,
        entityState: event.target.value,
      },
    });
  }

  function updateOperator(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        Operator: event.target.value,
      },
    });
  }

  function updateValue(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        StateValue: Number(event.target.value),
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks against given numerical state value
        </span>

        <br></br>
        <span>Entity Capabilities</span>
        <select
          value={selectedOptions}
          onChange={handleCapabilityChange}
          className="capability-select"
        >
          {capabilityOptions.map((cap) => (
            <option key={cap} value={cap}>
              {cap}
            </option>
          ))}
        </select>

        <br />

        <span>Entity State</span>
        <select onChange={updateEntityState} value={data?.entityState}>
          {allStates.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>

        <br />

        <span>Operator</span>
        <select onChange={updateOperator} name="" id="">
          <option value="Less Than">Less Than</option>
          <option value="Higher Than">Higher Than</option>
          <option value="Less Than Equal To">Less Than Equal To</option>
          <option value="Higher Than Equal To">Higher Than Equal To</option>
          <option value="Equal To">Equal To</option>
        </select>

        <br />

        <span>Value</span>
        <input value={data?.StateValue} onChange={updateValue} type="number" />
      </div>
    </div>
  );
}

export function IsDistanceLessNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if agent has progressed
        </span>

        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "Best Record"}
        >
          <option value="Best Record">Best Record</option>
          <option value="Raw Distance">Raw Distance</option>
        </select>
      </div>
    </div>
  );
}

export function IsDistanceMoreNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if agent is going away from target
        </span>
      </div>
    </div>
  );
}

export function IsDeltaXLessNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if agent is aligned with target{" "}
        </span>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "While Aligned"}
        >
          <option value="While Aligned">While Aligned</option>
          <option value="Upon Alignment">Upon Alignment</option>
          <option value="Leaving Alignment">Leaving Alignment</option>
          <option value="Alignment Improving">Alignment Improving</option>
          <option value="Alignment Worsening">Alignment Worsening</option>
        </select>
      </div>
    </div>
  );
}

export function IsDeltaZPosNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if target is ahead of agent
        </span>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "While Aligned"}
        >
          <option value="While Aligned">While Aligned</option>
          <option value="Upon Alignment">Upon Alignment</option>
          <option value="Leaving Alignment">Leaving Alignment</option>
          <option value="Alignment Improving">Alignment Improving</option>
          <option value="Alignment Worsening">Alignment Worsening</option>
        </select>
      </div>
    </div>
  );
}

export function NumericObsNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);

  const allObsKeys = [
    // Navigator
    "obstacle_forward",
    "obstacle_left",
    "obstacle_right",
    // Finder
    "dist_to_nearest_target",
    "delta_x_to_target",
    "delta_z_to_target",
    // Holder
    "dist_to_nearest_pickable",
    "delta_x_to_pickable",
    "delta_z_to_pickable",
    // Collector
    "dist_to_nearest_collectable",
    "delta_x_to_collectable",
    "delta_z_to_collectable",
    "items_collected",
    "keys_collected",
    "total_items_collected",
    // Depositor
    "dist_to_nearest_deposit",
    "delta_x_to_deposit",
    "delta_z_to_deposit",
    "items_deposited",
    // Destroyer
    "dist_to_nearest_destroyable",
    "delta_x_to_destroyable",
    "delta_z_to_destroyable",
    "items_destroyed",
    // Opener
    "dist_to_nearest_gate",
    "delta_x_to_gate",
    "delta_z_to_gate",
    "gates_open",
    // Footballer
    "dist_to_nearest_ball",
    "delta_x_to_ball",
    "delta_z_to_ball",
    "dist_to_target_goal",
    "delta_x_to_goal",
    "delta_z_to_goal",
    "my_goals_scored",
    "my_own_goals_scored",
    "team_goals_scored",
    "team_goals_conceded",
  ];

  const operators = [
    "Less Than",
    "Higher Than",
    "Less Than Equal To",
    "Higher Than Equal To",
    "Equal To",
  ];

  function updateMode(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, mode: e.target.value },
    });
  }

  function updateObsKey(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, obsKey: e.target.value },
    });
  }
  function updateOperator(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, Operator: e.target.value },
    });
  }
  function updateValue(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, ObsValue: Number(e.target.value) },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, id)}
      className="conditional-node"
    >
      <span className="node-heading">{data?.label ?? "Obs Value"}</span>

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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks against given numeric obs value
        </span>

        <br></br>
        <span>Mode</span>
        <select onChange={updateMode} value={data?.mode ?? "Pre"}>
          <option key="Pre" value="Pre">
            Pre Action OBS
          </option>
          <option key="Post" value="Post">
            Post Action OBS
          </option>
        </select>

        <br />

        <span>Obs Key</span>
        <select
          onChange={updateObsKey}
          value={data?.obsKey ?? "obstacle_in_path"}
        >
          {allObsKeys.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <br />

        <span>Operator</span>
        <select onChange={updateOperator} value={data?.Operator ?? "Less Than"}>
          {operators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>

        <br />

        <span>Value</span>
        <input
          type="number"
          step="0.01"
          value={data?.ObsValue ?? 0}
          onChange={updateValue}
        />
      </div>
    </div>
  );
}

export function BoolObsNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);

  const allObsKeys = [
    // Navigator
    "obstacle_in_path",
    // Finder
    "in_target_radius",
    // Holder + Collector
    "holding",
    "in_radius_holder",
    //Holder + Collector
    "lastPickSuccess",
    // Collector
    "in_radius_collect",
    // Depositor
    "last_deposit_success",
    "in_radius_deposit",
    // Destroyer
    "in_radius_destroyed",
    "last_destroy_success",
    // Opener
    "in_radius_gate",
    "hasKey",
    "last_open_success",
    // Footballer
    "in_radius_ball",
    "in_radius_goal",
    "last_kick_success",
    "last_goal_type",
  ];

  function updateMode(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, mode: e.target.value },
    });
  }

  function updateObsKey(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, obsKey: e.target.value },
    });
  }

  function updateStatus(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, status: e.target.value },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, id)}
      className="conditional-node"
    >
      <span className="node-heading">{data?.label ?? "Obs Value"}</span>

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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks against given boolean obs value
        </span>

        <br></br>
        <span>Mode</span>
        <select onChange={updateMode} value={data?.mode ?? "Pre"}>
          <option key="Pre" value="Pre">
            Pre Action OBS
          </option>
          <option key="Post" value="Post">
            Post Action OBS
          </option>
        </select>

        <br />

        <span>Obs Key</span>
        <select
          onChange={updateObsKey}
          value={data?.obsKey ?? "obstacle_in_path"}
        >
          {allObsKeys.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <br />

        <span>Status</span>
        <select onChange={updateStatus} value={data?.status ?? "True"}>
          <option key="True" value="True">
            True
          </option>
          <option key="False" value="False">
            False
          </option>
        </select>
      </div>
    </div>
  );
}

export function IsObstacleInPath({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);

  function updateDirection(e) {
    updateNode(activeGraphId, id, {
      data: { ...data, direction: e.target.value },
    });
  }

  function UpdateMode(event) {
    updateNode(activeGraphId, id, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, id)}
      className="conditional-node"
    >
      <span className="node-heading">{data?.label ?? "Obs Value"}</span>

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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if agent is facing obstacle
        </span>

        <br></br>
        <span>Direction</span>
        <select onChange={updateDirection} value={data?.direction ?? "Forward"}>
          <option key="Left" value="Left">
            Left
          </option>
          <option key="Forward" value="Forward">
            Forward
          </option>
          <option key="Right" value="Right">
            Right
          </option>
        </select>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "While Blocked"}
        >
          <option value="Upon Leaving">Upon Leaving</option>
          <option value="While Blocked">While Blocked</option>
          <option value="Upon Getting Blocked">Upon Getting Blocked</option>
          <option value="Upon Approaching">Upon Approaching</option>
        </select>
      </div>
    </div>
  );
}

export function FootballEventNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if choosen event occured!
        </span>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "Team Scored Goal"}
        >
          <option value="Team Conceded Goal">Team Conceded Goal</option>
          <option value="Team Scored Goal">Team Scored Goal</option>
          <option value="Player Scored Goal">Player Scored Goal</option>
          <option value="Player Scored Own Goal">Player Scored Own Goal</option>
        </select>
      </div>
    </div>
  );
}

export function IsPlayerFacingPostNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if player is facing goal post!
        </span>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "While Aligned"}
        >
          <option value="While Aligned">While Aligned</option>
          <option value="Upon Aligning">Upon Aligning</option>
          <option value="Leaving Alignment">Leaving Alignment</option>
        </select>
      </div>
    </div>
  );
}

export function IsBallInDanger({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if ball is near our goal!
        </span>
        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "While In Danger"}
        >
          <option value="While In Danger">While In Danger</option>
          <option value="Entered Danger Zone">Entered Danger Zone</option>
          <option value="Left Danger Zone">Left Danger Zone</option>
        </select>
      </div>
    </div>
  );
}

export function ProgressToPost({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateMode(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        mode: event.target.value,
      },
    });
  }

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if player is progressing towards post
        </span>

        <br></br>
        <span>Mode</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateMode}
          value={data.mode ?? "Best Record"}
        >
          <option value="Best Record">Best Record</option>
          <option value="Raw Distance">Raw Distance</option>
        </select>
      </div>
    </div>
  );
}

export function PlayerNearPost({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if player is near enemy goal!
        </span>
      </div>
    </div>
  );
}

export function IsBallProgressing({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  return (
    <div
      onDoubleClick={() => deleteNode(activeGraphId, nodeId)}
      className="conditional-node"
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
        id="false"
        style={{
          top: "40%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "red",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{
          top: "60%",
          width: "10px",
          height: "10px",
          border: "none",
          background: "green",
        }}
      />

      <div className="conditional-data-form">
        <span>
          <strong>Usage:</strong> checks if ball is moving towards goal!
        </span>
      </div>
    </div>
  );
}
