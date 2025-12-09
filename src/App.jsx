import './styling/index.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EnvironmentPage from "./pages/EnvironmentPage";
import BehaviorGraphPage from './pages/BehaviorGraphPage';
import { Signup } from './components/SignUp';
import { Onboarding } from './components/Onboarding';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnvironmentPage />} />
        <Route path="/behavior-graph" element={<BehaviorGraphPage />} />
        <Route path="/signing-in" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  )
}

export default App;