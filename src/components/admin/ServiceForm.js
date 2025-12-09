import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import ImageUpload from '../common/ImageUpload';
import './Admin.css'; // Reusing admin styles

const ServiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        icon: 'fas fa-check', // Default icon
        shortDescription: '',
        fullDescription: '',
        features: '',
        order: 0,
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditing) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/services/${id}`);
            const service = response.data.service;
            setFormData({
                ...service,
                features: service.features ? service.features.join('\n') : '',
                imageUrl: service.imageUrl || ''
            });
        } catch (err) {
            setError('Error fetching service details');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({ ...prev, imageUrl: url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const serviceData = {
            ...formData,
            features: formData.features.split('\n').filter(f => f.trim() !== '')
        };

        try {
            if (isEditing) {
                await axios.put(`${config.API_URL}/services/${id}`, serviceData);
            } else {
                await axios.post(`${config.API_URL}/services`, serviceData);
            }
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving service');
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>{isEditing ? 'Edit Service' : 'Create New Service'}</h1>
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label>Service Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <ImageUpload
                    currentImage={formData.imageUrl}
                    onImageUpload={handleImageUpload}
                    label="Service Image (appears on details page)"
                />

                <div className="form-group">
                    <label>Icon Class (FontAwesome)</label>
                    <input
                        type="text"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g., fas fa-shield-alt"
                        required
                    />
                    <small>Find icons at <a href="https://fontawesome.com/v5/search?m=free" target="_blank" rel="noreferrer">FontAwesome</a></small>
                    <div style={{ marginTop: '10px' }}>
                        Preview: <i className={formData.icon} style={{ fontSize: '24px', color: '#2d5f3f' }}></i>
                    </div>
                </div>

                <div className="form-group">
                    <label>Order (Display Priority)</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Short Description (for Cards)</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Full Description (for Details Page)</label>
                    <textarea
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        className="form-control"
                        rows="6"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Features (One per line)</label>
                    <textarea
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        className="form-control"
                        rows="5"
                        placeholder="Workplace hazard identification&#10;Compliance audits&#10;Safety management..."
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
                    </button>
                    <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;
