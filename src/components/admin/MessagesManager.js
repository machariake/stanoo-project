import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './Admin.css';

const MessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedMessageId, setExpandedMessageId] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/contact`);
            setMessages(response.data.messages);
            setLoading(false);
        } catch (err) {
            setError('Error fetching messages');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await axios.delete(`${config.API_URL}/contact/${id}`);
                setMessages(messages.filter(msg => msg._id !== id));
            } catch (err) {
                alert('Error deleting message');
            }
        }
    };

    const toggleExpand = async (id, isRead) => {
        if (expandedMessageId === id) {
            setExpandedMessageId(null);
        } else {
            setExpandedMessageId(id);
            // Mark as read if not already
            if (!isRead) {
                try {
                    await axios.put(`${config.API_URL}/contact/${id}/read`);
                    // Update local state
                    setMessages(prev => prev.map(msg =>
                        msg._id === id ? { ...msg, read: true } : msg
                    ));
                } catch (err) {
                    console.error('Error marking as read', err);
                }
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="messages-manager">
            <div className="admin-header">
                <h2>Inquiry Messages</h2>
                <div className="badge">{messages.length} Total</div>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>From</th>
                            <th>Service Interest</th>
                            <th>Message Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(msg => (
                            <React.Fragment key={msg._id}>
                                <tr
                                    className={`${!msg.read ? 'unread-row' : ''} ${expandedMessageId === msg._id ? 'expanded-row' : ''}`}
                                    onClick={() => toggleExpand(msg._id, msg.read)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        {new Date(msg.createdAt).toLocaleDateString()}<br />
                                        <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
                                    </td>
                                    <td>
                                        {!msg.read ?
                                            <span className="badge badge-new" style={{ background: '#2d5f3f', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>NEW</span>
                                            : <span style={{ color: '#999' }}>Read</span>
                                        }
                                    </td>
                                    <td>
                                        <strong>{msg.name}</strong><br />
                                        <small>{msg.email}</small>
                                        {msg.phone && <div style={{ fontSize: '11px' }}>{msg.phone}</div>}
                                    </td>
                                    <td>{msg.service ? msg.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-'}</td>
                                    <td>
                                        <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {msg.message}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(msg._id); }}
                                            className="btn btn-small btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {expandedMessageId === msg._id && (
                                    <tr className="message-details-row">
                                        <td colSpan="6" style={{ background: '#f9f9f9', padding: '20px' }}>
                                            <div className="message-full-content">
                                                <h4>Full Message Details</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                                    <div>
                                                        <p><strong>Name:</strong> {msg.name}</p>
                                                        <p><strong>Email:</strong> <a href={`mailto:${msg.email}`}>{msg.email}</a></p>
                                                        <p><strong>Phone:</strong> {msg.phone || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p><strong>Company:</strong> {msg.company || 'N/A'}</p>
                                                        <p><strong>Service:</strong> {msg.service || 'General Inquiry'}</p>
                                                        <p><strong>Date:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <div style={{ background: 'white', padding: '15px', border: '1px solid #eee', borderRadius: '4px' }}>
                                                    <h5 style={{ marginTop: 0 }}>Message:</h5>
                                                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        {messages.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '50px' }}>
                                    <i className="fas fa-inbox" style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}></i>
                                    <p>No messages found yet.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MessagesManager;
