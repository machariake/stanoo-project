import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './Admin.css';
import { useToast } from '../../context/ToastContext';

const ContentManager = () => {
    const { addToast } = useToast();
    const [content, setContent] = useState({
        home: {
            heroTitle: '',
            heroSubtitle: '',
            heroButtonText: '',
            welcomeTitle: '',
            welcomeText: ''
        },
        about: {
            missionTitle: '',
            missionText: '',
            visionTitle: '',
            visionText: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/content`);
            if (response.data.content) {
                setContent(response.data.content);
            }
        } catch (err) {
            addToast('Error fetching content', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleHomeChange = (e) => {
        const { name, value } = e.target;
        setContent(prev => ({
            ...prev,
            home: {
                ...prev.home,
                [name]: value
            }
        }));
    };

    const handleAboutChange = (e) => {
        const { name, value } = e.target;
        setContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`${config.API_URL}/content`, content);
            addToast('Website content updated successfully!', 'success');
        } catch (err) {
            addToast('Error saving content', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading CMS Data...</div>;

    return (
        <div className="content-manager">
            <div className="admin-header">
                <h2>Website Content (CMS)</h2>
                <p>Edit the text on your Home and About pages directly.</p>
            </div>

            <form onSubmit={handleSubmit} className="settings-form">

                {/* Home Page Section */}
                <div className="form-section mb-4">
                    <h3 className="section-title">🏠 Home Page Content</h3>

                    <div className="form-group">
                        <label>Hero Title (Main Banner)</label>
                        <input
                            type="text"
                            name="heroTitle"
                            value={content.home?.heroTitle || ''}
                            onChange={handleHomeChange}
                            className="form-control"
                            placeholder="e.g. Professional Health & Safety Consultants"
                        />
                    </div>

                    <div className="form-group">
                        <label>Hero Subtitle</label>
                        <textarea
                            name="heroSubtitle"
                            value={content.home?.heroSubtitle || ''}
                            onChange={handleHomeChange}
                            className="form-control"
                            rows="2"
                            placeholder="e.g. Leading the way in compliance..."
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Hero Button Text</label>
                        <input
                            type="text"
                            name="heroButtonText"
                            value={content.home?.heroButtonText || ''}
                            onChange={handleHomeChange}
                            className="form-control"
                            placeholder="e.g. View Our Services"
                        />
                    </div>

                    <div className="form-group">
                        <label>Welcome Title</label>
                        <input
                            type="text"
                            name="welcomeTitle"
                            value={content.home?.welcomeTitle || ''}
                            onChange={handleHomeChange}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* About Page Section */}
                <div className="form-section mb-4">
                    <h3 className="section-title">ℹ️ About Page Content</h3>

                    <div className="form-group">
                        <label>Mission Statement</label>
                        <textarea
                            name="missionText"
                            value={content.about?.missionText || ''}
                            onChange={handleAboutChange}
                            className="form-control"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Vision Statement</label>
                        <textarea
                            name="visionText"
                            value={content.about?.visionText || ''}
                            onChange={handleAboutChange}
                            className="form-control"
                            rows="3"
                        ></textarea>
                    </div>
                </div>

                <div className="form-actions sticky-bottom">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
                        {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : 'Save Content Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContentManager;
