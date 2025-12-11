import React, { useState } from 'react';
import PostsManager from './PostsManager';
import ServicesManager from './ServicesManager';
import TestimonialsManager from './TestimonialsManager';
import TeamManager from './TeamManager';
import SettingsManager from './SettingsManager';
import MessagesManager from './MessagesManager';
import SubscribersManager from './SubscribersManager';
import ProjectsManager from './ProjectsManager';
import DashboardOverview from './DashboardOverview'; // Import
import './Admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview'); // Default to overview

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
    };

    return (
        <div className="admin-container">
            <div className="admin-header-main" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                borderBottom: '2px solid #2d5f3f',
                paddingBottom: '20px'
            }}>
                <div>
                    <h1 style={{ color: '#2d5f3f', margin: 0 }}>Content Management System</h1>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>Theuri Green Health Safe</p>
                </div>
                <div>
                    <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginRight: '10px' }}>
                        View Live Site
                    </a>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ background: '#dc3545', borderColor: '#dc3545', color: 'white' }}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="admin-tabs" style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid #ddd', overflowX: 'auto' }}>
                <button
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'overview' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'overview' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'overview' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
                    Overview
                </button>
                <button
                    className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('posts')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'posts' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'posts' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'posts' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-newspaper" style={{ marginRight: '8px' }}></i>
                    Blog
                </button>
                <button
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'projects' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'projects' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'projects' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-briefcase" style={{ marginRight: '8px' }}></i>
                    Projects
                </button>
                <button
                    className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
                    onClick={() => setActiveTab('services')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'services' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'services' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'services' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-tools" style={{ marginRight: '8px' }}></i>
                    Services
                </button>
                <button
                    className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
                    onClick={() => setActiveTab('testimonials')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'testimonials' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'testimonials' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'testimonials' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-comment-alt" style={{ marginRight: '8px' }}></i>
                    Testimonials
                </button>
                <button
                    className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
                    onClick={() => setActiveTab('team')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'team' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'team' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'team' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-users" style={{ marginRight: '8px' }}></i>
                    Team
                </button>
                <button
                    className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'messages' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'messages' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'messages' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-inbox" style={{ marginRight: '8px' }}></i>
                    Messages
                </button>
                <button
                    className={`tab-btn ${activeTab === 'subscribers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('subscribers')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'subscribers' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'subscribers' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'subscribers' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-envelope-open-text" style={{ marginRight: '8px' }}></i>
                    Subscribers
                </button>
                <button
                    className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                    style={{
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'settings' ? '3px solid #2d5f3f' : '3px solid transparent',
                        color: activeTab === 'settings' ? '#2d5f3f' : '#666',
                        fontWeight: activeTab === 'settings' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '15px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <i className="fas fa-cogs" style={{ marginRight: '8px' }}></i>
                    Settings
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'overview' && <DashboardOverview setActiveTab={setActiveTab} />}
                {activeTab === 'posts' && <PostsManager />}
                {activeTab === 'projects' && <ProjectsManager />}
                {activeTab === 'services' && <ServicesManager />}
                {activeTab === 'testimonials' && <TestimonialsManager />}
                {activeTab === 'team' && <TeamManager />}
                {activeTab === 'settings' && <SettingsManager />}
                {activeTab === 'messages' && <MessagesManager />}
                {activeTab === 'subscribers' && <SubscribersManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;
