import { useState, useRef, useEffect } from "react";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function renderMarkdown(raw) {
  let s = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  s = s.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) => {
    return `<pre class="sgc-pre"><code>${code.trimEnd()}</code></pre>`;
  });

  s = s.replace(/^### (.+)$/gm, '<p class="sgc-h3">$1</p>');
  s = s.replace(/^## (.+)$/gm, '<p class="sgc-h2">$1</p>');

  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  s = s.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");

  s = s.replace(/`([^`]+)`/g, '<code class="sgc-code">$1</code>');

  s = s.replace(/^(━{3,}|-{3,})$/gm, '<hr class="sgc-hr" />');

  s = s.replace(/→/g, '<span class="sgc-arrow">→</span>');
  s = s.replace(
    /--TRUE-→/g,
    '<span class="sgc-branch sgc-branch--true">──TRUE──▶</span>',
  );
  s = s.replace(
    /--FALSE→/g,
    '<span class="sgc-branch sgc-branch--false">──FALSE─▶</span>',
  );

  s = s.replace(/^[•\-] (.+)$/gm, "<li>$1</li>");
  s = s.replace(
    /(<li>.*<\/li>(\n|$))+/g,
    (block) => `<ul class="sgc-ul">${block}</ul>`,
  );

  s = s.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  s = s.replace(/\n/g, "<br/>");
  s = s.replace(/<br\/>(<\/(ul|pre|p|hr)>)/g, "$1");
  s = s.replace(/(<(ul|pre|p)>)<br\/>/g, "$1");

  return s;
}

const WELCOME = {
  id: "welcome",
  role: "assistant",
  content:
    'Hello! I\'m your **SnapGraph Graph Designer AI**.\n\nDescribe what you want your agent to learn and I\'ll suggest a complete graph — nodes, configs, wiring, and training settings.\n\nFor example:\n- *"Agent should navigate to a target and interact with it"*\n- *"Agent collects items and deposits them at a dropzone"**\n\nMoveable capability is always active. Tell me which other abilities the agent has (or I\'ll recommend them).',
  timestamp: new Date(),
};

const QUICK_PROMPTS = [
  "Find a target & interact with it",
  "Collect items and deposit them",
  "Navigate to target avoiding obstacles",
  "Pick up object and carry it to target zone",
];

function TypingDots() {
  return (
    <div className="sgc-message sgc-message--ai">
      <Avatar role="assistant" />
      <div className="sgc-bubble sgc-bubble--ai sgc-typing">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Avatar({ role }) {
  return (
    <div
      className={`sgc-avatar sgc-avatar--${role === "user" ? "user" : "ai"}`}
    >
      {role === "user" ? "U" : "AI"}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`sgc-message ${isUser ? "sgc-message--user" : "sgc-message--ai"}`}
    >
      {!isUser && <Avatar role="assistant" />}
      <div
        className={`sgc-bubble ${isUser ? "sgc-bubble--user" : "sgc-bubble--ai"}`}
      >
        <div
          className="sgc-bubble__body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
        />
        <span className="sgc-bubble__time">{formatTime(msg.timestamp)}</span>
      </div>
      {isUser && <Avatar role="user" />}
    </div>
  );
}

export default function GraphAIChat({
  agentCapabilities = [],
  apiPath = "http://127.0.0.1:8000/api/graph-ai/chat",
}) {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    const aiMsgId = `a_${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: aiMsgId, role: "assistant", content: "", timestamp: new Date() },
    ]);
    setInput("");
    setStreaming(true);
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const history = messages
      .filter((m) => m.id !== "welcome" && m.content !== "")
      .map((m) => ({ role: m.role, content: m.content }));
    history.push({ role: "user", content: trimmed });

    abortRef.current = new AbortController();

    try {
      const res = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          messages: history,
          agent_capabilities: agentCapabilities,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || err.message || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId ? { ...m, content: accumulated } : m,
          ),
        );
      }
    } catch (e) {
      if (e.name === "AbortError") return;
      setError(e.message || "Something went wrong. Please try again.");
      setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
  };

  const handleClear = () => {
    abortRef.current?.abort();
    setMessages([WELCOME]);
    setError(null);
    setStreaming(false);
  };

  const handleQuickPrompt = (text) => {
    setInput(text);
    setTimeout(() => {
      textareaRef.current?.focus();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }, 0);
  };

  const lastMsg = messages[messages.length - 1];
  const showTypingDots =
    streaming && lastMsg?.role === "assistant" && lastMsg?.content === "";

  return (
    <>
      <style>{CSS}</style>
      <div className="sgc-root">
        {/* ── Header ── */}
        <div className="sgc-header">
          <div className="sgc-header__left">
            <span className={`sgc-dot ${streaming ? "sgc-dot--active" : ""}`} />
            <span className="sgc-header__title">Graph AI</span>
            <span className="sgc-header__badge">BETA</span>
            {agentCapabilities.length > 0 && (
              <span className="sgc-header__caps">
                {agentCapabilities.join(" · ")}
              </span>
            )}
          </div>
          <button
            className="sgc-btn-ghost"
            onClick={handleClear}
            title="Clear chat"
          >
            <IconTrash />
            Clear
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="sgc-feed">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
          {showTypingDots && <TypingDots />}
          {error && (
            <div className="sgc-error">
              <IconWarn />
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Quick prompts (shown only when conversation is fresh) ── */}
        {messages.length <= 1 && (
          <div className="sgc-chips">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                className="sgc-chip"
                onClick={() => handleQuickPrompt(p)}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* ── Input bar ── */}
        <div className="sgc-input-area">
          <div className="sgc-input-row">
            <textarea
              ref={textareaRef}
              className="sgc-textarea"
              placeholder="Describe the behavior you want to design…"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={streaming}
            />
            <button
              className={`sgc-send ${!input.trim() || streaming ? "sgc-send--off" : ""}`}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || streaming}
              title="Send — Enter"
            >
              {streaming ? <IconStop /> : <IconSend />}
            </button>
          </div>
          <p className="sgc-hint">Enter to send · Shift+Enter for newline</p>
        </div>
      </div>
    </>
  );
}

