import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import Logo from '../common/Logo';
import { useToast } from '../../context/ToastContext';
import './Admin.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${config.API_URL}/auth/login`, { password });

            if (response.data.success) {
                // Store auth state
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminAuthenticated', 'true');
                addToast('Welcome back, Admin!', 'success');
                navigate('/admin');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            background: '#f4f7f6'
        }}>
            <div className="login-card" style={{
                background: 'white',
                padding: '40px',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <div className="login-logo" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Logo width={60} height={60} />
                </div>
                <h2 style={{ color: '#2d5f3f', marginBottom: '10px' }}>Admin Access</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>Enter your password to access the dashboard</p>

                {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                marginBottom: '20px'
                            }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', padding: '12px' }}
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
