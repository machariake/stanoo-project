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
    <div className="about">
      <SEO
        title="About Us"
        description="Learn about Theuri Green Health Safe, our mission, vision, values, and the expert team dedicated to your safety."
      />
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
      <section className="mission-vision section section-alt">
        <div className="container">
          <div className="mvv-grid">
            <div className="mvv-card">
              <div className="mvv-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>To provide comprehensive health, safety, and environmental management services that protect people, preserve the environment, and promote sustainable business practices across all industries.</p>
            </div>
            <div className="mvv-card">
              <div className="mvv-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>To be the leading provider of health, safety, and environmental solutions in East Africa, recognized for our expertise, innovation, and commitment to creating a safer, healthier world.</p>
            </div>
            <div className="mvv-card">
              <div className="mvv-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Our Values</h3>
              <ul>
                <li><strong>Excellence:</strong> We strive for the highest standards in everything we do</li>
                <li><strong>Integrity:</strong> We conduct business with honesty and transparency</li>
                <li><strong>Innovation:</strong> We embrace new technologies and methodologies</li>
                <li><strong>Sustainability:</strong> We promote environmentally responsible practices</li>
                <li><strong>Safety First:</strong> We prioritize the well-being of all stakeholders</li>
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
              <div className="story-content">
                <h2>Our Story</h2>
                <p>Founded in 2008, Theuri Green Health Safe emerged from a simple yet powerful vision: to create safer workplaces and protect our environment for future generations. What started as a small consultancy firm has grown into a leading provider of comprehensive health, safety, and environmental management services.</p>

                <p>Over the years, we have built our reputation on delivering exceptional results, maintaining the highest professional standards, and fostering long-term partnerships with our clients. Our team of certified experts brings together decades of combined experience in various industries, from manufacturing and construction to healthcare and education.</p>

                <p>Today, we serve clients across East Africa, helping organizations navigate complex regulatory requirements, implement effective safety programs, and achieve their sustainability goals. Our commitment to continuous improvement and innovation ensures that we remain at the forefront of industry best practices.</p>

                <div className="story-highlights">
                  <div className="highlight">
                    <h4>15+ Years</h4>
                    <span>Of Excellence</span>
                  </div>
                  <div className="highlight">
                    <h4>500+</h4>
                    <span>Projects Completed</span>
                  </div>
                  <div className="highlight">
                    <h4>50+</h4>
                    <span>Expert Team Members</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="story-image">
                <div className="story-image-placeholder">
                  <i className="fas fa-history"></i>
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
          <div className="section-header text-center">
            <h2>Meet Our Leadership Team</h2>
            <p>Experienced professionals dedicated to your safety and environmental success</p>
          </div>
          <div className="team-grid">
            {team.length > 0 ? (
              team.map(member => (
                <div className="team-member" key={member._id}>
                  <div className="member-image">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="member-placeholder">
                        <i className="fas fa-user"></i>
                      </div>
                    )}
                  </div>
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                    <p>{member.bio}</p>
                    {member.credentials && member.credentials.length > 0 && (
                      <div className="member-credentials">
                        {member.credentials.map((cred, idx) => (
                          <span key={idx}>{cred}</span>
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
          <div className="section-header text-center">
            <h2>Certifications & Accreditations</h2>
            <p>Recognized by leading industry bodies for our expertise and commitment to excellence</p>
          </div>
          <div className="certifications-grid">
            <div className="certification-card">
              <div className="cert-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h4>ISO 45001:2018</h4>
              <p>Occupational Health and Safety Management Systems</p>
            </div>
            <div className="certification-card">
              <div className="cert-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h4>ISO 14001:2015</h4>
              <p>Environmental Management Systems</p>
            </div>
            <div className="certification-card">
              <div className="cert-icon">
                <i className="fas fa-award"></i>
              </div>
              <h4>NEBOSH</h4>
              <p>National Examination Board in Occupational Safety and Health</p>
            </div>
            <div className="certification-card">
              <div className="cert-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>NEMA</h4>
              <p>National Environment Management Authority Licensed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Work With Us?</h2>
            <p>Join hundreds of satisfied clients who trust us with their health, safety, and environmental needs.</p>
            <div className="cta-actions">
              <Link to="/services" className="btn btn-primary btn-lg">
                Explore Our Services
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
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