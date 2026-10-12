import React, { useState } from 'react';
import { 
  Grid, 
  Bookmark, 
  UserCheck, 
  Settings, 
  Heart, 
  MessageCircle, 
  CheckCircle2, 
  Plus, 
  X,
  ArrowLeft
} from 'lucide-react';
import { allUsers } from '../../data/dummyData';
import './Profile.css';

/**
 * Profile Component
 * Full user profile page containing:
 * - Profile header (avatar, username, stats, bio, edit profile)
 * - Highlights carousel
 * - Tabbed navigation (POSTS / SAVED / TAGGED)
 * - 3-column square post grid with hover statistics
 * - Post preview modal on click
 * 
 * @param {object} user - Current user object
 * @param {Array} posts - User's profile posts grid items
 * @param {Array} storyHighlights - User's story highlights
 * @param {function} onBackToHome - Callback to navigate back to feed
 */
function Profile({ user, posts, storyHighlights, onBackToHome }) {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.fullName);
  const [editBio, setEditBio] = useState(user.bio);
  const [selectedPost, setSelectedPost] = useState(null);
  // null | 'followers' | 'following'
  const [listModal, setListModal] = useState(null);
  const [followState, setFollowState] = useState(
    Object.fromEntries(allUsers.map(u => [u.id, u.isFollowing]))
  );

  const toggleFollow = (userId) => {
    setFollowState(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  // For demo: followers = first 4 allUsers, following = last 4 allUsers
  const followersList = allUsers.slice(0, 4);
  const followingList = allUsers.slice(2);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {/* Mobile Top Header back button */}
      <div className="profile-mobile-nav">
        <button 
          type="button" 
          className="profile-back-btn" 
          onClick={onBackToHome}
          aria-label="Back to feed"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="profile-top-username">{user.username}</span>
        <button 
          type="button" 
          className="profile-settings-btn" 
          onClick={() => alert('Settings (frontend demo)')}
          aria-label="Settings"
        >
          <Settings size={22} />
        </button>
      </div>

      {/* 1. Profile Header */}
      <header className="profile-header">
        {/* Avatar */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-ring">
            <img
              src={user.avatar}
              alt={user.username}
              className="profile-avatar-img"
            />
          </div>
        </div>

        {/* User Details & Controls */}
        <div className="profile-details-section">
          <div className="profile-title-row">
            <h1 className="profile-username">{user.username}</h1>
            {user.isVerified && (
              <CheckCircle2 size={18} className="profile-verified-badge" />
            )}

            <div className="profile-cta-buttons">
              <button
                type="button"
                className="profile-edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit profile'}
              </button>
              <button
                type="button"
                className="profile-secondary-btn"
                onClick={() => alert('Archive feature (frontend demo)')}
              >
                View archive
              </button>
              <button
                type="button"
                className="profile-settings-icon-btn"
                onClick={() => alert('Profile settings (frontend demo)')}
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Quick Edit Profile Inline Form */}
          {isEditing && (
            <form className="profile-edit-form" onSubmit={handleSaveProfile}>
              <div className="edit-field">
                <label htmlFor="editName">Full Name</label>
                <input
                  id="editName"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="edit-field">
                <label htmlFor="editBio">Bio</label>
                <textarea
                  id="editBio"
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                />
              </div>
              <button type="submit" className="save-profile-btn">
                Save Changes
              </button>
            </form>
          )}

          {/* Counts: Posts, Followers, Following */}
          <ul className="profile-stats-list">
            <li>
              <span className="stat-number">{posts.length}</span> posts
            </li>
            <li
              className="stat-clickable"
              onClick={() => setListModal('followers')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setListModal('followers')}
            >
              <span className="stat-number">{user.followersCount.toLocaleString()}</span> followers
            </li>
            <li
              className="stat-clickable"
              onClick={() => setListModal('following')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setListModal('following')}
            >
              <span className="stat-number">{user.followingCount}</span> following
            </li>
          </ul>

          {/* Bio & Links */}
          <div className="profile-bio-box">
            <h2 className="profile-fullname">{editName}</h2>
            <div className="profile-bio-text">
              {editBio.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                {user.website.replace('https://', '')}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 2. Story Highlights */}
      <section className="profile-highlights-section" aria-label="Story Highlights">
        {storyHighlights.map((highlight) => (
          <div key={highlight.id} className="highlight-item">
            <div className="highlight-cover-wrapper">
              <img
                src={highlight.cover}
                alt={highlight.title}
                className="highlight-cover-img"
              />
            </div>
            <span className="highlight-title">{highlight.title}</span>
          </div>
        ))}

        {/* Add new highlight button */}
        <div 
          className="highlight-item"
          onClick={() => alert('Create new Story Highlight (frontend demo)')}
          role="button"
          tabIndex={0}
        >
          <div className="highlight-cover-wrapper add-highlight-wrapper">
            <Plus size={24} className="add-highlight-icon" />
          </div>
          <span className="highlight-title">New</span>
        </div>
      </section>

      {/* 3. Navigation Tabs */}
      <div className="profile-tabs-bar">
        <button
          type="button"
          className={`profile-tab-btn ${activeTab === 'posts' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <Grid size={14} />
          <span>POSTS</span>
        </button>

        <button
          type="button"
          className={`profile-tab-btn ${activeTab === 'saved' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark size={14} />
          <span>SAVED</span>
        </button>

        <button
          type="button"
          className={`profile-tab-btn ${activeTab === 'tagged' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('tagged')}
        >
          <UserCheck size={14} />
          <span>TAGGED</span>
        </button>
      </div>

      {/* 4. Posts Grid */}
      <div className="profile-posts-grid">
        {activeTab === 'posts' ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="grid-post-item"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.caption || 'Profile post'}
                className="grid-post-image"
                loading="lazy"
              />
              {/* Hover overlay with Like and Comment counts */}
              <div className="grid-post-overlay">
                <div className="grid-stat">
                  <Heart size={20} fill="#ffffff" color="#ffffff" />
                  <span>{post.likesCount}</span>
                </div>
                <div className="grid-stat">
                  <MessageCircle size={20} fill="#ffffff" color="#ffffff" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </div>
          ))
        ) : activeTab === 'saved' ? (
          <div className="tab-empty-notice">
            <Bookmark size={48} strokeWidth={1.5} />
            <h3>Save Posts</h3>
            <p>Save photos and videos that you want to see again. Only you can see what you've saved.</p>
          </div>
        ) : (
          <div className="tab-empty-notice">
            <UserCheck size={48} strokeWidth={1.5} />
            <h3>Photos of you</h3>
            <p>When people tag you in photos and videos, they'll appear here.</p>
          </div>
        )}
      </div>

      {/* 5. Post View Modal from Profile Grid */}
      {selectedPost && (
        <div className="profile-modal-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="profile-modal-close-btn"
              onClick={() => setSelectedPost(null)}
              aria-label="Close post"
            >
              <X size={26} />
            </button>

            <div className="profile-modal-image-area">
              <img
                src={selectedPost.image}
                alt="Post preview"
                className="profile-modal-img"
              />
            </div>

            <div className="profile-modal-info-area">
              <div className="profile-modal-header">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="modal-user-avatar"
                />
                <span className="modal-user-name">{user.username}</span>
              </div>

              <div className="profile-modal-caption">
                <span className="modal-caption-author">{user.username}</span>
                <span>{selectedPost.caption}</span>
              </div>

              <div className="profile-modal-stats-bar">
                <div className="modal-stat-item">
                  <Heart size={20} fill="#ed4956" color="#ed4956" />
                  <span>{selectedPost.likesCount} likes</span>
                </div>
                <div className="modal-stat-item">
                  <MessageCircle size={20} />
                  <span>{selectedPost.commentsCount} comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Followers / Following Modal */}
      {listModal && (
        <div className="profile-modal-backdrop" onClick={() => setListModal(null)}>
          <div className="list-modal-box" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="list-modal-header">
              <h3 className="list-modal-title">
                {listModal === 'followers' ? 'Followers' : 'Following'}
              </h3>
              <button
                type="button"
                className="list-modal-close-btn"
                onClick={() => setListModal(null)}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* User List */}
            <ul className="list-modal-users">
              {(listModal === 'followers' ? followersList : followingList).map(u => (
                <li key={u.id} className="list-modal-user-row">
                  <img
                    src={u.avatar}
                    alt={u.username}
                    className="list-modal-avatar"
                  />
                  <div className="list-modal-user-info">
                    <span className="list-modal-username">{u.username}</span>
                    <span className="list-modal-fullname">{u.fullName}</span>
                  </div>
                  <button
                    type="button"
                    className={`list-modal-follow-btn ${followState[u.id] ? 'following' : ''}`}
                    onClick={() => toggleFollow(u.id)}
                  >
                    {followState[u.id] ? 'Following' : 'Follow'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
