import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../../config';
import './ChristmasPlugin.css';

const ChristmasPlugin = () => {
    const [enabled, setEnabled] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(false);
    const [musicUrl, setMusicUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // User preference
    const audioRef = useRef(null);

    // Fetch settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${config.API_URL}/settings`);
                if (response.data.success && response.data.settings) {
                    const s = response.data.settings;
                    setEnabled(s.christmasMode === true);
                    setMusicEnabled(s.christmasMusic === true);
                    setMusicUrl(s.christmasMusicUrl || 'https://actions.google.com/sounds/v1/ambiences/jingle_bells.ogg'); // Default fallback
                }
            } catch (err) {
                console.error('Failed to load Christmas settings', err);
            }
        };

        fetchSettings();
    }, []);

    // Handle Audio Playback
    useEffect(() => {
        if (!musicEnabled || !enabled || !audioRef.current) return;

        if (!isMuted) {
            // Browsers block autoplay. We might need user interaction to start.
            // We'll attempt to play, and if it fails, we wait for interaction.
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    setIsPlaying(false); // Show play button
                });
            }
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [musicEnabled, enabled, isMuted, musicUrl]);



    // Robust autoplay strategy
    useEffect(() => {
        const handleUserInteraction = () => {
            // If audio exists and is paused, try to play
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    // Once successful, we can remove these listeners
                    window.removeEventListener('click', handleUserInteraction);
                    window.removeEventListener('keydown', handleUserInteraction);
                    window.removeEventListener('touchstart', handleUserInteraction);
                }).catch((e) => {
                    // Autoplay still blocked or failed
                });
            }
        };

        // Add listeners if we want music but it's not playing yet
        if (musicEnabled && enabled && !isPlaying) {
            window.addEventListener('click', handleUserInteraction);
            window.addEventListener('keydown', handleUserInteraction);
            window.addEventListener('touchstart', handleUserInteraction);
        }

        return () => {
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
        };
    }, [musicEnabled, enabled, isPlaying]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    if (!enabled) return null;

    return (
        <div className="christmas-plugin">
            {/* Snow Effect */}
            <div className="snowflakes" aria-hidden="true">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="snowflake">❅</div>
                ))}
            </div>

            {/* Music Control - Only if music is enabled globally */}
            {musicEnabled && (
                <div className="christmas-music-control">
                    <audio ref={audioRef} loop src={musicUrl} autoPlay />
                    <button
                        onClick={toggleMute}
                        className={`music-btn ${isMuted || !isPlaying ? 'muted' : ''}`}
                        title={isMuted || !isPlaying ? "Play Christmas Music" : "Mute Christmas Music"}
                    >
                        <i className={`fas ${isMuted || !isPlaying ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                    </button>
                    {/* Decoration on the button */}
                    <div className="music-decoration">🎄</div>
                </div>
            )}
        </div>
    );
};

export default ChristmasPlugin;
