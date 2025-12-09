import React from 'react';
import './SocialShare.css';

const SocialShare = ({ title, url }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="social-share">
            <span className="share-label">Share:</span>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-facebook"
                aria-label="Share on Facebook"
            >
                <i className="fab fa-facebook-f"></i>
            </a>

            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-twitter"
                aria-label="Share on Twitter"
            >
                <i className="fab fa-twitter"></i>
            </a>

            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-linkedin"
                aria-label="Share on LinkedIn"
            >
                <i className="fab fa-linkedin-in"></i>
            </a>

            <a
                href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-whatsapp"
                aria-label="Share on WhatsApp"
            >
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
};

export default SocialShare;
