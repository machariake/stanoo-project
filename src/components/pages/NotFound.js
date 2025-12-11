import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found fade-in">
            <SEO
                title="Page Not Found"
                description="The page you are looking for does not exist."
            />
            <div className="container">
                <div className="not-found-content glass-card scale-in delay-100" style={{ padding: '3rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <div className="not-found-icon">
                        <i className="fas fa-compass gradient-text"></i>
                    </div>
                    <h1 className="gradient-text">404</h1>
                    <h3>Page Not Found</h3>
                    <p>
                        Oops! The page you are looking for seems to have wandered off.
                        It might have been moved, deleted, or possibly never existed.
                    </p>
                    <Link to="/" className="btn btn-primary btn-lg hover-float">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
