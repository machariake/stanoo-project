import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
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
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h3>Health & Safety Audits</h3>
              <p>Comprehensive workplace assessments to identify hazards and ensure compliance with safety regulations.</p>
              <Link to="/services#health-safety-audits" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Environmental Impact Assessments</h3>
              <p>Detailed environmental studies to minimize ecological impact and ensure sustainable operations.</p>
              <Link to="/services#environmental-assessments" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Training & Consultancy</h3>
              <p>Expert training programs and consultancy services to build safety culture and best practices.</p>
              <Link to="/services#training-consultancy" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Risk Management Solutions</h3>
              <p>Comprehensive risk assessment and management strategies to protect your business and employees.</p>
              <Link to="/services#risk-management" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
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
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-quote">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"Theuri Green Health Safe transformed our workplace safety culture. Their comprehensive audits and training programs have significantly reduced incidents and improved compliance."</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Sarah Johnson</h4>
                    <span>Safety Manager, ABC Manufacturing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-quote">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"Their environmental impact assessments helped us achieve our sustainability goals while maintaining operational efficiency. Highly professional and knowledgeable team."</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Michael Chen</h4>
                    <span>Environmental Director, GreenTech Solutions</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-quote">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p>"Outstanding consultancy services that provided practical solutions to our risk management challenges. Their expertise is unmatched in the industry."</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>Emma Williams</h4>
                    <span>Operations Manager, Construction Plus</span>
                  </div>
                </div>
              </div>
            </div>
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