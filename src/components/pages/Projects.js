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
        <div className="projects-page">
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
                    <div className="project-filters text-center">
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
                                filteredProjects.map(project => (
                                    <div key={project._id || project.id} className="project-card fade-in">
                                        <div className="project-image">
                                            {/* Support both 'imageUrl' (API) and 'image' (legacy/static) */}
                                            <img src={project.imageUrl || project.image || 'https://via.placeholder.com/400x300?text=Project'} alt={project.title} />
                                            <div className="project-overlay">
                                                <span className="project-category">{project.category}</span>
                                            </div>
                                        </div>
                                        <div className="project-content">
                                            <h3>{project.title}</h3>
                                            <p className="client-name"><strong>Client:</strong> {project.client}</p>
                                            <p className="project-desc">{project.description}</p>

                                            {project.results && project.results.length > 0 && (
                                                <div className="project-results">
                                                    <h4>Key Results:</h4>
                                                    <ul>
                                                        {project.results.map((result, i) => (
                                                            <li key={i}><i className="fas fa-check-circle"></i> {result}</li>
                                                        ))}
                                                    </ul>
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

                    <div className="text-center mt-4">
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Start Your Project With Us
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Projects;
