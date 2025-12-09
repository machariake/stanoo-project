import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/services`);
            setServices(response.data.services);
            setLoading(false);
        } catch (err) {
            setError('Error fetching services');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`${config.API_URL}/services/${id}`);
                setServices(services.filter(service => service._id !== id));
            } catch (err) {
                alert('Error deleting service');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="services-manager">
            <div className="admin-header">
                <h2>Manage Services</h2>
                <Link to="/admin/services/create" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add New Service
                </Link>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Title</th>
                            <th>Short Description</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service._id}>
                                <td><i className={service.icon}></i></td>
                                <td>{service.title}</td>
                                <td>{service.shortDescription?.substring(0, 50)}...</td>
                                <td>{service.order}</td>
                                <td>
                                    <Link to={`/admin/services/edit/${service._id}`} className="btn btn-small btn-edit">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(service._id)} className="btn btn-small btn-delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No services found. Add one to get started!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesManager;
