import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import SocialShare from '../common/SocialShare';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
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
        <div className="blog-post-page fade-in">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.imageUrl}
            />

            <PageHeader
                title={post.title}
                subtitle={`By ${post.author} • ${new Date(post.date).toLocaleDateString()} • ${post.readTime}`}
                backgroundImage={post.imageUrl}
                breadcrumb={post.title}
            />

            <div className="container post-container slide-up delay-100">
                {/* Content */}
                <div className="post-content glass-panel" style={{ padding: '40px', borderRadius: '15px' }}>
                    {/* Render paragraphs appropriately. */}
                    {post.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() !== '' && <p key={idx}>{paragraph}</p>
                    ))}
                </div>

                {/* Article Gallery */}
                {post.galleryImages && post.galleryImages.length > 0 && (
                    <div className="post-gallery slide-up delay-200" style={{ marginTop: '40px', marginBottom: '40px' }}>
                        <h3 className="gradient-text" style={{ borderLeft: '4px solid #2d5f3f', paddingLeft: '15px', marginBottom: '20px' }}>Image Gallery</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '15px'
                        }}>
                            {post.galleryImages.map((img, idx) => (
                                <div key={idx} className="glass-card hover-float" style={{ height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                                    <img
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                        onClick={() => window.open(img, '_blank')}
                                        title="Click to view full size"
                                        className="gallery-img"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="post-footer-actions slide-up delay-300">
                    <Link to="/blog" className="back-btn hover-float">
                        <i className="fas fa-arrow-left"></i> Back to All Articles
                    </Link>

                    <div className="share-wrapper glass-panel" style={{ padding: '15px 25px', borderRadius: '50px' }}>
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
