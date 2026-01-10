import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { useToast } from '../../context/ToastContext';
import './Admin.css';

const TrainingManager = () => {
    const { addToast } = useToast();
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        price: '',
        seats: ''
    });

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/training`);
            if (response.data.training) {
                setTrainings(response.data.training);
            }
        } catch (err) {
            console.error('Error fetching training:', err);
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
                await axios.put(`${config.API_URL}/training/${editId}`, formData);
                addToast('Training session updated successfully', 'success');
            } else {
                await axios.post(`${config.API_URL}/training`, formData);
                addToast('Training session added successfully', 'success');
            }
            setIsEditing(false);
            setEditId(null);
            setFormData({ title: '', date: '', time: '', location: '', price: '', seats: '' });
            fetchTraining();
        } catch (err) {
            addToast('Error saving training session', 'error');
        }
    };

    const handleEdit = (session) => {
        setFormData(session);
        setEditId(session._id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this session?')) {
            try {
                await axios.delete(`${config.API_URL}/training/${id}`);
                addToast('Session deleted', 'success');
                fetchTraining();
            } catch (err) {
                addToast('Error deleting session', 'error');
            }
        }
    };

    return (
        <div className="manager-container">
            <h3>Manage Training Calendar</h3>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Training Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label>Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="form-control" />
                    </div>
                    <div className="form-group col">
                        <label>Time</label>
                        <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="e.g. 9:00 AM - 4:00 PM" required className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label>Price</label>
                        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. KES 5,000" className="form-control" />
                    </div>
                    <div className="form-group col">
                        <label>Available Seats</label>
                        <input type="number" name="seats" value={formData.seats} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update Session' : 'Add Session'}</button>
                {isEditing && <button type="button" className="btn btn-secondary ml-2" onClick={() => { setIsEditing(false); setFormData({ title: '', date: '', time: '', location: '', price: '', seats: '' }); }}>Cancel</button>}
            </form>

            <div className="list-container mt-4">
                <h4>Upcoming Sessions</h4>
                {loading ? <p>Loading...</p> : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainings.map(session => (
                                <tr key={session._id}>
                                    <td>{session.date}</td>
                                    <td>{session.title}</td>
                                    <td>{session.location}</td>
                                    <td>
                                        <button className="btn-icon" onClick={() => handleEdit(session)}><i className="fas fa-edit"></i></button>
                                        <button className="btn-icon delete" onClick={() => handleDelete(session._id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TrainingManager;
