import React, { useState, useEffect } from 'react';
import './WhatsAppWidget.css';
import { useSettings } from '../../context/SettingsContext';

const WhatsAppWidget = () => {
    const { settings } = useSettings();
    const [phoneNumber, setPhoneNumber] = useState('254743937257');

    useEffect(() => {
        if (settings?.whatsappNumber) {
            setPhoneNumber(settings.whatsappNumber.replace(/\+/g, '').replace(/\s/g, ''));
        } else if (settings?.phone) {
            setPhoneNumber(settings.phone.replace(/\+/g, '').replace(/\s/g, ''));
        }
    }, [settings]);

    if (settings?.enableWhatsApp === false) return null;

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
