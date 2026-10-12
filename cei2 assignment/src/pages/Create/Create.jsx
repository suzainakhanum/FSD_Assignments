import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X, MapPin } from 'lucide-react';
import { currentUser } from '../../data/dummyData';
import './Create.css';

/**
 * Create Post Page
 * Allows the user to:
 * - Upload an image from their device (FileReader preview)
 * - Enter a caption and location
 * - Click Share to add the post to the feed (via onAddPost callback)
 *
 * No backend — purely frontend React state.
 *
 * @param {function} onAddPost - Callback to prepend the new post to the home feed
 * @param {function} setActiveTab - Navigate back to Home after posting
 */
function Create({ onAddPost, setActiveTab }) {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [step, setStep] = useState('upload'); // 'upload' | 'caption'
  const fileInputRef = useRef(null);

  // Default fallback images if no file is chosen
  const defaultImages = [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
  ];

  // Handle file selection — read as a Data URL for local preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewUrl(ev.target.result);
      setStep('caption');
    };
    reader.readAsDataURL(file);
  };

  // Reset to start over
  const handleDiscard = () => {
    setPreviewUrl(null);
    setCaption('');
    setLocation('');
    setStep('upload');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit the new post
  const handleShare = () => {
    if (!caption.trim()) return;

    const newPost = {
      id: `post_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      isVerified: currentUser.isVerified,
      location: location.trim() || 'San Francisco, CA',
      postImage: previewUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)],
      caption: caption.trim(),
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      timestamp: 'JUST NOW',
      comments: []
    };

    onAddPost(newPost);     // Add to the feed
    setActiveTab('home');   // Navigate home to see it
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h1 className="create-title">Create new post</h1>
      </div>

      {step === 'upload' ? (
        /* Step 1: Upload area */
        <div className="create-upload-zone" onClick={() => fileInputRef.current?.click()}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="create-file-input"
            aria-label="Select image from device"
          />
          <div className="create-upload-content">
            <ImageIcon size={56} strokeWidth={1} className="create-upload-icon" />
            <h2 className="create-upload-heading">Drag photos and videos here</h2>
            <p className="create-upload-hint">PNG, JPG, GIF accepted</p>
            <button
              type="button"
              className="create-select-btn"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              Select from computer
            </button>
          </div>
        </div>
      ) : (
        /* Step 2: Caption + preview */
        <div className="create-caption-step">
          {/* Image Preview */}
          <div className="create-preview-area">
            <img
              src={previewUrl}
              alt="Post preview"
              className="create-preview-img"
            />
            <button
              type="button"
              className="create-remove-img-btn"
              onClick={handleDiscard}
              title="Remove image and start over"
            >
              <X size={18} />
            </button>
          </div>

          {/* Post Details Form */}
          <div className="create-form-area">
            {/* User row */}
            <div className="create-user-row">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="create-user-avatar"
              />
              <span className="create-user-name">{currentUser.username}</span>
            </div>

            {/* Caption textarea */}
            <textarea
              className="create-caption-input"
              placeholder="Write a caption..."
              rows={5}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={2200}
              autoFocus
              aria-label="Post caption"
            />
            <span className="create-char-count">{caption.length} / 2200</span>

            <div className="create-divider" />

            {/* Location input */}
            <div className="create-location-row">
              <MapPin size={16} className="create-location-icon" />
              <input
                type="text"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="create-location-input"
                aria-label="Add location"
              />
            </div>

            <div className="create-divider" />

            {/* Share button */}
            <button
              type="button"
              className="create-share-btn"
              disabled={!caption.trim()}
              onClick={handleShare}
            >
              Share
            </button>

            <button
              type="button"
              className="create-discard-btn"
              onClick={handleDiscard}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
