import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Smile, 
  CheckCircle2,
  X
} from 'lucide-react';
import './Post.css';

/**
 * Post Component
 * Represents a single Instagram feed post with complete interactive functionality:
 * - Like/Unlike with heart pop animation
 * - Double-click on image to like
 * - Add new comment with instant state update
 * - Expand/collapse long comment lists
 * - Save/Unsave bookmark
 * - Share toast notification
 * 
 * @param {object} post - The post data object
 * @param {function} onToggleLike - Parent callback to toggle like state
 * @param {function} onToggleSave - Parent callback to toggle save state
 * @param {function} onAddComment - Parent callback to add a new comment
 */
function Post({ post, onToggleLike, onToggleSave, onAddComment }) {
  const [commentText, setCommentText] = useState('');
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showAvatarPhoto, setShowAvatarPhoto] = useState(false);
  const commentInputRef = useRef(null);

  // Handle double clicking the post image to like
  const handleImageDoubleClick = () => {
    if (!post.isLiked) {
      onToggleLike(post.id);
    }
    // Trigger floating center heart animation
    setShowHeartPop(true);
    setTimeout(() => {
      setShowHeartPop(false);
    }, 900);
  };

  // Submit comment handler
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(post.id, commentText.trim());
    setCommentText('');
    setShowAllComments(true); // Automatically expand comments when a new one is added
  };

  // Focus comment input when clicking comment icon
  const handleCommentIconClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  // Handle share button
  const handleShareClick = () => {
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 2500);
  };

  // Determine comments to display (preview first 2 or all)
  const displayedComments = showAllComments 
    ? post.comments 
    : post.comments.slice(-2);

  return (
    <article className="post-card">
      {/* 1. Post Header */}
      <header className="post-header">
        <div className="post-user-info">
          {/* Clickable avatar — shows enlarged photo */}
          <button
            type="button"
            className="post-avatar-wrapper post-avatar-clickable"
            onClick={() => setShowAvatarPhoto(true)}
            aria-label={`View ${post.username}'s profile picture`}
          >
            <img
              src={post.userAvatar}
              alt={post.username}
              className="post-avatar-img"
              loading="lazy"
            />
          </button>
          <div className="post-user-details">
            <div className="post-username-row">
              <span className="post-username">{post.username}</span>
              {post.isVerified && (
                <CheckCircle2 size={14} className="post-verified-badge" />
              )}
            </div>
            {post.location && (
              <span className="post-location">{post.location}</span>
            )}
          </div>
        </div>

        {/* Avatar photo lightbox */}
        {showAvatarPhoto && (
          <div
            className="avatar-lightbox-backdrop"
            onClick={() => setShowAvatarPhoto(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${post.username}'s profile picture`}
          >
            <div className="avatar-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="avatar-lightbox-close"
                onClick={() => setShowAvatarPhoto(false)}
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <img
                src={post.userAvatar}
                alt={`${post.username}'s profile picture`}
                className="avatar-lightbox-img"
              />
              <span className="avatar-lightbox-username">{post.username}</span>
            </div>
          </div>
        )}

        <button 
          type="button" 
          className="post-more-btn"
          onClick={() => alert(`Post options for @${post.username}`)}
          title="More options"
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </header>

      {/* 2. Post Image Container */}
      <div 
        className="post-image-container"
        onDoubleClick={handleImageDoubleClick}
      >
        <img
          src={post.postImage}
          alt={`Post by ${post.username}`}
          className="post-main-image"
          loading="lazy"
        />

        {/* Heart Burst Animation on Double Click */}
        {showHeartPop && (
          <div className="heart-burst-overlay">
            <Heart size={84} fill="#ffffff" color="#ffffff" className="heart-burst-icon" />
          </div>
        )}
      </div>

      {/* 3. Action Buttons Bar */}
      <div className="post-actions-bar">
        <div className="post-actions-left">
          {/* Like Button */}
          <button
            type="button"
            className={`post-action-btn ${post.isLiked ? 'liked' : ''}`}
            onClick={() => onToggleLike(post.id)}
            title={post.isLiked ? 'Unlike' : 'Like'}
            aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart
              size={24}
              fill={post.isLiked ? '#ed4956' : 'none'}
              color={post.isLiked ? '#ed4956' : 'currentColor'}
              className={post.isLiked ? 'heart-animated' : ''}
            />
          </button>

          {/* Comment Button */}
          <button
            type="button"
            className="post-action-btn"
            onClick={handleCommentIconClick}
            title="Comment"
            aria-label="Comment on post"
          >
            <MessageCircle size={24} />
          </button>

          {/* Share Button */}
          <button
            type="button"
            className="post-action-btn"
            onClick={handleShareClick}
            title="Share"
            aria-label="Share post"
          >
            <Send size={24} />
          </button>
        </div>

        {/* Save/Bookmark Button */}
        <button
          type="button"
          className="post-action-btn"
          onClick={() => onToggleSave(post.id)}
          title={post.isSaved ? 'Remove from Saved' : 'Save'}
          aria-label={post.isSaved ? 'Unsave post' : 'Save post'}
        >
          <Bookmark
            size={24}
            fill={post.isSaved ? '#262626' : 'none'}
            color={post.isSaved ? '#262626' : 'currentColor'}
          />
        </button>
      </div>

      {/* Share Toast Feedback */}
      {showShareToast && (
        <div className="share-toast">
          Link copied to clipboard! 📋
        </div>
      )}

      {/* 4. Likes Count */}
      <div className="post-likes-count">
        <span>{post.likesCount.toLocaleString()} likes</span>
      </div>

      {/* 5. Caption */}
      <div className="post-caption-box">
        <span className="post-caption-username">{post.username}</span>
        <span className="post-caption-text">{post.caption}</span>
      </div>

      {/* 6. Comments Section */}
      <div className="post-comments-section">
        {post.comments.length > 2 && (
          <button
            type="button"
            className="view-comments-btn"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments 
              ? 'Hide comments' 
              : `View all ${post.comments.length} comments`}
          </button>
        )}

        <div className="post-comments-list">
          {displayedComments.map((comment) => (
            <div key={comment.id} className="post-comment-row">
              <div className="post-comment-text">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-body">{comment.text}</span>
              </div>
              <span className="comment-timestamp">{comment.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Post Timestamp */}
        <time className="post-timestamp">{post.timestamp}</time>
      </div>

      {/* 7. Add Comment Input Bar */}
      <form className="post-add-comment-form" onSubmit={handleCommentSubmit}>
        <button
          type="button"
          className="emoji-btn"
          onClick={() => setCommentText((prev) => prev + ' ❤️')}
          title="Add Emoji"
          aria-label="Add heart emoji"
        >
          <Smile size={22} />
        </button>

        <input
          type="text"
          ref={commentInputRef}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="comment-input"
          aria-label="Add a comment"
        />

        <button
          type="submit"
          disabled={!commentText.trim()}
          className="comment-submit-btn"
        >
          Post
        </button>
      </form>
    </article>
  );
}

export default Post;
