import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './Admin.css';

const SubscribersManager = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/newsletter`);
            setSubscribers(response.data.subscribers);
            setLoading(false);
        } catch (err) {
            setError('Error fetching subscribers');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this subscriber?')) {
            try {
                await axios.delete(`${config.API_URL}/newsletter/${id}`);
                setSubscribers(subscribers.filter(sub => sub._id !== id));
            } catch (err) {
                alert('Error deleting subscriber');
            }
        }
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Date Subscribed\n"
            + subscribers.map(sub => `${sub.email},${new Date(sub.createdAt).toLocaleDateString()}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div>Loading subscribers...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-content">
            <div className="admin-header">
                <h2>Newsletter Subscribers</h2>
                <div className="admin-actions">
                    <button onClick={handleExport} className="btn btn-secondary">
                        <i className="fas fa-download"></i> Export CSV
                    </button>
                </div>
            </div>

            <div className="admin-stats" style={{ marginBottom: '20px' }}>
                <div className="stat-card">
                    <h3>Total Subscribers</h3>
                    <p>{subscribers.length}</p>
                </div>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Date Subscribed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.length > 0 ? (
                            subscribers.map(sub => (
                                <tr key={sub._id}>
                                    <td>{sub.email}</td>
                                    <td>{new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(sub._id)}
                                            className="btn-icon delete"
                                            title="Remove Subscriber"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No subscribers yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscribersManager;
