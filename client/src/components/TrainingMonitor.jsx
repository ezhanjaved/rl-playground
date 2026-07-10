// TrainingMonitor.jsx
import { useEffect, useRef, useState } from "react";
import { useTrainingStore } from "../stores/useTrainingStore";
import { useAuthStore } from "../stores/useAuthStore";
import { supabase } from "../lib/supabasePoint";
import { importConfig, changeConfig } from "../export/changeConfig";
import styles from "../styling/TrainingMonitor.module.css";
import "../styling/UpdateConfigModal.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchDownloadLinks(trainingId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/model/download-links?uid=${trainingId}`,
  );
  return res.json();
}

async function kill_training(trainingId, mode) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/trainer/kill-training`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { model_uid: trainingId, mode: mode },
    },
  );
  return res.json();
}

async function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  await sleep(300);
  document.body.removeChild(a);
}

async function uploadCheckpoint(trainingId, file, type, resumedTimesteps) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/model/upload-checkpoint?uid=${trainingId}&file_type=${type}&resumed_timesteps=${resumedTimesteps}`,
    { method: "POST", body: form },
  );
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

function RestoreModal({ model, onConfirm, onCancel }) {
  const [timesteps, setTimesteps] = useState("");
  const parsed = parseInt(timesteps.replace(/[^0-9]/g, ""), 10);
  const valid = !isNaN(parsed) && parsed > 0;

  return (
    <div className="modalOverlay" onDoubleClick={onCancel}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <h2 className="modalTitle">Restore Checkpoint</h2>

        <p className="modalText">
          Select the <strong>.zip</strong> and optionally the{" "}
          <strong>.pkl</strong> files you downloaded. Then enter the timestep
          this checkpoint belongs to — this will be used to correctly resume
          training.
        </p>

        <p className="modalSubText">
          You can find this in the filename or from the training monitor at the
          time of download.
        </p>

        <input
          className="modalInput" // add this style to UpdateConfigModal.css
          type="text"
          placeholder="e.g. 1500000"
          value={timesteps}
          onChange={(e) => setTimesteps(e.target.value)}
        />
        {timesteps && !valid && (
          <p className="modalError">Please enter a valid timestep number.</p>
        )}

        <div className="buttonRow">
          <button className="cancelBtn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="confirmBtn"
            disabled={!valid}
            onClick={() => onConfirm(parsed)}
          >
            Select Files & Upload
          </button>
        </div>
      </div>
    </div>
  );
}

