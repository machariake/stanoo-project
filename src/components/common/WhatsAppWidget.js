import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
    const [phoneNumber, setPhoneNumber] = useState('254700000000'); // Default fallback

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/settings`);
                if (response.data.settings?.whatsappNumber) {
                    setPhoneNumber(response.data.settings.whatsappNumber.replace(/\+/g, '').replace(/\s/g, ''));
                } else if (response.data.settings?.phone) {
                    // Fallback to main phone if no specific Whatsapp number
                    setPhoneNumber(response.data.settings.phone.replace(/\+/g, '').replace(/\s/g, ''));
                }
            } catch (err) {
                console.error('Error fetching WhatsApp settings:', err);
            }
        };
        fetchSettings();
    }, []);

    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <div className="whatsapp-widget">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
                aria-label="Chat on WhatsApp"
            >
                <i className="fab fa-whatsapp"></i>
            </a>
            <div className="whatsapp-tooltip">Chat with us!</div>
        </div>
    );
};

export default WhatsAppWidget;
