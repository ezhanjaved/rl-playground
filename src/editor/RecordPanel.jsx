import React, { useState, useEffect } from 'react';
import { IoMoonOutline, IoChevronDown, IoChevronUp, IoTimeOutline, IoLibraryOutline } from "react-icons/io5";
import { FaDatabase, FaRegFolderOpen } from "react-icons/fa6";
import "../styling/App.css";

const Section = ({ title, icon, items, loading }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="section">
            <button
                className="sectionHeader"
                style={{ background: open ? "#f5f5f5" : "#ffffff", border: '1px solid #eee' }}
                onClick={() => setOpen(!open)}
            >
                {icon}
                <div className="sectionTitle">
                    <span style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</span>
                    <span className="arrowIcon">
                        {open ? <IoChevronUp /> : <IoChevronDown />}
                    </span>
                </div>
            </button>

            {open && (
                <div style={{ marginTop: '12px', padding: '0 8px' }}>
                    {loading ? (
                        [0, 1, 2].map((i) => (
                            <div key={i} className="record-panel-item" style={{ opacity: 0.5 }}>
                                <div className="record-item-icon">
                                    <FaRegFolderOpen size={14} />
                                </div>
                                <div className="record-item-content">
                                    <span className="record-item-name" style={{ background: '#eee', borderRadius: 4, color: 'transparent', userSelect: 'none' }}>Loading...</span>
                                    <span className="record-item-subtitle" style={{ background: '#f3f3f3', borderRadius: 4, color: 'transparent', userSelect: 'none' }}>...</span>
                                </div>
                            </div>
                        ))
                    ) : items.length === 0 ? (
                        <p style={{ fontSize: '11px', color: '#999', fontStyle: 'italic', padding: '8px 4px' }}>No recent items</p>
                    ) : (
                        items.map((item, idx) => (
                            <div key={idx} className="record-panel-item">
                                <div className="record-item-icon">
                                    {item.icon || <FaRegFolderOpen size={14} />}
                                </div>
                                <div className="record-item-content">
                                    <span className="record-item-name">{item.name}</span>
                                    <span className="record-item-subtitle">{item.subtitle}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

const formatDate = (iso) => {
    if (!iso) return "In progress";
    return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
};

const statusLabel = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
};

const RecordPanel = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch(
                    "https://ureterointestinal-leilani-unspiritualised.ngrok-free.dev/trainer/fetch_models",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_uid: "125810d4-6d11-4d7d-9804-e472a261d345",
                            model_uid: "",
                        }),
                    }
                );
                const result = await response.json();
                setModels(result.models ?? []);
            } catch (err) {
                console.log("Server Error:", err);
                setModels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    // Recent training: last 5 models sorted by created_at desc
    const recentModels = [...models]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
        .map((m) => ({
            name: m.name,
            subtitle: `${statusLabel(m.status)} • ${formatDate(m.completed_at || m.created_at)}`,
            icon: m.status === "training"
                ? <IoTimeOutline size={16} />
                : <IoLibraryOutline size={16} />,
        }));

    // Environments: unique algorithm types used
    const algorithmMap = {};
    models.forEach((m) => {
        if (m.algorithm && !algorithmMap[m.algorithm]) {
            algorithmMap[m.algorithm] = {
                name: m.algorithm,
                subtitle: `${models.filter(x => x.algorithm === m.algorithm).length} model(s)`,
                icon: <FaDatabase size={14} />,
            };
        }
    });
    const algorithms = Object.values(algorithmMap);

    return (
        <div className="library_main">
            <div style={{ padding: '0 8px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#111' }}>Library</h2>
                <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '-8px' }}>Saved environments & models</p>
            </div>

            <Section
                title="Recent Training"
                icon={<IoMoonOutline />}
                items={recentModels}
                loading={loading}
            />

            <Section
                title="Algorithms Used"
                icon={<IoMoonOutline />}
                items={algorithms}
                loading={loading}
            />
        </div>
    );
};

export default RecordPanel;
