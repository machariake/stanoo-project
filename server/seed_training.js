const axios = require('axios');

const API_URL = 'http://localhost:5000/api/training';

const trainingSessions = [
    {
        title: 'Fire Safety Marshal Training',
        date: '2026-02-15',
        time: '09:00 AM - 04:00 PM',
        location: 'Nairobi CBD Training Center',
        price: 'KES 5,000',
        seats: 12
    },
    {
        title: 'First Aid at Work (Level 1)',
        date: '2026-02-22',
        time: '08:30 AM - 04:30 PM',
        location: 'Westlands Conference Hall',
        price: 'KES 6,500',
        seats: 8
    },
    {
        title: 'Occupational Health & Safety Committee',
        date: '2026-03-05',
        time: '09:00 AM - 01:00 PM',
        location: 'Online Webinar',
        price: 'KES 2,500',
        seats: 25
    }
];

const seedTraining = async () => {
    console.log('Seeding training sessions...');
    try {
        for (const session of trainingSessions) {
            await axios.post(API_URL, session);
            console.log(`Added: ${session.title}`);
        }
        console.log('Seeding complete!');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
};

seedTraining();
