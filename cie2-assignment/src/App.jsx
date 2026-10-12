import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Feed from './components/Feed/Feed';
import Suggestions from './components/Suggestions/Suggestions';
import Profile from './components/Profile/Profile';

// New page components
import Search from './pages/Search/Search';
import Explore from './pages/Explore/Explore';
import Reels from './pages/Reels/Reels';
import Messages from './pages/Messages/Messages';
import Notifications from './pages/Notifications/Notifications';
import Create from './pages/Create/Create';

// Dummy data
import {
  currentUser,
  stories as initialStories,
  posts as initialPosts,
  suggestedUsers as initialSuggestedUsers,
  profilePosts,
  storyHighlights
} from './data/dummyData';

import './App.css';

/**
 * App.jsx — Main Application Shell
 *
 * Manages:
 *  - activeTab: which page/view is currently displayed
 *  - posts state: so Like / Save / Comment / new posts persist across views
 *  - suggestedUsers state: for Follow/Unfollow in Suggestions sidebar
 *
 * All views are rendered inside <main> based on activeTab.
 * No React Router needed — clean beginner-friendly state-based routing.
 */
function App() {
  // ── View Routing ──────────────────────────────────────────────────────────
  // Possible values: 'home' | 'search' | 'explore' | 'reels' | 'messages' |
  //                  'notifications' | 'create' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // ── Global State ──────────────────────────────────────────────────────────
  const [posts, setPosts] = useState(initialPosts);
  const [suggestedUsers, setSuggestedUsers] = useState(initialSuggestedUsers);

  // ── Handlers ──────────────────────────────────────────────────────────────

  /** Like / Unlike a post — toggles isLiked & updates likesCount */
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
          : p
      )
    );
  };

  /** Save / Unsave a post bookmark */
  const handleToggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };

  /** Add a new comment to a post */
  const handleAddComment = (postId, commentText) => {
    const newComment = {
      id: `comment_${Date.now()}`,
      username: currentUser.username,
      text: commentText,
      timestamp: 'Just now',
      isLiked: false
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
  };

  /** Follow / Unfollow a suggested user in the right sidebar */
  const handleToggleFollow = (userId) => {
    setSuggestedUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  /**
   * Add a brand-new post (from the Create page).
   * Prepends to feed and navigates to Home so the user sees it immediately.
   */
  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setActiveTab('home');
  };

  /** Open the Create page when sidebar Create button is clicked */
  const handleOpenCreate = () => {
    setActiveTab('create');
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      {/* Mobile & Tablet Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={handleOpenCreate}
        currentUser={currentUser}
      />

      <div className="app-main-layout">
        {/* Desktop Left Sidebar + Mobile Bottom Bar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCreate={handleOpenCreate}
          currentUser={currentUser}
        />

        {/* ── Main Content Area ── */}
        <main className="app-content-area">

          {/* HOME — feed + right suggestions */}
          {activeTab === 'home' && (
            <div className="home-feed-wrapper">
              <Feed
                posts={posts}
                stories={initialStories}
                onToggleLike={handleToggleLike}
                onToggleSave={handleToggleSave}
                onAddComment={handleAddComment}
              />
              <Suggestions
                currentUser={currentUser}
                suggestedUsers={suggestedUsers}
                onToggleFollow={handleToggleFollow}
                onProfileClick={() => setActiveTab('profile')}
              />
            </div>
          )}

          {/* SEARCH */}
          {activeTab === 'search' && (
            <Search setActiveTab={setActiveTab} />
          )}

          {/* EXPLORE */}
          {activeTab === 'explore' && (
            <Explore />
          )}

          {/* REELS */}
          {activeTab === 'reels' && (
            <Reels />
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <Messages />
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <Notifications />
          )}

          {/* CREATE */}
          {activeTab === 'create' && (
            <Create
              onAddPost={handleAddPost}
              setActiveTab={setActiveTab}
            />
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <Profile
              user={currentUser}
              posts={profilePosts}
              storyHighlights={storyHighlights}
              onBackToHome={() => setActiveTab('home')}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;
