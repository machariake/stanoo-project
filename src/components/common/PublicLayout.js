import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';

const PublicLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default PublicLayout;
