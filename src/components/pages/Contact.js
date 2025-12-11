import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import { useToast } from '../../context/ToastContext';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    email: 'info@theurigreenhealthsafe.com',
    phone: '+254 700 000 000',
    address: 'Westlands, Nairobi, Kenya',
    whatsappNumber: '254700000000'
  });

  const { addToast } = useToast();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) {
      addToast('Please enter your full name (at least 3 characters).', 'warning');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addToast('Please enter a valid email address.', 'warning');
      return false;
    }

    if (formData.phone && formData.phone.length < 10) {
      addToast('Please enter a valid phone number.', 'warning');
      return false;
    }

    if (formData.message.trim().length < 10) {
      addToast('Please enter a more detailed message (at least 10 characters).', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${config.API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        addToast('Message sent successfully! We will get back to you soon.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        addToast('Failed to send message: ' + (result.message || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      addToast('Network error. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact fade-in">
      <SEO
        title="Contact Us"
        description="Get in touch with Theuri Green Health Safe for expert consultation on health, safety, and environmental management solutions."
      />

      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our experts for professional consultation and customized solutions."
        breadcrumb="Contact"
      />

      {/* Contact Form & Info */}
      <section className="contact-main section">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-2">
              <div className="contact-form-container glass-card slide-up delay-100">
                <h2 className="gradient-text">Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-2">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-2">
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="form-group">
                        <label htmlFor="company" className="form-label">Company/Organization</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="form-control"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service of Interest</label>
                    <select
                      id="service"
                      name="service"
                      className="form-control"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      <option value="health-safety-audits">Health & Safety Audits</option>
                      <option value="environmental-assessments">Environmental Impact Assessments</option>
                      <option value="training-consultancy">Training & Consultancy</option>
                      <option value="risk-management">Risk Management Solutions</option>
                      <option value="general-consultation">General Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or requirements..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg hover-float"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-2">
              <div className="contact-info glass-card slide-in-right delay-200">
                <h2 className="gradient-text">Get In Touch</h2>
                <p>Ready to improve your workplace safety and environmental performance? Contact us today!</p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon glass-panel">
                      <i className="fas fa-map-marker-alt gradient-text"></i>
                    </div>
                    <div className="method-content">
                      <h4>Our Location</h4>
                      <p style={{ whiteSpace: 'pre-line' }}>{settings.address.split(',').join('\n')}</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon glass-panel">
                      <i className="fas fa-phone gradient-text"></i>
                    </div>
                    <div className="method-content">
                      <h4>Phone Numbers</h4>
                      <p>
                        <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>{settings.phone}</a><br />
                        {settings.whatsappNumber && <a href={`https://wa.me/${settings.whatsappNumber}`}>WhatsApp Support</a>}
                      </p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon glass-panel">
                      <i className="fas fa-envelope gradient-text"></i>
                    </div>
                    <div className="method-content">
                      <h4>Email Address</h4>
                      <p>
                        <a href={`mailto:${settings.email}`}>{settings.email}</a><br />
                      </p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon glass-panel">
                      <i className="fas fa-clock gradient-text"></i>
                    </div>
                    <div className="method-content">
                      <h4>Business Hours</h4>
                      <p>
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="emergency-contact glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444' }}>
                  <h3 style={{ color: '#ef4444' }}><i className="fas fa-exclamation-triangle"></i> Emergency Services</h3>
                  <p>For urgent safety or environmental incidents:</p>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="emergency-number" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444', margin: '0.5rem 0' }}>{settings.phone}</a>
                  <span className="emergency-note">Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section section slide-up delay-300">
        <div className="container">
          <h2 className="text-center mb-4">Find Us</h2>
          <div className="map-container glass-card" style={{ padding: '10px' }}>
            {/* Placeholder for Google Maps */}
            <div className="map-placeholder" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
              <div className="map-content">
                <i className="fas fa-map-marked-alt text-4xl mb-4 gradient-text"></i>
                <h3>Our Office Location</h3>
                <p>{settings.address}</p>
                <p className="map-note">
                  Interactive map will be integrated here with Google Maps API
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section section-alt gradient-bg">
        <div className="container">
          <div className="section-header text-center slide-up">
            <h2 style={{ color: 'white' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>Quick answers to common questions about our services</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item glass-card hover-float slide-up delay-100">
              <h4 className="gradient-text">How quickly can you respond to consultation requests?</h4>
              <p>We typically respond to all consultation requests within 24 hours during business days. For urgent matters, we offer same-day response services.</p>
            </div>
            <div className="faq-item glass-card hover-float slide-up delay-200">
              <h4 className="gradient-text">Do you provide services across East Africa?</h4>
              <p>Yes, we serve clients throughout East Africa. Our team can travel to your location or provide remote consultation services as needed.</p>
            </div>
            <div className="faq-item glass-card hover-float slide-up delay-300">
              <h4 className="gradient-text">What industries do you specialize in?</h4>
              <p>We work with manufacturing, construction, healthcare, education, oil & gas, retail, and many other industries. Our solutions are customized for each sector's unique requirements.</p>
            </div>
            <div className="faq-item glass-card hover-float slide-up delay-400">
              <h4 className="gradient-text">Are your certifications internationally recognized?</h4>
              <p>Yes, our team holds internationally recognized certifications including ISO standards, NEBOSH, and other globally accepted credentials.</p>
            </div>
            <div className="faq-item glass-card hover-float slide-up delay-500">
              <h4 className="gradient-text">Do you offer emergency response services?</h4>
              <p>We provide 24/7 emergency response services for critical safety and environmental incidents. Contact our emergency hotline for immediate assistance.</p>
            </div>
            <div className="faq-item glass-card hover-float slide-up delay-500">
              <h4 className="gradient-text">Can you customize training programs for our organization?</h4>
              <p>Absolutely! We design customized training programs based on your specific industry, organizational needs, and compliance requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;