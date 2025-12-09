import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent">
            <div className="cookie-content">
                <p className="cookie-text">
                    We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                    See our <Link to="/privacy-policy">Privacy Policy</Link> for more information.
                </p>
                <div className="cookie-buttons">
                    <button onClick={handleDecline} className="btn-cookie-decline">
                        Decline
                    </button>
                    <button onClick={handleAccept} className="btn-cookie-accept">
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
