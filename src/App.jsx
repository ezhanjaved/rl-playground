import './styling/index.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EnvironmentPage from "./pages/EnvironmentPage";
import BehaviorGraphPage from './pages/BehaviorGraphPage';
import { Signup } from './components/SignUp';
import { Onboarding } from './components/Onboarding';
import ControlPanelPage from './pages/ControlPanelPage'
import { TrainingInfoPage } from './pages/TrainingPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnvironmentPage />} />
        <Route path="/behavior-graph" element={<BehaviorGraphPage />} />
        <Route path="/signing-in" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/control-panel" element={<ControlPanelPage />} />
        <Route path="/training-info" element={<TrainingInfoPage />} />
      </Routes>
    </Router>
  )
}

export default App;