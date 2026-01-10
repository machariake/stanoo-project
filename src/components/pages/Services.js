import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import { localServices } from '../../data/localServices';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/services`);
        // Merge API services with local services
        const combinedServices = [...response.data.services, ...localServices];
        const sorted = combinedServices.sort((a, b) => a.order - b.order);
        setServices(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        // Fallback to local services if API fails
        setServices(localServices);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Handle anchor scrolling after content loads
  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [loading, location]);

  return (
    <div className="services fade-in">
      <SEO
        title="Our Services"
        description="Explore our wide range of services including Health & Safety Audits, Environmental Impact Assessments, and Training."
      />

      <PageHeader
        title="Our Professional Services"
        subtitle="Comprehensive health, safety, and environmental management solutions."
        breadcrumb="Services"
      />

      {loading ? (
        <div className="container text-center" style={{ padding: '50px 0' }}>
          <h2>Loading Services...</h2>
        </div>
      ) : (
        services.map((service, index) => (
          <section
            key={service._id}
            id={service._id}
            className={`service-detail section slide-up delay-100 ${index % 2 !== 0 ? 'section-alt' : ''}`}
          >
            <div className="container">
              <div className="row">
                {/* Image on Left for Even items (0, 2, 4...) in original design, 
                    but layout was Alternating Image/Content. 
                    Let's replicate: Even index -> Content Left. Odd index -> Image Left.
                */}
                {index % 2 !== 0 ? (
                  /* Odd Index: Image Left, Content Right */
                  <>
                    <div className="col-2">
                      <div className="service-image hover-float">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                            className="glass-panel"
                          />
                        ) : (
                          <div className="service-image-placeholder glass-panel">
                            <i className={`${service.icon} gradient-text icon-xl`}></i>
                            <span>{service.title.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="service-content">
                        <div className="service-icon-large glass-card" style={{ display: 'inline-block', padding: '15px', borderRadius: '50%' }}>
                          <i className={`${service.icon} gradient-text icon-lg`}></i>
                        </div>
                        <h2 className="gradient-text">{service.title}</h2>
                        <p className="service-intro">{service.fullDescription}</p>

                        {service.features && service.features.length > 0 && (
                          <div className="service-features glass-panel" style={{ padding: '20px', borderRadius: '10px' }}>
                            <h3>What We Offer</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                              {service.features.map((feature, idx) => (
                                <li key={idx} style={{ marginBottom: '10px' }}><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i> {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Even Index: Content Left, Image Right */
                  <>
                    <div className="col-2">
                      <div className="service-content">
                        <div className="service-icon-large glass-card" style={{ display: 'inline-block', padding: '15px', borderRadius: '50%' }}>
                          <i className={`${service.icon} gradient-text icon-lg`}></i>
                        </div>
                        <h2 className="gradient-text">{service.title}</h2>
                        <p className="service-intro">{service.fullDescription}</p>

                        {service.features && service.features.length > 0 && (
                          <div className="service-features glass-panel" style={{ padding: '20px', borderRadius: '10px' }}>
                            <h3>What We Offer</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                              {service.features.map((feature, idx) => (
                                <li key={idx} style={{ marginBottom: '10px' }}><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i> {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="service-image hover-float">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                            className="glass-panel"
                          />
                        ) : (
                          <div className="service-image-placeholder glass-panel">
                            <i className={`${service.icon} gradient-text icon-xl`}></i>
                            <span>{service.title.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))
      )}

      {/* Industries We Serve Section */}
      <section className="industries section gradient-bg">
        <div className="container">
          <div className="section-header text-center slide-up">
            <h2 style={{ color: 'white' }}>Industries We Serve</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>Our expertise spans across various sectors, providing tailored solutions for each industry's unique challenges</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card glass-card hover-float slide-up delay-100">
              <div className="industry-icon"><i className="fas fa-industry gradient-text"></i></div>
              <h3>Manufacturing</h3>
              <p>Safety protocols and environmental compliance for manufacturing facilities</p>
            </div>
            <div className="industry-card glass-card hover-float slide-up delay-200">
              <div className="industry-icon"><i className="fas fa-hammer gradient-text"></i></div>
              <h3>Construction</h3>
              <p>Site safety management and environmental impact assessments</p>
            </div>
            <div className="industry-card glass-card hover-float slide-up delay-300">
              <div className="industry-icon"><i className="fas fa-hospital gradient-text"></i></div>
              <h3>Healthcare</h3>
              <p>Infection control and medical waste management solutions</p>
            </div>
            <div className="industry-card glass-card hover-float slide-up delay-400">
              <div className="industry-icon"><i className="fas fa-graduation-cap gradient-text"></i></div>
              <h3>Education</h3>
              <p>Campus safety programs and environmental education initiatives</p>
            </div>
            <div className="industry-card glass-card hover-float slide-up delay-500">
              <div className="industry-icon"><i className="fas fa-oil-can gradient-text"></i></div>
              <h3>Oil & Gas</h3>
              <p>Process safety and environmental risk management</p>
            </div>
            <div className="industry-card glass-card hover-float slide-up delay-500">
              <div className="industry-icon"><i className="fas fa-shopping-cart gradient-text"></i></div>
              <h3>Retail</h3>
              <p>Customer and employee safety in retail environments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="services-cta section scale-in delay-200">
        <div className="container">
          <div className="cta-content text-center glass-panel" style={{ padding: '3rem', borderRadius: '1rem' }}>
            <h2 className="gradient-text">Ready to Get Started?</h2>
            <p>Contact our experts today to discuss how we can help improve your health, safety, and environmental performance</p>
            <div className="cta-actions" style={{ marginTop: '20px' }}>
              <Link to="/contact" className="btn btn-primary btn-lg hover-float">
                Request Consultation
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

export default Services;