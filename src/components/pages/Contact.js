import React, { useState } from 'react';
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
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero section">
        <div className="container">
          <div className="hero-content text-center">
            <h1>Contact Us</h1>
            <p>Get in touch with our experts for professional consultation and customized solutions</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main section">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-2">
              <div className="contact-form-container">
                <h2>Send Us a Message</h2>
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

                  {submitStatus === 'success' && (
                    <div className="alert alert-success">
                      <i className="fas fa-check-circle"></i>
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="alert alert-error">
                      <i className="fas fa-exclamation-circle"></i>
                      Sorry, there was an error sending your message. Please try again.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
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
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <p>Ready to improve your workplace safety and environmental performance? Contact us today!</p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="method-content">
                      <h4>Our Location</h4>
                      <p>123 Green Street<br />Nairobi, Kenya<br />P.O. Box 12345</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="method-content">
                      <h4>Phone Numbers</h4>
                      <p>
                        <a href="tel:+254700000000">+254 700 000 000</a><br />
                        <a href="tel:+254711000000">+254 711 000 000</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="method-content">
                      <h4>Email Address</h4>
                      <p>
                        <a href="mailto:info@theurigreenhealthsafe.com">info@theurigreenhealthsafe.com</a><br />
                        <a href="mailto:consultation@theurigreenhealthsafe.com">consultation@theurigreenhealthsafe.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">
                      <i className="fas fa-clock"></i>
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

                <div className="emergency-contact">
                  <h3><i className="fas fa-exclamation-triangle"></i> Emergency Services</h3>
                  <p>For urgent safety or environmental incidents:</p>
                  <a href="tel:+254722000000" className="emergency-number">+254 722 000 000</a>
                  <span className="emergency-note">Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section section">
        <div className="container">
          <h2 className="text-center mb-4">Find Us</h2>
          <div className="map-container">
            {/* Placeholder for Google Maps */}
            <div className="map-placeholder">
              <div className="map-content">
                <i className="fas fa-map-marked-alt"></i>
                <h3>Our Office Location</h3>
                <p>123 Green Street, Nairobi, Kenya</p>
                <p className="map-note">
                  Interactive map will be integrated here with Google Maps API
                </p>
                <a 
                  href="https://maps.google.com/?q=Nairobi,Kenya" 
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
      <section className="faq-section section section-alt">
        <div className="container">
          <div className="section-header text-center">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions about our services</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How quickly can you respond to consultation requests?</h4>
              <p>We typically respond to all consultation requests within 24 hours during business days. For urgent matters, we offer same-day response services.</p>
            </div>
            <div className="faq-item">
              <h4>Do you provide services across East Africa?</h4>
              <p>Yes, we serve clients throughout East Africa. Our team can travel to your location or provide remote consultation services as needed.</p>
            </div>
            <div className="faq-item">
              <h4>What industries do you specialize in?</h4>
              <p>We work with manufacturing, construction, healthcare, education, oil & gas, retail, and many other industries. Our solutions are customized for each sector's unique requirements.</p>
            </div>
            <div className="faq-item">
              <h4>Are your certifications internationally recognized?</h4>
              <p>Yes, our team holds internationally recognized certifications including ISO standards, NEBOSH, and other globally accepted credentials.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer emergency response services?</h4>
              <p>We provide 24/7 emergency response services for critical safety and environmental incidents. Contact our emergency hotline for immediate assistance.</p>
            </div>
            <div className="faq-item">
              <h4>Can you customize training programs for our organization?</h4>
              <p>Absolutely! We design customized training programs based on your specific industry, organizational needs, and compliance requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;