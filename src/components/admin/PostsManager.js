import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './Admin.css';

const PostsManager = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/blog/posts`);
            setPosts(response.data.posts);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching posts');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${config.API_URL}/blog/posts/${id}`);
                fetchPosts(); // Refresh list
            } catch (err) {
                alert('Error deleting post');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="posts-manager">
            <div className="admin-header">
                <h2>Manage Blog Posts</h2>
                <Link to="/admin/create" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Create New Post
                </Link>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{post.category}</td>
                                <td>{new Date(post.date).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/admin/edit/${post._id}`} className="btn btn-small btn-edit">Edit</Link>
                                    <button onClick={() => handleDelete(post._id)} className="btn btn-small btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No posts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostsManager;
