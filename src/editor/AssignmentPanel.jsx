// Bind placeholders -> entities, fill params
import { useEffect, useState } from "react";
import "../styling/App.css";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { trainingLoop } from "../engine/runtime/trainingLoop";
import { sendServer } from "../export/sendToServer";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalBoxStyle = {
  background: "#fff",
  borderRadius: "10px",
  padding: "28px 32px",
  maxWidth: "380px",
  width: "90%",
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const modalTitleStyle = {
  margin: 0,
  fontSize: "16px",
  fontWeight: 700,
  color: "#1a1a1a",
};

const modalBodyStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#444",
  lineHeight: 1.55,
};

const modalActionsStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  justifyContent: "flex-end",
};

const btnSecondaryStyle = {
  padding: "7px 18px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 600,
};

const btnPrimaryStyle = {
  padding: "7px 18px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 600,
};

const ConfirmModal = ({ onConfirm, onCancel }) => (
  <div style={modalOverlayStyle}>
    <div style={modalBoxStyle}>
      <p style={modalTitleStyle}>Start Training Job?</p>
      <p style={modalBodyStyle}>
        You are about to export this environment and queue a training job on the
        server. Training can take <strong>several hours</strong> to complete
        depending on your configuration.
      </p>
      <div style={modalActionsStyle}>
        <button style={btnSecondaryStyle} onClick={onCancel}>
          No
        </button>
        <button style={btnPrimaryStyle} onClick={onConfirm}>
          Yes, Export
        </button>
      </div>
    </div>
  </div>
);

const SuccessModal = ({ onClose }) => (
  <div style={modalOverlayStyle}>
    <div style={modalBoxStyle}>
      <p style={modalTitleStyle}>Job Queued 🎉</p>
      <p style={modalBodyStyle}>
        Your training job has been successfully queued. Head to the{" "}
        <strong>Records</strong> page to monitor its status and view results
        once it completes.
      </p>
      <div style={modalActionsStyle}>
        <button style={btnPrimaryStyle} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  </div>
);

