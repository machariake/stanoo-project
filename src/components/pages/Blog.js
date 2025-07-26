import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  // Sample blog posts data
  const featuredPost = {
    id: 1,
    title: "The Future of Workplace Safety: Embracing Technology and Innovation",
    excerpt: "Explore how emerging technologies like IoT sensors, AI-powered risk assessment, and wearable devices are revolutionizing workplace safety management and creating safer environments for workers.",
    author: "Dr. Sarah Mwangi",
    date: "January 15, 2025",
    category: "Safety Technology",
    readTime: "8 min read",
    image: "featured-post"
  };

  const blogPosts = [
    {
      id: 2,
      title: "Environmental Impact Assessment: A Complete Guide for East African Businesses",
      excerpt: "Understanding the EIA process, regulatory requirements, and best practices for businesses operating in East Africa's diverse environmental landscape.",
      author: "Michael Kamau",
      date: "January 10, 2025",
      category: "Environmental Management",
      readTime: "6 min read",
      image: "eia-guide"
    },
    {
      id: 3,
      title: "Building a Culture of Safety: Leadership's Role in HSE Success",
      excerpt: "How organizational leaders can foster a positive safety culture, engage employees, and drive continuous improvement in health and safety performance.",
      author: "Grace Wanjiku",
      date: "January 5, 2025",
      category: "Safety Culture",
      readTime: "5 min read",
      image: "safety-culture"
    },
    {
      id: 4,
      title: "Risk Management in the Digital Age: New Challenges and Solutions",
      excerpt: "Addressing emerging risks in our interconnected world, from cybersecurity threats to supply chain vulnerabilities, and developing robust mitigation strategies.",
      author: "John Theuri",
      date: "December 28, 2024",
      category: "Risk Management",
      readTime: "7 min read",
      image: "digital-risk"
    },
    {
      id: 5,
      title: "Sustainable Manufacturing: Balancing Productivity and Environmental Responsibility",
      excerpt: "Strategies for manufacturing companies to reduce their environmental footprint while maintaining operational efficiency and competitiveness.",
      author: "Dr. Sarah Mwangi",
      date: "December 20, 2024",
      category: "Sustainability",
      readTime: "6 min read",
      image: "sustainable-manufacturing"
    },
    {
      id: 6,
      title: "Emergency Preparedness in the Workplace: Essential Steps for Every Organization",
      excerpt: "A comprehensive guide to developing, implementing, and maintaining effective emergency response plans that protect employees and business continuity.",
      author: "Michael Kamau",
      date: "December 15, 2024",
      category: "Emergency Management",
      readTime: "8 min read",
      image: "emergency-preparedness"
    }
  ];

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

  return (
    <div className="blog">
      {/* Hero Section */}
      <section className="blog-hero section">
        <div className="container">
          <div className="hero-content text-center">
            <h1>Blog & News</h1>
            <p>Stay informed with the latest insights, trends, and best practices in health, safety, and environmental management</p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-post section">
        <div className="container">
          <div className="featured-container">
            <div className="featured-image">
              <div className="featured-image-placeholder">
                <i className="fas fa-microchip"></i>
                <span>Featured Article</span>
              </div>
            </div>
            <div className="featured-content">
              <div className="post-meta">
                <span className="post-category">{featuredPost.category}</span>
                <span className="post-date">{featuredPost.date}</span>
                <span className="read-time">
                  <i className="fas fa-clock"></i> {featuredPost.readTime}
                </span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="post-author">
                <div className="author-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <span>By {featuredPost.author}</span>
              </div>
              <Link to={`/blog/${featuredPost.id}`} className="btn btn-primary">
                Read Full Article
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="blog-posts section section-alt">
        <div className="container">
          <div className="blog-header">
            <h2>Latest Articles</h2>
            <div className="blog-filters">
              <div className="categories-filter">
                <select className="category-select">
                  {categories.map((category, index) => (
                    <option key={index} value={category.toLowerCase().replace(/\s+/g, '-')}>
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
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>

          <div className="posts-grid">
            {blogPosts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-image">
                  <div className="post-image-placeholder">
                    <i className="fas fa-newspaper"></i>
                  </div>
                  <div className="post-category-badge">{post.category}</div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="read-time">
                      <i className="fas fa-clock"></i> {post.readTime}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-footer">
                    <div className="post-author">
                      <div className="author-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="read-more">
                      Read More <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            <button className="pagination-btn" disabled>
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <div className="pagination-numbers">
              <button className="pagination-number active">1</button>
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
      <section className="newsletter section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter and get the latest insights on health, safety, and environmental management delivered to your inbox.</p>
            </div>
            <div className="newsletter-form">
              <form className="subscription-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
                <p className="newsletter-note">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="popular-topics section section-alt">
        <div className="container">
          <div className="section-header text-center">
            <h2>Popular Topics</h2>
            <p>Explore our most read categories and trending topics</p>
          </div>
          <div className="topics-grid">
            <div className="topic-card">
              <div className="topic-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Workplace Safety</h3>
              <p>Best practices, regulations, and innovative safety solutions</p>
              <span className="topic-count">24 articles</span>
            </div>
            <div className="topic-card">
              <div className="topic-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Environmental Compliance</h3>
              <p>Environmental regulations, impact assessments, and sustainability</p>
              <span className="topic-count">18 articles</span>
            </div>
            <div className="topic-card">
              <div className="topic-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Risk Management</h3>
              <p>Risk assessment, mitigation strategies, and crisis management</p>
              <span className="topic-count">15 articles</span>
            </div>
            <div className="topic-card">
              <div className="topic-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Training & Education</h3>
              <p>Training programs, certification guides, and skill development</p>
              <span className="topic-count">21 articles</span>
            </div>
            <div className="topic-card">
              <div className="topic-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Industry Trends</h3>
              <p>Latest trends, technology innovations, and market insights</p>
              <span className="topic-count">12 articles</span>
            </div>
            <div className="topic-card">
              <div className="topic-icon">
                <i className="fas fa-gavel"></i>
              </div>
              <h3>Regulatory Updates</h3>
              <p>New regulations, compliance requirements, and legal updates</p>
              <span className="topic-count">16 articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="blog-cta section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Need Expert Consultation?</h2>
            <p>Have questions about any of our topics? Our experts are here to help with personalized advice and solutions.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Our Experts
              </Link>
              <Link to="/services" className="btn btn-secondary btn-lg">
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