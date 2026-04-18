import "../styling/App.css";
import { useRunTimeStore } from "../stores/useRunTimeStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";

const ACCENT_BLUE = "#2563eb";
const ACCENT_TEAL = "#0ea5e9";
const ACCENT_GREEN = "#10b981";
const ACCENT_PURP = "#7c3aed";
const GRID_COLOR = "#f1f5f9";
const AXIS_COLOR = "#9ca3af";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "8px 12px",
        fontFamily: "inherit",
        fontSize: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ color: "#9ca3af", marginBottom: 4, fontSize: 11 }}>
        Episode {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: p.color,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#6b7280" }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: "#111" }}>
            {typeof p.value === "number" ? p.value.toFixed(3) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#9ca3af",
        marginBottom: 10,
        marginTop: 28,
      }}
    >
      {children}
    </div>
  );
}

function ChartCard({ title, description, children, accentColor }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: "18px 20px 12px",
        marginBottom: 14,
      }}
    >
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 3,
            height: 34,
            background: accentColor,
            borderRadius: 2,
            flexShrink: 0,
            marginTop: 2,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#111",
              marginBottom: 3,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#9ca3af",
              lineHeight: 1.55,
              maxWidth: 520,
            }}
          >
            {description}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function TrainingInfoDesc() {
  const selectedAgent = useRunTimeStore((s) => s.selectedAgent);
  const currentExperimentId = useRunTimeStore((s) => s.currentExperimentId);
  const episodesInfo = useRunTimeStore(
    (s) =>
      s.experiments?.[currentExperimentId]?.agents?.[selectedAgent]?.telemetry
        ?.episodesInfo,
  );
  const qTable =
    useRunTimeStore(
      (s) =>
        s.experiments?.[currentExperimentId]?.agents?.[selectedAgent]
          ?.learningState?.qTable,
    ) ?? {};

  if (!selectedAgent) {
    return (
      <div style={emptyStyle}>
        <div style={{ fontSize: 32, marginBottom: 10, color: "#d1d5db" }}>
          ◎
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>
          Select an agent to inspect training logs
        </div>
      </div>
    );
  }

  if (!episodesInfo || Object.keys(episodesInfo).length === 0) {
    return (
      <div style={emptyStyle}>
        <div style={{ fontSize: 32, marginBottom: 10, color: "#d1d5db" }}>
          ◌
        </div>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>
          No training data available yet
        </div>
      </div>
    );
  }

  const chartData = Object.values(episodesInfo);
  const stateKeys = Object.keys(qTable);
  const avgReward = chartData.length
    ? (
        chartData.reduce((s, d) => s + (d.rewardSum ?? 0), 0) / chartData.length
      ).toFixed(2)
    : "—";
  const lastEps = chartData.length
    ? chartData[chartData.length - 1]?.epsilon?.toFixed(4)
    : "—";

  return (
    <div style={pageStyle}>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 4,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#111",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Training Logs
          </h2>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: ACCENT_PURP,
              background: "#ede9fe",
              padding: "2px 10px",
              borderRadius: 20,
              letterSpacing: "0.02em",
            }}
          >
            {selectedAgent}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          Q-Learning · episode telemetry
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 10,
          marginBottom: 28,
        }}
      >
        {[
          { label: "Episodes", value: chartData.length, color: ACCENT_BLUE },
          { label: "Avg Reward", value: avgReward, color: ACCENT_TEAL },
          { label: "Final ε", value: lastEps, color: ACCENT_GREEN },
          { label: "States", value: stateKeys.length, color: ACCENT_PURP },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: "12px 16px",
              borderTop: `3px solid ${color}`,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#9ca3af",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#111",
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Reward</SectionTitle>
      <ChartCard
        title="Episode vs Reward"
        description="Cumulative reward gathered per episode. Higher bars indicate the agent performed better."
        accentColor={ACCENT_TEAL}
      >
        <RewardBarChart data={chartData} />
      </ChartCard>

      <SectionTitle>Step Efficiency</SectionTitle>
      <ChartCard
        title="Episode vs Steps Taken"
        description="Steps taken per episode. Fewer steps = better — the agent reached its goal before hitting the step limit."
        accentColor={ACCENT_BLUE}
      >
        <StepLineChart data={chartData} />
      </ChartCard>

      <SectionTitle>Exploration Decay</SectionTitle>
      <ChartCard
        title="Episode vs Epsilon (ε)"
        description="Epsilon decay over training. High ε = random exploration. Low ε = learned exploitation of the Q-table."
        accentColor={ACCENT_GREEN}
      >
        <EpsilonChart data={chartData} />
      </ChartCard>

      <SectionTitle>Q-Table</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        {stateKeys.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 24,
              color: "#9ca3af",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            No Q-table data yet
          </div>
        ) : (
          stateKeys.map((state, index) => (
            <QTableRow
              key={state ?? index}
              state={state}
              actions={qTable[state]}
            />
          ))
        )}
      </div>
    </div>
  );
}