// ─── Icon components ──────────────────────────────────────────────────────────

const IconSend = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconStop = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

const IconTrash = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);

const IconWarn = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
  .sgc-root {
    grid-area: main;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    background: #1a1a1a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    color: #fff;
    overflow: hidden;
  }

  /* ── Header — matches sidebar header strip ── */
  .sgc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px;
    border-bottom: 1px solid #2e2e2e;
    background: #000;
    flex-shrink: 0;
    gap: 8px;
  }
  .sgc-header__left {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
  }
  .sgc-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: green;
    flex-shrink: 0;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .sgc-dot--active {
    background: green;
    box-shadow: 0 0 6px #22c55e88;
    animation: sgc-pulse 1.8s ease-in-out infinite;
  }
  @keyframes sgc-pulse {
    0%,100% { opacity:1; } 50% { opacity:.4; }
  }
  .sgc-header__title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #fff;
    white-space: nowrap;
  }
  .sgc-header__badge {
    font-size: 8px; font-weight: 800; letter-spacing: .1em;
    color: #000; background: #facc15;
    padding: 2px 6px; border-radius: 3px;
    flex-shrink: 0;
  }
  .sgc-header__caps {
    font-size: 10px; color: #3c3489;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 200px;
  }
  /* Clear button — matches sidebar section header style */
  .sgc-btn-ghost {
    display: flex; align-items: center; gap: 5px;
    font-family: inherit; font-size: 11px; color: #fff;
    background: none; border: 1px solid #333;
    border-radius: 6px; padding: 4px 10px;
    cursor: pointer; flex-shrink: 0;
    transition: color .15s, border-color .15s, background .15s;
  }
  .sgc-btn-ghost:hover {
    color: #e0e0e0; border-color: #555; background: #252525;
  }

  /* ── Feed — dotted canvas background ── */
  .sgc-feed {
    flex: 1; min-height: 0;
    overflow-y: auto;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #fff;
    background-image: radial-gradient(circle, #2a2a2a 0.01px, transparent 1px);
    background-size: 24px 24px;
    scroll-behavior: smooth;
  }
  .sgc-feed::-webkit-scrollbar { width: 4px; }
  .sgc-feed::-webkit-scrollbar-track { background: transparent; }
  .sgc-feed::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

  /* ── Message rows ── */
  .sgc-message {
    display: flex; align-items: flex-start; gap: 10px;
  }
  .sgc-message--user { flex-direction: row-reverse; }

  /* ── Avatars — pill style matching sidebar icon treatment ── */
  .sgc-avatar {
    width: 28px; height: 28px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 800; letter-spacing: .05em;
    flex-shrink: 0; margin-top: 2px;
  }
  .sgc-avatar--ai   { background: #252525; border: 1px solid #383838; color: #facc15; }
  .sgc-avatar--user { background: #1e2d4a; border: 1px solid #2a4070; color: #7eb3f8; }

  /* ── Bubbles ── */
  .sgc-bubble {
    max-width: 80%;
    padding: 12px 20px 10px;
    line-height: 1.70;
    position: relative;
    border-radius: 10px;
  }
  /* AI bubble: matches sidebar "section" card — warm dark gray with solid border */
  .sgc-bubble--ai {
    background: #f4f4f2;
    border-radius: 2px 10px 10px 10px;
    color: #333;
    box-shadow: 0 1px 4px rgba(0,0,0,.35);
  }

  /* User bubble: blue-tinted, right-side */
  .sgc-bubble--user {
    background: #eeedfe;
    border-radius: 10px 2px 10px 10px;
    color: #3c3489;
    box-shadow: 0 1px 4px rgba(0,0,0,.35);
  }

  /* ── Rich text inside bubbles ── */

  /* Section heading ## → looks like sidebar section header */
  .sgc-bubble__body .sgc-h2 {
    display: block;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: #facc15;
    margin: 14px 0 6px;
    padding-bottom: 5px;
    border-bottom: 1px solid #333;
  }
  .sgc-bubble__body .sgc-h2:first-child { margin-top: 2px; }

  /* Sub-heading ### */
  .sgc-bubble__body .sgc-h3 {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #333;
    margin: 10px 0 4px;
  }

  /* Bold / italic */
  .sgc-bubble__body strong { color: #333; font-weight: 900; }
  .sgc-bubble__body em     { color: #333; font-style: normal; font-weight: 600; }

  /* Inline code — node names like InRadius, AddReward */
  .sgc-bubble__body .sgc-code {
    font-family: 'DM Mono', 'Fira Code', ui-monospace, monospace;
    background: #2c2c2c;
    border: 1px solid #3d3d3d;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 11.5px;
    color: #93c5fd;
  }

  /* Graph chain block — the meat of every suggestion */
  .sgc-bubble__body .sgc-pre {
    display: block;
    font-family: 'DM Mono', 'Fira Code', ui-monospace, monospace;
    background: #1e1e1e;
    border: 1px solid #383838;
    border-left: 3px solid #facc15;
    border-radius: 6px;
    padding: 10px 14px;
    overflow-x: auto;
    margin: 8px 0;
    font-size: 12px;
    line-height: 1.7;
    color: #d4d4d4;
    white-space: pre;
  }
  .sgc-bubble__body .sgc-pre code { background: none; border: none; padding: 0; color: inherit; font-size: inherit; }

  /* Horizontal rule */
  .sgc-bubble__body .sgc-hr {
    border: none;
    border-top: 1px solid #333;
    margin: 10px 0;
  }

  /* Graph arrows */
  .sgc-bubble__body .sgc-arrow {
    color: #facc15;
    font-weight: 700;
    margin: 0 3px;
  }
  .sgc-bubble__body .sgc-branch--true  { color: #333; font-weight: 600; }
  .sgc-bubble__body .sgc-branch--false { color: #333; font-weight: 600; }

  /* Bullet lists */
  .sgc-bubble__body .sgc-ul {
    margin: 6px 4px 6px 6px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .sgc-bubble__body .sgc-ul li {
    display: flex;
    gap: 5px;
    align-items: baseline;
    color: #333;
  }
  .sgc-bubble__body .sgc-ul li::before {
    content: "·";
    color: #facc15;
    font-size: 16px;
    line-height: 1;
    flex-shrink: 0;
  }

  /* Timestamp */
  .sgc-bubble__time {
    display: block;
    font-size: 10px;
    color: #333;
    margin-top: 6px;
    text-align: right;
  }

  /* ── Typing indicator ── */
  .sgc-typing {
    display: flex; gap: 5px; align-items: center;
    padding: 14px 16px;
  }
  .sgc-typing span {
    width: 6px; height: 6px; border-radius: 50%;
    background: #3d3d3d;
    animation: sgc-bounce 1.2s ease-in-out infinite;
  }
  .sgc-typing span:nth-child(2){ animation-delay:.18s; }
  .sgc-typing span:nth-child(3){ animation-delay:.36s; }
  @keyframes sgc-bounce {
    0%,80%,100%{ transform:translateY(0); background:#3d3d3d; }
    40%{ transform:translateY(-6px); background:#facc15; }
  }

  /* ── Error ── */
  .sgc-error {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: #fca5a5;
    background: #2a1515; border: 1px solid #5c2020;
    border-radius: 8px; padding: 9px 13px;
  }

  /* ── Quick-prompt chips ── */
  .sgc-chips {
    display: flex; flex-wrap: wrap; gap: 7px;
    padding: 4px 16px 12px; flex-shrink: 0;
    background: #fff;
  }
  .sgc-chip {
    font-family: inherit; font-size: 11px; color: #fff;
    background: #000; border: 1px solid #333;
    border-radius: 20px; padding: 5px 13px;
    cursor: pointer; white-space: nowrap;
    transition: color .15s, border-color .15s, background .15s;
  }
  .sgc-chip:hover { color: #f0f0f0; border-color: #555; background: #2d2d2d; }

  /* ── Input area — matches sidebar bottom area ── */
  .sgc-input-area {
    padding: 12px 16px 10px;
    border-top: 1px solid #2e2e2e;
    background: #fff;
    flex-shrink: 0;
  }
  .sgc-input-row {
    display: flex; align-items: flex-end; gap: 8px;
    background: #fff; border: 1px solid #383838;
    border-radius: 8px; padding: 9px 12px;
    transition: border-color .15s, box-shadow .15s;
  }
  .sgc-input-row:focus-within {
    border-color: yellow;
    box-shadow: 0 0 0 3px #facc1515;
  }
  .sgc-textarea {
    flex: 1; background: none; border: none; outline: none;
    color: #000; font-family: inherit; font-size: 13px;
    line-height: 1.5; resize: none; max-height: 150px;
    overflow-y: auto;
  }
  .sgc-textarea::placeholder { color: #484848; }
  .sgc-textarea::-webkit-scrollbar { width: 3px; }
  .sgc-textarea::-webkit-scrollbar-thumb { background: #383838; }

  .sgc-send {
    width: 32px; height: 32px;
    border-radius: 7px;
    border: 1px solid #383838;
    background: #2a2a2a;
    color: #facc15;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: background .15s, border-color .15s, transform .1s, color .15s;
  }
  .sgc-send:hover:not(.sgc-send--off) {
    background: #facc15; border-color: #facc15;
    color: #111; transform: scale(1.06);
  }
  .sgc-send--off { opacity: .2; cursor: not-allowed; }

  .sgc-hint {
    margin: 6px 0 0; font-size: 10px;
    color: #3a3a3a; letter-spacing: .02em;
  }
`;
