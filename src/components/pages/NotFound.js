import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <SEO
                title="Page Not Found"
                description="The page you are looking for does not exist."
            />
            <div className="container">
                <div className="not-found-content">
                    <div className="not-found-icon">
                        <i className="fas fa-compass"></i>
                    </div>
                    <h1>404</h1>
                    <h3>Page Not Found</h3>
                    <p>
                        Oops! The page you are looking for seems to have wandered off.
                        It might have been moved, deleted, or possibly never existed.
                    </p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
