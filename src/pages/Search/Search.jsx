import React, { useState } from 'react';
import { Search as SearchIcon, CheckCircle2, X } from 'lucide-react';
import { allUsers } from '../../data/dummyData';
import './Search.css';

/**
 * Search Page
 * Allows users to search for other users by username or full name.
 * Uses local dummy data — no real API connection.
 *
 * @param {function} setActiveTab - Navigate to other views (e.g. profile)
 */
function Search({ setActiveTab }) {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState(allUsers);

  // Filter users matching the search query (case-insensitive)
  const filteredUsers = query.trim()
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(query.toLowerCase()) ||
          u.fullName.toLowerCase().includes(query.toLowerCase())
      )
    : users; // Show all users when nothing is typed

  // Toggle follow state for a user
  const handleToggleFollow = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Search</h1>
      </div>

      {/* Search Input */}
      <div className="search-input-wrapper">
        <SearchIcon size={16} className="search-input-icon" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoFocus
          aria-label="Search users"
        />
        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="search-results">
        {filteredUsers.length === 0 ? (
          <div className="search-empty-state">
            <SearchIcon size={40} strokeWidth={1.5} />
            <p>No results found for <strong>"{query}"</strong></p>
          </div>
        ) : (
          <>
            <p className="search-results-label">
              {query ? `Results for "${query}"` : 'Suggested'}
            </p>
            <ul className="search-user-list">
              {filteredUsers.map((user) => (
                <li key={user.id} className="search-user-row">
                  {/* Avatar + Names — clickable to go to profile */}
                  <div
                    className="search-user-info"
                    onClick={() => setActiveTab('profile')}
                    role="button"
                    tabIndex={0}
                    title={`View ${user.username}'s profile`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="search-user-avatar"
                    />
                    <div className="search-user-details">
                      <div className="search-username-row">
                        <span className="search-username">{user.username}</span>
                        {user.isVerified && (
                          <CheckCircle2 size={14} className="search-verified-badge" />
                        )}
                      </div>
                      <span className="search-full-name">{user.fullName}</span>
                      <span className="search-followers">
                        {user.followersCount.toLocaleString()} followers
                      </span>
                    </div>
                  </div>

                  {/* Follow / Following Toggle Button */}
                  <button
                    type="button"
                    className={`search-follow-btn ${user.isFollowing ? 'following' : ''}`}
                    onClick={() => handleToggleFollow(user.id)}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