function QTableRow({ state, actions }) {
  const entries =
    typeof actions === "object" && actions !== null
      ? Object.entries(actions)
      : [];

  const values = entries.map(([, v]) => (typeof v === "number" ? v : 0));
  const max = values.length ? Math.max(...values) : 0;
  const min = values.length ? Math.min(...values) : 0;
  const range = max - min || 1;

  const getColor = (v) => {
    const t = (v - min) / range;
    if (t > 0.66) return ACCENT_GREEN;
    if (t > 0.33) return ACCENT_TEAL;
    return "#d1d5db";
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        marginBottom: 8,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "9px 16px",
          background: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#9ca3af",
            letterSpacing: "0.1em",
          }}
        >
          STATE
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: ACCENT_PURP,
            background: "#ede9fe",
            padding: "1px 8px",
            borderRadius: 4,
            wordBreak: "break-all",
          }}
        >
          {state}
        </span>
      </div>

      {entries.length > 0 ? (
        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          {entries.map(([action, value]) => {
            const numVal = typeof value === "number" ? value : 0;
            const pct = Math.max(
              0,
              Math.min(100, ((numVal - min) / range) * 100),
            );
            const isBest = numVal === max;
            return (
              <div
                key={action}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div
                  style={{
                    width: 80,
                    fontSize: 12,
                    fontFamily: "monospace",
                    color: isBest ? "#111" : "#6b7280",
                    fontWeight: isBest ? 700 : 400,
                    flexShrink: 0,
                    textAlign: "right",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 4,
                  }}
                >
                  {isBest && (
                    <span
                      style={{
                        fontSize: 8,
                        background: ACCENT_GREEN,
                        color: "#fff",
                        borderRadius: 4,
                        padding: "1px 2px",
                        fontFamily: "sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      BEST
                    </span>
                  )}
                  {action}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 7,
                    background: "#f1f5f9",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: getColor(numVal),
                      borderRadius: 4,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 72,
                    textAlign: "right",
                    fontSize: 12,
                    fontFamily: "monospace",
                    fontWeight: isBest ? 700 : 400,
                    color: isBest ? ACCENT_BLUE : "#6b7280",
                  }}
                >
                  {numVal.toFixed(4)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ padding: "12px 16px" }}>
          <pre
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#6b7280",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {JSON.stringify(actions, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

function RewardBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={GRID_COLOR} />
        <XAxis
          dataKey="episodeIndex"
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(0,0,0,0.02)" }}
        />
        <ReferenceLine y={0} stroke="#e5e7eb" />
        <Bar
          dataKey="rewardSum"
          name="reward"
          fill={ACCENT_TEAL}
          radius={[3, 3, 0, 0]}
          maxBarSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function StepLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke={GRID_COLOR} />
        <XAxis
          dataKey="episodeIndex"
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb" }} />
        <Line
          type="monotone"
          dataKey="stepTaken"
          name="steps"
          stroke={ACCENT_BLUE}
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 4,
            fill: ACCENT_BLUE,
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function EpsilonChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke={GRID_COLOR} />
        <XAxis
          dataKey="episodeIndex"
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 1]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb" }} />
        <Line
          type="monotone"
          dataKey="epsilon"
          name="ε"
          stroke={ACCENT_GREEN}
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 4,
            fill: ACCENT_GREEN,
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const pageStyle = {
  padding: "28px 32px",
  background: "#f9fafb",
  fontFamily: "inherit",
  color: "#111",
  gridArea: "main",
};

const emptyStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#f9fafb",
  gridArea: "main",
};
