import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import { notifications as initialNotifications } from '../../data/dummyData';
import './Notifications.css';

/**
 * Notifications Page
 * Shows a chronological list of dummy notifications:
 * - Likes on your posts
 * - New followers (with Follow Back button)
 * - Comments on your posts
 *
 * Unread notifications are visually highlighted.
 * Follow Back buttons toggle their state via React state.
 */
function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications);

  // Mark all as read
  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Toggle "Follow Back" on follow notifications
  const handleFollowBack = (notifId) => {
    setNotifs((prev) =>
      prev.map((n) =>
        n.id === notifId ? { ...n, isFollowingBack: !n.isFollowingBack } : n
      )
    );
  };

  // Determine the right icon per notification type
  const getTypeIcon = (type) => {
    if (type === 'like') return <Heart size={14} fill="#ed4956" color="#ed4956" />;
    if (type === 'follow') return <UserPlus size={14} color="var(--brand-blue)" />;
    if (type === 'comment') return <MessageCircle size={14} color="#f97316" />;
    return null;
  };

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  return (
    <div className="notifications-page">
      {/* Header */}
      <div className="notifications-header">
        <h1 className="notifications-title">
          Notifications
          {unreadCount > 0 && (
            <span className="notif-unread-count">{unreadCount}</span>
          )}
        </h1>
        {unreadCount > 0 && (
          <button
            type="button"
            className="mark-all-read-btn"
            onClick={handleMarkAllRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifs.length === 0 ? (
          <div className="notifications-empty">
            <Heart size={40} strokeWidth={1.5} />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifs.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item ${!notif.isRead ? 'notif-unread' : ''}`}
            >
              {/* Avatar with type icon */}
              <div className="notif-avatar-wrapper">
                <img
                  src={notif.user.avatar}
                  alt={notif.user.username}
                  className="notif-avatar"
                />
                <span className="notif-type-badge">
                  {getTypeIcon(notif.type)}
                </span>
              </div>

              {/* Notification Text */}
              <div className="notif-content">
                <p className="notif-text">
                  <span className="notif-username">{notif.user.username}</span>
                  {' '}
                  {notif.action}
                </p>
                <span className="notif-time">{notif.time}</span>
              </div>

              {/* Right side — post thumbnail or Follow Back button */}
              {notif.type === 'follow' ? (
                <button
                  type="button"
                  className={`follow-back-btn ${notif.isFollowingBack ? 'following' : ''}`}
                  onClick={() => handleFollowBack(notif.id)}
                >
                  {notif.isFollowingBack ? 'Following' : 'Follow Back'}
                </button>
              ) : notif.postThumbnail ? (
                <img
                  src={notif.postThumbnail}
                  alt="Post"
                  className="notif-post-thumb"
                />
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
