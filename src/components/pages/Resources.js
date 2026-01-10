import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import './Resources.css';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded fallback data in case backend is empty
    const defaultResources = [
        {
            _id: 'res-001',
            title: 'Occupational Safety Checklist',
            description: 'A comprehensive checklist to identify common workplace hazards.',
            type: 'TXT',
            size: '2 KB',
            downloadUrl: '/downloads/safety_checklist.txt',
            category: 'Safety'
        },
        {
            _id: 'res-002',
            title: 'Fire Evacuation Plan Template',
            description: 'Customizable template for creating your building\'s evacuation plan.',
            type: 'TXT',
            size: '2 KB',
            downloadUrl: '/downloads/fire_evacuation_plan.txt',
            category: 'Emergency'
        },
        {
            _id: 'res-003',
            title: 'NEMA Compliance Guide 2026',
            description: 'Overview of the latest environmental regulations in Kenya.',
            type: 'TXT',
            size: '2 KB',
            downloadUrl: '/downloads/nema_compliance_guide.txt',
            category: 'Environmental'
        }
    ];

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/resources`);
                if (response.data.resources && response.data.resources.length > 0) {
                    setResources(response.data.resources);
                } else {
                    setResources(defaultResources);
                }
            } catch (err) {
                console.error('Error fetching resources:', err);
                setResources(defaultResources);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    return (
        <div className="resources-page fade-in">
            <SEO
                title="Resources & Downloads"
                description="Download essential health, safety, and environmental checklists, guides, and templates."
            />
            <PageHeader
                title="Resources & Downloads"
                subtitle="Tools and guides to help you maintain a safer workplace."
                breadcrumb="Resources"
            />

            <section className="section resources-section">
                <div className="container">
                    {loading ? (
                        <div className="text-center"><h3>Loading Resources...</h3></div>
                    ) : (
                        <div className="resources-grid">
                            {resources.map((resource, index) => (
                                <div key={resource._id} className={`resource-card glass-card hover-float slide-up delay-${(index % 5) * 100}`}>
                                    <div className="resource-icon">
                                        <i className={`fas ${resource.type === 'PDF' ? 'fa-file-pdf' : 'fa-file-alt'} gradient-text`}></i>
                                    </div>
                                    <div className="resource-content">
                                        <span className="resource-category">{resource.category}</span>
                                        <h3>{resource.title}</h3>
                                        <p>{resource.description}</p>
                                        <div className="resource-meta">
                                            <span><i className="fas fa-hdd"></i> {resource.size}</span>
                                            <span><i className="fas fa-file"></i> {resource.type}</span>
                                        </div>
                                        <a href={resource.downloadUrl} className="btn btn-outline btn-sm" download>
                                            Download <i className="fas fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="newsletter-box glass-panel text-center mt-5 p-5">
                        <h2 className="gradient-text">Stay Updated</h2>
                        <p>Subscribe to our newsletter to receive the latest safety guides directly in your inbox.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" required />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Resources;
