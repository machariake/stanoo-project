import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import config from '../../config';
import Layout from './Layout';

const PublicLayout = () => {
    const [favicon, setFavicon] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/content`);
                if (response.data.content?.home?.faviconUrl) {
                    setFavicon(response.data.content.home.faviconUrl);
                }
            } catch (err) {
                // Silent fail, use default
            }
        };
        fetchSettings();
    }, []);

    return (
        <Layout>
            <Helmet>
                {favicon && <link rel="icon" href={favicon} />}
            </Helmet>
            <Outlet />
        </Layout>
    );
};

export default PublicLayout;
