import React from 'react';
import './VideoSection.css';

const VideoSection = ({ title, subtitle, videoUrl }) => {
    // Helper to extract YouTube ID
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(videoUrl);

    if (!videoId) return null;

    return (
        <section className="video-section section section-alt">
            <div className="container">
                <div className="section-header text-center">
                    {title && <h2 className="gradient-text">{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </div>

                <div className="video-wrapper">
                    <div className="video-container glass-card">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                            title="Featured Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
