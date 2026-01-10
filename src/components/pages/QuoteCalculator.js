import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import { useToast } from '../../context/ToastContext';
import './QuoteCalculator.css'; // We'll need to create this CSS file

const QuoteCalculator = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Service Type
        serviceType: '', // 'safety', 'environmental', 'training', 'audit'

        // Step 2: Specifics (Dynamic)
        employeeCount: '',
        buildingSize: '', // sq meters
        location: '',
        urgency: 'normal',

        // Step 3: Contact Info
        name: '',
        company: '',
        email: '',
        phone: '',
        details: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceSelect = (type) => {
        setFormData(prev => ({ ...prev, serviceType: type }));
        setStep(2);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${config.API_URL}/quote`, formData);
            if (response.data.success) {
                addToast('Quote request sent! We will contact you shortly.', 'success');
                // Optional: Navigate to a thank you page or just reset
                setStep(4); // Success step
            }
        } catch (error) {
            console.error('Quote submission error:', error);
            addToast('Failed to send request. Please try again.', 'error');
            setIsSubmitting(false);
        }
    };

    // Render Steps
    const renderStep1 = () => (
        <div className="step-content fade-in">
            <h2 className="step-title">What service do you need?</h2>
            <div className="service-options-grid">
                {[
                    { id: 'safety', icon: 'fa-hard-hat', label: 'Occupational Safety', desc: 'Audits, Compliance, Risk Assessment' },
                    { id: 'environmental', icon: 'fa-leaf', label: 'Environmental', desc: 'Impact Assessment, NEMA Licensing' },
                    { id: 'training', icon: 'fa-chalkboard-teacher', label: 'Safety Training', desc: 'Fire Safety, First Aid, OSH Committee' },
                    { id: 'audit', icon: 'fa-clipboard-check', label: ' Audits & Inspections', desc: 'Fire, Safety, & Risk Audits' },
                ].map(option => (
                    <div
                        key={option.id}
                        className={`service-option-card glass-card hover-float ${formData.serviceType === option.id ? 'active' : ''}`}
                        onClick={() => handleServiceSelect(option.id)}
                    >
                        <div className="icon-wrapper">
                            <i className={`fas ${option.icon}`}></i>
                        </div>
                        <h3>{option.label}</h3>
                        <p>{option.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="step-content fade-in">
            <h2 className="step-title">Tell us a bit more...</h2>

            <div className="form-grid">
                <div className="form-group">
                    <label>Approx. Number of Employees</label>
                    <select name="employeeCount" value={formData.employeeCount} onChange={handleChange} className="form-control">
                        <option value="">Select Range</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-100">51-100</option>
                        <option value="100+">100+</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Location (City/Town)</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" placeholder="e.g. Nairobi" />
                </div>

                {(formData.serviceType === 'audit' || formData.serviceType === 'safety') && (
                    <div className="form-group">
                        <label>Approx. Building/Site Size (Sq Meters)</label>
                        <input type="number" name="buildingSize" value={formData.buildingSize} onChange={handleChange} className="form-control" placeholder="Optional" />
                    </div>
                )}

                <div className="form-group">
                    <label>Urgency</label>
                    <div className="radio-group">
                        <label className={`radio-option ${formData.urgency === 'normal' ? 'selected' : ''}`}>
                            <input type="radio" name="urgency" value="normal" checked={formData.urgency === 'normal'} onChange={handleChange} />
                            Normal
                        </label>
                        <label className={`radio-option ${formData.urgency === 'urgent' ? 'selected' : ''}`}>
                            <input type="radio" name="urgency" value="urgent" checked={formData.urgency === 'urgent'} onChange={handleChange} />
                            Urgent
                        </label>
                    </div>
                </div>
            </div>

            <div className="step-actions">
                <button className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button className="btn btn-primary" onClick={nextStep} disabled={!formData.employeeCount}>Next</button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="step-content fade-in">
            <h2 className="step-title">How can we reach you?</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group full-width">
                        <label>Additional Details (Optional)</label>
                        <textarea name="details" value={formData.details} onChange={handleChange} className="form-control" rows="3"></textarea>
                    </div>
                </div>

                <div className="step-actions">
                    <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? <i className="fas fa-spinner fa-spin"></i> : 'Submit Request'}
                    </button>
                </div>
            </form>
        </div>
    );

    const renderSuccess = () => (
        <div className="step-content text-center fade-in">
            <div className="success-icon">
                <i className="fas fa-check-circle"></i>
            </div>
            <h2>Request Received!</h2>
            <p>Thank you for contacting Theuri Green Health Safe.</p>
            <p>We have received your details and one of our consultants will be in touch with a customized quote shortly.</p>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>Return Home</button>
        </div>
    );

    return (
        <div className="quote-calculator-page">
            <SEO title="Get a Quote | Theuri Green Health Safe" description="Get a customized quote for your health, safety, and environmental consultancy needs." />
            <PageHeader title="Get a Free Quote" subtitle="Tell us about your needs and get an estimated cost." breadcrumb="Quote" />

            <section className="section">
                <div className="container">
                    <div className="calculator-wrapper">
                        {/* Progress Bar */}
                        {step < 4 && (
                            <div className="progress-indicator">
                                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Service</div>
                                <div className={`progress-line ${step >= 2 ? 'filled' : ''}`}></div>
                                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Details</div>
                                <div className={`progress-line ${step >= 3 ? 'filled' : ''}`}></div>
                                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Contact</div>
                            </div>
                        )}

                        <div className="calculator-card glass-panel">
                            {step === 1 && renderStep1()}
                            {step === 2 && renderStep2()}
                            {step === 3 && renderStep3()}
                            {step === 4 && renderSuccess()}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuoteCalculator;
