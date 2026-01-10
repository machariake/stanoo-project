const axios = require('axios');

const API_URL = 'http://localhost:5000/api/resources';

const resources = [
    {
        title: 'Occupational Safety Checklist',
        description: 'A comprehensive checklist to identify common workplace hazards.',
        type: 'TXT',
        size: '2 KB',
        downloadUrl: '#', // Placeholder or actual link if exists
        category: 'Safety'
    },
    {
        title: 'Fire Evacuation Plan Template',
        description: 'Customizable template for creating your buildings evacuation plan.',
        type: 'TXT',
        size: '2 KB',
        downloadUrl: '#',
        category: 'Emergency'
    },
    {
        title: 'NEMA Compliance Guide 2026',
        description: 'Overview of the latest environmental regulations in Kenya.',
        type: 'TXT',
        size: '2 KB',
        downloadUrl: '#',
        category: 'Environmental'
    }
];

const seedResources = async () => {
    console.log('Seeding resources...');
    try {
        for (const res of resources) {
            await axios.post(API_URL, res);
            console.log(`Added: ${res.title}`);
        }
        console.log('Resource seeding complete!');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
};

seedResources();
