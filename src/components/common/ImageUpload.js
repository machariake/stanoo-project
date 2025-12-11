import React, { useState, useRef } from 'react';
import axios from 'axios';
import config from '../../config';

const ImageUpload = ({ currentImage, onImageUpload, label = "Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);
    const fileInputRef = useRef(null);
    const [error, setError] = useState(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset error
        setError(null);

        // Client-side validation
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB.');
            return;
        }

        // Create local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload
        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);

        try {
            const response = await axios.post(`${config.API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                onImageUpload(response.data.imageUrl);
            } else {
                setError(response.data.message || 'Upload failed');
                // Revert preview if upload failed
                setPreview(currentImage);
            }
        } catch (err) {
            console.error('Upload error:', err);
            const msg = err.response?.data?.message || 'Failed to upload image. Please ensure server is running.';
            setError(msg);
            setPreview(currentImage);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onImageUpload('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="form-group image-upload-container">
            <label>{label}</label>

            <div className="image-preview-area" style={{
                border: '2px dashed #ddd',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                background: '#f9f9f9',
                marginTop: '10px',
                position: 'relative'
            }}>
                {preview ? (
                    <div className="preview-content">
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                        <div style={{ marginTop: '15px' }}>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="btn btn-secondary btn-small"
                                style={{ marginRight: '10px' }}
                                disabled={uploading}
                            >
                                <i className="fas fa-camera"></i> Change Image
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="btn btn-delete btn-small"
                                disabled={uploading}
                            >
                                <i className="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="upload-placeholder" onClick={() => fileInputRef.current.click()} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-cloud-upload-alt" style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}></i>
                        <p style={{ margin: 0, color: '#666' }}>Click to Upload Image</p>
                        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>Max size: 5MB</p>
                    </div>
                )}

                {uploading && (
                    <div className="upload-overlay" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255,255,255,0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '8px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px', color: '#2d5f3f' }}></i>
                            <p style={{ margin: '5px 0 0 0', color: '#2d5f3f', fontWeight: 'bold' }}>Uploading...</p>
                        </div>
                    </div>
                )}
            </div>

            {error && <div className="error-message" style={{ marginTop: '5px', fontSize: '13px' }}>{error}</div>}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageUpload;
