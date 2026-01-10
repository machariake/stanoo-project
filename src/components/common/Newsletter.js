import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useToast } from '../../context/ToastContext';

const Newsletter = ({ style, className }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await axios.post(`${config.API_URL}/newsletter`, { email });
            if (response.data.success) {
                setStatus('success');
                setEmail('');
                addToast('Successfully subscribed to the newsletter!', 'success');
            }
        } catch (err) {
            console.error('Newsletter error:', err);
            setStatus('error');
            const msg = err.response?.data?.message || 'Subscription failed. Please try again.';
            addToast(msg, 'error');
        } finally {
            if (status !== 'success') {
                setStatus('idle');
            }
        }
    };

    return (
        <div className={`newsletter-container ${className || ''}`} style={style}>
            {status === 'success' ? (
                <div className="success-message text-center">
                    <i className="fas fa-check-circle gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                    <h3>Thank You!</h3>
                    <p>You've successfully subscribed to our newsletter.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="newsletter-form">
                    <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                            style={{ flex: 1 }}
                        />
                        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                            {status === 'loading' ? <i className="fas fa-spinner fa-spin"></i> : 'Subscribe'}
                        </button>
                    </div>
                    {status === 'error' && <p className="text-danger small mt-2">Something went wrong. Please try again.</p>}
                </form>
            )}
        </div>
    );
};

export default Newsletter;
