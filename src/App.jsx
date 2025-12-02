import './styling/index.css';
import { useState } from 'react';
import EnvironmentPage from "./pages/EnvironmentPage";
import BehaviorGraphPage from './pages/BehaviorGraphPage';

function App() {
  const [currentPage, setCurrentPage] = useState("environment");

  return currentPage === "environment" ? (
    <EnvironmentPage setCurrentPage={setCurrentPage} />
  ) : (
    <BehaviorGraphPage setCurrentPage={setCurrentPage} />
  );
}

export default App;