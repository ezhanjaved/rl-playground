// Bind placeholders -> entities, fill params
import { useState } from "react";
import "../styling/App.css";
import { IoMoonOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useRunTimeStore } from "../stores/useRunTimeStore";

export function AssignmentPanel() {
    return (
        <>
            <div className="library_main">
                <TrainingSection />
                <AdvanceSection />
                <div className="training-btn" style={{display: "flex", flexDirection: "row", gap: "10px"}}><button>Export Env</button><button>Start Training</button></div>
            </div>
        </>
    )
}

const TrainingSection = () => {
    const [open, setOpen] = useState(true);
    
    const episodeNumber = useRunTimeStore((state) => state.episodeNumber);
    const maxStepsPerEpisode = useRunTimeStore((state) => state.maxStepsPerEpisode);
    const rewardImportance = useRunTimeStore((state) => state.rewardImportance);
    const algorithm = useRunTimeStore((state) => state.algorithm);
    const explorationStrategy = useRunTimeStore((state) => state.explorationStrategy);
    const learningSpeed = useRunTimeStore((state) => state.learningSpeed);

    const setEpisodeNumber = useRunTimeStore((state) => state.setEpisodeNumber);
    const setMaxEpisodeSteps = useRunTimeStore((state) => state.setMaxEpisodeSteps);
    const setRewardImportance = useRunTimeStore((state) => state.setRewardImportance);
    const setAlgorithm = useRunTimeStore((state) => state.setAlgorithm);
    const setExplorationStrategy = useRunTimeStore((state) => state.setExplorationStrategy);
    const setLearningSpeed = useRunTimeStore((state) => state.setLearningSpeed);
 
    return (
        <div className="section">
            <button className="sectionHeader" style={{ background: "#e6e6e6" }} onClick={(() => setOpen(prev => !prev))}>
                <IoMoonOutline />
                <div className="sectionTitle">
                    <span>Training Setting</span>
                    <span className="arrowIcon">{open ? <IoChevronUp /> : <IoChevronDown />}</span>
                </div>
            </button>
            {open && (
                <div className="setting">
                    <label htmlFor="">Number of Episodes</label>
                    <input type="number" value={episodeNumber} onChange={(e) => setEpisodeNumber(Number(e.target.value))} />
                    <label htmlFor="">Max Steps Per Episode</label>
                    <input type="number" value={maxStepsPerEpisode} onChange={(e) => setMaxEpisodeSteps(Number(e.target.value))} />
                    <label htmlFor="">Future Reward Importance</label>
                    <input type="number" value={rewardImportance} onChange={(e) => setRewardImportance(Number(e.target.value))} />
                    <label htmlFor="">Algorithm</label>
                    <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} name="algo" id="algo">
                        <option value="q-learning">Q Learning</option>
                        <option value="ppo">PPO</option>
                    </select>
                    <label htmlFor="">Exploration Strategy</label>
                    <select value={explorationStrategy} onChange={(e) => setExplorationStrategy(e.target.value)} name="exploration" id="exploration">
                        <option value="fixed">Fixed</option>
                        <option value="decay">Decay</option>
                        <option value="none">None</option>
                    </select>
                    <label htmlFor="">Learning Speed</label>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <label><input checked={learningSpeed === "Slow"} onChange={(e) => setLearningSpeed(e.target.value)} type="radio" value="Slow" /> Slow </label>
                        <label><input checked={learningSpeed === "Medium"} onChange={(e) => setLearningSpeed(e.target.value)} type="radio" value="Medium" /> Medium </label>
                        <label><input checked={learningSpeed === "Fast"} onChange={(e) => setLearningSpeed(e.target.value)} type="radio" value="Fast" /> Fast </label>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdvanceSection = () => {
    const [open, setOpen] = useState(true);

    const rewardMultiplier = useRunTimeStore((state) => state.rewardMultiplier);
    const setRewardMultiplier = useRunTimeStore((state) => state.setRewardMultiplier);
    
    const agentSpawnMode = useRunTimeStore((state) => state.agentSpawnMode);
    const setAgentSpawnMode = useRunTimeStore((state) => state.setAgentSpawnMode);

    const objectSpawnMode = useRunTimeStore((state) => state.objectSpawnMode);
    const setObjectSpawnMode = useRunTimeStore((state) => state.setObjectSpawnMode);

    return (
        <div className="section">
            <button className="sectionHeader" style={{ background: "#e6e6e6" }} onClick={(() => setOpen(prev => !prev))}>
                <IoMoonOutline />
                <div className="sectionTitle">
                    <span>Enviorment Setting</span>
                    <span className="arrowIcon">{open ? <IoChevronUp /> : <IoChevronDown />}</span>
                </div>
            </button>
            {open && (
                <div className="setting">
                    <label htmlFor="">Reward Multiplier</label>
                    <input value={rewardMultiplier} type="number" onChange={(e) => setRewardMultiplier(Number(e.target.value))} />
                    <label htmlFor="">Agent Spawn Mode</label>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <label><input checked={agentSpawnMode === "Random"} onChange={(e) => setAgentSpawnMode(e.target.value)} type="radio" value="Random" /> Random </label>
                        <label><input checked={agentSpawnMode === "Fixed"} onChange={(e) => setAgentSpawnMode(e.target.value)} type="radio" value="Fixed" /> Fixed </label>
                    </div>
                    <label htmlFor="">Object Spawn Mode</label>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <label><input checked={objectSpawnMode === "Random"} onChange={(e) => setObjectSpawnMode(e.target.value)} type="radio" value="Random" /> Random </label>
                        <label><input checked={objectSpawnMode === "Fixed"} onChange={(e) => setObjectSpawnMode(e.target.value)} type="radio" value="Fixed" /> Fixed </label>
                    </div>
                </div>
            )}
        </div>
    );
};