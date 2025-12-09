import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/testimonials`);
            setTestimonials(response.data.testimonials);
            setLoading(false);
        } catch (err) {
            setError('Error fetching testimonials');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await axios.delete(`${config.API_URL}/testimonials/${id}`);
                setTestimonials(testimonials.filter(t => t._id !== id));
            } catch (err) {
                alert('Error deleting testimonial');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="testimonials-manager">
            <div className="admin-header">
                <h2>Manage Testimonials</h2>
                <Link to="/admin/testimonials/create" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add New
                </Link>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role/Company</th>
                            <th>Quote</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                                <td>"{item.quote?.substring(0, 50)}..."</td>
                                <td>{item.order}</td>
                                <td>
                                    <Link to={`/admin/testimonials/edit/${item._id}`} className="btn btn-small btn-edit">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-small btn-delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No testimonials found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TestimonialsManager;
