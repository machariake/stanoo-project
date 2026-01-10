import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import config from '../../config';

const SEO = ({ title, description, image, url }) => {
    const [siteSettings, setSiteSettings] = useState({
        companyName: 'Theuri Green Health Safe',
        tagline: 'Health, Safety & Environmental Management'
    });

    useEffect(() => {
        // Fetch global settings to use as fallbacks or suffix
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/settings`);
                if (response.data.settings) {
                    setSiteSettings(prev => ({
                        ...prev,
                        ...response.data.settings
                    }));
                }
            } catch (err) {
                // Silently fail to defaults
            }
        };
        fetchSettings();
    }, []);

    const fullTitle = title
        ? `${title} | ${siteSettings.companyName}`
        : `${siteSettings.companyName} - ${siteSettings.tagline}`;

    const metaDescription = description || siteSettings.tagline;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || window.location.href} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            {image && <meta property="twitter:image" content={image} />}
        </Helmet>
    );
};

export default SEO;