function UpdateConfigModal({ setModal, model }) {
  const setEnvPer = useAuthStore((s) => s.setEnvPer);
  const setGraphPer = useAuthStore((s) => s.setGraphPer);
  const setConfigPer = useAuthStore((s) => s.setConfigPer);

  const [permissions, setPermissions] = useState({
    env: false,
    graph: false,
    config: false,
  });

  const togglePermission = (key) => {
    const newValue = !permissions[key];

    setPermissions((prev) => ({
      ...prev,
      [key]: newValue,
    }));

    if (key === "env") setEnvPer(newValue);
    if (key === "graph") setGraphPer(newValue);
    if (key === "config") setConfigPer(newValue);
  };

  const hasSelection =
    permissions.env || permissions.graph || permissions.config;

  return (
    <div className="modalOverlay" onDoubleClick={() => setModal(false)}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <h2 className="modalTitle">Update Configuration</h2>

        <p className="modalText">
          You are about to overwrite the model configuration. Only do that when
          you want to change <strong>behavior</strong> of the policy.
        </p>

        <strong className="modalText">
          Wrong addition/subtraction especially in Environment can break the
          trained policy weights!
        </strong>

        <p className="modalSubText">
          Select which permissions you want to overwrite:
        </p>

        <div className="permissionList">
          <label className="permissionItem">
            <input
              type="checkbox"
              checked={permissions.env}
              onChange={() => togglePermission("env")}
            />
            Environment Permission
          </label>

          <label className="permissionItem">
            <input
              type="checkbox"
              checked={permissions.graph}
              onChange={() => togglePermission("graph")}
            />
            Graph Permission
          </label>

          <label className="permissionItem">
            <input
              type="checkbox"
              checked={permissions.config}
              onChange={() => togglePermission("config")}
            />
            Configuration Permission
          </label>
        </div>

        <div className="buttonRow">
          <button className="cancelBtn" onClick={() => setModal(false)}>
            Cancel
          </button>

          <button
            className="confirmBtn"
            disabled={!hasSelection}
            onClick={() => {
              changeConfig(model?.training_id);
              setModal(false);
            }}
          >
            Update Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

function KillModal({ setModal, model }) {
  const [mode, setMode] = useState("new");
  return (
    <div className="modalOverlay" onDoubleClick={() => setModal(false)}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <h2 className="modalTitle">Kill Training</h2>

        <p className="modalText">
          You are about to kill the training run. Only do that when you are sure
          you want to stop.
        </p>

        <p className="modalSubText">
          Select nature of training (ex: first run so pick new)
        </p>

        <div className="permissionList">
          <label className="permissionItem">
            <input
              type="radio"
              name="trainingMode"
              checked={mode === "re-run"}
              onChange={() => setMode("re-run")}
            />
            Resumption
          </label>

          <label className="permissionItem">
            <input
              type="radio"
              name="trainingMode"
              checked={mode === "new"}
              onChange={() => setMode("new")}
            />
            First Run
          </label>
        </div>

        <div className="buttonRow">
          <button className="cancelBtn" onClick={() => setModal(false)}>
            Cancel
          </button>

          <button
            className="confirmBtn"
            onClick={() => {
              kill_training(model?.training_id, mode);
              setModal(false);
            }}
          >
            Kill Training
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrainingMonitor({ trainingId }) {
  const [modal, setModal] = useState(false);
  const [Kmodal, setKModal] = useState(false);
  const model = useTrainingStore((s) => s.model);
  const setModel = useTrainingStore((s) => s.setModel);
  const rewardHistory = useTrainingStore((s) => s.rewardHistory);
  const setRewardHistory = useTrainingStore((s) => s.setRewardHistory);
  const epRewMeanHistory = useTrainingStore((s) => s.epRewMeanHistory);
  const setEpRewMeanHistory = useTrainingStore((s) => s.setEpRewMeanHistory);
  const epLenMeanHistory = useTrainingStore((s) => s.epLenMeanHistory);
  const setEpLenMeanHistory = useTrainingStore((s) => s.setEpLenMeanHistory);
  const shapingTerminalHistory = useTrainingStore(
    (s) => s.shapingTerminalHistory,
  );
  const setShapingTerminalHistory = useTrainingStore(
    (s) => s.setShapingTerminalHistory,
  );

  useEffect(() => {
    supabase
      .from("models")
      .select("*")
      .eq("training_id", trainingId)
      .single()
      .then(({ data }) => {
        if (data) {
          setModel(data);
          if (Array.isArray(data.reward_history))
            setRewardHistory(data.reward_history);
          if (Array.isArray(data.ep_rew_mean_history))
            setEpRewMeanHistory(data.ep_rew_mean_history);
          if (Array.isArray(data.ep_len_mean_history))
            setEpLenMeanHistory(data.ep_len_mean_history);
          if (Array.isArray(data.shaping_terminal_history))
            setShapingTerminalHistory(data.shaping_terminal_history);
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
          if (Array.isArray(row.reward_history))
            setRewardHistory(row.reward_history);
          if (Array.isArray(row.ep_rew_mean_history))
            setEpRewMeanHistory(row.ep_rew_mean_history);
          if (Array.isArray(row.ep_len_mean_history))
            setEpLenMeanHistory(row.ep_len_mean_history);
          if (Array.isArray(row.shaping_terminal_history))
            setShapingTerminalHistory(row.shaping_terminal_history);
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
      {modal && <UpdateConfigModal setModal={setModal} model={model} />}
      {Kmodal && <KillModal setModal={setKModal} model={model} />}
      <Header model={model} setModal={setModal} setKModal={setKModal} />
      <MetricCards
        model={model}
        smoothed={smoothed}
        rewardHistory={rewardHistory}
      />
      <RewardChart history={rewardHistory} />
      <div className={styles.grid2}>
        <EpRewMeanChart history={epRewMeanHistory} />
        <EpLenMeanChart history={epLenMeanHistory} />
      </div>
      <ShapingTerminalChart history={shapingTerminalHistory} />
      <div className={styles.grid2}>
        <PPOLosses model={model} />
        <RolloutStats
          model={model}
          epRewMeanHistory={epRewMeanHistory}
          epLenMeanHistory={epLenMeanHistory}
        />
      </div>
      {progress && <ProgressBar model={model} progress={progress} />}
    </div>
  );
}

function Header({ model, setModal, setKModal }) {
  const isLive = model.status === "training";
  const isDisabled = !model?.training_id || isLive;

  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);
  const fileInputRef = useRef(null);
  const pendingTimesteps = useRef(null);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { models: modelUrl, norms: normUrl } = await fetchDownloadLinks(
        model.training_id,
      );
      if (modelUrl) {
        await triggerDownload(modelUrl, `model_${model.training_id}.zip`);
        await sleep(500);
      }
      if (normUrl) {
        await triggerDownload(
          normUrl,
          `model_${model.training_id}_vecnormalize.pkl`,
        );
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleRestoreConfirm = (timesteps) => {
    pendingTimesteps.current = timesteps;
    setRestoreModal(false);
    fileInputRef.current?.click(); // open file picker after modal closes
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    const zip = files.find((f) => f.name.endsWith(".zip"));
    const pkl = files.find((f) => f.name.endsWith(".pkl"));
    const ts = pendingTimesteps.current;

    if (!zip || !ts) return;

    setUploading(true);
    try {
      // Upload pkl first so it's ready before model triggers the DB update
      if (pkl) await uploadCheckpoint(model.training_id, pkl, "norm", ts);
      await uploadCheckpoint(model.training_id, zip, "model", ts);
      alert(
        pkl
          ? "Model + normalizer restored."
          : "Model restored (normalizer will reset on resume).",
      );
    } catch {
      alert("Upload failed.");
    } finally {
      setUploading(false);
      pendingTimesteps.current = null;
      e.target.value = "";
    }
  };

  return (
    <div className={styles.header}>
      {restoreModal && (
        <RestoreModal
          model={model}
          onConfirm={handleRestoreConfirm}
          onCancel={() => setRestoreModal(false)}
        />
      )}
      <div>
        <h1 className={styles.title}>{model.name ?? "Training run"}</h1>
        <p className={styles.meta}>
          {model.algorithm} · training_id: {model.training_id?.slice(0, 16)}…
        </p>
        <div>
          <button
            className={styles.button}
            disabled={isDisabled}
            onClick={() => importConfig(model?.training_id)}
          >
            Fetch Config
          </button>
          <button
            className={styles.button}
            disabled={isDisabled}
            onClick={() => setModal(true)}
          >
            Update Config
          </button>
          <button
            className={styles.button}
            disabled={isDisabled || downloading}
            onClick={handleDownload}
          >
            {downloading ? "Downloading…" : "Download Model"}
          </button>
          <button
            className={styles.button}
            disabled={isDisabled || uploading}
            onClick={() => setRestoreModal(true)}
          >
            {uploading ? "Uploading…" : "Restore Checkpoint"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,.pkl"
            multiple
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          <button
            className={styles.button}
            disabled={isDisabled}
            onClick={() => setKModal(true)}
          >
            Kill Training
          </button>
        </div>
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

function MetricCards({ model, smoothed, rewardHistory }) {
  const lastReward = rewardHistory.length
    ? rewardHistory[rewardHistory.length - 1].reward
    : null;
  const cards = [
    {
      label: "Episode",
      value: model.current_episode?.toLocaleString() ?? "—",
      sub: "current",
    },
    { label: "Timesteps", value: fmtK(model.current_timestep), sub: "total" },
    {
      label: "Last reward",
      value: lastReward?.toFixed(2) ?? "—",
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

function makeLineChart(ctx, history, keyFn, color) {
  const canvas = ctx.canvas;
  const W = canvas.width,
    H = canvas.height;
  const pad = { top: 12, bottom: 20, left: 38, right: 8 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  ctx.clearRect(0, 0, W, H);

  const vals = history.map(keyFn);
  const minV = Math.min(...vals);
  const maxV = Math.max(...vals);
  const range = maxV - minV || 1;

  const toX = (i) => pad.left + (i / Math.max(history.length - 1, 1)) * cW;
  const toY = (v) => pad.top + cH - ((v - minV) / range) * cH;

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
    const tickVal = minV + t * range;
    ctx.fillText(
      tickVal >= 1000 ? (tickVal / 1000).toFixed(1) + "k" : tickVal.toFixed(1),
      0,
      y + 3,
    );
  });

  // Area fill
  ctx.beginPath();
  history.forEach((h, i) =>
    i === 0
      ? ctx.moveTo(toX(i), toY(keyFn(h)))
      : ctx.lineTo(toX(i), toY(keyFn(h))),
  );
  ctx.lineTo(toX(history.length - 1), pad.top + cH);
  ctx.lineTo(pad.left, pad.top + cH);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
  grad.addColorStop(0, color + "33");
  grad.addColorStop(1, color + "00");
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = "round";
  history.forEach((h, i) =>
    i === 0
      ? ctx.moveTo(toX(i), toY(keyFn(h)))
      : ctx.lineTo(toX(i), toY(keyFn(h))),
  );
  ctx.stroke();
}

function EpRewMeanChart({ history }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!history.length || !canvasRef.current) return;
    makeLineChart(
      canvasRef.current.getContext("2d"),
      history,
      (h) => h.value,
      "#F59E0B",
      "Ep reward mean",
    );
  }, [history]);
  return (
    <div className={styles.panel}>
      <p className={styles.panelTitle}>Episode reward mean (buffer avg)</p>
      <canvas
        ref={canvasRef}
        width={300}
        height={120}
        className={styles.chart}
      />
    </div>
  );
}

function EpLenMeanChart({ history }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!history.length || !canvasRef.current) return;
    makeLineChart(
      canvasRef.current.getContext("2d"),
      history,
      (h) => h.value,
      "#A78BFA",
      "Ep len mean",
    );
  }, [history]);
  return (
    <div className={styles.panel}>
      <p className={styles.panelTitle}>Episode length mean (buffer avg)</p>
      <canvas
        ref={canvasRef}
        width={300}
        height={120}
        className={styles.chart}
      />
    </div>
  );
}

function ShapingTerminalChart({ history }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!history.length || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const pad = { top: 12, bottom: 20, left: 38, right: 8 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    ctx.clearRect(0, 0, W, H);

    const allVals = history.flatMap((h) => [h.shaping, h.terminal]);
    const minV = Math.min(...allVals, 0);
    const maxV = Math.max(...allVals);
    const range = maxV - minV || 1;

    const toX = (i) => pad.left + (i / Math.max(history.length - 1, 1)) * cW;
    const toY = (v) => pad.top + cH - ((v - minV) / range) * cH;

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
      const tickVal = minV + t * range;
      ctx.fillText(
        Math.abs(tickVal) >= 1000
          ? (tickVal / 1000).toFixed(1) + "k"
          : tickVal.toFixed(1),
        0,
        y + 3,
      );
    });

    const drawLine = (keyFn, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      history.forEach((h, i) =>
        i === 0
          ? ctx.moveTo(toX(i), toY(keyFn(h)))
          : ctx.lineTo(toX(i), toY(keyFn(h))),
      );
      ctx.stroke();
    };

    drawLine((h) => h.terminal, "#378ADD");
    drawLine((h) => h.shaping, "#F59E0B");
  }, [history]);

  const latest = history.length ? history[history.length - 1] : null;
  const ratio = latest?.ratio;
  // Flag when cumulative shaping is closing in on terminal reward magnitude —
  // the signal that VecNormalize's dynamic range may be getting squeezed.
  const ratioWarning = ratio != null && Math.abs(ratio) >= 0.5;

  return (
    <div className={styles.panel}>
      <p className={styles.panelTitle}>Shaping vs terminal reward (cum./ep)</p>
      <canvas
        ref={canvasRef}
        width={620}
        height={140}
        className={styles.chart}
      />
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <div className={styles.legendLine} style={{ background: "#378ADD" }} />
          <span className={styles.legendLabel}>Terminal (cum.)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendLine} style={{ background: "#F59E0B" }} />
          <span className={styles.legendLabel}>Shaping (cum.)</span>
        </div>
        {ratio != null && (
          <div className={styles.legendItem}>
            <span
              className={styles.legendLabel}
              style={ratioWarning ? { color: "#EF4444", fontWeight: 600 } : undefined}
            >
              Ratio: {ratio.toFixed(2)}
              {ratioWarning ? " ⚠ shaping approaching terminal magnitude" : ""}
            </span>
          </div>
        )}
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

function RolloutStats({ model, epRewMeanHistory, epLenMeanHistory }) {
  const lastEpRewMean = epRewMeanHistory.length
    ? epRewMeanHistory[epRewMeanHistory.length - 1].value
    : null;
  const lastEpLenMean = epLenMeanHistory.length
    ? epLenMeanHistory[epLenMeanHistory.length - 1].value
    : null;
  const rows = [
    ["Rollout #", model.rollout_count],
    ["Mean return", model.mean_return?.toFixed(2)],
    ["Mean value", model.mean_value?.toFixed(2)],
    ["Clip fraction", model.clip_fraction?.toFixed(4)],
    ["Explained Variance", model.explained_variance?.toFixed(4)],
    ["Episode Reward Mean", lastEpRewMean?.toFixed(4)],
    ["Episode Length Mean", lastEpLenMean?.toFixed(4)],
  ];
  if (model.final_mean_shaping != null || model.final_mean_terminal != null) {
    rows.push(
      ["Final Mean Shaping", model.final_mean_shaping?.toFixed(4)],
      ["Final Mean Terminal", model.final_mean_terminal?.toFixed(4)],
    );
  }
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
