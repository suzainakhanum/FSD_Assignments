import React from 'react';
import { Plus } from 'lucide-react';
import './Story.css';

/**
 * Story Component
 * Reusable single story circle item with gradient border and username.
 * 
 * @param {object} story - Story data item
 * @param {function} onStoryClick - Callback fired when clicking the story
 */
function Story({ story, onStoryClick, isSeen }) {
  const { username, userAvatar, isUserStory, hasUnseen } = story;

  // Determine border style:
  // - user's own story: no ring
  // - seen (just watched): grey ring
  // - unseen: gradient ring
  // - already seen before: grey ring
  const ringClass = isUserStory
    ? 'story-ring-none'
    : (isSeen || !hasUnseen)
      ? 'story-ring-seen'
      : 'story-ring-unseen';

  return (
    <button
      type="button"
      className="story-item-btn"
      onClick={() => onStoryClick(story)}
      title={`${username}'s story`}
      aria-label={`View story of ${username}`}
    >
      <div className={`story-avatar-wrapper ${ringClass}`}>
        <div className="story-avatar-inner">
          <img
            src={userAvatar}
            alt={username}
            className="story-avatar-img"
            loading="lazy"
          />
        </div>

        {/* Plus badge for current user's story */}
        {isUserStory && (
          <span className="story-plus-badge" title="Add to story">
            <Plus size={12} strokeWidth={3} />
          </span>
        )}
      </div>

      <span className="story-username">
        {username}
      </span>
    </button>
  );
}

export default Story;
