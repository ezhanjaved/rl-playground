import "./styling/index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EnvironmentPage from "./pages/EnvironmentPage";
import BehaviorGraphPage from "./pages/BehaviorGraphPage";
import { Signup } from "./components/SignUp";
import { Onboarding } from "./components/Onboarding";
import ControlPanelPage from "./pages/ControlPanelPage";
import { TrainingInfoPage } from "./pages/TrainingPage";
import RecordPage from "./pages/RecordPage";
import VisualizePage from "./pages/VisualizePage";
import { HomePage } from "./pages/HomePage";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { LoadingModal } from "./components/LoadingModal";
import { useRunTimeStore } from "./stores/useRunTimeStore";

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const { isModelReady, setShowLoadingModal } = useRunTimeStore();

  useEffect(() => {
    if (isModelReady) {
      setTimeout(() => setShowLoadingModal(false), 800);
    }
  }, [isModelReady]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "var(--color-bg-base)",
        }}
      >
        <span style={{ color: "var(--color-text-secondary)" }}>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <LoadingModal /> {/* ← always mounted, portal controls visibility */}
      <Router>
        <Routes>
          <Route
            path="/signing-in"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route
            path="/"
            element={
              user ? <HomePage /> : <Navigate to="/signing-in" replace />
            }
          />
          <Route
            path="/entities"
            element={
              user ? <EnvironmentPage /> : <Navigate to="/signing-in" replace />
            }
          />
          <Route
            path="/behavior-graph"
            element={
              user ? (
                <BehaviorGraphPage />
              ) : (
                <Navigate to="/signing-in" replace />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              user ? <Onboarding /> : <Navigate to="/signing-in" replace />
            }
          />
          <Route
            path="/control-panel"
            element={
              user ? (
                <ControlPanelPage />
              ) : (
                <Navigate to="/signing-in" replace />
              )
            }
          />
          <Route
            path="/training-info"
            element={
              user ? (
                <TrainingInfoPage />
              ) : (
                <Navigate to="/signing-in" replace />
              )
            }
          />
          <Route
            path="/records"
            element={
              user ? <RecordPage /> : <Navigate to="/signing-in" replace />
            }
          />
          <Route
            path="/visualize/:id"
            element={
              user ? <VisualizePage /> : <Navigate to="/signing-in" replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
