import React from 'react';
import './Suggestions.css';

/**
 * Suggestions Component
 * Right sidebar component in Instagram desktop view:
 * - Current user quick switch panel
 * - List of suggested accounts with interactive follow/unfollow buttons
 * - Footer links and Meta copyright
 * 
 * @param {object} currentUser - Logged in user profile data
 * @param {Array} suggestedUsers - List of suggested user profiles
 * @param {function} onToggleFollow - Callback to toggle follow state for an account
 * @param {function} onProfileClick - Callback when user clicks their own avatar/username
 */
function Suggestions({ currentUser, suggestedUsers, onToggleFollow, onProfileClick }) {
  const footerLinks = [
    'About',
    'Help',
    'Press',
    'API',
    'Jobs',
    'Privacy',
    'Terms',
    'Locations',
    'Language',
    'Meta Verified'
  ];

  return (
    <aside className="suggestions-container" aria-label="Suggested Users">
      {/* 1. Current User Profile Bar */}
      <div className="current-user-card">
        <div 
          className="current-user-info" 
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
          title="Go to your profile"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="current-user-avatar"
          />
          <div className="current-user-names">
            <span className="current-username">{currentUser.username}</span>
            <span className="current-fullname">{currentUser.fullName}</span>
          </div>
        </div>
        <button
          type="button"
          className="user-switch-btn"
          onClick={() => alert('Switch Account feature (frontend demo)')}
        >
          Switch
        </button>
      </div>

      {/* 2. Suggestions Header */}
      <div className="suggestions-header">
        <span className="suggestions-title">Suggested for you</span>
        <button
          type="button"
          className="suggestions-see-all-btn"
          onClick={() => alert('Viewing all 50+ recommendations (frontend demo)')}
        >
          See All
        </button>
      </div>

      {/* 3. Suggested Users List */}
      <div className="suggested-users-list">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="suggested-user-row">
            <div className="suggested-user-info">
              <img
                src={user.avatar}
                alt={user.username}
                className="suggested-avatar"
              />
              <div className="suggested-user-details">
                <span className="suggested-username">{user.username}</span>
                <span className="suggested-relation">{user.relation}</span>
              </div>
            </div>

            {/* Interactive Follow / Following Button */}
            <button
              type="button"
              className={`follow-toggle-btn ${user.isFollowing ? 'following' : 'not-following'}`}
              onClick={() => onToggleFollow(user.id)}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* 4. Small Footer Links & Copyright */}
      <footer className="suggestions-footer">
        <ul className="footer-links-list">
          {footerLinks.map((link) => (
            <li key={link} className="footer-link-item">
              <a 
                href={`#${link.toLowerCase()}`} 
                onClick={(e) => { e.preventDefault(); alert(`${link} page`); }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p className="copyright-text">
          © 2026 INSTAGRAM FROM META • FSD PROJECT
        </p>
      </footer>
    </aside>
  );
}

export default Suggestions;
