import React, { useState, createContext, useContext, useCallback } from 'react';
import '../components/common/Toast.css';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.map(toast =>
            toast.id === id ? { ...toast, exiting: true } : toast
        ));

        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 300);
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-info-circle';
        }
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`toast toast-${toast.type} ${toast.exiting ? 'toast-exiting' : ''}`}
                    >
                        <div className="toast-content">
                            <i className={`fas ${getIcon(toast.type)} toast-icon`}></i>
                            <span className="toast-message">{toast.message}</span>
                        </div>
                        <button onClick={() => removeToast(toast.id)} className="toast-close">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
