import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import { Table } from "../components/table";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const RecordPage = () => {
  const navigate = useNavigate();

  const [modelsData, setData] = useState(null);

  const fetchModels = async () => {
    const url = "http://127.0.0.1:8000/trainer/fetch_models";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_uid: "125810d4-6d11-4d7d-9804-e472a261d345",
        }),
      });

      const result = await response.json();
      const models = result.models;
      setData(models);
    } catch (err) {
      console.log("Server Error:", err);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const columns = [
    { key: "name", label: "Model Name", width: "30%" },
    { key: "env", label: "Environment", width: "20%" },
    { key: "status", label: "Status", width: "20%" },
    { key: "date", label: "Trained On", width: "20%" },
  ];

  const data = [
    {
      id: "m1",
      name: "Robot Runner v1",
      env: "Warehouse-Alpha",
      status: "Trained",
      date: "2026-03-15",
    },
    {
      id: "m2",
      name: "Drone Scout",
      env: "Forest-X",
      status: "Training",
      date: "In Progress",
    },
    {
      id: "m3",
      name: "Car Navigator",
      env: "City-Grid",
      status: "Trained",
      date: "2026-04-01",
    },
    {
      id: "m4",
      name: "Arm Manipulator",
      env: "Factory-Floor",
      status: "Trained",
      date: "2026-04-03",
    },
  ];

  const actions = {
    onView: (item) => {
      if (item.status === "Trained") {
        navigate(`/visualize/${item.id}`);
      } else {
        alert("Model is still training. Visualization not available yet.");
      }
    },
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className={`card-icon-box ${colorClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-subtitle">{subtitle}</div>
    </div>
  );

  return (
    <div className="container">
      <Header />
      <SidebarV2 />
      <main className="dashboard-main">
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <header className="dashboard-header">
            <div className="dashboard-title-row">
              <div className="title-line-accent"></div>
              <h1 className="dashboard-title">Models Record</h1>
            </div>
            <p className="dashboard-subtitle">
              Central hub for your training sessions and environment snapshots.
            </p>
          </header>

          <div className="stat-cards-grid">
            <StatCard
              title="Total Models"
              value="12"
              subtitle="4 trained successfully"
              icon={Eye}
              colorClass="icon-indigo"
            />
            <StatCard
              title="Active Training"
              value="2"
              subtitle="Running on Cloud-Compute-01"
              icon={Eye}
              colorClass="icon-amber"
            />
            <StatCard
              title="Snapshots"
              value="8"
              subtitle="3.4 GB total storage"
              icon={Eye}
              colorClass="icon-emerald"
            />
          </div>

          <div className="registry-container">
            <Table
              title="Model Registry"
              columns={columns}
              data={modelsData === null ? data : modelsData}
              keyField="id"
              actions={actions}
              totalResults={data.length}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordPage;
