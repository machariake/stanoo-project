import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero section">
        <div className="container">
          <div className="hero-content text-center">
            <h1>Our Professional Services</h1>
            <p>Comprehensive health, safety, and environmental management solutions tailored to your business needs</p>
          </div>
        </div>
      </section>

      {/* Health & Safety Audits */}
      <section id="health-safety-audits" className="service-detail section">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="service-content">
                <div className="service-icon-large">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <h2>Health & Safety Audits</h2>
                <p className="service-intro">Comprehensive workplace assessments designed to identify hazards, evaluate risks, and ensure full compliance with health and safety regulations.</p>
                
                <div className="service-features">
                  <h3>What We Offer</h3>
                  <ul>
                    <li><i className="fas fa-check"></i> Workplace hazard identification and risk assessment</li>
                    <li><i className="fas fa-check"></i> Compliance audits for local and international standards</li>
                    <li><i className="fas fa-check"></i> Safety management system evaluation</li>
                    <li><i className="fas fa-check"></i> Incident investigation and analysis</li>
                    <li><i className="fas fa-check"></i> Emergency preparedness assessment</li>
                    <li><i className="fas fa-check"></i> Personal protective equipment evaluation</li>
                  </ul>
                </div>

                <div className="service-benefits">
                  <h3>Benefits</h3>
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <i className="fas fa-shield-alt"></i>
                      <span>Reduced workplace incidents</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-gavel"></i>
                      <span>Regulatory compliance</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-chart-line"></i>
                      <span>Improved productivity</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-dollar-sign"></i>
                      <span>Cost savings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="service-image">
                <div className="service-image-placeholder">
                  <i className="fas fa-hard-hat"></i>
                  <span>Safety First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Assessments */}
      <section id="environmental-assessments" className="service-detail section section-alt">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="service-image">
                <div className="service-image-placeholder">
                  <i className="fas fa-globe-africa"></i>
                  <span>Environmental Care</span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="service-content">
                <div className="service-icon-large">
                  <i className="fas fa-leaf"></i>
                </div>
                <h2>Environmental Impact Assessments</h2>
                <p className="service-intro">Detailed environmental studies to minimize ecological impact, ensure regulatory compliance, and promote sustainable business operations.</p>
                
                <div className="service-features">
                  <h3>What We Offer</h3>
                  <ul>
                    <li><i className="fas fa-check"></i> Environmental impact screening and scoping</li>
                    <li><i className="fas fa-check"></i> Baseline environmental studies</li>
                    <li><i className="fas fa-check"></i> Impact prediction and evaluation</li>
                    <li><i className="fas fa-check"></i> Mitigation measures development</li>
                    <li><i className="fas fa-check"></i> Environmental management plans</li>
                    <li><i className="fas fa-check"></i> Monitoring and audit programs</li>
                  </ul>
                </div>

                <div className="service-benefits">
                  <h3>Benefits</h3>
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <i className="fas fa-leaf"></i>
                      <span>Environmental protection</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-balance-scale"></i>
                      <span>Legal compliance</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-handshake"></i>
                      <span>Stakeholder confidence</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-recycle"></i>
                      <span>Sustainable practices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Consultancy */}
      <section id="training-consultancy" className="service-detail section">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="service-content">
                <div className="service-icon-large">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h2>Training & Consultancy</h2>
                <p className="service-intro">Expert training programs and consultancy services designed to build safety culture, enhance competencies, and implement best practices across your organization.</p>
                
                <div className="service-features">
                  <h3>Training Programs</h3>
                  <ul>
                    <li><i className="fas fa-check"></i> Health and safety awareness training</li>
                    <li><i className="fas fa-check"></i> Environmental management training</li>
                    <li><i className="fas fa-check"></i> Risk assessment and management</li>
                    <li><i className="fas fa-check"></i> Emergency response training</li>
                    <li><i className="fas fa-check"></i> Leadership development programs</li>
                    <li><i className="fas fa-check"></i> Customized industry-specific training</li>
                  </ul>

                  <h3>Consultancy Services</h3>
                  <ul>
                    <li><i className="fas fa-check"></i> HSE management system development</li>
                    <li><i className="fas fa-check"></i> Policy and procedure development</li>
                    <li><i className="fas fa-check"></i> Compliance strategy development</li>
                    <li><i className="fas fa-check"></i> Performance improvement consulting</li>
                  </ul>
                </div>

                <div className="service-benefits">
                  <h3>Benefits</h3>
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <i className="fas fa-users"></i>
                      <span>Skilled workforce</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-brain"></i>
                      <span>Enhanced awareness</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-trophy"></i>
                      <span>Best practices</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-chart-line"></i>
                      <span>Improved performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="service-image">
                <div className="service-image-placeholder">
                  <i className="fas fa-graduation-cap"></i>
                  <span>Expert Training</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Solutions */}
      <section id="risk-management" className="service-detail section section-alt">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="service-image">
                <div className="service-image-placeholder">
                  <i className="fas fa-chess-knight"></i>
                  <span>Strategic Planning</span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="service-content">
                <div className="service-icon-large">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Risk Management Solutions</h2>
                <p className="service-intro">Comprehensive risk assessment and management strategies to protect your business, employees, and stakeholders from potential hazards and uncertainties.</p>
                
                <div className="service-features">
                  <h3>What We Offer</h3>
                  <ul>
                    <li><i className="fas fa-check"></i> Comprehensive risk identification and analysis</li>
                    <li><i className="fas fa-check"></i> Risk assessment methodologies</li>
                    <li><i className="fas fa-check"></i> Risk mitigation strategy development</li>
                    <li><i className="fas fa-check"></i> Business continuity planning</li>
                    <li><i className="fas fa-check"></i> Crisis management protocols</li>
                    <li><i className="fas fa-check"></i> Risk monitoring and review systems</li>
                  </ul>
                </div>

                <div className="service-benefits">
                  <h3>Benefits</h3>
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <i className="fas fa-shield-alt"></i>
                      <span>Business protection</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-clock"></i>
                      <span>Proactive approach</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-thumbs-up"></i>
                      <span>Stakeholder confidence</span>
                    </div>
                    <div className="benefit-item">
                      <i className="fas fa-heart"></i>
                      <span>Peace of mind</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="industries section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Industries We Serve</h2>
            <p>Our expertise spans across various sectors, providing tailored solutions for each industry's unique challenges</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-industry"></i>
              </div>
              <h3>Manufacturing</h3>
              <p>Safety protocols and environmental compliance for manufacturing facilities</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-hammer"></i>
              </div>
              <h3>Construction</h3>
              <p>Site safety management and environmental impact assessments</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-hospital"></i>
              </div>
              <h3>Healthcare</h3>
              <p>Infection control and medical waste management solutions</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Education</h3>
              <p>Campus safety programs and environmental education initiatives</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-oil-can"></i>
              </div>
              <h3>Oil & Gas</h3>
              <p>Process safety and environmental risk management</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h3>Retail</h3>
              <p>Customer and employee safety in retail environments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process section section-alt">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Process</h2>
            <p>A systematic approach to delivering exceptional results</p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Initial Consultation</h3>
                <p>We meet with you to understand your specific needs, challenges, and objectives</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Assessment & Analysis</h3>
                <p>Comprehensive evaluation of your current systems, processes, and compliance status</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Solution Development</h3>
                <p>Customized solutions designed to address your specific requirements and goals</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Implementation</h3>
                <p>Professional execution of solutions with ongoing support and guidance</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Monitoring & Review</h3>
                <p>Continuous monitoring and periodic reviews to ensure sustained effectiveness</p>
              </div>
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