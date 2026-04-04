import React, { useState } from 'react';
import { IoMoonOutline, IoChevronDown, IoChevronUp, IoTimeOutline, IoLibraryOutline } from "react-icons/io5";
import { FaDatabase, FaRegFolderOpen } from "react-icons/fa6";
import "../styling/App.css";

const Section = ({ title, icon, items }) => {
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
                    {items.map((item, idx) => (
                        <div key={idx} className="record-panel-item">
                            <div className="record-item-icon">
                                {item.icon || <FaRegFolderOpen size={14} />}
                            </div>
                            <div className="record-item-content">
                                <span className="record-item-name">{item.name}</span>
                                <span className="record-item-subtitle">{item.subtitle}</span>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <p style={{ fontSize: '11px', color: '#999', fontStyle: 'italic', padding: '8px 4px' }}>No recent items</p>
                    )}
                </div>
            )}
        </div>
    );
};

const RecordPanel = () => {
    const recentModels = [
        { name: "Robot Runner v1", subtitle: "Trained • 15 Mar", icon: <IoLibraryOutline size={16} /> },
        { name: "Drone Scout", subtitle: "Training • In Progress", icon: <IoTimeOutline size={16} /> },
    ];

    const snapshots = [
        { name: "Warehouse-Alpha", subtitle: "Snapshot • 10 Items", icon: <FaDatabase size={14} /> },
        { name: "Forest-X Beta", subtitle: "Snapshot • 15 Items", icon: <FaDatabase size={14} /> },
    ];

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
            />
            
            <Section 
                title="Environments" 
                icon={<IoMoonOutline />} 
                items={snapshots} 
            />
        </div>
    );
};

export default RecordPanel;
