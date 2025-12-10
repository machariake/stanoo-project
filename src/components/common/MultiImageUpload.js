import React, { useState, useRef } from 'react';
import axios from 'axios';
import config from '../../config';

const MultiImageUpload = ({ currentImages = [], onImagesUpdate, label = "Gallery Images", maxImages = 10 }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [error, setError] = useState(null);

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Reset error
        setError(null);

        // Validation
        if (currentImages.length + files.length > maxImages) {
            setError(`You can only have up to ${maxImages} images.`);
            return;
        }

        const validFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                setError('Some files were ignored because they are not images.');
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Some files were ignored because they exceed 5MB.');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        setUploading(true);

        const formData = new FormData();
        validFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post(`${config.API_URL}/upload/multiple`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                // Determine new list (append to existing)
                const newImages = [...currentImages, ...response.data.imageUrls];
                onImagesUpdate(newImages);
            } else {
                setError(response.data.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload images. Ensure server is running and storage is configured.');
        } finally {
            setUploading(false);
            // Clear input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = (indexToRemove) => {
        const newImages = currentImages.filter((_, index) => index !== indexToRemove);
        onImagesUpdate(newImages);
    };

    return (
        <div className="form-group multi-image-upload">
            <label>{label} ({currentImages.length}/{maxImages})</label>

            <div className="gallery-preview" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '10px',
                marginTop: '10px',
                marginBottom: '15px'
            }}>
                {currentImages.map((imgUrl, index) => (
                    <div key={index} className="gallery-item" style={{ position: 'relative', height: '100px' }}>
                        <img
                            src={imgUrl}
                            alt={`Gallery ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                ))}

                {/* Add Button */}
                {currentImages.length < maxImages && (
                    <div
                        onClick={() => fileInputRef.current.click()}
                        style={{
                            border: '2px dashed #ddd',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            background: '#f9f9f9',
                            color: '#999',
                            height: '100px'
                        }}
                    >
                        {uploading ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            <>
                                <i className="fas fa-plus"></i>
                                <span style={{ fontSize: '10px', marginTop: '5px' }}>Add Image</span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {error && <div className="error-message" style={{ color: '#ef4444', fontSize: '13px', marginTop: '5px' }}>{error}</div>}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default MultiImageUpload;