export default function ControlPanel() {
  const [trainingConfig, setTrainingConfig] = useState({});
  const addDraftConfig = useSceneStore((s) => s.addDraftConfig);
  const { training, addExperiment, toggleTraining, togglePlaying, playing } =
    useRunTimeStore.getState();
  const [partOne, setOne] = useState({});
  const [partTwo, setTwo] = useState({});
  const [partThree, setThree] = useState({});

  const [algorithm, setAlgorithm] = useState("q-learning");

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (algorithm === "ppo") {
      setTrainingConfig({ ...partOne, ...partThree });
    }
    if (algorithm === "q-learning") {
      setTrainingConfig({ ...partOne, ...partTwo });
    }
  }, [partOne, partTwo, partThree]);

  const nextFrame = () => new Promise(requestAnimationFrame);

  async function waitForWorldAndBodies() {
    while (!useSceneStore.getState().worldMounted) {
      await nextFrame();
    }

    while (true) {
      const { bodies, assignments } = useSceneStore.getState();
      const agentIds = Object.keys(assignments);

      if (agentIds.length > 0 && agentIds.every((id) => bodies[id])) return;
      await nextFrame();
    }
  }

  const startTraining = async () => {
    if (playing) togglePlaying();
    const expId = addExperiment();
    if (!training) toggleTraining();
    await waitForWorldAndBodies();
    await trainingLoop(expId);
  };

  const handleExportConfirm = async () => {
    setShowConfirm(false);
    setExporting(true);
    try {
      await sendServer();
      setShowSuccess(true);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmModal
          onConfirm={handleExportConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <div className="library_main">
        <TrainingSection
          setOne={setOne}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        />
        {algorithm === "q-learning" && <QLearningSection setTwo={setTwo} />}
        {algorithm === "ppo" && <PPOSection setThree={setThree} />}
        <div
          className="training-btn"
          style={{ display: "flex", flexDirection: "row", gap: "5px" }}
        >
          <button onClick={() => setShowConfirm(true)} disabled={exporting}>
            {exporting ? "Exporting…" : "Export Env"}
          </button>
          <button onClick={() => addDraftConfig(trainingConfig)}>
            Update Config
          </button>
          <button onClick={() => startTraining()}>Start Training</button>
        </div>
      </div>
    </>
  );
}

const TrainingSection = ({ setOne, algorithm, setAlgorithm }) => {
  const [open, setOpen] = useState(true);

  const [rewardImportance, setRewardImportance] = useState(0.5);
  const [learningSpeed, setLearningSpeed] = useState("Medium");
  const [rewardMultiplier, setRewardMultiplier] = useState(1);
  const { modelName, setModelName, envType, setEnvType } = useRunTimeStore();

  useEffect(() => {
    setOne({
      rewardImportance,
      algorithm,
      learningSpeed,
      rewardMultiplier,
    });
  }, [rewardImportance, algorithm, learningSpeed, rewardMultiplier]);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{ background: "#e6e6e6" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoMoonOutline />
        <div className="sectionTitle">
          <span>Training Setting</span>
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>
      {open && (
        <div className="setting">
          <label htmlFor="">Name of Model</label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
          <label htmlFor="">Future Reward Importance</label>
          <input
            type="number"
            value={rewardImportance}
            onChange={(e) => setRewardImportance(Number(e.target.value))}
          />
          <label htmlFor="">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            name="algo"
            id="algo"
          >
            <option value="q-learning">Q Learning</option>
            <option value="ppo">PPO</option>
          </select>
          <label htmlFor="">Reward Multiplier</label>
          <input
            value={rewardMultiplier}
            type="number"
            onChange={(e) => setRewardMultiplier(Number(e.target.value))}
          />
          <label htmlFor="">Type of Training</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label>
              <input
                checked={envType === "SARL"}
                onChange={(e) => setEnvType(e.target.value)}
                type="radio"
                value="SARL"
              />{" "}
              SARL{" "}
            </label>
            <label>
              <input
                checked={envType === "MARL"}
                onChange={(e) => setEnvType(e.target.value)}
                type="radio"
                value="MARL"
              />{" "}
              MARL{" "}
            </label>
          </div>
          <label htmlFor="">Learning Rate</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label>
              <input
                checked={learningSpeed === "Slow"}
                onChange={(e) => setLearningSpeed(e.target.value)}
                type="radio"
                value="Slow"
              />{" "}
              Slow{" "}
            </label>
            <label>
              <input
                checked={learningSpeed === "Medium"}
                onChange={(e) => setLearningSpeed(e.target.value)}
                type="radio"
                value="Medium"
              />{" "}
              Medium{" "}
            </label>
            <label>
              <input
                checked={learningSpeed === "Fast"}
                onChange={(e) => setLearningSpeed(e.target.value)}
                type="radio"
                value="Fast"
              />{" "}
              Fast{" "}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

const QLearningSection = ({ setTwo }) => {
  const [open, setOpen] = useState(true);

  const [episodeNumber, setEpisodeNumber] = useState(100);
  const [maxStepsPerEpisode, setMaxEpisodeSteps] = useState(1000);
  const [agentSpawnMode, setAgentSpawnMode] = useState("Random");
  const [objectSpawnMode, setObjectSpawnMode] = useState("Random");
  const [explorationStrategy, setExplorationStrategy] = useState("fixed");

  useEffect(() => {
    setTwo({
      episodeNumber,
      maxStepsPerEpisode,
      agentSpawnMode,
      objectSpawnMode,
      explorationStrategy,
    });
  }, [
    episodeNumber,
    maxStepsPerEpisode,
    agentSpawnMode,
    objectSpawnMode,
    explorationStrategy,
  ]);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{ background: "#e6e6e6" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoMoonOutline />
        <div className="sectionTitle">
          <span>Q Learning Settings</span>
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>
      {open && (
        <div className="setting">
          <label htmlFor="">Episode Number</label>
          <input
            type="number"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(Number(e.target.value))}
          />
          <label htmlFor="">Max Step In Episode</label>
          <input
            type="number"
            value={maxStepsPerEpisode}
            onChange={(e) => setMaxEpisodeSteps(Number(e.target.value))}
          />
          <label htmlFor="">Entropy Coefficient</label>
          <select
            value={explorationStrategy}
            onChange={(e) => setExplorationStrategy(e.target.value)}
            name="exploration"
            id="exploration"
          >
            <option value="fixed">Fixed</option>
            <option value="decay">Decay</option>
            <option value="none">None</option>
          </select>
          <label htmlFor="">Agent Spawn Mode</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label>
              <input
                checked={agentSpawnMode === "Random"}
                onChange={(e) => setAgentSpawnMode(e.target.value)}
                type="radio"
                value="Random"
              />{" "}
              Random{" "}
            </label>
            <label>
              <input
                checked={agentSpawnMode === "Fixed"}
                onChange={(e) => setAgentSpawnMode(e.target.value)}
                type="radio"
                value="Fixed"
              />{" "}
              Fixed{" "}
            </label>
          </div>
          <label htmlFor="">Object Spawn Mode</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label>
              <input
                checked={objectSpawnMode === "Random"}
                onChange={(e) => setObjectSpawnMode(e.target.value)}
                type="radio"
                value="Random"
              />{" "}
              Random{" "}
            </label>
            <label>
              <input
                checked={objectSpawnMode === "Fixed"}
                onChange={(e) => setObjectSpawnMode(e.target.value)}
                type="radio"
                value="Fixed"
              />{" "}
              Fixed{" "}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

const PPOSection = ({ setThree }) => {
  const [open, setOpen] = useState(true);

  const [clipRange, setClipRange] = useState(0.2);
  const [gaeLambda, setGAElambda] = useState(0.95);
  const [valLossCf, setVLcf] = useState(0.5);
  const [batch, setBatch] = useState(64);
  const [epoch, setEpoch] = useState(10);
  const [n_steps, setnSteps] = useState(2048);
  const [timesteps, setTimesteps] = useState(1000000);
  const [kl, setKL] = useState(0.03);
  const [ent_coeff, setEntCf] = useState(0.01);
  const {
    setEnvMode,
    envMode,
    setTimestep,
    percentageFixedEp,
    setPercentageFixed,
    topographyMode,
    setTopographyMode,
  } = useRunTimeStore.getState();

  useEffect(() => {
    setThree({
      timesteps,
      clipRange,
      gaeLambda,
      valLossCf,
      batch,
      epoch,
      n_steps,
      kl,
      ent_coeff,
    });
  }, [
    timesteps,
    clipRange,
    gaeLambda,
    valLossCf,
    batch,
    epoch,
    n_steps,
    kl,
    ent_coeff,
  ]);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{ background: "#e6e6e6" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoMoonOutline />
        <div className="sectionTitle">
          <span>PPO Specific Settings</span>
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>
      {open && (
        <div className="setting">
          <label htmlFor="">Timesteps</label>
          <input
            value={timesteps}
            type="number"
            onChange={(e) => {
              setTimesteps(Number(e.target.value));
              setTimestep(Number(e.target.value));
            }}
          />
          <label htmlFor="">Clip Range</label>
          <input
            value={clipRange}
            type="number"
            onChange={(e) => setClipRange(Number(e.target.value))}
          />
          <label htmlFor="">GAE Lambda</label>
          <input
            value={gaeLambda}
            type="number"
            onChange={(e) => setGAElambda(Number(e.target.value))}
          />
          <label htmlFor="">Value Loss Coefficient</label>
          <input
            value={valLossCf}
            type="number"
            onChange={(e) => setVLcf(Number(e.target.value))}
          />
          <label htmlFor="">Batch Size</label>
          <input
            value={batch}
            type="number"
            onChange={(e) => setBatch(Number(e.target.value))}
          />
          <label htmlFor="">Number of Epochs</label>
          <input
            value={epoch}
            type="number"
            onChange={(e) => setEpoch(Number(e.target.value))}
          />
          <label htmlFor="">Number of Steps</label>
          <input
            value={n_steps}
            type="number"
            onChange={(e) => setnSteps(Number(e.target.value))}
          />
          <label htmlFor="">Target KL</label>
          <input
            value={kl}
            type="number"
            onChange={(e) => setKL(Number(e.target.value))}
          />
          <label htmlFor="">Entropy Coefficient</label>
          <input
            value={ent_coeff}
            type="number"
            onChange={(e) => setEntCf(Number(e.target.value))}
          />
          {envMode === "Curriculum" && (
            <>
              <label htmlFor="">Fixed Episodes %</label>
              <input
                value={percentageFixedEp}
                type="number"
                onChange={(e) => setPercentageFixed(Number(e.target.value))}
              />
            </>
          )}
          {envMode != "Fixed" && (
            <>
              <label htmlFor="">Topography Mode</label>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <label>
                  <input
                    checked={topographyMode === "True"}
                    onChange={(e) => setTopographyMode(e.target.value)}
                    type="radio"
                    value="True"
                  />{" "}
                  True{" "}
                </label>
                <label>
                  <input
                    checked={topographyMode === "False"}
                    onChange={(e) => setTopographyMode(e.target.value)}
                    type="radio"
                    value="False"
                  />{" "}
                  False{" "}
                </label>
              </div>
            </>
          )}
          <label htmlFor="">Spawn Mode</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label>
              <input
                checked={envMode === "Fixed"}
                onChange={(e) => setEnvMode(e.target.value)}
                type="radio"
                value="Fixed"
              />{" "}
              Fixed{" "}
            </label>
            <label>
              <input
                checked={envMode === "Random"}
                onChange={(e) => setEnvMode(e.target.value)}
                type="radio"
                value="Random"
              />{" "}
              Random{" "}
            </label>
            <label>
              <input
                checked={envMode === "Curriculum"}
                onChange={(e) => setEnvMode(e.target.value)}
                type="radio"
                value="Curriculum"
              />{" "}
              Curriculum{" "}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
