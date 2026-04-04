import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SidebarV2 from '../components/SidebarV2';
import { ArrowLeft } from 'lucide-react';

const VisualizePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="container">
            <Header />
            <SidebarV2 />
            <main className="dashboard-main">
                <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
                    <button 
                        onClick={() => navigate(-1)}
                        className="btn-back-records"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Records</span>
                    </button>
                    
                    <div className="bg-white rounded-3xl p-12 border border-zinc-100 shadow-sm text-center">
                        <h1 className="text-3xl font-extrabold text-zinc-900 mb-4">
                            Visualizing Model: <span className="text-indigo-600">{id}</span>
                        </h1>
                        <p className="text-zinc-500 text-lg mb-8 max-w-2xl mx-auto">
                            This page will integrate with your S3 bucket and environment data to provide a full 3D visualization of the trained model's behaviors and interactions.
                        </p>
                        
                        <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-200">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <p className="font-bold text-zinc-400 uppercase tracking-widest text-sm">Visualization Engine Initializing...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VisualizePage;
