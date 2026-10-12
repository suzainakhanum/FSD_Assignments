import React, { useState } from 'react';
import { Heart, MessageCircle, X } from 'lucide-react';
import { explorePosts } from '../../data/dummyData';
import './Explore.css';

/**
 * Explore Page
 * Shows a Pinterest-style image grid using dummy explore posts.
 * Clicking any image opens a quick post-detail modal.
 */
function Explore() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore</h1>
        <p className="explore-subtitle">Discover photos and videos you'll love</p>
      </div>

      {/* Masonry-style grid */}
      <div className="explore-grid">
        {explorePosts.map((post) => (
          <div
            key={post.id}
            className={`explore-grid-item ${post.isLarge ? 'large-item' : ''}`}
            onClick={() => setSelectedPost(post)}
            role="button"
            tabIndex={0}
            title={`View post by @${post.username}`}
          >
            <img
              src={post.image}
              alt={post.caption}
              className="explore-image"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="explore-overlay">
              <div className="explore-overlay-stats">
                <div className="explore-stat">
                  <Heart size={18} fill="white" color="white" />
                  <span>{post.likesCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div
          className="explore-modal-backdrop"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="explore-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="explore-modal-close"
              onClick={() => setSelectedPost(null)}
              aria-label="Close post"
            >
              <X size={22} />
            </button>

            {/* Post Image */}
            <div className="explore-modal-img-area">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="explore-modal-img"
              />
            </div>

            {/* Post Details */}
            <div className="explore-modal-details">
              <p className="explore-modal-username">@{selectedPost.username}</p>
              <p className="explore-modal-caption">{selectedPost.caption}</p>
              <div className="explore-modal-stats">
                <div className="explore-modal-stat">
                  <Heart size={16} fill="#ed4956" color="#ed4956" />
                  <span>{selectedPost.likesCount.toLocaleString()} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
