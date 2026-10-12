import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Stories from '../Stories/Stories';
import Post from '../Post/Post';
import './Feed.css';

/**
 * Feed Component
 * Container for the main content stream:
 * - Renders the top Stories carousel
 * - Maps through posts to render individual Post components
 * - Displays a footer indicator when all posts have been viewed
 * 
 * @param {Array} posts - Array of post items
 * @param {Array} stories - Array of story items
 * @param {function} onToggleLike - Handler for liking/unliking a post
 * @param {function} onToggleSave - Handler for saving/unsaving a post
 * @param {function} onAddComment - Handler for adding a comment to a post
 */
function Feed({ posts, stories, onToggleLike, onToggleSave, onAddComment }) {
  return (
    <div className="feed-container">
      {/* 1. Horizontal Stories Component */}
      <Stories stories={stories} />

      {/* 2. Posts Stream */}
      <div className="feed-posts-stream">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
              onAddComment={onAddComment}
            />
          ))
        ) : (
          <div className="feed-empty-state">
            <p>No posts to display. Be the first to share something!</p>
          </div>
        )}
      </div>

      {/* 3. 'All Caught Up' Instagram footer badge */}
      <div className="feed-caught-up-badge">
        <CheckCircle2 size={36} className="caught-up-icon" />
        <h3 className="caught-up-title">You're All Caught Up</h3>
        <p className="caught-up-subtitle">You've seen all new posts from the past 3 days.</p>
      </div>
    </div>
  );
}

export default Feed;
