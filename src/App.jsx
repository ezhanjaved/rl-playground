import './styling/index.css';
import { useState } from 'react';
import EnvironmentPage from "./pages/EnvironmentPage";
import BehaviorGraphPage from './pages/BehaviorGraphPage';
import { Signup } from './components/SignUp';
import { Onboarding } from './components/Onboarding';

function App() {
  const [currentPage, setCurrentPage] = useState("environment");

  return currentPage === "environment" ? (
    <EnvironmentPage setCurrentPage={setCurrentPage} />
  ) : (
    <BehaviorGraphPage setCurrentPage={setCurrentPage} />
  );
}

export default App;