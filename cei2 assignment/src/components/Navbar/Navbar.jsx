import React, { useState } from 'react';
import { Heart, MessageCircle, PlusSquare, Search, Home } from 'lucide-react';
import './Navbar.css';

/**
 * Navbar Component
 * Displays the top Instagram navigation bar, especially useful on mobile,
 * tablets, or for quick global searches and actions.
 * 
 * @param {string} activeTab - The currently active view ('home' | 'profile' | etc.)
 * @param {function} setActiveTab - Handler to update the active view
 * @param {function} onOpenCreate - Handler to open the create post modal
 * @param {object} currentUser - The logged in user profile object
 */
function Navbar({ activeTab, setActiveTab, onOpenCreate, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching Instagram for "${searchQuery}" (frontend demo)`);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = () => {
    setHasUnreadNotification(false);
    alert('No new notifications right now! (Frontend demo)');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo / Wordmark */}
        <div 
          className="navbar-brand" 
          onClick={() => setActiveTab('home')}
          role="button"
          tabIndex={0}
          title="Go to Home Feed"
        >
          <span className="navbar-logo-text">Instagram</span>
        </div>

        {/* Global Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <Search className="navbar-search-icon" size={16} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
            aria-label="Search"
          />
        </form>

        {/* Action Icons */}
        <div className="navbar-actions">
          {/* Home Button (Visible on mobile/tablet) */}
          <button 
            type="button"
            className={`navbar-action-btn mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            title="Home"
            aria-label="Home"
          >
            <Home size={22} />
          </button>

          {/* Create Post */}
          <button
            type="button"
            className="navbar-action-btn"
            onClick={onOpenCreate}
            title="Create Post"
            aria-label="Create Post"
          >
            <PlusSquare size={22} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="navbar-action-btn"
            onClick={handleNotificationClick}
            title="Notifications"
            aria-label="Notifications"
          >
            <Heart size={22} />
            {hasUnreadNotification && <span className="notification-badge" />}
          </button>

          {/* Messages */}
          <button
            type="button"
            className="navbar-action-btn"
            onClick={() => alert('Direct Messages: Sarah Jenkins has 2 unread chats!')}
            title="Messages"
            aria-label="Direct Messages"
          >
            <MessageCircle size={22} />
          </button>

          {/* Profile Avatar Quick Link */}
          <button
            type="button"
            className={`navbar-profile-btn ${activeTab === 'profile' ? 'active-avatar' : ''}`}
            onClick={() => setActiveTab('profile')}
            title="View Profile"
            aria-label="View Profile"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.username}
              className="navbar-avatar-img"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
