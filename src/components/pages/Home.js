import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import config from '../../config';
import './Home.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/services`);
        const sorted = response.data.services.sort((a, b) => a.order - b.order);
        setServices(sorted);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/testimonials`);
        const sorted = response.data.testimonials.sort((a, b) => a.order - b.order);
        setTestimonials(sorted);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    };

    fetchServices();
    fetchTestimonials();
  }, []);

  return (
    <div className="home">
      <SEO
        title="Home"
        description="Leading provider of comprehensive health, safety, and environmental management services in East Africa."
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Creating Safer Workplaces for a
                <span className="highlight"> Sustainable Future</span>
              </h1>
              <p className="hero-description">
                Leading provider of comprehensive health, safety, and environmental
                management services. We help organizations minimize risks, ensure
                compliance, and build sustainable business practices.
              </p>
              <div className="hero-actions">
                <Link to="/services" className="btn btn-primary btn-lg">
                  Our Services
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg">
                  Get Consultation
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-placeholder">
                <i className="fas fa-shield-alt"></i>
                <span>Safety & Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="services-overview section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Core Services</h2>
            <p>Comprehensive solutions for all your health, safety, and environmental needs</p>
          </div>
          <div className="services-grid">
            {services.length > 0 ? (
              services.map(service => (
                <div className="service-card" key={service._id}>
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <Link to={`/services#${service._id}`} className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center">Loading services...</div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section section-alt">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="why-content">
                <h2>Why Choose Theuri Green Health Safe?</h2>
                <p>We are committed to excellence in health, safety, and environmental management, providing tailored solutions that meet your specific needs.</p>
                <div className="why-features">
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-certificate"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Certified Experts</h4>
                      <p>Our team consists of certified professionals with extensive experience in HSE management.</p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Timely Delivery</h4>
                      <p>We understand the importance of deadlines and always deliver our services on time.</p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Personalized Approach</h4>
                      <p>Every client receives customized solutions tailored to their unique requirements and challenges.</p>
                    </div>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="feature-content">
                      <h4>24/7 Support</h4>
                      <p>Our support team is available around the clock to assist with any queries or emergencies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="why-image">
                <div className="why-image-placeholder">
                  <i className="fas fa-users"></i>
                  <span>Expert Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Clients Say</h2>
            <p>Trusted by businesses across various industries</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map(item => (
                <div className="testimonial-card" key={item._id}>
                  <div className="testimonial-content">
                    <div className="testimonial-quote">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <p>"{item.quote}"</p>
                    <div className="testimonial-author">
                      {item.imageUrl && (
                        <div className="author-image" style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', marginRight: '15px' }}>
                          <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                      <div className="author-info">
                        <h4>{item.name}</h4>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Loading testimonials...</div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Make Your Workplace Safer?</h2>
            <p>Get in touch with our experts today for a free consultation and discover how we can help protect your business and environment.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Free Consultation
              </Link>
              <a href="tel:+254700000000" className="btn btn-secondary btn-lg">
                <i className="fas fa-phone"></i> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;