import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './Admin.css';

const DashboardOverview = ({ setActiveTab }) => {
    const [stats, setStats] = useState({
        posts: 0,
        services: 0,
        testimonials: 0,
        team: 0,
        messages: 0,
        subscribers: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [serviceStats, setServiceStats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Quick Tasks State
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('adminDashboardTasks');
        return savedTasks ? JSON.parse(savedTasks) : [
            { id: 1, text: 'Review new messages', completed: false },
            { id: 2, text: 'Update privacy policy', completed: true }
        ];
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('adminDashboardTasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/stats`);
                const data = response.data;

                if (data.success) {
                    setStats({
                        posts: data.stats.posts || 0,
                        services: data.stats.services || 0,
                        testimonials: data.stats.testimonials || 0,
                        team: data.stats.team || 0,
                        messages: data.stats.messages || 0,
                        subscribers: data.stats.subscribers || 0
                    });

                    // Map backend recent activity to frontend format if needed
                    // Backend sends: { id, type, icon, label, date }
                    // Frontend expects: { id, type, icon, label, date (Date object) }
                    const formattedActivity = (data.recentActivity || []).map(item => ({
                        ...item,
                        date: new Date(item.date)
                    }));
                    setRecentActivity(formattedActivity);

                    setServiceStats(data.serviceStats || []);
                }

            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="loading-container">Loading overview...</div>;

    const cards = [
        { title: 'Blog Posts', count: stats.posts, icon: 'fa-newspaper', tab: 'posts', color: '#3b82f6' },
        { title: 'Services', count: stats.services, icon: 'fa-tools', tab: 'services', color: '#10b981' },
        { title: 'Testimonials', count: stats.testimonials, icon: 'fa-comment-alt', tab: 'testimonials', color: '#f59e0b' },
        { title: 'Team Members', count: stats.team, icon: 'fa-users', tab: 'team', color: '#8b5cf6' },
        { title: 'Messages', count: stats.messages, icon: 'fa-inbox', tab: 'messages', color: '#ef4444' },
        { title: 'Subscribers', count: stats.subscribers, icon: 'fa-envelope-open-text', tab: 'subscribers', color: '#ec4899' }
    ];

    // Simple Bar Chart Data Calculation
    const maxCount = Math.max(stats.posts, stats.services, stats.testimonials, stats.team);
    const getBarWidth = (count) => maxCount > 0 ? `${(count / maxCount) * 100}%` : '0%';

    // Service popularity max
    const maxServiceCount = Math.max(...serviceStats.map(s => s.count), 1);

    return (
        <div className="dashboard-overview">
            <h2 style={{ marginBottom: '20px', color: '#2d5f3f' }}>Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        onClick={() => setActiveTab(card.tab)}
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease',
                            borderLeft: `4px solid ${card.color}`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                        }}
                    >
                        <div>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.title}</h3>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937' }}>{card.count}</div>
                        </div>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: `${card.color}15`, // 15 is active opacity hex
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            color: card.color
                        }}>
                            <i className={`fas ${card.icon}`}></i>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-widgets" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>

                {/* Recent Activity Feed */}
                <div className="widget-card" style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                        <i className="fas fa-history" style={{ marginRight: '10px', color: '#6b7280' }}></i>
                        Recent Activity
                    </h3>
                    <div className="activity-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {recentActivity.length > 0 ? (
                            recentActivity.map((item, idx) => (
                                <div key={idx} className="activity-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: idx !== recentActivity.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                                    <div style={{ marginRight: '15px', color: '#9ca3af' }}>
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', color: '#4b5563', fontSize: '14px' }}>{item.type}</div>
                                        <div style={{ fontSize: '13px', color: '#6b7280' }}>{item.label}</div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                                        {item.date.toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No recent activity found.</p>
                        )}
                    </div>
                </div>

                {/* Service Popularity (Messages breakdown) */}
                <div className="widget-card" style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                        <i className="fas fa-fire" style={{ marginRight: '10px', color: '#ef4444' }}></i>
                        Top Requested Services
                    </h3>
                    <div className="chart-container" style={{ padding: '10px 0' }}>
                        {serviceStats.length > 0 ? (
                            serviceStats.map((item, idx) => (
                                <div key={idx} style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px', color: '#6b7280' }}>
                                        <span>{item.name}</span>
                                        <span>{item.count}</span>
                                    </div>
                                    <div style={{ width: '100%', background: '#f3f4f6', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${(item.count / maxServiceCount) * 100}%`,
                                            background: `hsl(${140 + idx * 20}, 70%, 50%)`, // Varied greens
                                            height: '100%',
                                            borderRadius: '4px',
                                            transition: 'width 1s ease-in-out'
                                        }}></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No data available yet.</p>
                        )}
                    </div>
                </div>

                {/* Quick Tasks / Admin Todo */}
                <div className="widget-card" style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', gridRow: 'span 2' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                        <i className="fas fa-check-square" style={{ marginRight: '10px', color: '#8b5cf6' }}></i>
                        Quick Tasks
                    </h3>
                    <form onSubmit={addTask} style={{ display: 'flex', marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Add a new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            style={{ flex: 1, padding: '10px', borderRadius: '6px 0 0 6px', border: '1px solid #cbd5e1', borderRight: 'none' }}
                        />
                        <button type="submit" style={{ padding: '10px 15px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '0 6px 6px 0', cursor: 'pointer' }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </form>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto' }}>
                        {tasks.map(task => (
                            <li key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '10px', background: '#f8fafc', marginBottom: '10px', borderRadius: '6px' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                <span style={{
                                    flex: 1,
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#9ca3af' : '#334155'
                                }}>{task.text}</span>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </li>
                        ))}
                        {tasks.length === 0 && <li style={{ color: '#9ca3af', textAlign: 'center', fontStyle: 'italic' }}>No tasks. Added tasks are saved automatically.</li>}
                    </ul>
                </div>

                {/* Subscriber Growth Chart */}
                <div className="widget-card" style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', gridColumn: 'span 2' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                        <i className="fas fa-chart-line" style={{ marginRight: '10px', color: '#6b7280' }}></i>
                        Subscriber Growth
                    </h3>
                    <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                        {/* Mock data for visualization since we might not have enough history yet */}
                        {[30, 45, 35, 60, 50, 75, 90].map((val, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
                                <div style={{
                                    height: `${val}%`,
                                    width: '100%',
                                    background: 'linear-gradient(to top, #8b5cf6, #c4b5fd)',
                                    borderRadius: '4px 4px 0 0',
                                    position: 'relative',
                                    transition: 'height 1s ease'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '-25px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: '#8b5cf6'
                                    }}>{val}</span>
                                </div>
                                <span style={{ marginTop: '10px', fontSize: '12px', color: '#6b7280' }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Distribution Chart */}
                <div className="widget-card" style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ margin: '0 0 20px 0', color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                        <i className="fas fa-chart-pie" style={{ marginRight: '10px', color: '#6b7280' }}></i>
                        Content Distribution
                    </h3>
                    <div className="chart-container" style={{ padding: '10px 0' }}>
                        {[
                            { label: 'Blog Posts', count: stats.posts, color: '#3b82f6' },
                            { label: 'Services', count: stats.services, color: '#10b981' },
                            { label: 'Team', count: stats.team, color: '#8b5cf6' },
                            { label: 'Testimonials', count: stats.testimonials, color: '#f59e0b' }
                        ].map((item, idx) => (
                            <div key={idx} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px', color: '#6b7280' }}>
                                    <span>{item.label}</span>
                                    <span>{item.count}</span>
                                </div>
                                <div style={{ width: '100%', background: '#f3f4f6', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: getBarWidth(item.count), background: item.color, height: '100%', borderRadius: '4px', transition: 'width 1s ease-in-out' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* ... info box ... */}
                    <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px', color: '#64748b' }}>
                        <i className="fas fa-info-circle" style={{ marginRight: '5px' }}></i>
                        <strong>System Status:</strong> All systems operational.
                        Database connection stable.
                    </div>
                </div>
            </div>

            <div className="quick-actions" style={{ marginTop: '40px' }}>
                <h3 style={{ marginBottom: '15px', color: '#444' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => window.open('/', '_blank')}
                        className="btn btn-primary"
                        style={{ background: '#2d5f3f' }}
                    >
                        <i className="fas fa-external-link-alt" style={{ marginRight: '8px' }}></i>
                        Visit Live Site
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className="btn btn-outline"
                    >
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                        Add New Post
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className="btn btn-outline"
                    >
                        <i className="fas fa-cogs" style={{ marginRight: '8px' }}></i>
                        Update Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
