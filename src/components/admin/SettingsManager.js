import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './Admin.css';

const SettingsManager = () => {
    const [settings, setSettings] = useState({
        companyName: '',
        tagline: '',
        email: '',
        phone: '',
        address: '',
        facebookUrl: '',
        twitterUrl: '',
        linkedinUrl: '',
        instagramUrl: '',
        whatsappNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/settings`);
            if (response.data.settings) {
                setSettings(response.data.settings);
            }
            setLoading(false);
        } catch (err) {
            setError('Error fetching settings');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage(null);
        setError(null);

        try {
            await axios.put(`${config.API_URL}/settings`, settings);
            setSuccessMessage('Settings updated successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="settings-manager">
            <div className="admin-header">
                <h2>General Settings</h2>
                <p>Manage company details and contact information</p>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message" style={{ color: 'green', marginBottom: '20px', padding: '10px', background: '#e8f5e9', borderRadius: '4px' }}>{successMessage}</div>}

            <form onSubmit={handleSubmit} className="settings-form">
                <div className="form-section" style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Company Identity</h3>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={settings.companyName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Tagline</label>
                        <input
                            type="text"
                            name="tagline"
                            value={settings.tagline}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Legal Pages Content</h3>
                    <div className="form-group">
                        <label>Privacy Policy Content (HTML allowed)</label>
                        <textarea
                            name="privacyPolicyContent"
                            value={settings.privacyPolicyContent || ''}
                            onChange={handleChange}
                            className="form-control"
                            rows="10"
                            placeholder="Enter the full content for the Privacy Policy page..."
                        ></textarea>
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Contact Information</h3>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={settings.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={settings.phone}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            value={settings.address}
                            onChange={handleChange}
                            className="form-control"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>WhatsApp Number</label>
                        <input
                            type="text"
                            name="whatsappNumber"
                            value={settings.whatsappNumber}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="e.g. 254700000000 (No + sign)"
                        />
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Social Media</h3>
                    <div className="form-group">
                        <label>Facebook URL</label>
                        <input
                            type="text"
                            name="facebookUrl"
                            value={settings.facebookUrl}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Twitter URL</label>
                        <input
                            type="text"
                            name="twitterUrl"
                            value={settings.twitterUrl}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input
                            type="text"
                            name="linkedinUrl"
                            value={settings.linkedinUrl}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Instagram URL</label>
                        <input
                            type="text"
                            name="instagramUrl"
                            value={settings.instagramUrl}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsManager;
