import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './Admin.css';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/projects`);
            setProjects(response.data.projects);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${config.API_URL}/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                alert('Error deleting project');
            }
        }
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div className="admin-content">
            <div className="admin-header">
                <h2>Manage Projects</h2>
                <Link to="/admin/projects/create" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add New Project
                </Link>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Client</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project._id}>
                                <td>
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt={project.title} className="thumbnail" />
                                    ) : (
                                        <div className="no-image">No Img</div>
                                    )}
                                </td>
                                <td>{project.title}</td>
                                <td>{project.client}</td>
                                <td>{project.category}</td>
                                <td className="actions-cell">
                                    <Link to={`/admin/projects/edit/${project._id}`} className="btn-icon edit" title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button onClick={() => handleDelete(project._id)} className="btn-icon delete" title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">No projects found. Create one!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectsManager;
