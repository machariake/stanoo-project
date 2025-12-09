import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import SocialShare from '../common/SocialShare';
import config from '../../config';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/blog/posts/${id}`);
                if (response.data.success) {
                    setPost(response.data.post);
                } else {
                    setError('Article not found.');
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load article.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loader"></div>
                <p style={{ marginLeft: '10px' }}>Loading article...</p>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="error-container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h2>Oops!</h2>
                <p>{error || 'Article not found.'}</p>
                <Link to="/blog" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Back to Blog
                </Link>
            </div>
        );
    }

    // Use image for hero background if available, otherwise default
    const heroStyle = {
        backgroundImage: post.imageUrl
            ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${post.imageUrl})`
            : undefined
    };

    return (
        <div className="blog-post-page">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.imageUrl}
            />

            <section className="post-hero" style={heroStyle}>
                <div className="container">
                    <div className="post-hero-content">
                        <div className="post-category-badge" style={{ display: 'inline-block', marginBottom: '15px' }}>
                            {post.category}
                        </div>
                        <h1>{post.title}</h1>
                        <div className="post-hero-meta">
                            <span><i className="fas fa-user"></i> {post.author}</span>
                            <span><i className="fas fa-calendar-alt"></i> {new Date(post.date).toLocaleDateString()}</span>
                            <span><i className="fas fa-clock"></i> {post.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container post-container">
                {/* Content */}
                <div className="post-content">
                    {/* Render paragraphs appropriately. */}
                    {post.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() !== '' && <p key={idx}>{paragraph}</p>
                    ))}
                </div>

                <div className="post-footer-actions">
                    <Link to="/blog" className="back-btn">
                        <i className="fas fa-arrow-left"></i> Back to All Articles
                    </Link>

                    <div className="share-wrapper">
                        <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#374151' }}>Share this article:</span>
                        <SocialShare
                            title={post.title}
                            url={window.location.href}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
