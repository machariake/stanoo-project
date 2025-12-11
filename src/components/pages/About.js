import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import './About.css';

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/team`);
        const sorted = response.data.team.sort((a, b) => a.order - b.order);
        setTeam(sorted);
      } catch (err) {
        console.error('Error fetching team:', err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="about fade-in">
      <SEO
        title="About Us"
        description="Learn about Theuri Green Health Safe, our mission, vision, values, and the expert team dedicated to your safety."
      />

      <PageHeader
        title="About Theuri Green Health Safe"
        subtitle="Leading the way in health, safety, and environmental management."
        breadcrumb="About Us"
      />

      {/* Mission Vision Values */}
      <section className="mission-vision section section-alt gradient-bg">
        <div className="container">
          <div className="mvv-grid">
            <div className="mvv-card glass-card slide-up delay-100 hover-float">
              <div className="mvv-icon text-center">
                <i className="fas fa-bullseye icon-xl gradient-text"></i>
              </div>
              <h3 className="text-center">Our Mission</h3>
              <p className="text-center">To provide comprehensive health, safety, and environmental management services that protect people, preserve the environment, and promote sustainable business practices across all industries.</p>
            </div>
            <div className="mvv-card glass-card slide-up delay-200 hover-float">
              <div className="mvv-icon text-center">
                <i className="fas fa-eye icon-xl gradient-text"></i>
              </div>
              <h3 className="text-center">Our Vision</h3>
              <p className="text-center">To be the leading provider of health, safety, and environmental solutions in East Africa, recognized for our expertise, innovation, and commitment to creating a safer, healthier world.</p>
            </div>
            <div className="mvv-card glass-card slide-up delay-300 hover-float">
              <div className="mvv-icon text-center">
                <i className="fas fa-heart icon-xl gradient-text"></i>
              </div>
              <h3 className="text-center">Our Values</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i><strong>Excellence</strong></li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i><strong>Integrity</strong></li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i><strong>Innovation</strong></li>
                <li style={{ marginBottom: '10px' }}><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i><strong>Sustainability</strong></li>
                <li><i className="fas fa-check-circle gradient-text" style={{ marginRight: '10px' }}></i><strong>Safety First</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story section">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="story-content slide-up">
                <h2 className="gradient-text">Our Story</h2>
                <p>Founded in 2008, Theuri Green Health Safe emerged from a simple yet powerful vision: to create safer workplaces and protect our environment for future generations. What started as a small consultancy firm has grown into a leading provider of comprehensive health, safety, and environmental management services.</p>

                <p>Over the years, we have built our reputation on delivering exceptional results, maintaining the highest professional standards, and fostering long-term partnerships with our clients. Our team of certified experts brings together decades of combined experience in various industries, from manufacturing and construction to healthcare and education.</p>

                <p>Today, we serve clients across East Africa, helping organizations navigate complex regulatory requirements, implement effective safety programs, and achieve their sustainability goals. Our commitment to continuous improvement and innovation ensures that we remain at the forefront of industry best practices.</p>

                <div className="story-highlights slide-up delay-200">
                  <div className="highlight glass-panel text-center">
                    <h4 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>15+ Years</h4>
                    <span>Of Excellence</span>
                  </div>
                  <div className="highlight glass-panel text-center">
                    <h4 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>500+</h4>
                    <span>Projects Completed</span>
                  </div>
                  <div className="highlight glass-panel text-center">
                    <h4 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>50+</h4>
                    <span>Expert Team Members</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="story-image slide-in-right delay-200">
                <div className="story-image-placeholder glass-panel">
                  <i className="fas fa-history icon-xl gradient-text"></i>
                  <span>Our Journey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team section section-alt">
        <div className="container">
          <div className="section-header text-center slide-up">
            <h2>Meet Our Leadership Team</h2>
            <p>Experienced professionals dedicated to your safety and environmental success</p>
          </div>
          <div className="team-grid">
            {team.length > 0 ? (
              team.map((member, idx) => (
                <div className={`team-member glass-card slide-up delay-${Math.min((idx + 1) * 100, 500)}`} key={member._id}>
                  <div className="member-image">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="member-placeholder gradient-bg">
                        <i className="fas fa-user" style={{ color: 'white' }}></i>
                      </div>
                    )}
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span className="gradient-text" style={{ fontWeight: 'bold' }}>{member.role}</span>
                    <p>{member.bio}</p>
                    {member.credentials && member.credentials.length > 0 && (
                      <div className="member-credentials">
                        {member.credentials.map((cred, idx) => (
                          <span key={idx} className="glass-panel" style={{ padding: '2px 8px', fontSize: '0.8rem', borderRadius: '4px', display: 'inline-block', margin: '2px' }}>{cred}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center" style={{ width: '100%', padding: '20px' }}>Loading Team Members...</div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications section">
        <div className="container">
          <div className="section-header text-center slide-up">
            <h2>Certifications & Accreditations</h2>
            <p>Recognized by leading industry bodies for our expertise and commitment to excellence</p>
          </div>
          <div className="certifications-grid">
            <div className="certification-card glass-card hover-float slide-up delay-100">
              <div className="cert-icon">
                <i className="fas fa-certificate gradient-text icon-lg"></i>
              </div>
              <h4>ISO 45001:2018</h4>
              <p>Occupational Health and Safety Management Systems</p>
            </div>
            <div className="certification-card glass-card hover-float slide-up delay-200">
              <div className="cert-icon">
                <i className="fas fa-leaf gradient-text icon-lg"></i>
              </div>
              <h4>ISO 14001:2015</h4>
              <p>Environmental Management Systems</p>
            </div>
            <div className="certification-card glass-card hover-float slide-up delay-300">
              <div className="cert-icon">
                <i className="fas fa-award gradient-text icon-lg"></i>
              </div>
              <h4>NEBOSH</h4>
              <p>National Examination Board in Occupational Safety and Health</p>
            </div>
            <div className="certification-card glass-card hover-float slide-up delay-400">
              <div className="cert-icon">
                <i className="fas fa-shield-alt gradient-text icon-lg"></i>
              </div>
              <h4>NEMA</h4>
              <p>National Environment Management Authority Licensed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta section gradient-bg text-white scale-in">
        <div className="container">
          <div className="cta-content text-center">
            <h2 style={{ color: 'white' }}>Ready to Work With Us?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>Join hundreds of satisfied clients who trust us with their health, safety, and environmental needs.</p>
            <div className="cta-actions">
              <Link to="/services" className="btn btn-primary btn-lg hover-float" style={{ backgroundColor: 'white', color: 'var(--primary-green)' }}>
                Explore Our Services
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg hover-float" style={{ borderColor: 'white', color: 'white' }}>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;