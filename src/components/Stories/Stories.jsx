import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Story from '../Story/Story';
import './Stories.css';

/**
 * Stories Component
 * Displays the horizontal scrollable carousel of user stories at the top of the feed.
 * 
 * @param {Array} stories - Array of story objects from dummyData
 */
function Stories({ stories }) {
  const scrollContainerRef = useRef(null);
  const [selectedStory, setSelectedStory] = useState(null);
  // Track which story IDs have been viewed
  const [seenStories, setSeenStories] = useState(new Set());

  // Smooth scroll stories left/right
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOpenStory = (story) => {
    // Mark this story as seen when opened
    setSeenStories((prev) => new Set([...prev, story.id]));
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <section className="stories-section" aria-label="Stories">
      {/* Scroll Left Button */}
      <button
        type="button"
        className="stories-scroll-btn scroll-left"
        onClick={() => handleScroll('left')}
        aria-label="Scroll stories left"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Stories Scroll Container */}
      <div className="stories-carousel" ref={scrollContainerRef}>
        {stories.map((story) => (
          <Story
            key={story.id}
            story={story}
            isSeen={seenStories.has(story.id)}
            onStoryClick={handleOpenStory}
          />
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        type="button"
        className="stories-scroll-btn scroll-right"
        onClick={() => handleScroll('right')}
        aria-label="Scroll stories right"
      >
        <ChevronRight size={18} />
      </button>

      {/* Interactive Story Viewer Modal */}
      {selectedStory && (
        <div className="story-modal-overlay" onClick={handleCloseStory}>
          <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Progress Bar Animation */}
            <div className="story-progress-bar">
              <div className="story-progress-fill" />
            </div>

            {/* Story Header */}
            <div className="story-modal-header">
              <div className="story-modal-user">
                <img
                  src={selectedStory.userAvatar}
                  alt={selectedStory.username}
                  className="story-modal-avatar"
                />
                <span className="story-modal-username">{selectedStory.username}</span>
                <span className="story-modal-time">{selectedStory.timestamp}</span>
              </div>
              <button
                type="button"
                className="story-modal-close"
                onClick={handleCloseStory}
                aria-label="Close story"
              >
                <X size={24} />
              </button>
            </div>

            {/* Story Image */}
            <div className="story-modal-body">
              <img
                src={selectedStory.storyImage}
                alt={`${selectedStory.username}'s story`}
                className="story-modal-img"
              />
            </div>

            {/* Seen indicator — only for other people's stories */}
            {!selectedStory.isUserStory && (
              <div className="story-seen-bar">
                <span className="story-seen-badge">👁 Seen</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Stories;
