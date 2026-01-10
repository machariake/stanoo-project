import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEO from '../common/SEO';
import PageHeader from '../common/PageHeader';
import config from '../../config';
import './Training.css';

const Training = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultTrainings = [
        {
            _id: 'tr-001',
            title: 'Fire Safety Marshal Training',
            date: '2026-02-15',
            time: '09:00 AM - 04:00 PM',
            location: 'Nairobi CBD Training Center',
            price: 'KES 5,000',
            seats: 12
        },
        {
            _id: 'tr-002',
            title: 'First Aid at Work (Level 1)',
            date: '2026-02-22',
            time: '08:30 AM - 04:30 PM',
            location: 'Westlands Conference Hall',
            price: 'KES 6,500',
            seats: 8
        },
        {
            _id: 'tr-003',
            title: 'Occupational Health & Safety Committee',
            date: '2026-03-05',
            time: '09:00 AM - 01:00 PM',
            location: 'Online Webinar',
            price: 'KES 2,500',
            seats: 25
        }
    ];

    useEffect(() => {
        const fetchTraining = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/training`);
                if (response.data.training && response.data.training.length > 0) {
                    setTrainings(response.data.training);
                } else {
                    setTrainings(defaultTrainings);
                }
            } catch (err) {
                console.error('Error fetching training:', err);
                setTrainings(defaultTrainings);
            } finally {
                setLoading(false);
            }
        };
        fetchTraining();
    }, []);

    return (
        <div className="training-page fade-in">
            <SEO
                title="Training Calendar"
                description="Upcoming health and safety training sessions in Kenya."
            />
            <PageHeader
                title="Training Calendar"
                subtitle="Join our expert-led sessions to enhance your safety skills."
                breadcrumb="Training"
            />

            <section className="section training-section">
                <div className="container">
                    {loading ? (
                        <div className="text-center"><h3>Loading Schedule...</h3></div>
                    ) : (
                        <div className="training-list">
                            {trainings.map((session, index) => (
                                <div key={session._id} className={`training-card glass-card slide-up delay-${(index % 5) * 100}`}>
                                    <div className="training-date">
                                        <span className="day">{new Date(session.date).getDate()}</span>
                                        <span className="month">{new Date(session.date).toLocaleString('default', { month: 'short' })}</span>
                                    </div>
                                    <div className="training-details">
                                        <h3>{session.title}</h3>
                                        <div className="training-info">
                                            <span><i className="far fa-clock"></i> {session.time}</span>
                                            <span><i className="fas fa-map-marker-alt"></i> {session.location}</span>
                                            <span><i className="fas fa-ticket-alt"></i> {session.seats} seats left</span>
                                        </div>
                                    </div>
                                    <div className="training-action">
                                        <span className="price">{session.price}</span>
                                        <button className="btn btn-primary btn-sm">Book Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Training;
