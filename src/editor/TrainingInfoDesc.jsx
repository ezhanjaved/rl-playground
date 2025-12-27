import "../styling/App.css";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

export default function TrainingInfoDesc() {

  const selectedAgent = useRunTimeStore((s) => s.selectedAgent);
  const currentExperimentId = useRunTimeStore((s) => s.currentExperimentId);
  // const qTable = useRunTimeStore((s) => s.experiments?.[currentExperimentId]?.agents?.[selectedAgent]?.learningState?.qTable);
  const episodesInfo = useRunTimeStore((s) => s.experiments?.[currentExperimentId]?.agents?.[selectedAgent]?.telemetry?.episodesInfo);
  const qTable = useRunTimeStore((s) => s.experiments?.[currentExperimentId]?.agents?.[selectedAgent]?.learningState?.qTable) ?? {};
  
  if (!selectedAgent) {
    return <div>Select Agent</div>
  }

  if (!episodesInfo || Object.keys(episodesInfo).length === 0 || !selectedAgent) {
    return <div>No training data available yet</div>;
  }

  const chartData = Object?.values(episodesInfo) ?? {};
  const stateKeys = Object.keys(qTable) ?? null;

  return (
    <div className="training-info">
      <h2>Training Logs</h2>
      <h3>Episode Vs Reward Chart</h3>
      <span>The chart below shows how the agent fared in each episode by displaying the reward gathered per episode.</span>
      {chartData && (<RewardBarChart data={chartData} />)}
      <h3>Episode Vs Step Chart</h3>
      <span>The chart below shows how many steps were taken in a single episode. A lower step count indicates that the agent fared better in the episode, as it was terminated before reaching the step limit.</span>
      {chartData && (<StepLineChart data={chartData} />)}
      <h3>Episode Vs Epsilon Chart</h3>
      <span>The chart below shows how epsilon decayed throughout the training procedure. A lower epsilon value forces the agent to exploit its experience, whereas a higher value leads to more random exploration.</span>
      {chartData && (<EpsilonChart data={chartData} />)}
      <h3>QTable</h3>
      {stateKeys.length === 0 ? (
        <div>No QTable data yet</div>
      ) : (
        stateKeys.map((state, index) => (
          <div key={state ?? index} style={{ marginBottom: 12, padding: "20px" }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>State: {state}</div>
            <hr style={{width:"400px", height: "2px", marginBottom: "10px"}} />
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(qTable[state], null, 2)}
            </pre>
          </div>
        ))
      )}
    </div>
  );
}

function RewardBarChart({ data }) {
  return (
    <>
      <ResponsiveContainer className="charts-t" width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 3" />
          <XAxis dataKey={"episodeIndex"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"rewardSum"} fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

function EpsilonChart({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 3" />
          <XAxis dataKey={"episodeIndex"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"epsilon"} fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

function StepLineChart({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 3" />
          <XAxis dataKey={"episodeIndex"} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="stepTaken"
            stroke="#000"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}