import React from 'react';

const Logo = ({ width = 40, height = 40, color = '#2d5f3f', textColor = '#333', theme = 'light' }) => {
    // Theme 'light' means dark text on light background
    // Theme 'dark' means white text on dark background

    const finalTextColor = theme === 'dark' ? '#ffffff' : textColor;
    const iconColor = color;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Shield Background */}
                <path
                    d="M50 95C50 95 85 80 85 50V20L50 5L15 20V50C15 80 50 95 50 95Z"
                    fill={iconColor}
                    stroke={iconColor}
                    strokeWidth="2"
                    strokeLinejoin="round"
                />

                {/* Leaf Graphic (Negative Space/White) */}
                <path
                    d="M50 25C50 25 35 40 35 55C35 63.2843 41.7157 70 50 70C58.2843 70 65 63.2843 65 55C65 40 50 25 50 25ZM50 64C48 64 46 60 46 55C46 50 50 35 50 35C50 35 54 50 54 55C54 60 52 64 50 64Z"
                    fill="white"
                />

                {/* Detail: Leaf Stem */}
                <path
                    d="M50 70V80"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span style={{
                    color: finalTextColor,
                    fontWeight: '800',
                    fontSize: `${width * 0.55}px`,
                    letterSpacing: '-0.5px'
                }}>
                    THEURI
                </span>
                <span style={{
                    color: iconColor,
                    fontWeight: '600',
                    fontSize: `${width * 0.4}px`,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    GREEN
                </span>
            </div>
        </div>
    );
};

export default Logo;
