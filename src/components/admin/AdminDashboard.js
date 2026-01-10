import React, { useState } from 'react';
// Trigger rebuild
import PostsManager from './PostsManager';
import ServicesManager from './ServicesManager';
import TestimonialsManager from './TestimonialsManager';
import TeamManager from './TeamManager';
import SettingsManager from './SettingsManager';
import MessagesManager from './MessagesManager';
import SubscribersManager from './SubscribersManager';
import ProjectsManager from './ProjectsManager';
import DashboardOverview from './DashboardOverview'; // Import
import ContentManager from './ContentManager';
import './Admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview'); // Default to overview

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
    };

    return (
        <div className="admin-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Top Bar (Mobile/Header) - Optional, can be merged but keeping separate for now */}

            <div className="admin-layout" style={{ display: 'flex', flex: 1 }}>

                {/* Sidebar */}
                <aside className="admin-sidebar" style={{
                    width: '260px',
                    background: '#1a1c23',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 0',
                    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto'
                }}>
                    <div className="sidebar-header" style={{ padding: '0 20px 20px', borderBottom: '1px solid #333', marginBottom: '20px' }}>
                        <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>TGHS Admin</h2>
                        <p style={{ color: '#888', fontSize: '0.8rem', margin: '5px 0 0' }}>Content Management</p>
                    </div>

                    <nav className="sidebar-nav" style={{ flex: 1 }}>
                        {[
                            { id: 'overview', icon: 'home', label: 'Overview' },
                            { id: 'content', icon: 'edit', label: 'Page Content (CMS)' },
                            { id: 'posts', icon: 'newspaper', label: 'Blog Posts' },
                            { id: 'projects', icon: 'briefcase', label: 'Projects' },
                            { id: 'services', icon: 'tools', label: 'Services' },
                            { id: 'testimonials', icon: 'comment-alt', label: 'Testimonials' },
                            { id: 'team', icon: 'users', label: 'Team Members' },
                            { id: 'messages', icon: 'inbox', label: 'Messages' },
                            { id: 'subscribers', icon: 'envelope-open-text', label: 'Subscribers' },
                            { id: 'settings', icon: 'cogs', label: 'Settings' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '12px 20px',
                                    background: activeTab === item.id ? '#2d5f3f' : 'transparent',
                                    color: activeTab === item.id ? '#fff' : '#aaa',
                                    border: 'none',
                                    borderLeft: activeTab === item.id ? '4px solid #4ade80' : '4px solid transparent',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s'
                                }}
                                className="sidebar-btn"
                            >
                                <i className={`fas fa-${item.icon}`} style={{ width: '25px', textAlign: 'center', marginRight: '10px' }}></i>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="sidebar-footer" style={{ padding: '20px', borderTop: '1px solid #333' }}>
                        <button onClick={handleLogout} className="btn" style={{ width: '100%', background: '#374151', color: '#fff', border: '1px solid #4b5563' }}>
                            <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i> Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="admin-main" style={{ flex: 1, background: '#f8f9fa', padding: '30px', overflowY: 'auto' }}>

                    <div className="admin-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ margin: 0, color: '#333' }}>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                        <a href="https://stanoo-frontend.onrender.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                            <i className="fas fa-external-link-alt" style={{ marginRight: '5px' }}></i> View Live Site
                        </a>
                    </div>

                    <div className="content-wrapper" style={{ background: '#fff', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        {activeTab === 'overview' && <DashboardOverview setActiveTab={setActiveTab} />}
                        {activeTab === 'content' && <ContentManager />}
                        {activeTab === 'posts' && <PostsManager />}
                        {activeTab === 'projects' && <ProjectsManager />}
                        {activeTab === 'services' && <ServicesManager />}
                        {activeTab === 'testimonials' && <TestimonialsManager />}
                        {activeTab === 'team' && <TeamManager />}
                        {activeTab === 'settings' && <SettingsManager />}
                        {activeTab === 'messages' && <MessagesManager />}
                        {activeTab === 'subscribers' && <SubscribersManager />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
