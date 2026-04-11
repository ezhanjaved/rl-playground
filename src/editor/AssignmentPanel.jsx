// Bind placeholders -> entities, fill params
import { useEffect, useState } from "react";
import "../styling/App.css";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useSceneStore } from "../stores/useSceneStore";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { trainingLoop } from "../engine/runtime/trainingLoop";
import { sendServer } from "../export/sendToServer";

export default function ControlPanel() {
  const [trainingConfig, setTrainingConfig] = useState({});
  const addDraftConfig = useSceneStore((s) => s.addDraftConfig);
  const { training, addExperiment, toggleTraining, togglePlaying, playing } =
    useRunTimeStore.getState();
  const [partOne, setOne] = useState({});
  const [partTwo, setTwo] = useState({});
  const [partThree, setThree] = useState({});
  const [algorithm, setAlgorithm] = useState("q-learning");

  useEffect(() => {
    setTrainingConfig({ ...partOne, ...partTwo, ...partThree });
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

  return (
    <>
      <div className="library_main">
        <TrainingSection
          setOne={setOne}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
        />
        {algorithm === "ppo" && <PPOSection setThree={setThree} />}
        <AdvanceSection setTwo={setTwo} />
        <div
          className="training-btn"
          style={{ display: "flex", flexDirection: "row", gap: "5px" }}
        >
          <button onClick={sendServer}>Export Env</button>
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

  const [episodeNumber, setEpisodeNumber] = useState(100);
  const [maxStepsPerEpisode, setMaxEpisodeSteps] = useState(1000);
  const [rewardImportance, setRewardImportance] = useState(0.5);
  const [explorationStrategy, setExplorationStrategy] = useState("fixed");
  const [learningSpeed, setLearningSpeed] = useState("Medium");

  useEffect(() => {
    setOne({
      episodeNumber,
      maxStepsPerEpisode,
      rewardImportance,
      algorithm,
      explorationStrategy,
      learningSpeed,
    });
  }, [
    episodeNumber,
    maxStepsPerEpisode,
    rewardImportance,
    algorithm,
    explorationStrategy,
    learningSpeed,
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
          <span>Training Setting</span>
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>
      {open && (
        <div className="setting">
          <label htmlFor="">Number of Episodes</label>
          <input
            type="number"
            value={episodeNumber}
            onChange={(e) => setEpisodeNumber(Number(e.target.value))}
          />
          <label htmlFor="">Max Steps Per Episode</label>
          <input
            type="number"
            value={maxStepsPerEpisode}
            onChange={(e) => setMaxEpisodeSteps(Number(e.target.value))}
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

const AdvanceSection = ({ setTwo }) => {
  const [open, setOpen] = useState(true);

  const [rewardMultiplier, setRewardMultiplier] = useState(1);
  const [agentSpawnMode, setAgentSpawnMode] = useState("Random");
  const [objectSpawnMode, setObjectSpawnMode] = useState("Random");
  const [typeOfTraining, setType] = useState("SARL");

  useEffect(() => {
    setTwo({
      rewardMultiplier,
      agentSpawnMode,
      objectSpawnMode,
      typeOfTraining,
    });
  }, [rewardMultiplier, agentSpawnMode, objectSpawnMode, typeOfTraining]);

  return (
    <div className="section">
      <button
        className="sectionHeader"
        style={{ background: "#e6e6e6" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoMoonOutline />
        <div className="sectionTitle">
          <span>Enviorment Setting</span>
          <span className="arrowIcon">
            {open ? <IoChevronUp /> : <IoChevronDown />}
          </span>
        </div>
      </button>
      {open && (
        <div className="setting">
          <label htmlFor="">Reward Multiplier</label>
          <input
            value={rewardMultiplier}
            type="number"
            onChange={(e) => setRewardMultiplier(Number(e.target.value))}
          />
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
          <label htmlFor="">Type of Training</label>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <label>
              <input
                checked={typeOfTraining === "SARL"}
                onChange={(e) => setType(e.target.value)}
                type="radio"
                value="SARL"
              />{" "}
              SARL{" "}
            </label>
            <label>
              <input
                checked={typeOfTraining === "MARL"}
                onChange={(e) => setType(e.target.value)}
                type="radio"
                value="MARL"
              />{" "}
              MARL{" "}
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

  useEffect(() => {
    setThree({ clipRange, gaeLambda, valLossCf, batch, epoch, n_steps });
  }, [clipRange, gaeLambda, valLossCf, batch, epoch, n_steps]);

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
        </div>
      )}
    </div>
  );
};
