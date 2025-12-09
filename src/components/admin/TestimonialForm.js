import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import ImageUpload from '../common/ImageUpload';
import './Admin.css';

const TestimonialForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        quote: '',
        order: 0,
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditing) {
            fetchTestimonial();
        }
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/testimonials/${id}`);
            const testimonial = response.data.testimonial;
            setFormData({
                ...testimonial,
                imageUrl: testimonial.imageUrl || ''
            });
        } catch (err) {
            setError('Error fetching testimonial details');
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

        try {
            if (isEditing) {
                await axios.put(`${config.API_URL}/testimonials/${id}`, formData);
            } else {
                await axios.post(`${config.API_URL}/testimonials`, formData);
            }
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving testimonial');
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label>Client Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Role & Company</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. Safety Manager, ABC Construction"
                        required
                    />
                </div>

                <ImageUpload
                    currentImage={formData.imageUrl}
                    onImageUpload={handleImageUpload}
                    label="Client Photo / Company Logo"
                />

                <div className="form-group">
                    <label>Quote</label>
                    <textarea
                        name="quote"
                        value={formData.quote}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        required
                    ></textarea>
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

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (isEditing ? 'Save Testimonial' : 'Add Testimonial')}
                    </button>
                    <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestimonialForm;
