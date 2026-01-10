import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useToast } from '../../context/ToastContext';

const ResourcesManager = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/resources`);
            setResources(response.data.resources || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching resources:', err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            try {
                await axios.delete(`${config.API_URL}/resources/${id}`);
                setResources(resources.filter(res => res._id !== id));
                showToast('Resource deleted successfully', 'success');
            } catch (err) {
                showToast('Error deleting resource', 'error');
            }
        }
    };

    if (loading) return <div>Loading resources...</div>;

    return (
        <div className="manager-container fade-in">
            <div className="manager-header">
                <h3>Downloads & Resources</h3>
                <Link to="/admin/resources/create" className="btn btn-primary btn-sm">
                    <i className="fas fa-plus"></i> Add New Resource
                </Link>
            </div>

            {resources.length === 0 ? (
                <p className="no-data">No resources uploaded yet.</p>
            ) : (
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Downloads</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((res) => (
                                <tr key={res._id}>
                                    <td>
                                        <strong>{res.title}</strong>
                                        <br />
                                        <small>{res.description.substring(0, 50)}...</small>
                                    </td>
                                    <td><span className="badge">{res.type}</span></td>
                                    <td>{res.category}</td>
                                    <td><a href={res.downloadUrl} target="_blank" rel="noreferrer"><i className="fas fa-download"></i> Link</a></td>
                                    <td>
                                        <Link to={`/admin/resources/edit/${res._id}`} className="action-btn edit">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(res._id)} className="action-btn delete">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ResourcesManager;
