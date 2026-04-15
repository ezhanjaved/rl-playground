import Header from "../components/Header";
import SidebarV2 from "../components/SidebarV2";
import { Table } from "../components/table";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const COLUMNS = [
  { key: "name",      label: "Model Name",   width: "22%" },
  { key: "algorithm", label: "Algorithm",    width: "12%" },
  { key: "status",    label: "Status",       width: "14%" },
  {
    key: "created_at",
    label: "Created",
    width: "20%",
    render: (item) => formatDate(item.created_at),
  },
  {
    key: "total_timestep",
    label: "Timesteps",
    width: "12%",
    render: (item) =>
      item.total_timestep != null
        ? item.total_timestep.toLocaleString()
        : "—",
  },
  {
    key: "reward_final",
    label: "Final reward",
    width: "12%",
    render: (item) =>
      item.reward_final != null ? Number(item.reward_final).toFixed(2) : "—",
  },
  {
    key: "error",
    label: "Error",
    render: (item) =>
      item.error ? (
        <span style={{ color: "var(--color-text-danger)", fontSize: "13px" }}>
          {item.error}
        </span>
      ) : (
        "—"
      ),
  },
];

const RecordPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [modelsData, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    if (!user?.id) return;

    const url = `${import.meta.env.VITE_API_BASE_URL}/trainer/fetch_models`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_uid: user.id,
          model_uid: "",
        }),
      });
      const result = await response.json();
      setData(result.models ?? []);
    } catch (err) {
      console.log("Server Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchModels();
    }
  }, [user?.id]);

  const total    = modelsData?.length ?? 0;
  const finished = modelsData?.filter((m) => m.status === "finished").length ?? 0;
  const training = modelsData?.filter((m) => m.status === "training").length ?? 0;

  const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className={`card-icon-box ${colorClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="stat-card-value">{loading ? "—" : value}</div>
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
              value={total}
              subtitle={`${finished} trained successfully`}
              icon={BrainCircuit}
              colorClass="icon-indigo"
            />
            <StatCard
              title="Active Training"
              value={training}
              subtitle={training > 0 ? "Currently running" : "None running"}
              icon={Loader2}
              colorClass="icon-amber"
            />
            <StatCard
              title="Finished"
              value={finished}
              subtitle={`${total > 0 ? Math.round((finished / total) * 100) : 0}% success rate`}
              icon={CheckCircle2}
              colorClass="icon-emerald"
            />
          </div>

          <div className="registry-container">
            <Table
              title="Model Registry"
              columns={COLUMNS}
              data={modelsData ?? []}
              keyField="id"
              loading={loading}
              actions
              totalResults={total}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordPage;
