import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import ImageUpload from '../common/ImageUpload';
import './Admin.css';

const TeamForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        credentials: '',
        order: 0,
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditing) {
            fetchMember();
        }
    }, [id]);

    const fetchMember = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/team/${id}`);
            const member = response.data.member;
            setFormData({
                ...member,
                credentials: member.credentials ? member.credentials.join('\n') : '',
                imageUrl: member.imageUrl || ''
            });
        } catch (err) {
            setError('Error fetching team member details');
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

        const teamData = {
            ...formData,
            credentials: formData.credentials.split('\n').filter(c => c.trim() !== '')
        };

        try {
            if (isEditing) {
                await axios.put(`${config.API_URL}/team/${id}`, teamData);
            } else {
                await axios.post(`${config.API_URL}/team`, teamData);
            }
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving team member');
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label>Name</label>
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
                    <label>Role / Position</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <ImageUpload
                    currentImage={formData.imageUrl}
                    onImageUpload={handleImageUpload}
                    label="Profile Photo"
                />

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Credentials (One per line)</label>
                    <textarea
                        name="credentials"
                        value={formData.credentials}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        placeholder="MSc Environmental Management&#10;Certified HSE Professional"
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
                        {loading ? 'Saving...' : (isEditing ? 'Save Member' : 'Add Member')}
                    </button>
                    <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeamForm;
