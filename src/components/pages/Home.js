import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import config from '../../config';
import { localServices } from '../../data/localServices';
import './Home.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [content, setContent] = useState({
    home: {
      heroTitle: 'Creating Safer Workplaces for a',
      heroSubtitle: 'Leading provider of comprehensive health, safety, and environmental management services. We help organizations minimize risks, ensure compliance, and build sustainable business practices.',
      heroButtonText: 'Our Services',
      welcomeTitle: 'Welcome to Theuri Green Health Safe', // Used elsewhere if needed
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/content`);
        if (response.data.content) {
          // Merge with defaults to prevent crashes if fields are missing
          setContent(prev => ({
            ...prev,
            ...response.data.content
          }));
        }
      } catch (err) {
        console.error('Error fetching site content:', err);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/services`);
        const combinedServices = [...response.data.services, ...localServices];
        const sorted = combinedServices.sort((a, b) => a.order - b.order);
        setServices(sorted);
      } catch (err) {
        console.error('Error fetching services:', err);
        setServices(localServices);
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

    fetchContent();
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
      <section className="hero fade-in">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text slide-up delay-100">
              <h1 className="hero-title">
                {content.home.heroTitle.replace('Sustainable Future', '')}
                <span className="highlight gradient-text"> {content.home.heroTitle.includes('Sustainable Future') ? 'Sustainable Future' : ''}</span>
              </h1>
              <p className="hero-description slide-up delay-200">
                {content.home.heroSubtitle}
              </p>
              <div className="hero-actions slide-up delay-300">
                <Link to="/services" className="btn btn-primary btn-lg hover-float">
                  Our Services
                </Link>
                <Link to="/contact" className="btn btn-outline btn-lg hover-float">
                  Get Consultation
                </Link>
              </div>
              <div className="hero-stats slide-up delay-400">
                <div className="stat glass-card">
                  <span className="stat-number gradient-text">500+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat glass-card">
                  <span className="stat-number gradient-text">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat glass-card">
                  <span className="stat-number gradient-text">100%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="hero-image slide-in-right delay-200">
              <div className="hero-image-placeholder glass-panel">
                <i className="fas fa-shield-alt icon-xl gradient-text"></i>
                <span>Safety & Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="services-overview section">
        <div className="container">
          <div className="section-header text-center slide-up">
            <h2>Our Core Services</h2>
            <p>Comprehensive solutions for all your health, safety, and environmental needs</p>
          </div>
          <div className="services-grid">
            {services.length > 0 ? (
              services.map((service, idx) => (
                <div className={`service-card glass-card slide-up delay-${Math.min((idx + 1) * 100, 500)}`} key={service._id}>
                  <div className="service-icon">
                    <i className={`${service.icon} gradient-text`}></i>
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
      <section className="why-choose-us section section-alt gradient-bg" style={{ color: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="why-content slide-up">
                <h2 style={{ color: 'white' }}>Why Choose Theuri Green Health Safe?</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)' }}>We are committed to excellence in health, safety, and environmental management, providing tailored solutions that meet your specific needs.</p>
                <div className="why-features">
                  {/* Features with manual staggered delay */}
                  <div className="feature slide-up delay-100">
                    <div className="feature-icon glass-card" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <i className="fas fa-certificate" style={{ color: 'white' }}></i>
                    </div>
                    <div className="feature-content">
                      <h4 style={{ color: 'white' }}>Certified Experts</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)' }}>Our team consists of certified professionals with extensive experience in HSE management.</p>
                    </div>
                  </div>
                  <div className="feature slide-up delay-200">
                    <div className="feature-icon glass-card" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <i className="fas fa-clock" style={{ color: 'white' }}></i>
                    </div>
                    <div className="feature-content">
                      <h4 style={{ color: 'white' }}>Timely Delivery</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)' }}>We understand the importance of deadlines and always deliver our services on time.</p>
                    </div>
                  </div>
                  <div className="feature slide-up delay-300">
                    <div className="feature-icon glass-card" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <i className="fas fa-handshake" style={{ color: 'white' }}></i>
                    </div>
                    <div className="feature-content">
                      <h4 style={{ color: 'white' }}>Personalized Approach</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)' }}>Every client receives customized solutions tailored to their unique requirements and challenges.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="why-image slide-in-right delay-200">
                <div className="why-image-placeholder glass-panel">
                  <i className="fas fa-users icon-xl gradient-text"></i>
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
          <div className="section-header text-center slide-up">
            <h2>What Our Clients Say</h2>
            <p>Trusted by businesses across various industries</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.length > 0 ? (
              testimonials.map((item, idx) => (
                <div className={`testimonial-card glass-card slide-up delay-${Math.min((idx + 1) * 100, 500)}`} key={item._id}>
                  <div className="testimonial-content">
                    <div className="testimonial-quote">
                      <i className="fas fa-quote-left gradient-text"></i>
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
      <section className="cta section scale-in delay-200">
        <div className="container">
          <div className="cta-content text-center glass-panel" style={{ padding: '3rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.95)' }}>
            <h2 className="gradient-text">Ready to Make Your Workplace Safer?</h2>
            <p>Get in touch with our experts today for a free consultation and discover how we can help protect your business and environment.</p>
            <div className="cta-actions" style={{ marginTop: '20px' }}>
              <Link to="/contact" className="btn btn-primary btn-lg hover-float">
                Get Free Consultation
              </Link>
              <a href="tel:+254743937257" className="btn btn-secondary btn-lg hover-float">
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