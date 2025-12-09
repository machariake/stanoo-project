import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/team`);
            setTeam(response.data.team);
            setLoading(false);
        } catch (err) {
            setError('Error fetching team members');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                await axios.delete(`${config.API_URL}/team/${id}`);
                setTeam(team.filter(t => t._id !== id));
            } catch (err) {
                alert('Error deleting team member');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="team-manager">
            <div className="admin-header">
                <h2>Manage Team Members</h2>
                <Link to="/admin/team/create" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add New Member
                </Link>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Credentials</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(member => (
                            <tr key={member._id}>
                                <td>{member.name}</td>
                                <td>{member.role}</td>
                                <td>
                                    {member.credentials && member.credentials.length > 0
                                        ? member.credentials.join(', ')
                                        : 'N/A'}
                                </td>
                                <td>{member.order}</td>
                                <td>
                                    <Link to={`/admin/team/edit/${member._id}`} className="btn btn-small btn-edit">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(member._id)} className="btn btn-small btn-delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {team.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No team members found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamManager;
