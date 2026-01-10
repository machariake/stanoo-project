import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../config';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        enableTraining: true,
        enableResources: true,
        enableBlog: true,
        enableTestimonials: true,
        enableWhatsApp: true,
        enableQuote: true,
        enableTawkTo: false,
        tawkToPropertyId: '',
        tawkToWidgetId: 'default',
        enableVideoSection: false,
        videoTitle: '',
        videoSubtitle: '',
        videoUrl: '',
        companyName: 'Theuri Green Health Safe',
        christmasMode: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/settings`);
                if (response.data.success && response.data.settings) {
                    setSettings(prev => ({ ...prev, ...response.data.settings }));
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;
