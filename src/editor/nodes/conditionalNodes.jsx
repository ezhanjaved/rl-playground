import "../../styling/App.css";
import { Position, Handle } from "@xyflow/react";
import { useGraphStore } from "../../stores/useGraphStore";
import { useState, useEffect } from "react";

export function InRadiusNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateEntityOne(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityOne: event.target.value,
      },
    });
  }

  function UpdateEntityTwo(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityTwo: event.target.value,
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
        <span>Entity One</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateEntityOne}
          value={data.entityOne ?? "Agent"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>

        <br />

        <span>Entity Two</span>
        <select
          name="in-radius-entity-two"
          id="in-radius-entity-two"
          onChange={UpdateEntityTwo}
          value={data.entityTwo ?? "Pickable Object"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
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

  const moveableAction = [
    "move_up",
    "move_down",
    "move_right",
    "move_left",
    "idle",
  ];
  const holderAction = ["pick", "drop"];
  const collectorAction = ["collect"];
  const depositAction = ["deposit"];
  const finderAction = ["interact"];

  const handleCheckbox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setOption((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

  const actionMap = {
    Moveable: moveableAction,
    Holder: holderAction,
    Collector: collectorAction,
    Depositor: depositAction,
    Finder: finderAction,
  };

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
        <span>Agent Capabilities</span>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>
            <input type="checkbox" value="Moveable" onChange={handleCheckbox} />{" "}
            Moveable{" "}
          </label>
          <label>
            <input type="checkbox" value="Holder" onChange={handleCheckbox} />{" "}
            Holder{" "}
          </label>
          <label>
            <input
              type="checkbox"
              value="Collector"
              onChange={handleCheckbox}
            />{" "}
            Collector
          </label>
          <label>
            <input type="checkbox" value="Finder" onChange={handleCheckbox} />{" "}
            Finder{" "}
          </label>
          <label>
            <input
              type="checkbox"
              value="Depositor"
              onChange={handleCheckbox}
            />{" "}
            Depositor{" "}
          </label>
        </div>

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
  const depositorState = ["nearDeposit"];

  const stateMap = {
    Finder: finderState,
    Holder: holderState,
    Collector: collectorState,
    Depositor: depositorState,
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setOption((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

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
        <span>Entity Capabilities</span>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>
            <input type="checkbox" value="Finder" onChange={handleCheckbox} />{" "}
            Finder
          </label>
          <label>
            <input type="checkbox" value="Holder" onChange={handleCheckbox} />{" "}
            Holder
          </label>
          <label>
            <input
              type="checkbox"
              value="Collector"
              onChange={handleCheckbox}
            />{" "}
            Collector
          </label>
          <label>
            <input
              type="checkbox"
              value="Depositor"
              onChange={handleCheckbox}
            />{" "}
            Depositor
          </label>
        </div>

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

  const finderState = [
    "previous_distance_target",
    "previous_distance_target_x",
    "previous_distance_target_z",
  ];
  const holderState = [
    "previous_distance_pickable",
    "previous_distance_pickable_x",
    "previous_distance_pickable_z",
  ];
  const collectorState = [
    "previous_distance_collect",
    "previous_distance_collect_x",
    "previous_distance_collect_z",
    "items_collected",
  ];
  const depositorState = [
    "items_deposited",
    "previous_distance_deposit",
    "previous_distance_deposit_x",
    "previous_distance_deposit_z",
  ];

  const stateMap = {
    Finder: finderState,
    Holder: holderState,
    Collector: collectorState,
    Depositor: depositorState,
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setOption((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
  };

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
        <span>Entity Capabilities</span>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <label>
            <input type="checkbox" value="Finder" onChange={handleCheckbox} />{" "}
            Finder
          </label>
          <label>
            <input type="checkbox" value="Holder" onChange={handleCheckbox} />{" "}
            Holder
          </label>
          <label>
            <input
              type="checkbox"
              value="Collector"
              onChange={handleCheckbox}
            />{" "}
            Collector
          </label>
          <label>
            <input
              type="checkbox"
              value="Depositor"
              onChange={handleCheckbox}
            />{" "}
            Depositor
          </label>
        </div>

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

  function UpdateEntityOne(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityOne: event.target.value,
      },
    });
  }

  function UpdateEntityTwo(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityTwo: event.target.value,
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
        <span>Entity One</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateEntityOne}
          value={data.entityOne ?? "Agent"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
          <option value="Navigator Object">Navigator Object</option>
        </select>

        <br />

        <span>Entity Two</span>
        <select
          name="in-radius-entity-two"
          id="in-radius-entity-two"
          onChange={UpdateEntityTwo}
          value={data.entityTwo ?? "Pickable Object"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
          <option value="Navigator Object">Navigator Object</option>
        </select>
      </div>
    </div>
  );
}

export function IsDeltaXLessNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateEntityOne(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityOne: event.target.value,
      },
    });
  }

  function UpdateEntityTwo(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityTwo: event.target.value,
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
        <span>Entity One</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateEntityOne}
          value={data.entityOne ?? "Agent"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
          <option value="Navigator Object">Navigator Object</option>
        </select>

        <br />

        <span>Entity Two</span>
        <select
          name="in-radius-entity-two"
          id="in-radius-entity-two"
          onChange={UpdateEntityTwo}
          value={data.entityTwo ?? "Pickable Object"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
          <option value="Navigator Object">Navigator Object</option>
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

  function UpdateEntityOne(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityOne: event.target.value,
      },
    });
  }

  function UpdateEntityTwo(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityTwo: event.target.value,
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
        <span>Entity One</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateEntityOne}
          value={data.entityOne ?? "Agent"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>

        <br />

        <span>Entity Two</span>
        <select
          name="in-radius-entity-two"
          id="in-radius-entity-two"
          onChange={UpdateEntityTwo}
          value={data.entityTwo ?? "Pickable Object"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>
      </div>
    </div>
  );
}

export function IsDistanceXLessNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateEntityOne(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityOne: event.target.value,
      },
    });
  }

  function UpdateEntityTwo(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityTwo: event.target.value,
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
        <span>Entity One</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateEntityOne}
          value={data.entityOne ?? "Agent"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>

        <br />

        <span>Entity Two</span>
        <select
          name="in-radius-entity-two"
          id="in-radius-entity-two"
          onChange={UpdateEntityTwo}
          value={data.entityTwo ?? "Pickable Object"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>
      </div>
    </div>
  );
}

