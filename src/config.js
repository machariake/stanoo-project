const config = {
    // Base URL for the backend server
    SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5000',

    // Base URL for API endpoints
    get API_URL() {
        return `${this.SERVER_URL}/api`;
    },

    // Helper to get full image URL from a relative path
    getImageUrl: (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        if (path.startsWith('data:')) return path; // Base64
        // Ensure path starts with / if it doesn't
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${config.SERVER_URL}${normalizedPath}`;
    }
};

export default config;
