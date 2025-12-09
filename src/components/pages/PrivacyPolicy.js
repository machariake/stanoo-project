import React, { useEffect } from 'react'; // Import useEffect
import SEO from '../common/SEO';
import config from '../../config';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${config.API_URL}/settings`);
                const data = await response.json();
                if (data.settings && data.settings.privacyPolicyContent) {
                    setContent(data.settings.privacyPolicyContent);
                }
            } catch (error) {
                console.error("Error fetching privacy policy:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    const defaultContent = `
        <p>
            At <strong>Theuri Green Health Safe</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>

        <h3>Personal Data</h3>
        <p>
            Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
        </p>

        <h3>Derivative Data</h3>
        <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
        </p>

        <h2>2. Use of Your Information</h2>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul>
            <li>Schedule and manage consultations and services.</li>
            <li>Send you a newsletter (if subscribed).</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Respond to product and customer service requests.</li>
        </ul>

        <h2>3. Disclosure of Your Information</h2>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>

        <h3>By Law or to Protect Rights</h3>
        <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </p>

        <h3>Third-Party Service Providers</h3>
        <p>
            We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
        </p>

        <h2>4. Security of Your Information</h2>
        <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2>5. Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us.</p>
    `;

    return (
        <div className="privacy-policy">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for Theuri Green Health Safe. Learn how we collect, use, and protect your personal information."
            />

            <section className="privacy-hero">
                <div className="container">
                    <div className="hero-content text-center">
                        <h1>Privacy Policy</h1>
                        <p>Transparency and trust are at the core of our business</p>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className="privacy-content">
                    <span className="last-updated">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                    {loading ? (
                        <p>Loading policy...</p>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: content || defaultContent }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
