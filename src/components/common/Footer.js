import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState({
    companyName: 'Theuri Green Health Safe',
    email: 'info@theurigreenhealthsafe.com',
    phone: '+254 700 000 000',
    address: 'Westlands, Nairobi, Kenya',
    tagline: 'Professional health, safety, and environmental management services',
    facebookUrl: '#',
    twitterUrl: '#',
    linkedinUrl: '#',
    instagramUrl: '#'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/settings`);
        if (response.data.settings && Object.keys(response.data.settings).length > 0) {
          setSettings(prev => ({
            ...prev,
            ...response.data.settings
          }));
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  /* Newsletter State */
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setSubscriptionStatus(null);

    try {
      const response = await axios.post(`${config.API_URL}/newsletter`, { email });
      if (response.data.success) {
        setSubscriptionStatus({ type: 'success', message: 'Subscribed successfully!' });
        setEmail('');
      }
    } catch (err) {
      setSubscriptionStatus({ type: 'error', message: 'Subscription failed. Try again.' });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <Logo width={40} height={40} theme="dark" color="#a3e635" />
            </div>
            <p className="footer-description">
              {settings.tagline || "Professional health, safety, and environmental management services committed to creating safer workplaces and protecting the environment for a sustainable future."}
            </p>
            <div className="social-links">
              {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>}
              {settings.twitterUrl && <a href={settings.twitterUrl} target="_blank" rel="noreferrer" aria-label="Twitter" className="social-link"><i className="fab fa-twitter"></i></a>}
              {settings.linkedinUrl && <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link"><i className="fab fa-linkedin-in"></i></a>}
              {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link"><i className="fab fa-instagram"></i></a>}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-text" style={{ color: '#aaa', marginBottom: '15px', fontSize: '14px' }}>
              Subscribe to get the latest news and updates.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #444',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  marginBottom: '10px'
                }}
              />
              <button
                type="submit"
                disabled={subscribing}
                className="hover-float"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#a3e635',
                  color: '#1a4d2e',
                  fontWeight: 'bold',
                  cursor: subscribing ? 'not-allowed' : 'pointer'
                }}
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscriptionStatus && (
              <p style={{
                marginTop: '10px',
                color: subscriptionStatus.type === 'success' ? '#a3e635' : '#ff6b6b',
                fontSize: '14px'
              }}>
                {subscriptionStatus.message}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{settings.address}</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>{settings.phone}</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} {settings.companyName}. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/admin">Admin Portal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;