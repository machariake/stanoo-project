import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import './Projects.css';

const Projects = () => {
    // Static project data for now - could be moved to API later
    const projects = [
        {
            id: 1,
            title: "Industrial Safety Audit",
            client: "Kenya Manufacturing Ltd",
            category: "Auditing",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
            description: "Complete comprehensive safety audit for a large-scale manufacturing plant in Nairobi industrial area.",
            results: ["Identified 15 critical hazards", "Improved safety compliance score by 40%", "Trained 200+ employees"]
        },
        {
            id: 2,
            title: "Environmental Impact Assessment",
            client: "Green Valley Construction",
            category: "Environmental",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
            description: "Conducted full EIA for a proposed mixed-use development project to ensure regulatory compliance.",
            results: ["NEMA license approved", "Sustainable waste management plan implemented", "Community engagement successful"]
        },
        {
            id: 3,
            title: "Fire Safety Training",
            client: "City Business Center",
            category: "Training",
            image: "https://images.unsplash.com/photo-1555660893-b6d3c05c0911?auto=format&fit=crop&q=80",
            description: "Fire safety drills and emergency response training for corporate building occupants.",
            results: ["All floor marshals certified", "Evacuation time reduced by 50%", "Updated fire safety equipment installed"]
        },
        {
            id: 4,
            title: "Construction Site Supervision",
            client: "Skyline Developers",
            category: "Construction Safety",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
            description: "Ongoing HSE supervision for high-rise building construction in Westlands.",
            results: ["Zero lost-time injuries to date", "Weekly toolkit talks implemented", "Strict PPE compliance enforced"]
        }
    ];

    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(projects.map(p => p.category))];

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
                    <div className="projects-grid">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="project-card fade-in">
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <span className="project-category">{project.category}</span>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <h3>{project.title}</h3>
                                    <p className="client-name"><strong>Client:</strong> {project.client}</p>
                                    <p className="project-desc">{project.description}</p>

                                    <div className="project-results">
                                        <h4>Key Results:</h4>
                                        <ul>
                                            {project.results.map((result, i) => (
                                                <li key={i}><i className="fas fa-check-circle"></i> {result}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

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