export function IsDistanceZLessNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);
  const nodeId = id;

  function UpdateEntityOne(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityOne: event.target.value,
      },
    });
  }

  function UpdateEntityTwo(event) {
    updateNode(activeGraphId, nodeId, {
      data: {
        ...data,
        entityTwo: event.target.value,
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
        <span>Entity One</span>
        <select
          name="in-radius-entity-one"
          id="in-radius-entity-one"
          onChange={UpdateEntityOne}
          value={data.entityOne ?? "Agent"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>

        <br />

        <span>Entity Two</span>
        <select
          name="in-radius-entity-two"
          id="in-radius-entity-two"
          onChange={UpdateEntityTwo}
          value={data.entityTwo ?? "Pickable Object"}
        >
          <option value="Agent">Agent</option>
          <option value="Non-State Object">Non-State Object</option>
          <option value="Pickable Object">Pickable Object</option>
          <option value="Target Object">Target Object</option>
          <option value="Deposit Object">Deposit Object</option>
        </select>
      </div>
    </div>
  );
}

export function ObsValueNode({ data, id }) {
  const activeGraphId = useGraphStore((s) => s.activeGraphId);
  const updateNode = useGraphStore((s) => s.updateNode);
  const deleteNode = useGraphStore((s) => s.deleteNode);

  const allObsKeys = [
    "agent_pos_x",
    "agent_pos_z",
    "agent_rotation_y",
    "dist_x_to_obstacle",
    "dist_z_to_obstacle",
    "dist_to_nearest_obstacle",
    "obstacle_in_path",
    "dist_x_to_target",
    "dist_z_to_target",
    "dist_to_nearest_target",
    "in_target_radius",
    "dist_x_to_pickable",
    "dist_z_to_pickable",
    "dist_to_nearest_pickable",
    "holding",
    "dist_x_to_collect",
    "dist_z_to_collect",
    "dist_to_nearest_collectable",
    "items_collected",
    "dist_x_to_deposit",
    "dist_z_to_deposit",
    "dist_to_nearest_deposit",
    "items_deposit",
  ];

  const operators = [
    "Less Than",
    "Higher Than",
    "Less Than Equal To",
    "Higher Than Equal To",
    "Equal To",
  ];

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
