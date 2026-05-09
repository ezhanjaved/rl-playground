import "../styling/style.css";
import {
  FaCode,
  FaPause,
  FaTimes,
  FaPlus,
  FaArrowRight,
  FaShieldAlt,
  FaFileSignature,
  FaListUl,
  FaSignOutAlt,
  FaPlay,
  FaRobot,
} from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useCanvasSetting } from "../stores/useCanvasSetting";
import { useGraphStore } from "../stores/useGraphStore";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { validateGraphWithStore } from "../editor/nodes/validateGraph";

const Header = () => {
  const location = useLocation();
  const { signOut, user } = useAuthStore();
  const togglePlaying = useRunTimeStore((state) => state.togglePlaying);
  const playing = useRunTimeStore((state) => state.playing);
  const isModelReady = useRunTimeStore((state) => state.isModelReady);
  const training = useRunTimeStore((s) => s.training);
  const clearExperiment = useRunTimeStore((s) => s.clearExperiment);
  const currentExpId = useRunTimeStore((s) => s.currentExperimentId);

  const toggleDebug = useCanvasSetting((state) => state.toggleDebug);
  const changeColor = useCanvasSetting((state) => state.changeColor);
  const pickedColor = useCanvasSetting((state) => state.pickedColor);
  const colors = [
    { name: "purple", gradient: "linear-gradient(135deg, #a855f7, #6366f1)" },
    { name: "orange", gradient: "linear-gradient(135deg, #f97316, #f59e0b)" },
    { name: "green", gradient: "linear-gradient(135deg, #22c55e, #4ade80)" },
    { name: "peach", gradient: "linear-gradient(135deg, #fb7185, #fda4af)" },
    { name: "yellow", gradient: "linear-gradient(135deg, #facc15, #fde047)" },
    { name: "pink", gradient: "linear-gradient(135deg, #ec4899, #f472b6)" },
  ];

  const graphs = useGraphStore((state) => state.graphs);
  const addGraph = useGraphStore((state) => state.addGraph);
  const nextGraph = useGraphStore((state) => state.nextGraph);
  const updateName = useGraphStore((state) => state.updateName);
  const removeGraphError = useGraphStore((state) => state.removeGraphError);
  const graphError = useGraphStore((state) => state.graphError);
  const addGraphError = useGraphStore((state) => state.addGraphError);
  const activeGraphId = useGraphStore((state) => state.activeGraphId);

  const errors = graphError?.[activeGraphId];
  const isError = errors && errors.length > 0;
  const message = isError ? errors[0] : "Graph is Valid";

  useEffect(() => {
    if (!activeGraphId) return;

    validateGraphWithStore(
      graphs[activeGraphId],
      addGraphError,
      removeGraphError,
    );
  }, [activeGraphId]);

  const [visibility, setVisibility] = useState(0);
  const [setting, setSetting] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (location.pathname === "/") setVisibility(0);
    else if (location.pathname === "/entities") setVisibility(1);
    else if (location.pathname === "/behavior-graph") setVisibility(2);
    else setVisibility(0);
  }, [location.pathname]);

  return (
    <header className="header">
      <h1></h1>
      <div className="Window-Controls">
        {training && (
          <span className="training-indicator">
            Training<span className="dots">...</span>
          </span>
        )}
        {isModelReady && (
          <span className="training-indicator">
            Inference<span className="dots">...</span>
          </span>
        )}
        {setting && (
          <div className="setting-pop-up">
            <input
              value={name}
              type="text"
              placeholder="Enter Graph Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={() => {
                updateName(activeGraphId, name);
                setSetting(null);
              }}
            >
              Update
            </button>
          </div>
        )}
        {visibility === 1 && (
          <div className="color-picker">
            {colors.map((c) => (
              <button
                key={c.name}
                className={`color-dot ${pickedColor === c.name ? "active" : ""}`}
                style={{ background: c.gradient }}
                onClick={() => changeColor(c.name)}
                aria-label={c.name}
              />
            ))}
          </div>
        )}
        <span
          style={{
            display: visibility !== 2 ? "none" : "flex",
            background: isError ? "red" : "green",
            color: "white",
            padding: "5px 10px",
            borderRadius: "100px",
            fontSize: "18px",
          }}
        >
          {message}
        </span>
        <span style={{ display: visibility !== 2 ? "none" : "flex" }}>
          {graphs[activeGraphId]?.name || null}
        </span>
        {user && (
          <span
            style={{ cursor: "pointer" }}
            onClick={signOut}
            title="Sign Out"
          >
            <FaSignOutAlt />
          </span>
        )}
        <span
          style={{
            display: visibility !== 2 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => setSetting((prev) => !prev)}
        >
          <FaFileSignature />
        </span>
        <span
          style={{
            display: visibility !== 2 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => addGraph()}
        >
          <FaPlus />
        </span>
        <Link
          to="/chat-ai"
          style={{
            color: "inherit",
            textDecoration: "none",
            display: "flex",
          }}
        >
          <span
            style={{
              cursor: "pointer",
            }}
          >
            <FaRobot />
          </span>
        </Link>
        <span
          style={{
            display: visibility !== 2 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!activeGraphId) {
              console.warn("Graph missing id");
              return;
            }
            validateGraphWithStore(
              graphs[activeGraphId],
              addGraphError,
              removeGraphError,
            );
          }}
        >
          <FaShieldAlt />
        </span>
        <span
          style={{
            display: visibility !== 2 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => nextGraph()}
        >
          <FaArrowRight />
        </span>
        <span
          style={{
            display: visibility !== 1 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => toggleDebug()}
        >
          <FaCode />
        </span>
        <span
          style={{
            display: visibility !== 1 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => clearExperiment(currentExpId)}
        >
          <FaTimes />
        </span>
        <span
          style={{
            display: visibility !== 1 ? "none" : "flex",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!training) togglePlaying();
          }}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </span>
      </div>
    </header>
  );
};

export default Header;
