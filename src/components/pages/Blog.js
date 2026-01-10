import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import SocialShare from '../common/SocialShare';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import Newsletter from '../common/Newsletter';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${config.API_URL}/blog/posts`);
        const data = await response.json();
        if (data.success) {
          setBlogPosts(data.posts);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination Logic (Simplified for filtered results)
  // For true pagination with search, you'd typically slice the filteredPosts array.
  // const displayedPosts = filteredPosts.slice(0, 10); 

  // Use the latest post as featured if available (only from filtered list if we want it dynamic, 
  // or purely from original list. Usually featured is static unless searched).
  // Let's keep featured as the absolute latest, but hide it when searching.
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;

  const categories = [
    "All Categories",
    "Safety Technology",
    "Environmental Management",
    "Safety Culture",
    "Risk Management",
    "Sustainability",
    "Emergency Management",
    "Compliance",
    "Training"
  ];

  if (loading) return <div className="loading-container">Loading posts...</div>;
  // if (error) return <div className="error-container">{error}</div>; // Optional: show error state

  return (
    <div className="blog fade-in">
      <SEO
        title="Blog & News"
        description="Stay informed with the latest insights, trends, and best practices in health, safety, and environmental management."
      />


      <PageHeader
        title="Blog & News"
        subtitle="Stay informed with the latest insights, trends, and best practices."
        breadcrumb="Blog"
      />

      {/* Featured Post (Only show if no search/filter is active) */}
      {featuredPost && searchQuery === '' && selectedCategory === 'All Categories' && (
        <section className="featured-post section slide-up">
          <div className="container">
            <div className="featured-container glass-card">
              <div className="featured-image">
                {featuredPost.imageUrl ? (
                  <img src={featuredPost.imageUrl} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="featured-image-placeholder gradient-bg">
                    <i className="fas fa-microchip" style={{ color: 'white' }}></i>
                    <span style={{ color: 'white' }}>Featured Article</span>
                  </div>
                )}
              </div>
              <div className="featured-content">
                <div className="post-meta">
                  <span className="post-category gradient-bg">{featuredPost.category}</span>
                  <span className="post-date">{new Date(featuredPost.date).toLocaleDateString()}</span>
                  <span className="read-time">
                    <i className="fas fa-clock"></i> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="gradient-text">{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="post-author">
                  <div className="author-avatar gradient-bg" style={{ color: 'white' }}>
                    <i className="fas fa-user"></i>
                  </div>
                  <span>By {featuredPost.author}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                  <Link to={`/blog/${featuredPost._id}`} className="btn btn-primary hover-float" style={{ margin: 0 }}>
                    Read Full Article
                  </Link>
                  <SocialShare
                    title={featuredPost.title}
                    url={`${window.location.origin}/blog/${featuredPost._id}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="blog-posts section section-alt">
        <div className="container">
          <div className="blog-header slide-up">
            <h2 className="gradient-text">{searchQuery || selectedCategory !== 'All Categories' ? 'Search Results' : 'Latest Articles'}</h2>
            <div className="blog-filters">
              <div className="categories-filter">
                <select
                  className="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ borderColor: '#e5e7eb', outline: 'none' }}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search gradient-text"></i>
              </div>
            </div>
          </div>

          <div className="posts-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <article key={post._id} className={`post-card glass-card hover-float slide-up delay-${Math.min((idx + 1) * 100, 500)}`}>
                  <div className="post-image">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="post-image-placeholder gradient-text" style={{ backgroundColor: '#f3f4f6' }}>
                        <i className="fas fa-newspaper icon-xl"></i>
                      </div>
                    )}
                    <div className="post-category-badge gradient-bg" style={{ color: 'white' }}>{post.category}</div>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                      <span className="read-time">
                        <i className="fas fa-clock"></i> {post.readTime}
                      </span>
                    </div>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="post-author">
                        <div className="author-avatar gradient-bg" style={{ color: 'white' }}>
                          <i className="fas fa-user"></i>
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <Link to={`/blog/${post._id}`} className="read-more gradient-text" style={{ fontWeight: 'bold' }}>
                        Read More <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                    <SocialShare
                      title={post.title}
                      url={`${window.location.origin}/blog/${post._id}`}
                    />
                  </div>
                </article>
              ))
            ) : (
              <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                <i className="fas fa-search" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>

          <div className="pagination slide-up delay-200">
            <button className="pagination-btn" disabled>
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <div className="pagination-numbers">
              <button className="pagination-number active gradient-bg" style={{ color: 'white', border: 'none' }}>1</button>
              <button className="pagination-number">2</button>
              <button className="pagination-number">3</button>
              <span className="pagination-dots">...</span>
              <button className="pagination-number">10</button>
            </div>
            <button className="pagination-btn">
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter section scale-in delay-200">
        <div className="container">
          <div className="newsletter-content glass-panel" style={{ borderRadius: '15px' }}>
            <div className="newsletter-text">
              <h2 className="gradient-text">Stay Updated</h2>
              <p>Subscribe to our newsletter and get the latest insights on health, safety, and environmental management delivered to your inbox.</p>
            </div>
            <div className="newsletter-form-container">
              <Newsletter />
              <p className="newsletter-note">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="popular-topics section section-alt gradient-bg">
        <div className="container">
          <div className="section-header text-center slide-up">
            <h2 style={{ color: 'white' }}>Popular Topics</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>Explore our most read categories and trending topics</p>
          </div>
          <div className="topics-grid">
            <div className="topic-card glass-card hover-float slide-up delay-100">
              <div className="topic-icon">
                <i className="fas fa-shield-alt gradient-text"></i>
              </div>
              <h3>Workplace Safety</h3>
              <p>Best practices, regulations, and innovative safety solutions</p>
              <span className="topic-count gradient-text">24 articles</span>
            </div>
            <div className="topic-card glass-card hover-float slide-up delay-100">
              <div className="topic-icon">
                <i className="fas fa-leaf gradient-text"></i>
              </div>
              <h3>Environmental Compliance</h3>
              <p>Environmental regulations, impact assessments, and sustainability</p>
              <span className="topic-count gradient-text">18 articles</span>
            </div>
            <div className="topic-card glass-card hover-float slide-up delay-200">
              <div className="topic-icon">
                <i className="fas fa-exclamation-triangle gradient-text"></i>
              </div>
              <h3>Risk Management</h3>
              <p>Risk assessment, mitigation strategies, and crisis management</p>
              <span className="topic-count gradient-text">15 articles</span>
            </div>
            <div className="topic-card glass-card hover-float slide-up delay-200">
              <div className="topic-icon">
                <i className="fas fa-graduation-cap gradient-text"></i>
              </div>
              <h3>Training & Education</h3>
              <p>Training programs, certification guides, and skill development</p>
              <span className="topic-count gradient-text">21 articles</span>
            </div>
            <div className="topic-card glass-card hover-float slide-up delay-300">
              <div className="topic-icon">
                <i className="fas fa-chart-line gradient-text"></i>
              </div>
              <h3>Industry Trends</h3>
              <p>Latest trends, technology innovations, and market insights</p>
              <span className="topic-count gradient-text">12 articles</span>
            </div>
            <div className="topic-card glass-card hover-float slide-up delay-300">
              <div className="topic-icon">
                <i className="fas fa-gavel gradient-text"></i>
              </div>
              <h3>Regulatory Updates</h3>
              <p>New regulations, compliance requirements, and legal updates</p>
              <span className="topic-count gradient-text">16 articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="blog-cta section scale-in delay-200">
        <div className="container">
          <div className="cta-content text-center glass-panel" style={{ borderRadius: '15px' }}>
            <h2 className="gradient-text">Need Expert Consultation?</h2>
            <p>Have questions about any of our topics? Our experts are here to help with personalized advice and solutions.</p>
            <div className="cta-actions" style={{ marginTop: '20px' }}>
              <Link to="/contact" className="btn btn-primary btn-lg hover-float">
                Contact Our Experts
              </Link>
              <Link to="/services" className="btn btn-secondary btn-lg hover-float">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;