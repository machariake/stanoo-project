import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/services`);
        const sorted = response.data.services.sort((a, b) => a.order - b.order);
        setServices(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
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
    <div className="services">
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
            className={`service-detail section ${index % 2 !== 0 ? 'section-alt' : ''}`}
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
                      <div className="service-image">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                          />
                        ) : (
                          <div className="service-image-placeholder">
                            <i className={service.icon}></i>
                            <span>{service.title.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="service-content">
                        <div className="service-icon-large">
                          <i className={service.icon}></i>
                        </div>
                        <h2>{service.title}</h2>
                        <p className="service-intro">{service.fullDescription}</p>

                        {service.features && service.features.length > 0 && (
                          <div className="service-features">
                            <h3>What We Offer</h3>
                            <ul>
                              {service.features.map((feature, idx) => (
                                <li key={idx}><i className="fas fa-check"></i> {feature}</li>
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
                        <div className="service-icon-large">
                          <i className={service.icon}></i>
                        </div>
                        <h2>{service.title}</h2>
                        <p className="service-intro">{service.fullDescription}</p>

                        {service.features && service.features.length > 0 && (
                          <div className="service-features">
                            <h3>What We Offer</h3>
                            <ul>
                              {service.features.map((feature, idx) => (
                                <li key={idx}><i className="fas fa-check"></i> {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="service-image">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                          />
                        ) : (
                          <div className="service-image-placeholder">
                            <i className={service.icon}></i>
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

      {/* Industries We Serve Section (Static for now, could be dynamic later) */}
      <section className="industries section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Industries We Serve</h2>
            <p>Our expertise spans across various sectors, providing tailored solutions for each industry's unique challenges</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-industry"></i></div>
              <h3>Manufacturing</h3>
              <p>Safety protocols and environmental compliance for manufacturing facilities</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-hammer"></i></div>
              <h3>Construction</h3>
              <p>Site safety management and environmental impact assessments</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-hospital"></i></div>
              <h3>Healthcare</h3>
              <p>Infection control and medical waste management solutions</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>Education</h3>
              <p>Campus safety programs and environmental education initiatives</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-oil-can"></i></div>
              <h3>Oil & Gas</h3>
              <p>Process safety and environmental risk management</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><i className="fas fa-shopping-cart"></i></div>
              <h3>Retail</h3>
              <p>Customer and employee safety in retail environments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="services-cta section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Get Started?</h2>
            <p>Contact our experts today to discuss how we can help improve your health, safety, and environmental performance</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request Consultation
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

export default Services;