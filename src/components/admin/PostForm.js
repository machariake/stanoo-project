import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import ImageUpload from '../common/ImageUpload';
import MultiImageUpload from '../common/MultiImageUpload';
import './Admin.css';

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        readTime: '',
        imageUrl: 'post-default',
        galleryImages: [],
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/blog/posts/${id}`);
            // Ensure date is formatted for input
            const post = response.data.post;
            if (post.date && post.date.includes('T')) {
                post.date = post.date.split('T')[0];
            }
            setFormData(post);
        } catch (err) {
            alert('Error fetching post details');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (url) => {
        setFormData(prev => ({ ...prev, imageUrl: url }));
    };

    const handleGalleryUpdate = (images) => {
        setFormData(prev => ({ ...prev, galleryImages: images }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditMode) {
                await axios.put(`${config.API_URL}/blog/posts/${id}`, formData);
            } else {
                await axios.post(`${config.API_URL}/blog/posts`, formData);
            }
            navigate('/admin');
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h1>{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>
            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label>Title</label>
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
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="form-control"
                    >
                        <option value="">Select Category</option>
                        <option value="Safety Technology">Safety Technology</option>
                        <option value="Environmental Management">Environmental Management</option>
                        <option value="Safety Culture">Safety Culture</option>
                        <option value="Risk Management">Risk Management</option>
                        <option value="Sustainability">Sustainability</option>
                        <option value="Emergency Management">Emergency Management</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Training">Training</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Read Time (e.g., "5 min read")</label>
                    <input
                        type="text"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>

                <ImageUpload
                    currentImage={formData.imageUrl}
                    onImageUpload={handleImageUpload}
                    label="Featured Image"
                />

                <MultiImageUpload
                    currentImages={formData.galleryImages || []}
                    onImagesUpdate={handleGalleryUpdate}
                    label="Article Gallery (Optional)"
                    maxImages={10}
                />

                <div className="form-group">
                    <label>Excerpt (Short summary)</label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="10"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post')}
                    </button>
                    <button type="button" onClick={() => navigate('/admin')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
