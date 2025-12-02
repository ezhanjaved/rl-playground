import './styling/index.css';
import { useState } from 'react';
import EnvironmentPage from "./pages/EnvironmentPage";
import BehaviorGraphPage from './pages/BehaviorGraphPage';
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  const [currentPage, setCurrentPage] = useState("environment");

  return currentPage === "environment" ? (
    <EnvironmentPage setCurrentPage={setCurrentPage} />
  ) : (
    <ReactFlowProvider>
        <BehaviorGraphPage setCurrentPage={setCurrentPage} />
    </ReactFlowProvider>
  );
}

export default App;