import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/projects`);
                if (response.data.success) {
                    setProjects(response.data.projects);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Extract unique categories dynamically from fetched projects
    const allCategories = projects.map(p => p.category).filter(Boolean);
    const categories = ['All', ...new Set(allCategories)];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="projects-page fade-in">
            <SEO
                title="Our Projects"
                description="Explore our portfolio of successful health, safety, and environmental projects across East Africa."
            />

            <PageHeader
                title="Our Projects"
                subtitle="Showcasing our expertise through successful project delivery."
                breadcrumb="Projects"
            />

            <section className="projects-section section">
                <div className="container">

                    {/* Filter Buttons */}
                    <div className="project-filters text-center slide-up">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="loading-container text-center">
                            <div className="loader"></div>
                            <p>Loading projects...</p>
                        </div>
                    ) : (
                        <div className="projects-grid">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, idx) => (
                                    <div key={project._id || project.id} className={`project-card glass-card hover-float slide-up delay-${Math.min((idx + 1) * 100, 500)}`}>
                                        <div className="project-image">
                                            {/* Support both 'imageUrl' (API) and 'image' (legacy/static) */}
                                            <img src={project.imageUrl || project.image || 'https://via.placeholder.com/400x300?text=Project'} alt={project.title} />
                                            <div className="project-overlay">
                                                <span className="project-category gradient-bg">{project.category}</span>
                                            </div>
                                        </div>
                                        <div className="project-content">
                                            <h3 className="gradient-text">{project.title}</h3>
                                            <p className="client-name"><strong>Client:</strong> {project.client}</p>
                                            <p className="project-desc">{project.description}</p>

                                            {project.results && project.results.length > 0 && (
                                                <div className="project-results glass-panel" style={{ padding: '10px', marginTop: '15px', borderRadius: '8px' }}>
                                                    <h4>Key Results:</h4>
                                                    <ul>
                                                        {project.results.map((result, i) => (
                                                            <li key={i}><i className="fas fa-check-circle gradient-text"></i> {result}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {project.testimonial && (
                                                <div className="project-testimonial mt-3" style={{ fontStyle: 'italic', borderLeft: '3px solid #10b981', paddingLeft: '10px' }}>
                                                    <p>"{project.testimonial}"</p>
                                                    <small className="text-muted">- {project.testimonialAuthor || 'Client'}</small>
                                                </div>
                                            )}

                                            {project.beforeImage && project.afterImage && (
                                                <div className="project-comparison mt-3 mb-2">
                                                    <h5 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Visual Impact (Before vs After)</h5>
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <div style={{ flex: 1, position: 'relative' }}>
                                                            <img src={project.beforeImage} alt="Before" style={{ width: '100%', borderRadius: '4px', height: '80px', objectFit: 'cover' }} />
                                                            <span style={{ position: 'absolute', bottom: '2px', left: '2px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', padding: '2px 4px', borderRadius: '2px' }}>Before</span>
                                                        </div>
                                                        <div style={{ flex: 1, position: 'relative' }}>
                                                            <img src={project.afterImage} alt="After" style={{ width: '100%', borderRadius: '4px', height: '80px', objectFit: 'cover' }} />
                                                            <span style={{ position: 'absolute', bottom: '2px', left: '2px', background: 'rgba(16, 185, 129, 0.8)', color: 'white', fontSize: '10px', padding: '2px 4px', borderRadius: '2px' }}>After</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-projects text-center" style={{ gridColumn: '1/-1', padding: '40px' }}>
                                    <p>No projects found in this category yet.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-center mt-4 scale-in delay-200">
                        <Link to="/contact" className="btn btn-primary btn-lg hover-float">
                            Start Your Project With Us
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Projects;
