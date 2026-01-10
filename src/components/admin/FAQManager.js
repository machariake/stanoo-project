import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useToast } from '../../context/ToastContext';
import './Admin.css';

const FAQManager = () => {
    const { addToast } = useToast();
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'General',
        order: 0
    });

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/faqs`);
            if (response.data.faqs) {
                setFaqs(response.data.faqs.sort((a, b) => a.order - b.order));
            }
        } catch (err) {
            console.error('Error fetching FAQs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${config.API_URL}/faqs/${editId}`, formData);
                addToast('FAQ updated successfully', 'success');
            } else {
                await axios.post(`${config.API_URL}/faqs`, formData);
                addToast('FAQ added successfully', 'success');
            }
            setIsEditing(false);
            setEditId(null);
            setFormData({ question: '', answer: '', category: 'General', order: 0 });
            fetchFaqs();
        } catch (err) {
            addToast('Error saving FAQ', 'error');
        }
    };

    const handleEdit = (faq) => {
        setFormData(faq);
        setEditId(faq._id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await axios.delete(`${config.API_URL}/faqs/${id}`);
                addToast('FAQ deleted', 'success');
                fetchFaqs();
            } catch (err) {
                addToast('Error deleting FAQ', 'error');
            }
        }
    };

    return (
        <div className="manager-container">
            <h3>Manage FAQs</h3>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Question</label>
                    <input type="text" name="question" value={formData.question} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Answer</label>
                    <textarea name="answer" value={formData.answer} onChange={handleChange} required className="form-control" rows="3"></textarea>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="form-control">
                            <option value="General">General</option>
                            <option value="Services">Services</option>
                            <option value="Training">Training</option>
                            <option value="Billing">Billing</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label>Order (Display Priority)</label>
                        <input type="number" name="order" value={formData.order} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update FAQ' : 'Add FAQ'}</button>
                {isEditing && <button type="button" className="btn btn-secondary ml-2" onClick={() => { setIsEditing(false); setFormData({ question: '', answer: '', category: 'General', order: 0 }); }}>Cancel</button>}
            </form>

            <div className="list-container mt-4">
                <h4>Existing FAQs</h4>
                {loading ? <p>Loading...</p> : (
                    <div className="faq-list">
                        {faqs.map(faq => (
                            <div key={faq._id} className="admin-list-item">
                                <div className="item-content">
                                    <strong>Q: {faq.question}</strong>
                                    <p className="text-muted small">A: {faq.answer.substring(0, 50)}...</p>
                                </div>
                                <div className="item-actions">
                                    <button className="btn-icon" onClick={() => handleEdit(faq)}><i className="fas fa-edit"></i></button>
                                    <button className="btn-icon delete" onClick={() => handleDelete(faq._id)}><i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQManager;
