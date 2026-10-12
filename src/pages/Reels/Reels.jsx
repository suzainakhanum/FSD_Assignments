import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Play, Music, Smile, X } from 'lucide-react';
import { reels as initialReels, currentUser } from '../../data/dummyData';
import './Reels.css';

/**
 * Reels Page
 * Displays a vertical scrollable list of dummy Reels (image placeholders).
 * Each reel has interactive Like, Comment, Share, and Save buttons.
 * All interactions are managed by React state — no backend needed.
 */
function Reels() {
  const [reels, setReels] = useState(initialReels);
  const [commentInputs, setCommentInputs] = useState({});
  // track which reel's comment panel is open
  const [openComments, setOpenComments] = useState({});
  // local comments per reel: { reelId: [{ id, username, text, time }] }
  const [reelComments, setReelComments] = useState({});
  const inputRefs = useRef({});

  // Toggle like on a reel
  const handleToggleLike = (reelId) => {
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId
          ? {
              ...r,
              isLiked: !r.isLiked,
              likesCount: r.isLiked ? r.likesCount - 1 : r.likesCount + 1
            }
          : r
      )
    );
  };

  // Toggle save on a reel
  const handleToggleSave = (reelId) => {
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId ? { ...r, isSaved: !r.isSaved } : r
      )
    );
  };

  // Toggle comment panel and focus input
  const handleToggleComments = (reelId) => {
    setOpenComments((prev) => {
      const next = { ...prev, [reelId]: !prev[reelId] };
      if (next[reelId]) {
        setTimeout(() => inputRefs.current[reelId]?.focus(), 50);
      }
      return next;
    });
  };

  // Update comment text for a specific reel
  const handleCommentChange = (reelId, text) => {
    setCommentInputs((prev) => ({ ...prev, [reelId]: text }));
  };

  // Submit comment — adds to local comments list
  const handleCommentSubmit = (reelId) => {
    const text = (commentInputs[reelId] || '').trim();
    if (!text) return;
    const newComment = {
      id: `rc_${Date.now()}`,
      username: currentUser.username,
      text,
      time: 'Just now'
    };
    setReelComments((prev) => ({
      ...prev,
      [reelId]: [...(prev[reelId] || []), newComment]
    }));
    // bump count on reel
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId ? { ...r, commentsCount: r.commentsCount + 1 } : r
      )
    );
    setCommentInputs((prev) => ({ ...prev, [reelId]: '' }));
  };

  return (
    <div className="reels-page">
      <div className="reels-header">
        <h1 className="reels-title">Reels</h1>
      </div>

      <div className="reels-list">
        {reels.map((reel) => (
          <article key={reel.id} className="reel-card">
            {/* Video / Image Thumbnail */}
            <div className="reel-media-area">
              <img
                src={reel.thumbnail}
                alt={`Reel by @${reel.username}`}
                className="reel-thumbnail"
                loading="lazy"
              />

              {/* Play Icon Overlay */}
              <div className="reel-play-overlay">
                <Play size={48} fill="white" color="white" className="reel-play-icon" />
              </div>

              {/* Duration badge */}
              <span className="reel-duration">{reel.duration}</span>

              {/* Vertical Action Bar (Instagram-style right side) */}
              <div className="reel-actions-bar">
                {/* Like */}
                <button
                  type="button"
                  className="reel-action-btn"
                  onClick={() => handleToggleLike(reel.id)}
                  title={reel.isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart
                    size={26}
                    fill={reel.isLiked ? '#ed4956' : 'none'}
                    color={reel.isLiked ? '#ed4956' : 'white'}
                  />
                  <span className="reel-action-count">{reel.likesCount.toLocaleString()}</span>
                </button>

                {/* Comment */}
                <button
                  type="button"
                  className="reel-action-btn"
                  onClick={() => handleToggleComments(reel.id)}
                  title="Comment"
                >
                  <MessageCircle
                    size={26}
                    color={openComments[reel.id] ? '#a8d8ff' : 'white'}
                    fill={openComments[reel.id] ? '#a8d8ff' : 'none'}
                  />
                  <span className="reel-action-count">{reel.commentsCount}</span>
                </button>

                {/* Share */}
                <button
                  type="button"
                  className="reel-action-btn"
                  onClick={() => alert('Share link copied! (Frontend demo)')}
                  title="Share"
                >
                  <Send size={26} color="white" />
                  <span className="reel-action-count">Share</span>
                </button>

                {/* Save */}
                <button
                  type="button"
                  className="reel-action-btn"
                  onClick={() => handleToggleSave(reel.id)}
                  title={reel.isSaved ? 'Unsave' : 'Save'}
                >
                  <Bookmark
                    size={26}
                    fill={reel.isSaved ? 'white' : 'none'}
                    color="white"
                  />
                </button>
              </div>

              {/* Bottom User Info & Caption Overlay */}
              <div className="reel-info-overlay">
                <div className="reel-user-row">
                  <img
                    src={reel.userAvatar}
                    alt={reel.username}
                    className="reel-user-avatar"
                  />
                  <span className="reel-username">@{reel.username}</span>
                </div>
                <p className="reel-caption">{reel.caption}</p>
                <div className="reel-audio-row">
                  <Music size={12} />
                  <span className="reel-audio">{reel.audio}</span>
                </div>
              </div>
            </div>

            {/* Expandable Comment Panel */}
            {openComments[reel.id] && (
              <div className="reel-comments-panel">
                <div className="reel-comments-panel-header">
                  <span className="reel-comments-panel-title">Comments</span>
                  <button
                    type="button"
                    className="reel-comments-close-btn"
                    onClick={() => handleToggleComments(reel.id)}
                    aria-label="Close comments"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Comments list */}
                <div className="reel-comments-list">
                  {(reelComments[reel.id] || []).length === 0 ? (
                    <p className="reel-comments-empty">No comments yet. Be the first! 💬</p>
                  ) : (
                    (reelComments[reel.id] || []).map((c) => (
                      <div key={c.id} className="reel-comment-row">
                        <span className="reel-comment-author">{c.username}</span>
                        <span className="reel-comment-text">{c.text}</span>
                        <span className="reel-comment-time">{c.time}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Add comment input */}
                <div className="reel-comment-bar">
                  <button
                    type="button"
                    className="reel-emoji-btn"
                    onClick={() => handleCommentChange(reel.id, (commentInputs[reel.id] || '') + ' ❤️')}
                    aria-label="Add emoji"
                  >
                    <Smile size={20} />
                  </button>
                  <input
                    type="text"
                    ref={(el) => { inputRefs.current[reel.id] = el; }}
                    placeholder={`Comment as ${currentUser.username}...`}
                    value={commentInputs[reel.id] || ''}
                    onChange={(e) => handleCommentChange(reel.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(reel.id)}
                    className="reel-comment-input"
                    aria-label="Add a comment to this reel"
                  />
                  <button
                    type="button"
                    className="reel-comment-post-btn"
                    onClick={() => handleCommentSubmit(reel.id)}
                    disabled={!commentInputs[reel.id]?.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default Reels;
