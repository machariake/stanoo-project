import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import ImageUpload from '../common/ImageUpload';
import './Admin.css';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        client: '',
        category: '',
        description: '',
        imageUrl: '',
        beforeImage: '',
        afterImage: '',
        testimonial: '',
        testimonialAuthor: '',
        results: [''] // Array for key results
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/projects/${id}`);
            const project = response.data.project;
            // Ensure results is an array
            if (!project.results || project.results.length === 0) {
                project.results = [''];
            }
            setFormData(project);
        } catch (err) {
            alert('Error fetching project details');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({ ...prev, imageUrl: url }));
    };

    // Result field handlers
    const handleResultChange = (index, value) => {
        const newResults = [...formData.results];
        newResults[index] = value;
        setFormData({ ...formData, results: newResults });
    };

    const addResultField = () => {
        setFormData({ ...formData, results: [...formData.results, ''] });
    };

    const removeResultField = (index) => {
        if (formData.results.length > 1) {
            const newResults = formData.results.filter((_, i) => i !== index);
            setFormData({ ...formData, results: newResults });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Filter out empty results
        const cleanedData = {
            ...formData,
            results: formData.results.filter(r => r.trim() !== '')
        };

        try {
            if (isEditMode) {
                await axios.put(`${config.API_URL}/projects/${id}`, cleanedData);
            } else {
                await axios.post(`${config.API_URL}/projects`, cleanedData);
            }
            navigate('/admin');
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h1>{isEditMode ? 'Edit Project' : 'Create New Project'}</h1>
            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label>Project Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Client Name</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Select Category</option>
                        <option value="Auditing">Auditing</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Training">Training</option>
                        <option value="Construction Safety">Construction Safety</option>
                        <option value="Consultancy">Consultancy</option>
                    </select>
                </div>

                <ImageUpload
                    currentImage={formData.imageUrl}
                    onImageUpload={handleImageUpload}
                    label="Main Project Image"
                />

                <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <ImageUpload
                            currentImage={formData.beforeImage}
                            onImageUpload={(url) => setFormData(prev => ({ ...prev, beforeImage: url }))}
                            label="Before Image (Optional)"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <ImageUpload
                            currentImage={formData.afterImage}
                            onImageUpload={(url) => setFormData(prev => ({ ...prev, afterImage: url }))}
                            label="After Image (Optional)"
                        />
                    </div>
                </div>

                <div className="form-group mt-3">
                    <label>Client Testimonial (Optional)</label>
                    <textarea
                        name="testimonial"
                        value={formData.testimonial || ''}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        placeholder="What did the client say?"
                    />
                </div>
                <div className="form-group">
                    <label>Testimonial Author</label>
                    <input
                        type="text"
                        name="testimonialAuthor"
                        value={formData.testimonialAuthor || ''}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. John Doe, CEO"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label>Key Results (Achievements)</label>
                    {formData.results.map((result, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                value={result}
                                onChange={(e) => handleResultChange(index, e.target.value)}
                                placeholder={`Result ${index + 1}`}
                                className="form-control"
                            />
                            <button
                                type="button"
                                onClick={() => removeResultField(index)}
                                className="btn btn-delete btn-small"
                                disabled={formData.results.length === 1}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addResultField} className="btn btn-secondary btn-small">
                        <i className="fas fa-plus"></i> Add Another Result
                    </button>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
                    </button>
                    <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
