import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, backgroundImage, breadcrumb }) => {
    // Default background if none provided
    const bgStyle = backgroundImage
        ? { backgroundImage: `linear-gradient(rgba(45, 95, 63, 0.85), rgba(45, 95, 63, 0.7)), url(${backgroundImage})` }
        : {};

    return (
        <div className="page-header" style={bgStyle}>
            <div className="container">
                <div className="page-header-content">
                    <h1 className="page-title slide-up">{title}</h1>
                    {subtitle && <p className="page-subtitle slide-up delay-100">{subtitle}</p>}

                    <div className="breadcrumb slide-up delay-200">
                        <Link to="/">Home</Link>
                        <span className="separator">/</span>
                        <span className="current">{breadcrumb || title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
