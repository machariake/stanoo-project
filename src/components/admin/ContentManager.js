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
            welcomeText: '',
            stats: {
                stat1Number: '',
                stat1Label: '',
                stat2Number: '',
                stat2Label: '',
                stat3Number: '',
                stat3Label: ''
            }
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

    const handleImageUpload = async (e, section, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setSaving(true);
        try {
            const response = await axios.post(`${config.API_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                const imageUrl = response.data.imageUrl;
                setContent(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: imageUrl
                    }
                }));
                addToast('Image uploaded successfully!', 'success');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            addToast('Image upload failed. Ensure server is configured.', 'error');
        } finally {
            setSaving(false);
        }
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
                <p>Edit the text, images, and SEO on your Home and About pages directly.</p>
            </div>

            <form onSubmit={handleSubmit} className="settings-form">

                {/* Home Page Section */}
                <div className="form-section mb-4">
                    <h3 className="section-title">🏠 Home Page Content</h3>

                    {/* SEO for Home */}
                    <h4 className="mt-2 mb-3">🔍 SEO Settings</h4>
                    <div className="form-group">
                        <label>Page Title (Browser)</label>
                        <input
                            type="text"
                            value={content.home?.seoTitle || ''}
                            onChange={(e) => setContent(prev => ({ ...prev, home: { ...prev.home, seoTitle: e.target.value } }))}
                            className="form-control"
                            placeholder="Home | Theuri Green Health Safe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Meta Description</label>
                        <textarea
                            value={content.home?.seoDescription || ''}
                            onChange={(e) => setContent(prev => ({ ...prev, home: { ...prev.home, seoDescription: e.target.value } }))}
                            className="form-control"
                            rows="2"
                            placeholder="Leading provider of health and safety consultancy..."
                        ></textarea>
                    </div>

                    <h4 className="mt-4 mb-3">🖼️ Hero Image</h4>
                    <div className="form-group">
                        <label>Upload Main Banner Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'home', 'heroImage')}
                            className="form-control"
                        />
                        {content.home?.heroImage && (
                            <div className="mt-2 text-center">
                                <p className="small text-muted">Current Image:</p>
                                <img src={content.home.heroImage} alt="Hero" style={{ maxHeight: '150px', borderRadius: '8px' }} />
                            </div>
                        )}
                    </div>

                    <h4 className="mt-4 mb-3">🌐 Website Branding</h4>
                    <div className="form-group">
                        <label>Upload Website Icon (Favicon)</label>
                        <p className="text-muted small">Upload a square image (PNG or ICO recommended) to appear in the browser tab.</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'home', 'faviconUrl')}
                            className="form-control"
                        />
                        {content.home?.faviconUrl && (
                            <div className="mt-2">
                                <p className="small text-muted">Current Icon:</p>
                                <img src={content.home.faviconUrl} alt="Favicon" style={{ width: '32px', height: '32px', borderRadius: '4px', border: '1px solid #ddd' }} />
                            </div>
                        )}
                    </div>

                    <h4 className="mt-4 mb-3">📝 Text Content</h4>
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

                    <h4 className="mt-4 mb-3">📊 Impact Statistics</h4>
                    <div className="form-row">
                        <div className="col">
                            <label>Stat 1 Number</label>
                            <input
                                type="text"
                                value={content.home?.stats?.stat1Number || ''}
                                onChange={(e) => setContent(prev => ({
                                    ...prev,
                                    home: { ...prev.home, stats: { ...prev.home.stats, stat1Number: e.target.value } }
                                }))}
                                className="form-control"
                                placeholder="500+"
                            />
                        </div>
                        <div className="col">
                            <label>Stat 1 Label</label>
                            <input
                                type="text"
                                value={content.home?.stats?.stat1Label || ''}
                                onChange={(e) => setContent(prev => ({
                                    ...prev,
                                    home: { ...prev.home, stats: { ...prev.home.stats, stat1Label: e.target.value } }
                                }))}
                                className="form-control"
                                placeholder="Projects Completed"
                            />
                        </div>
                    </div>
                    <div className="form-row mt-2">
                        <div className="col">
                            <label>Stat 2 Number</label>
                            <input
                                type="text"
                                value={content.home?.stats?.stat2Number || ''}
                                onChange={(e) => setContent(prev => ({
                                    ...prev,
                                    home: { ...prev.home, stats: { ...prev.home.stats, stat2Number: e.target.value } }
                                }))}
                                className="form-control"
                                placeholder="15+"
                            />
                        </div>
                        <div className="col">
                            <label>Stat 2 Label</label>
                            <input
                                type="text"
                                value={content.home?.stats?.stat2Label || ''}
                                onChange={(e) => setContent(prev => ({
                                    ...prev,
                                    home: { ...prev.home, stats: { ...prev.home.stats, stat2Label: e.target.value } }
                                }))}
                                className="form-control"
                                placeholder="Years Experience"
                            />
                        </div>
                    </div>
                    <div className="form-row mt-2">
                        <div className="col">
                            <label>Stat 3 Number</label>
                            <input
                                type="text"
                                value={content.home?.stats?.stat3Number || ''}
                                onChange={(e) => setContent(prev => ({
                                    ...prev,
                                    home: { ...prev.home, stats: { ...prev.home.stats, stat3Number: e.target.value } }
                                }))}
                                className="form-control"
                                placeholder="100%"
                            />
                        </div>
                        <div className="col">
                            <label>Stat 3 Label</label>
                            <input
                                type="text"
                                value={content.home?.stats?.stat3Label || ''}
                                onChange={(e) => setContent(prev => ({
                                    ...prev,
                                    home: { ...prev.home, stats: { ...prev.home.stats, stat3Label: e.target.value } }
                                }))}
                                className="form-control"
                                placeholder="Client Satisfaction"
                            />
                        </div>
                    </div>
                </div>

                {/* About Page Section */}
                <div className="form-section mb-4">
                    <h3 className="section-title">ℹ️ About Page Content</h3>

                    {/* SEO for About */}
                    <h4 className="mt-2 mb-3">🔍 SEO Settings</h4>
                    <div className="form-group">
                        <label>Page Title (Browser)</label>
                        <input
                            type="text"
                            value={content.about?.seoTitle || ''}
                            onChange={(e) => setContent(prev => ({ ...prev, about: { ...prev.about, seoTitle: e.target.value } }))}
                            className="form-control"
                            placeholder="About Us | Theuri Green Health Safe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Meta Description</label>
                        <textarea
                            value={content.about?.seoDescription || ''}
                            onChange={(e) => setContent(prev => ({ ...prev, about: { ...prev.about, seoDescription: e.target.value } }))}
                            className="form-control"
                            rows="2"
                            placeholder="Learn about our mission and vision..."
                        ></textarea>
                    </div>

                    <h4 className="mt-4 mb-3">🖼️ About Page Images</h4>
                    <div className="form-group">
                        <label>Upload 'Our Story' Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'about', 'storyImage')}
                            className="form-control"
                        />
                        {content.about?.storyImage && (
                            <div className="mt-2 text-center">
                                <p className="small text-muted">Current Image:</p>
                                <img src={content.about.storyImage} alt="Story" style={{ maxHeight: '150px', borderRadius: '8px' }} />
                            </div>
                        )}
                    </div>

                    <h4 className="mt-4 mb-3">📝 Text Content</h4>
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
