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

                <div className="form-section" style={{ marginBottom: '30px', background: '#fff3cd', padding: '20px', borderRadius: '8px', border: '1px solid #ffc107' }}>
                    <h3 style={{ borderBottom: '1px solid #ffc107', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>💬</span> Live Chat Integration
                    </h3>
                    <p style={{ marginBottom: '20px', color: '#856404' }}>Configure Tawk.to live chat widget for real-time customer support.</p>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableTawkTo"
                                checked={settings.enableTawkTo || false}
                                onChange={(e) => setSettings(prev => ({ ...prev, enableTawkTo: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Tawk.to Live Chat</strong>
                        </label>
                        <p style={{ marginLeft: '30px', fontSize: '0.9rem', color: '#666' }}>
                            Show live chat widget on your website for instant customer support.
                        </p>
                    </div>

                    {settings.enableTawkTo && (
                        <div className="form-group" style={{ marginLeft: '30px' }}>
                            <label>Tawk.to Property ID <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                name="tawkToPropertyId"
                                value={settings.tawkToPropertyId || ''}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="e.g., 5f8a9b1c2d3e4f5g6h7i8j9k"
                            />
                            <small className="text-gray" style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                Find your Property ID in your Tawk.to dashboard under Administration → Property Settings.
                            </small>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label>Tawk.to Widget ID (Optional)</label>
                                <input
                                    type="text"
                                    name="tawkToWidgetId"
                                    value={settings.tawkToWidgetId || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="e.g., default"
                                />
                                <small className="text-gray" style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                    Leave as "default" unless you have a custom widget.
                                </small>
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-section" style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>⚙️</span> Feature Management
                    </h3>
                    <p style={{ marginBottom: '20px', color: '#64748b' }}>Toggle features on or off to control what visitors see on your website.</p>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableTraining"
                                checked={settings.enableTraining !== false} // Default to true if undefined
                                onChange={(e) => setSettings(prev => ({ ...prev, enableTraining: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Training Page</strong>
                        </label>
                    </div>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableResources"
                                checked={settings.enableResources !== false}
                                onChange={(e) => setSettings(prev => ({ ...prev, enableResources: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Resources & Downloads</strong>
                        </label>
                    </div>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableBlog"
                                checked={settings.enableBlog !== false}
                                onChange={(e) => setSettings(prev => ({ ...prev, enableBlog: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Blog / News</strong>
                        </label>
                    </div>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableTestimonials"
                                checked={settings.enableTestimonials !== false}
                                onChange={(e) => setSettings(prev => ({ ...prev, enableTestimonials: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Testimonials Section</strong>
                        </label>
                    </div>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableWhatsApp"
                                checked={settings.enableWhatsApp !== false}
                                onChange={(e) => setSettings(prev => ({ ...prev, enableWhatsApp: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable WhatsApp Widget</strong>
                        </label>
                    </div>
                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="enableQuote"
                                checked={settings.enableQuote !== false}
                                onChange={(e) => setSettings(prev => ({ ...prev, enableQuote: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable 'Get A Quote' Calculator</strong>
                        </label>
                    </div>
                </div>

                <div className="form-section" style={{ marginBottom: '30px', background: '#f0f9ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                    <h3 style={{ borderBottom: '1px solid #bae6fd', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🎄</span> Seasonal Settings
                    </h3>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="christmasMode"
                                checked={settings.christmasMode || false}
                                onChange={(e) => setSettings(prev => ({ ...prev, christmasMode: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Christmas Mode (Snow Effect)</strong>
                        </label>
                        <p style={{ marginLeft: '30px', fontSize: '0.9rem', color: '#666' }}>
                            Adds falling snow animation to the entire website for a festive feel.
                        </p>
                    </div>

                    <div className="checkbox-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="christmasMusic"
                                checked={settings.christmasMusic || false}
                                onChange={(e) => setSettings(prev => ({ ...prev, christmasMusic: e.target.checked }))}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            <strong>Enable Christmas Music</strong>
                        </label>
                        <p style={{ marginLeft: '30px', fontSize: '0.9rem', color: '#666' }}>
                            Plays background holiday music. Visitors can mute/unmute.
                        </p>
                    </div>

                    {settings.christmasMusic && (
                        <div className="form-group" style={{ marginLeft: '30px' }}>
                            <label>Music URL (Optional)</label>
                            <input
                                type="text"
                                name="christmasMusicUrl"
                                value={settings.christmasMusicUrl || ''}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter public URL for audio file (mp3/ogg)"
                            />
                            <small className="text-gray" style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                Leave empty to use the default "Jingle Bells" tune.
                            </small>
                        </div>
                    )}
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
