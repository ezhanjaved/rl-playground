import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(8,8,8,0.82)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "40px 36px",
    position: "relative",
    zIndex: 2,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 36,
  },
  logoIcon: {
    width: 28,
    height: 28,
    background: "#fff",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
    letterSpacing: "-0.01em",
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    color: "#fff",
    letterSpacing: "-0.03em",
    marginBottom: 6,
  },
  sub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.38)",
    marginBottom: 28,
    lineHeight: 1.5,
  },
  oauthRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginBottom: 20,
  },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    padding: "9px 12px",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 400,
    transition: "all 0.15s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: "0.5px",
    background: "rgba(255,255,255,0.07)",
  },
  dividerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
    fontFamily: "monospace",
    letterSpacing: "0.05em",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  label: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
  },
  input: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "10px 13px",
    fontSize: 14,
    color: "#e5e5e5",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  },
  submitBtn: {
    width: "100%",
    padding: "10px",
    background: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#000",
    fontFamily: "inherit",
    cursor: "pointer",
    letterSpacing: "-0.01em",
    marginBottom: 20,
    transition: "all 0.2s",
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    lineHeight: 1.6,
  },
  footerLink: {
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    cursor: "pointer",
  },
  terms: {
    fontSize: 11,
    color: "#333",
    textAlign: "center",
    lineHeight: 1.7,
    marginTop: 16,
  },
};

const feedbackStyle = (type) => ({
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 13,
  marginBottom: 14,
  textAlign: "center",
  background:
    type === "error" ? "rgba(239,68,68,0.07)" : "rgba(34,197,94,0.07)",
  border: `0.5px solid ${
    type === "error" ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"
  }`,
  color: type === "error" ? "#f87171" : "#4ade80",
});

export function Signup() {
  const { signUp, signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = scene.offsetWidth;
      canvas.height = scene.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { x: 0.15, y: 0.25, r: 0.38, hue: 260, sat: 80, phase: 0, speed: 0.0007 },
      { x: 0.8, y: 0.7, r: 0.32, hue: 200, sat: 70, phase: 2.1, speed: 0.0009 },
      {
        x: 0.55,
        y: 0.1,
        r: 0.28,
        hue: 310,
        sat: 75,
        phase: 4.3,
        speed: 0.0006,
      },
      { x: 0.9, y: 0.2, r: 0.22, hue: 170, sat: 65, phase: 1.1, speed: 0.0011 },
      {
        x: 0.2,
        y: 0.85,
        r: 0.25,
        hue: 240,
        sat: 60,
        phase: 3.0,
        speed: 0.0008,
      },
    ];

    let t = 0;
    let raf;

    const draw = () => {
      t++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      orbs.forEach((o) => {
        const pulse = Math.sin(t * o.speed * 6 + o.phase) * 0.12;
        const driftX = Math.sin(t * o.speed + o.phase) * 0.06;
        const driftY = Math.cos(t * o.speed * 1.3 + o.phase) * 0.05;
        const hShift = Math.sin(t * o.speed * 2 + o.phase) * 18;

        const cx = (o.x + driftX) * W;
        const cy = (o.y + driftY) * H;
        const radius = (o.r + pulse) * Math.min(W, H);
        const hue = (o.hue + hShift) % 360;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `hsla(${hue},${o.sat}%,55%,0.22)`);
        g.addColorStop(0.4, `hsla(${hue},${o.sat}%,40%,0.12)`);
        g.addColorStop(1, `hsla(${hue},${o.sat}%,30%,0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleSubmit = async () => {
    setFeedback({ text: "", type: "" });
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setFeedback({ text: error.message, type: "error" });
    } else {
      const { data, error } = await signUp(email, password, fullName);
      if (error) {
        setFeedback({ text: error.message, type: "error" });
      } else if (data?.user?.identities && data.user.identities.length === 0) {
        setFeedback({
          text: "Account already exists. Try signing in.",
          type: "error",
        });
      } else {
        setFeedback({
          text: "Check your inbox to confirm your email.",
          type: "success",
        });
      }
    }
  };

  return (
    <div ref={sceneRef} style={styles.page}>
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 13H2L8 2Z" fill="#000" />
            </svg>
          </div>
          <span style={styles.logoText}>RL3</span>
        </div>

        <h1 style={styles.title}>
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>
        <p style={styles.sub}>
          {isLogin
            ? "Sign in to continue to your workspace."
            : "Start building something great today."}
        </p>

        <div style={styles.oauthRow}>
          <button style={styles.oauthBtn}>
            <svg width="15" height="15" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.251 17.64 11.943 17.64 9.2z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
              />
            </svg>
            Google
          </button>
          <button style={styles.oauthBtn}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.7)"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {feedback.text && (
          <div style={feedbackStyle(feedback.type)}>{feedback.text}</div>
        )}

        <div style={styles.fieldGroup}>
          {!isLogin && (
            <div style={styles.field}>
              <label style={styles.label}>Full name</label>
              <input
                style={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ada Lovelace"
              />
            </div>
          )}
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ada@example.com"
              type="email"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>

        <button style={styles.submitBtn} onClick={handleSubmit}>
          {isLogin ? "Sign in" : "Create account"}
        </button>

        <p style={styles.footerText}>
          {isLogin ? "No account yet? " : "Already have an account? "}
          <a
            style={styles.footerLink}
            onClick={() => {
              setIsLogin(!isLogin);
              setFeedback({ text: "", type: "" });
            }}
          >
            {isLogin ? "Create one" : "Sign in"}
          </a>
        </p>

        <p style={styles.terms}>
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "#555", textDecoration: "none" }}>
            Terms
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "#555", textDecoration: "none" }}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
