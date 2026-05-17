// TrainingMonitor.jsx
import { useEffect, useRef } from "react";
import { useTrainingStore } from "../stores/useTrainingStore";
import { supabase } from "../lib/supabasePoint";
import styles from "../styling/TrainingMonitor.module.css";

export default function TrainingMonitor({ trainingId }) {
  const model = useTrainingStore((s) => s.model);
  const setModel = useTrainingStore((s) => s.setModel);
  const rewardHistory = useTrainingStore((s) => s.rewardHistory);
  const pushReward = useTrainingStore((s) => s.pushReward);

  useEffect(() => {
    supabase
      .from("models")
      .select("*")
      .eq("training_id", trainingId)
      .single()
      .then(({ data }) => {
        if (data) {
          setModel(data);
          if (data.last_episode_reward != null) {
            pushReward({
              ep: data.current_episode,
              reward: data.last_episode_reward,
            });
          }
        }
      });

    const channel = supabase
      .channel(`model-${trainingId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "models",
          filter: `training_id=eq.${trainingId}`,
        },
        ({ new: row }) => {
          setModel(row);
          if (row.last_episode_reward != null) {
            pushReward({
              ep: row.current_episode,
              reward: row.last_episode_reward,
            });
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [trainingId]);

  if (!model) return <div className={styles.loading}>Loading...</div>;

  const smoothed = rewardHistory.length
    ? rewardHistory.slice(-10).reduce((a, b) => a + b.reward, 0) /
      Math.min(rewardHistory.length, 10)
    : null;

  const progress = model.total_timestep
    ? ((model.current_timestep / model.total_timestep) * 100).toFixed(1)
    : null;

  return (
    <div className={styles.page}>
      <Header model={model} />
      <MetricCards model={model} smoothed={smoothed} />
      <RewardChart history={rewardHistory} />
      <div className={styles.grid2}>
        <PPOLosses model={model} />
        <RolloutStats model={model} />
      </div>
      {progress && <ProgressBar model={model} progress={progress} />}
    </div>
  );
}

function Header({ model }) {
  const isLive = model.status === "training";
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{model.name ?? "Training run"}</h1>
        <p className={styles.meta}>
          {model.algorithm} · training_id: {model.training_id?.slice(0, 8)}…
        </p>
      </div>
      {isLive && (
        <span className={styles.livePill}>
          <span className={styles.liveDot} />
          Live
        </span>
      )}
    </div>
  );
}

function MetricCards({ model, smoothed }) {
  const cards = [
    {
      label: "Episode",
      value: model.current_episode?.toLocaleString() ?? "—",
      sub: "current",
    },
    { label: "Timesteps", value: fmtK(model.current_timestep), sub: "total" },
    {
      label: "Last reward",
      value: model.last_episode_reward?.toFixed(2) ?? "—",
      positive: true,
    },
    {
      label: "Smoothed reward",
      value: smoothed?.toFixed(2) ?? "—",
      sub: "10-ep avg",
    },
  ];
  return (
    <div className={styles.cards}>
      {cards.map((c) => (
        <div key={c.label} className={styles.card}>
          <p className={styles.cardLabel}>{c.label}</p>
          <p
            className={`${styles.cardValue} ${c.positive ? styles.positive : ""}`}
          >
            {c.value}
          </p>
          {c.sub && <p className={styles.cardSub}>{c.sub}</p>}
        </div>
      ))}
    </div>
  );
}

function RewardChart({ history }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!history.length || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const pad = { top: 12, bottom: 20, left: 32, right: 8 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    ctx.clearRect(0, 0, W, H);

    const rewards = history.map((h) => h.reward);
    const minR = Math.min(...rewards);
    const maxR = Math.max(...rewards);
    const range = maxR - minR || 1;

    const toX = (i) => pad.left + (i / Math.max(history.length - 1, 1)) * cW;
    const toY = (v) => pad.top + cH - ((v - minR) / range) * cH;

    // Grid lines
    ctx.strokeStyle = "rgba(128,128,128,0.12)";
    ctx.lineWidth = 0.5;
    [0, 0.5, 1].forEach((t) => {
      const y = pad.top + cH - t * cH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cW, y);
      ctx.stroke();
      ctx.fillStyle = "rgba(128,128,128,0.5)";
      ctx.font = "10px system-ui";
      ctx.fillText(Math.round(minR + t * range), 0, y + 3);
    });

    // Area fill
    ctx.beginPath();
    history.forEach((h, i) =>
      i === 0
        ? ctx.moveTo(toX(i), toY(h.reward))
        : ctx.lineTo(toX(i), toY(h.reward)),
    );
    ctx.lineTo(toX(history.length - 1), pad.top + cH);
    ctx.lineTo(pad.left, pad.top + cH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
    grad.addColorStop(0, "rgba(55,138,221,0.2)");
    grad.addColorStop(1, "rgba(55,138,221,0)");
    ctx.fillStyle = grad;
    ctx.fill();

    // Raw line
    ctx.beginPath();
    ctx.strokeStyle = "#378ADD";
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    history.forEach((h, i) =>
      i === 0
        ? ctx.moveTo(toX(i), toY(h.reward))
        : ctx.lineTo(toX(i), toY(h.reward)),
    );
    ctx.stroke();

    // Smoothed line
    if (history.length >= 3) {
      ctx.beginPath();
      ctx.strokeStyle = "#1D9E75";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      history.forEach((h, i) => {
        const slice = history.slice(Math.max(0, i - 9), i + 1);
        const avg = slice.reduce((a, b) => a + b.reward, 0) / slice.length;
        i === 0 ? ctx.moveTo(toX(i), toY(avg)) : ctx.lineTo(toX(i), toY(avg));
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [history]);

  return (
    <div className={styles.panel}>
      <p className={styles.panelTitle}>Reward over episodes</p>
      <canvas
        ref={canvasRef}
        width={620}
        height={140}
        className={styles.chart}
      />
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <div className={styles.legendLine} />
          <span className={styles.legendLabel}>Raw reward</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendLine} ${styles.legendDashed}`} />
          <span className={styles.legendLabel}>Smoothed (10-ep)</span>
        </div>
      </div>
    </div>
  );
}

function PPOLosses({ model }) {
  const rows = [
    ["Policy loss", model.policy_loss?.toFixed(4)],
    ["Value loss", model.value_loss?.toFixed(4)],
    ["Entropy loss", model.entropy_loss?.toFixed(4)],
    ["Approx KL", model.approx_kl?.toFixed(4)],
  ];
  return <StatPanel title="PPO losses" rows={rows} />;
}

function RolloutStats({ model }) {
  const rows = [
    ["Rollout #", model.rollout_count],
    ["Mean return", model.mean_return?.toFixed(2)],
    ["Mean value", model.mean_value?.toFixed(2)],
    ["Clip fraction", model.clip_fraction?.toFixed(4)],
    ["Explained Variance", model.explained_variance?.toFixed(4)],
    ["Episode Reward Mean", model.ep_rew_mean?.toFixed(4)],
    ["Episode Length Mean", model.ep_len_mean?.toFixed(4)],
  ];
  return <StatPanel title="Rollout stats" rows={rows} />;
}

function StatPanel({ title, rows }) {
  return (
    <div className={styles.panel}>
      <p className={styles.panelTitle}>{title}</p>
      {rows.map(([label, val]) => (
        <div key={label} className={styles.statRow}>
          <span className={styles.statLabel}>{label}</span>
          <span className={styles.statVal}>{val ?? "—"}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ model, progress }) {
  return (
    <div className={styles.panel}>
      <p className={styles.panelTitle}>Training progress</p>
      <div className={styles.progressHeader}>
        <span className={styles.statLabel}>Timesteps</span>
        <span className={styles.statVal}>
          {model.current_timestep?.toLocaleString()} /{" "}
          {model.total_timestep?.toLocaleString()}
        </span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className={styles.progressLabel}>{progress}% complete</p>
    </div>
  );
}

function fmtK(n) {
  if (n == null) return "—";
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();
}
