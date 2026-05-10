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
  FaFileImport,
  FaFileExport,
  FaRobot,
} from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { useCanvasSetting } from "../stores/useCanvasSetting";
import { useSceneStore } from "../stores/useSceneStore";
import { useGraphStore } from "../stores/useGraphStore";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { validateGraphWithStore } from "../editor/nodes/validateGraph";
import { uploadEnv, uploadGraph } from "../export/exportTemplate";
import { viewEnvs, viewGraphs } from "../export/viewTemplate";
import { importEnv, importGraph } from "../export/importTemplate";

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
  const totalGraphs = useGraphStore((state) => state.totalGraph);
  const addGraph = useGraphStore((state) => state.addGraph);
  const nextGraph = useGraphStore((state) => state.nextGraph);
  const updateName = useGraphStore((state) => state.updateName);
  const removeGraphError = useGraphStore((state) => state.removeGraphError);
  const graphError = useGraphStore((state) => state.graphError);
  const addGraphError = useGraphStore((state) => state.addGraphError);
  const activeGraphId = useGraphStore((state) => state.activeGraphId);

  const envName = useSceneStore((state) => state.envName);
  const setEnviorName = useSceneStore((state) => state.setName);
  const setEnvName = useSceneStore((state) => state.setEnvName);

  const [envList, setEnvList] = useState([]);
  const [graphList, setGraphList] = useState([]);
  const [currentPath, setPath] = useState(null);

  const [eModal, seteModel] = useState(false);
  const [iModal, setiModel] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [exportInfo, setMessage] = useState(null);

  useEffect(() => {
    if (visibility === 1 && envList.length > 0) {
      setPath(envList[0].path);
    }
  }, [envList]);

  useEffect(() => {
    if (visibility === 2 && graphList.length > 0) {
      setPath(graphList[0].path);
    }
  }, [graphList]);

  useEffect(() => {
    if (user?.id && envList.length === 0 && graphList.length === 0) {
      getTemplateData();
    }
  }, [user]);

  const getTemplateData = async () => {
    await viewEnvs(setEnvList);
    await viewGraphs(setGraphList);
  };

  const errors = graphError?.[activeGraphId];
  const isError = errors && errors.length > 0;
  const numberOfGraphs = totalGraphs.length;
  const noGraph = numberOfGraphs === 0 ? true : false;
  const message = noGraph ? "No Graph" : isError ? errors[0] : "Graph is Valid";

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
    <>
      {eModal && (
        <div className="template-modal">
          <h2>
            Do you want to save this{" "}
            {visibility === 1 ? "Environment " : "Graph"}?
          </h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <button
              onClick={() => {
                if (visibility === 1) {
                  uploadEnv(setMessage, setInfoModal);
                } else if (visibility === 2) {
                  uploadGraph(activeGraphId, setMessage, setInfoModal);
                }
                seteModel(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => seteModel(false)}>No</button>
          </div>
        </div>
      )}
      {iModal && (
        <div className="template-modal">
          <h2>
            Do you want to import selected{" "}
            {visibility === 1 ? "Environment " : "Graph"}?
          </h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <button
              onClick={() => {
                if (visibility === 1) {
                  importEnv(currentPath);
                } else if (visibility === 2) {
                  importGraph(currentPath);
                }
                setiModel(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setiModel(false)}>No</button>
          </div>
        </div>
      )}
      {infoModal && (
        <div className="template-modal">
          <h2>Export Info</h2>
          <span>{exportInfo}</span>
          <button onClick={() => setInfoModal(false)}>Okay</button>
        </div>
      )}
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
          {setting && visibility === 2 && (
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
          {setting && visibility === 1 && (
            <div className="setting-pop-up">
              <input
                value={envName}
                type="text"
                placeholder="Enter Env Name"
                onChange={(e) => setEnviorName(e.target.value)}
              />
              <button
                onClick={() => {
                  setEnvName(envName);
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
          <span style={{ display: visibility !== 1 ? "none" : "flex" }}>
            {envName || null}
          </span>
          {visibility === 1 && (
            <div className="template-picker">
              <select onChange={(e) => setPath(e.target.value)}>
                {envList.map((env) => (
                  <option value={env.path}>{env.name}</option>
                ))}
              </select>
            </div>
          )}
          <span
            style={{
              display: visibility !== 2 ? "none" : "flex",
              background: isError ? "red" : noGraph ? "purple" : "green",
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
          {visibility === 2 && (
            <div className="template-picker">
              <select onChange={(e) => setPath(e.target.value)}>
                {graphList.map((graph) => (
                  <option value={graph.path}>{graph.name}</option>
                ))}
              </select>
            </div>
          )}
          <span
            style={{
              display: visibility === 1 || visibility === 2 ? "flex" : "none",
              cursor: "pointer",
            }}
            onClick={() => setiModel(true)}
          >
            <FaFileImport />
          </span>
          <span
            style={{
              display: visibility === 1 || visibility === 2 ? "flex" : "none",
              cursor: "pointer",
            }}
            onClick={() => seteModel(true)}
          >
            <FaFileExport />
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
              display: visibility === 1 || visibility === 2 ? "flex" : "none",
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
    </>
  );
};

export default Header;
