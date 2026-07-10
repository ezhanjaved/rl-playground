import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useAuthStore } from "../stores/useAuthStore";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const statusColor = (s) => {
  if (!s) return "#6b7280";
  if (s === "completed") return "#10b981";
  if (s === "failed") return "#ef4444";
  if (s === "running") return "#f59e0b";
  return "#6b7280";
};

const modeColors = {
  PUBLIC: { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
  PRIVATE: { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" },
};

function ModelCard({ model, isFriend = false, friendName = null, onUpdate }) {
  const navigate = useNavigate();
  const { setFriendModel } = useAuthStore.getState();
  const [expanded, setExpanded] = useState(false);
  const [desc, setDesc] = useState(model.description ?? "");
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);
  const mode = model.modelMode ?? "PUBLIC";
  const mc = modeColors[mode] ?? modeColors.PUBLIC;

  const saveDescription = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("models")
      .update({ description: desc })
      .eq("id", model.id);
    setSaving(false);
    if (!error && onUpdate) onUpdate(model.id, { description: desc });
  };

  const toggleMode = async () => {
    if (isFriend) return;
    const next = mode === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setToggling(true);
    const { error } = await supabase
      .from("models")
      .update({ modelMode: next })
      .eq("id", model.id);
    setToggling(false);
    if (!error && onUpdate) onUpdate(model.id, { modelMode: next });
  };

  const handleShowStats = () => {
    setFriendModel(model.training_id);
    navigate(`/visualize/${model.training_id}`);
  };

  const handleRunModel = () => {
    setFriendModel(model.training_id);
  };

  const handleAnalyzeModel = (id) => {
    navigate(`/analyze/${id}`);
  };

  return (
    <div className="model-card">
      <div className="card-top">
        <div>
          <div className="card-name">{model.name ?? "Unnamed Model"}</div>
          {isFriend && friendName && (
            <div className="card-friend-name">by {friendName}</div>
          )}
        </div>
        <span
          className="mode-badge"
          style={{
            background: mc.bg,
            color: mc.text,
            border: `1px solid ${mc.border}`,
          }}
        >
          {mode}
        </span>
      </div>

      <div className="card-meta">
        <span className="algo-pill">{model.algorithm ?? "—"}</span>
        <span
          className="status-dot"
          style={{ background: statusColor(model.status) }}
        />
        <span className="status-label">{model.status ?? "unknown"}</span>
      </div>

      {model.final_mean_reward != null && (
        <div className="reward-bar-wrap">
          <div className="reward-label">
            Reward <strong>{model.final_mean_reward.toFixed(2)}</strong>
          </div>
        </div>
      )}

      <div className="card-actions">
        {!isFriend && (
          <>
            <button
              className="btn-ghost"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Hide Details" : "View / Edit"}
            </button>
            <button
              className="btn-ghost mode-toggle"
              onClick={toggleMode}
              disabled={toggling}
            >
              {toggling ? "…" : `→ ${mode === "PUBLIC" ? "PRIVATE" : "PUBLIC"}`}
            </button>
            <button
              onClick={() => handleAnalyzeModel(model?.training_id)}
              className="btn-ghost"
            >
              Analyze
            </button>
          </>
        )}

        {isFriend && (
          <>
            <button
              className="btn-ghost"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Hide" : "Description"}
            </button>
            <button className="btn-stats" onClick={handleShowStats}>
              Show Stats
            </button>
            <button className="btn-run" onClick={handleRunModel}>
              ▶ Run Model
            </button>
            <button
              onClick={() => handleAnalyzeModel(model?.training_id)}
              className="btn-ghost"
            >
              Analyze
            </button>
          </>
        )}
      </div>

      {expanded && (
        <div className="card-detail">
          <label className="detail-label">Description</label>
          {isFriend ? (
            <p className="desc-readonly">
              {model.description ?? "No description provided."}
            </p>
          ) : (
            <>
              <textarea
                className="desc-input"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Add a description…"
              />
              <button
                className="btn-save"
                onClick={saveDescription}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function HomePageContent() {
  const { user } = useAuthStore.getState();

  const [myModels, setMyModels] = useState([]);
  const [friendModels, setFriendModels] = useState([]);
  const [friendsList, setFriendsList] = useState({});
  const [selectedFriendId, setSelectedFriendId] = useState("all");
  const [showFriends, setShowFriends] = useState(false);
  const [loadingMine, setLoadingMine] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [pendingFriend, setPendingFriend] = useState(null);
  const [sendingReq, setSendingReq] = useState(false);
  const [reqSent, setReqSent] = useState(false);
  const searchTimeout = useRef(null);

  const [friendReqs, setFriendReqs] = useState([]); // [{ reqKey, senderId, senderName, senderEmail }]
  const [loadingReqs, setLoadingReqs] = useState(true);
  const [reqsPanelOpen, setReqsPanelOpen] = useState(true);
  const [processingReq, setProcessingReq] = useState(null); // reqKey being acted on
  const [friendsListOpen, setFriendsListOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/trainer/fetch_models`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_uid: user.id, model_uid: "" }),
          },
        );
        const data = await res.json();
        setMyModels(data.models ?? []);
      } catch {
        setMyModels([]);
      } finally {
        setLoadingMine(false);
      }
    })();
  }, [user?.id]);

  useEffect(() => {
    if (!showFriends || !user?.id) return;
    setLoadingFriends(true);
    (async () => {
      try {
        const { data: userData } = await supabase
          .from("users")
          .select("friends_list")
          .eq("id", user.id)
          .single();

        const fl = userData?.friends_list ?? {};
        const allTrainingIds = Object.values(fl).flat();
        if (!allTrainingIds.length) {
          setFriendModels([]);
          setLoadingFriends(false);
          return;
        }

        // resolve friend names
        const friendUids = Object.keys(fl);
        const { data: friendUsers } = await supabase
          .from("users")
          .select("id, name, email")
          .in("id", friendUids);

        const friendMap = Object.fromEntries(
          (friendUsers ?? []).map((u) => [u.id, u]),
        );
        setFriendsList(friendMap);

        const { data: models } = await supabase
          .from("models")
          .select("*")
          .in("training_id", allTrainingIds)
          .eq("modelMode", "PUBLIC");

        setFriendModels(models ?? []);
      } catch {
        setFriendModels([]);
      } finally {
        setLoadingFriends(false);
      }
    })();
  }, [showFriends, user?.id]);

  /* ── live user search ── */
  useEffect(() => {
    clearTimeout(searchTimeout.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      setSearching(true);
      const { data } = await supabase
        .from("users")
        .select("id, name, email, account_mode")
        .ilike("name", `%${searchQuery}%`)
        .eq("account_mode", "PUBLIC")
        .neq("id", user?.id)
        .limit(8);
      setSearchResults(data ?? []);
      setSearching(false);
    }, 400);
    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  /* ── fetch incoming friend requests ── */
  const fetchFriendRequests = async () => {
    if (!user?.id) return;
    setLoadingReqs(true);
    try {
      const { data: me } = await supabase
        .from("users")
        .select("friend_req")
        .eq("id", user.id)
        .single();

      const reqs = me?.friend_req ?? {};
      if (!Object.keys(reqs).length) {
        setFriendReqs([]);
        setLoadingReqs(false);
        return;
      }

      // resolve sender names
      const senderIds = [...new Set(Object.values(reqs))];
      const { data: senders } = await supabase
        .from("users")
        .select("id, name, email")
        .in("id", senderIds);

      const senderMap = Object.fromEntries(
        (senders ?? []).map((s) => [s.id, s]),
      );
      const resolved = Object.entries(reqs).map(([key, uid]) => ({
        reqKey: key,
        senderId: uid,
        senderName: senderMap[uid]?.name ?? "Unknown",
        senderEmail: senderMap[uid]?.email ?? "",
      }));
      setFriendReqs(resolved);
    } catch {
      setFriendReqs([]);
    } finally {
      setLoadingReqs(false);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, [user?.id]);

  /* ── accept friend request ── */
  const acceptRequest = async (req) => {
    setProcessingReq(req.reqKey);
    try {
      // 1. fetch sender's PUBLIC model training_ids
      const { data: senderModelsData } = await supabase
        .from("models")
        .select("training_id")
        .eq("user_id", req.senderId)
        .eq("modelMode", "PUBLIC")
        .not("training_id", "is", null);

      const senderTrainingIds = (senderModelsData ?? []).map((m) => m.training_id);

      // 2. fetch MY (accepter's) PUBLIC model training_ids
      const { data: myModelsData } = await supabase
        .from("models")
        .select("training_id")
        .eq("user_id", user.id)
        .eq("modelMode", "PUBLIC")
        .not("training_id", "is", null);

      const myTrainingIds = (myModelsData ?? []).map((m) => m.training_id);

      // 3. get current user's friend_req and friends_list
      const { data: me } = await supabase
        .from("users")
        .select("friend_req, friends_list")
        .eq("id", user.id)
        .single();

      // remove from friend_req
      const updatedReqs = { ...(me?.friend_req ?? {}) };
      delete updatedReqs[req.reqKey];

      // add sender to MY friends_list with sender's training_ids
      const updatedMyFriends = {
        ...(me?.friends_list ?? {}),
        [req.senderId]: senderTrainingIds,
      };

      // update accepter's row
      await supabase
        .from("users")
        .update({ friend_req: updatedReqs, friends_list: updatedMyFriends })
        .eq("id", user.id);

      // 4. also update SENDER's friends_list to include the accepter's training_ids
      const { data: sender } = await supabase
        .from("users")
        .select("friends_list")
        .eq("id", req.senderId)
        .single();

      const updatedSenderFriends = {
        ...(sender?.friends_list ?? {}),
        [user.id]: myTrainingIds,
      };

      await supabase
        .from("users")
        .update({ friends_list: updatedSenderFriends })
        .eq("id", req.senderId);

      setFriendReqs((prev) => prev.filter((r) => r.reqKey !== req.reqKey));
    } finally {
      setProcessingReq(null);
    }
  };

  /* ── decline friend request ── */
  const declineRequest = async (req) => {
    setProcessingReq(req.reqKey);
    try {
      const { data: me } = await supabase
        .from("users")
        .select("friend_req")
        .eq("id", user.id)
        .single();

      const updatedReqs = { ...(me?.friend_req ?? {}) };
      delete updatedReqs[req.reqKey];

      await supabase
        .from("users")
        .update({ friend_req: updatedReqs })
        .eq("id", user.id);

      setFriendReqs((prev) => prev.filter((r) => r.reqKey !== req.reqKey));
    } finally {
      setProcessingReq(null);
    }
  };

  const sendFriendRequest = async () => {
    if (!pendingFriend || !user?.id) return;
    setSendingReq(true);
    const { data: target } = await supabase
      .from("users")
      .select("friend_req")
      .eq("id", pendingFriend.id)
      .single();

    const existing = target?.friend_req ?? {};
    const newKey = `req${Object.keys(existing).length + 1}id`;
    const updated = { ...existing, [newKey]: user.id };

    await supabase
      .from("users")
      .update({ friend_req: updated })
      .eq("id", pendingFriend.id);

    setSendingReq(false);
    setReqSent(true);
  };

  /* ── card update helper ── */
  const handleMyModelUpdate = (id, patch) =>
    setMyModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );

  return (
    <>
      <style>{`
        .hpc-root {
          padding: 28px 32px;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          color: #1a1a2e;
          background: #f4f5f8;
          grid-area: main
        }

        /* ── top bar ── */
        .hpc-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 28px;
        }
        .hpc-title { font-size: 22px; font-weight: 700; letter-spacing: -0.4px; }
        .hpc-title span { color: #7c3aed; }

        .toggle-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }
        .toggle-switch {
          position: relative; width: 44px; height: 24px;
          cursor: pointer; display: inline-block;
        }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-slider {
          position: absolute; inset: 0;
          background: #d1d5db; border-radius: 99px;
          transition: background .2s;
        }
        .toggle-slider::before {
          content: ''; position: absolute;
          width: 18px; height: 18px; left: 3px; top: 3px;
          background: #fff; border-radius: 50%;
          transition: transform .2s;
          box-shadow: 0 1px 3px rgba(0,0,0,.2);
        }
        .toggle-switch input:checked + .toggle-slider { background: #7c3aed; }
        .toggle-switch input:checked + .toggle-slider::before { transform: translateX(20px); }

        /* ── search bar ── */
        .search-wrap {
          position: relative;
          margin-bottom: 28px;
        }
        .search-input {
          width: 100%;
          padding: 11px 44px 11px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          background: #fff;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,.1);
        }
        .search-icon {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 16px; color: #9ca3af; pointer-events: none;
        }
        .search-dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0;
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 10px; z-index: 100;
          box-shadow: 0 8px 24px rgba(0,0,0,.1);
          overflow: hidden;
        }
        .search-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px; cursor: pointer;
          transition: background .15s;
          font-size: 14px;
        }
        .search-item:hover { background: #f9fafb; }
        .search-item-name { font-weight: 600; }
        .search-item-email { font-size: 12px; color: #6b7280; }
        .btn-add-friend {
          font-size: 12px; padding: 4px 10px;
          border-radius: 6px; border: 1.5px solid #7c3aed;
          background: transparent; color: #7c3aed;
          cursor: pointer; font-weight: 600;
          transition: background .15s, color .15s;
        }
        .btn-add-friend:hover { background: #7c3aed; color: #fff; }
        .search-empty { padding: 12px 16px; color: #9ca3af; font-size: 13px; }

        /* ── section headers ── */
        .section-head {
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .08em; color: #6b7280;
          margin: 0 0 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .section-count {
          background: #ede9fe; color: #7c3aed;
          border-radius: 99px; padding: 1px 8px;
          font-size: 11px;
        }

        /* ── grid ── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 36px;
        }

        /* ── card ── */
        .model-card {
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 18px 20px;
          transition: box-shadow .2s, border-color .2s;
        }
        .model-card:hover {
          box-shadow: 0 6px 20px rgba(124,58,237,.1);
          border-color: #c4b5fd;
        }
        .card-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 10px;
        }
        .card-name { font-weight: 700; font-size: 15px; line-height: 1.3; }
        .mode-badge {
          font-size: 10px; font-weight: 700; letter-spacing: .05em;
          padding: 2px 8px; border-radius: 99px; white-space: nowrap;
        }
        .card-meta {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 12px;
        }
        .algo-pill {
          font-size: 11px; background: #f3f4f6; color: #374151;
          padding: 2px 8px; border-radius: 6px; font-weight: 600;
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }
        .status-label { font-size: 12px; color: #6b7280; }
        .reward-bar-wrap { margin-bottom: 12px; }
        .reward-label { font-size: 12px; color: #6b7280; }
        .reward-label strong { color: #1a1a2e; }

        .card-actions {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-top: 4px;
        }
        .btn-ghost {
          font-size: 12px; padding: 5px 10px;
          border-radius: 7px; border: 1.5px solid #d1d5db;
          background: transparent; color: #374151;
          cursor: pointer; font-weight: 600;
          transition: border-color .15s, color .15s;
        }
        .btn-ghost:hover { border-color: #7c3aed; color: #7c3aed; }
        .mode-toggle { color: #6b7280; }
        .btn-upload {
          font-size: 12px; padding: 5px 10px;
          border-radius: 7px; border: 1.5px solid #e5e7eb;
          background: #f9fafb; color: #9ca3af;
          cursor: not-allowed; font-weight: 600;
        }
        .btn-save {
          margin-top: 8px;
          font-size: 12px; padding: 6px 14px;
          border-radius: 7px; border: none;
          background: #7c3aed; color: #fff;
          cursor: pointer; font-weight: 600;
          transition: background .15s;
        }
        .btn-save:hover:not(:disabled) { background: #6d28d9; }
        .btn-save:disabled { background: #a78bfa; cursor: default; }

        .card-detail { margin-top: 14px; border-top: 1px solid #f3f4f6; padding-top: 14px; }
        .detail-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #9ca3af; display: block; margin-bottom: 6px; }
        .desc-input {
          width: 100%; padding: 8px 10px;
          border: 1.5px solid #e5e7eb; border-radius: 8px;
          font-size: 13px; resize: vertical;
          font-family: inherit; outline: none;
          transition: border-color .15s;
          box-sizing: border-box;
        }
        .desc-input:focus { border-color: #7c3aed; }
        .desc-readonly { font-size: 13px; color: #4b5563; line-height: 1.5; }

        /* ── empty state ── */
        .empty-state {
          text-align: center; padding: 48px 20px;
          color: #9ca3af; font-size: 14px;
          grid-column: 1/-1;
        }
        .empty-icon { font-size: 36px; margin-bottom: 10px; }

        /* ── loader ── */
        .loader-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .skeleton {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 14px;
          height: 140px;
          flex: 1 1 260px;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }

        /* ── modal overlay ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.45);
          display: flex; align-items: center; justify-content: center;
          z-index: 999;
        }
        .modal-box {
          background: #fff; border-radius: 16px;
          padding: 32px 28px; max-width: 380px; width: 90%;
          box-shadow: 0 20px 60px rgba(0,0,0,.2);
          text-align: center;
        }
        .modal-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .modal-sub { font-size: 14px; color: #6b7280; margin-bottom: 24px; }
        .modal-sub strong { color: #1a1a2e; }
        .modal-actions { display: flex; gap: 10px; justify-content: center; }
        .btn-confirm {
          padding: 9px 22px; border-radius: 9px; border: none;
          background: #7c3aed; color: #fff; font-weight: 700;
          font-size: 14px; cursor: pointer;
          transition: background .15s;
        }
        .btn-confirm:hover:not(:disabled) { background: #6d28d9; }
        .btn-confirm:disabled { background: #a78bfa; cursor: default; }
        .btn-cancel {
          padding: 9px 22px; border-radius: 9px;
          border: 1.5px solid #d1d5db; background: transparent;
          color: #374151; font-weight: 600; font-size: 14px;
          cursor: pointer;
        }
        .req-sent { color: #10b981; font-weight: 700; font-size: 15px; }

        /* ── divider ── */
        .divider { border: none; border-top: 1.5px solid #e5e7eb; margin: 8px 0 28px; }

        /* ── friend card extras ── */
        .card-friend-name {
          font-size: 11px; color: #7c3aed; font-weight: 600;
          margin-top: 2px; letter-spacing: .01em;
        }
        .btn-stats {
          font-size: 12px; padding: 5px 10px;
          border-radius: 7px; border: 1.5px solid #7c3aed;
          background: transparent; color: #7c3aed;
          cursor: pointer; font-weight: 600;
          transition: background .15s, color .15s;
        }
        .btn-stats:hover { background: #7c3aed; color: #fff; }
        .btn-run {
          font-size: 12px; padding: 5px 10px;
          border-radius: 7px; border: none;
          background: #7c3aed; color: #fff;
          cursor: pointer; font-weight: 600;
          transition: background .15s;
        }
        .btn-run:hover { background: #6d28d9; }

        /* ── friend filter ── */
        .friend-filter-wrap {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 14px; flex-wrap: wrap;
        }
        .friend-filter-label {
          font-size: 12px; font-weight: 600; color: #6b7280;
        }
        .friend-filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-pill {
          font-size: 12px; padding: 4px 12px;
          border-radius: 99px; border: 1.5px solid #e5e7eb;
          background: #fff; color: #6b7280;
          cursor: pointer; font-weight: 600;
          transition: border-color .15s, color .15s, background .15s;
        }
        .filter-pill:hover { border-color: #7c3aed; color: #7c3aed; }
        .filter-pill-active {
          border-color: #7c3aed; background: #7c3aed; color: #fff;
        }

        /* ── friend requests panel ── */
        .fr-panel {
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          margin-bottom: 24px;
          overflow: hidden;
          transition: box-shadow .2s;
        }
        .fr-panel:has(.fr-req-row):not(.fr-empty-panel) {
          border-color: #c4b5fd;
          box-shadow: 0 2px 12px rgba(124,58,237,.08);
        }
        .fr-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          cursor: pointer;
          user-select: none;
          background: #fafafa;
          border-bottom: 1.5px solid transparent;
          transition: background .15s;
        }
        .fr-header:hover { background: #f3f4f6; }
        .fr-header-open { border-bottom-color: #e5e7eb; }
        .fr-header-left { display: flex; align-items: center; gap: 10px; }
        .fr-header-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; }
        .fr-badge {
          background: #7c3aed; color: #fff;
          font-size: 11px; font-weight: 700;
          padding: 1px 7px; border-radius: 99px;
          min-width: 20px; text-align: center;
        }
        .fr-badge-zero { background: #e5e7eb; color: #9ca3af; }
        .fr-chevron {
          font-size: 12px; color: #9ca3af;
          transition: transform .2s;
        }
        .fr-chevron-open { transform: rotate(180deg); }
        .fr-body { padding: 12px 18px 16px; }
        .fr-empty {
          text-align: center; padding: 20px;
          color: #9ca3af; font-size: 13px;
        }
        .fr-req-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
          gap: 12px;
        }
        .fr-req-row:last-child { border-bottom: none; }
        .fr-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 14px;
          flex-shrink: 0;
        }
        .fr-info { flex: 1; min-width: 0; }
        .fr-name { font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fr-email { font-size: 12px; color: #9ca3af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fr-actions { display: flex; gap: 8px; flex-shrink: 0; }
        .btn-accept {
          padding: 5px 14px; border-radius: 7px; border: none;
          background: #7c3aed; color: #fff; font-weight: 700;
          font-size: 12px; cursor: pointer;
          transition: background .15s;
        }
        .btn-accept:hover:not(:disabled) { background: #6d28d9; }
        .btn-accept:disabled { background: #a78bfa; cursor: default; }
        .btn-decline {
          padding: 5px 14px; border-radius: 7px;
          border: 1.5px solid #e5e7eb; background: transparent;
          color: #6b7280; font-weight: 600; font-size: 12px;
          cursor: pointer; transition: border-color .15s, color .15s;
        }
        .btn-decline:hover:not(:disabled) { border-color: #ef4444; color: #ef4444; }
        .btn-decline:disabled { opacity: .5; cursor: default; }

        /* ── friends list button ── */
        .topbar-right {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
        }
        .btn-friends-list {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 9px;
          border: 1.5px solid #7c3aed;
          background: transparent; color: #7c3aed;
          font-size: 13px; font-weight: 700;
          cursor: pointer;
          transition: background .15s, color .15s;
        }
        .btn-friends-list:hover { background: #7c3aed; color: #fff; }
        .friends-count-badge {
          background: #7c3aed; color: #fff;
          font-size: 11px; font-weight: 700;
          padding: 1px 7px; border-radius: 99px;
          min-width: 18px; text-align: center;
          transition: background .15s;
        }
        .btn-friends-list:hover .friends-count-badge {
          background: #fff; color: #7c3aed;
        }

        /* ── friends list modal ── */
        .friends-list-modal {
          max-width: 440px; text-align: left;
        }
        .fl-list {
          margin-top: 16px;
          max-height: 340px; overflow-y: auto;
          border: 1.5px solid #e5e7eb; border-radius: 10px;
        }
        .fl-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px;
          border-bottom: 1px solid #f3f4f6;
        }
        .fl-row:last-child { border-bottom: none; }
        .fl-model-count {
          margin-left: auto; flex-shrink: 0;
          font-size: 11px; font-weight: 600;
          background: #ede9fe; color: #7c3aed;
          padding: 2px 8px; border-radius: 99px;
        }
        .fl-empty {
          text-align: center; padding: 24px 0 8px;
          color: #9ca3af; font-size: 14px;
        }
      `}</style>

      <div className="hpc-root">
        {/* ── Top bar ── */}
        <div className="hpc-topbar">
          <div className="hpc-title">
            My <span>Models</span>
          </div>
          <div className="topbar-right">
            <button
              className="btn-friends-list"
              onClick={() => setFriendsListOpen(true)}
            >
              👥 My Friends
              {Object.keys(friendsList ?? {}).length > 0 && (
                <span className="friends-count-badge">
                  {Object.keys(friendsList ?? {}).length}
                </span>
              )}
            </button>
            <label className="toggle-wrap">
              <span>Show Friend Models</span>
              <span className="toggle-switch">
                <input
                  type="checkbox"
                  checked={showFriends}
                  onChange={(e) => setShowFriends(e.target.checked)}
                />
                <span className="toggle-slider" />
              </span>
            </label>
          </div>
        </div>

        {/* ── Search bar ── */}
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search users by name to add as friend…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchResults([]);
            }}
          />
          <span className="search-icon">🔍</span>

          {searchQuery.trim() && (
            <div className="search-dropdown">
              {searching && <div className="search-empty">Searching…</div>}
              {!searching && searchResults.length === 0 && (
                <div className="search-empty">No public users found.</div>
              )}
              {searchResults.map((u) => (
                <div key={u.id} className="search-item">
                  <div>
                    <div className="search-item-name">{u.name}</div>
                    <div className="search-item-email">{u.email}</div>
                  </div>
                  <button
                    className="btn-add-friend"
                    onClick={() => {
                      setReqSent(false);
                      setPendingFriend(u);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Friend Requests Panel ── */}
        <div
          className={`fr-panel${friendReqs.length === 0 ? " fr-empty-panel" : ""}`}
        >
          <div
            className={`fr-header${reqsPanelOpen ? " fr-header-open" : ""}`}
            onClick={() => setReqsPanelOpen((v) => !v)}
          >
            <div className="fr-header-left">
              <span className="fr-header-title">Friend Requests</span>
              <span
                className={`fr-badge${friendReqs.length === 0 ? " fr-badge-zero" : ""}`}
              >
                {loadingReqs ? "…" : friendReqs.length}
              </span>
            </div>
            <span
              className={`fr-chevron${reqsPanelOpen ? " fr-chevron-open" : ""}`}
            >
              ▼
            </span>
          </div>

          {reqsPanelOpen && (
            <div className="fr-body">
              {loadingReqs ? (
                <div className="fr-empty">Loading requests…</div>
              ) : friendReqs.length === 0 ? (
                <div className="fr-empty">No pending friend requests.</div>
              ) : (
                friendReqs.map((req) => (
                  <div key={req.reqKey} className="fr-req-row">
                    <div className="fr-avatar">
                      {req.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div className="fr-info">
                      <div className="fr-name">{req.senderName}</div>
                      <div className="fr-email">{req.senderEmail}</div>
                    </div>
                    <div className="fr-actions">
                      <button
                        className="btn-accept"
                        disabled={processingReq === req.reqKey}
                        onClick={() => acceptRequest(req)}
                      >
                        {processingReq === req.reqKey ? "…" : "Accept"}
                      </button>
                      <button
                        className="btn-decline"
                        disabled={processingReq === req.reqKey}
                        onClick={() => declineRequest(req)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── My Models ── */}
        <p className="section-head">
          My Models
          <span className="section-count">{myModels.length}</span>
        </p>
        <hr className="divider" />

        {loadingMine ? (
          <div className="loader-row">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
        ) : (
          <div className="cards-grid">
            {myModels.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🤖</div>
                No models yet. Train one to get started!
              </div>
            ) : (
              myModels.map((m) => (
                <ModelCard
                  key={m.id}
                  model={m}
                  isFriend={false}
                  onUpdate={handleMyModelUpdate}
                />
              ))
            )}
          </div>
        )}

        {/* ── Friend Models ── */}
        {showFriends && (
          <>
            <p className="section-head" style={{ marginTop: 8 }}>
              Friends' Public Models
              <span className="section-count">{friendModels.length}</span>
            </p>
            <hr className="divider" />

            {/* Friend filter pills */}
            {!loadingFriends && Object.keys(friendsList ?? {}).length > 0 && (
              <div className="friend-filter-wrap">
                <span className="friend-filter-label">Filter by:</span>
                <div className="friend-filter-pills">
                  <button
                    className={`filter-pill${selectedFriendId === "all" ? " filter-pill-active" : ""}`}
                    onClick={() => setSelectedFriendId("all")}
                  >
                    All
                  </button>
                  {Object.entries(friendsList ?? {}).map(([uid, u]) => (
                    <button
                      key={uid}
                      className={`filter-pill${selectedFriendId === uid ? " filter-pill-active" : ""}`}
                      onClick={() => setSelectedFriendId(uid)}
                    >
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loadingFriends ? (
              <div className="loader-row">
                {[0, 1].map((i) => (
                  <div key={i} className="skeleton" />
                ))}
              </div>
            ) : (
              <div className="cards-grid">
                {(() => {
                  const safeFriendsList = friendsList ?? {};
                  const filtered =
                    selectedFriendId === "all"
                      ? friendModels
                      : friendModels.filter(
                          (m) => m.user_id === selectedFriendId,
                        );

                  if (filtered.length === 0)
                    return (
                      <div className="empty-state">
                        <div className="empty-icon">👥</div>
                        No public models from{" "}
                        {selectedFriendId === "all"
                          ? "friends"
                          : (safeFriendsList[selectedFriendId]?.name ??
                            "this friend")}{" "}
                        yet.
                      </div>
                    );

                  return filtered.map((m) => (
                    <ModelCard
                      key={m.id}
                      model={m}
                      isFriend={true}
                      friendName={safeFriendsList[m.user_id]?.name ?? null}
                    />
                  ));
                })()}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Friend Request Modal ── */}
      {pendingFriend && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!sendingReq) {
              setPendingFriend(null);
              setReqSent(false);
            }
          }}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {!reqSent ? (
              <>
                <div className="modal-title">Send Friend Request?</div>
                <div className="modal-sub">
                  You are sending a request to{" "}
                  <strong>{pendingFriend.name}</strong>.
                </div>
                <div className="modal-actions">
                  <button
                    className="btn-confirm"
                    onClick={sendFriendRequest}
                    disabled={sendingReq}
                  >
                    {sendingReq ? "Sending…" : "Yes, Send"}
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setPendingFriend(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="req-sent">✓ Request Sent!</div>
                <div className="modal-sub" style={{ marginTop: 8 }}>
                  Your request was sent to <strong>{pendingFriend.name}</strong>
                  .
                </div>
                <button
                  className="btn-confirm"
                  onClick={() => {
                    setPendingFriend(null);
                    setReqSent(false);
                  }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* ── Friends List Modal ── */}
      {friendsListOpen && (
        <div
          className="modal-overlay"
          onClick={() => setFriendsListOpen(false)}
        >
          <div
            className="modal-box friends-list-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">My Friends</div>
            {Object.keys(friendsList ?? {}).length === 0 ? (
              <div className="fl-empty">
                <div className="empty-icon">👥</div>
                <p>No friends yet. Search for users above to add them!</p>
              </div>
            ) : (
              <div className="fl-list">
                {Object.entries(friendsList ?? {}).map(([uid, u]) => (
                  <div key={uid} className="fl-row">
                    <div className="fr-avatar">
                      {(u.name ?? "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="fr-info">
                      <div className="fr-name">{u.name ?? "Unknown"}</div>
                      <div className="fr-email">{u.email ?? ""}</div>
                    </div>
                    <span className="fl-model-count">
                      {(friendModels.filter((m) => m.user_id === uid).length)} models
                    </span>
                  </div>
                ))}
              </div>
            )}
            <button
              className="btn-confirm"
              style={{ marginTop: 20 }}
              onClick={() => setFriendsListOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
