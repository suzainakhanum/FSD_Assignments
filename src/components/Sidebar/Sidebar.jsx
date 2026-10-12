import React, { useState } from 'react';
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
  Camera,
  Settings,
  Activity,
  Bookmark,
  Moon,
  Sun,
  LogOut,
  X
} from 'lucide-react';
import './Sidebar.css';

/**
 * Sidebar Component
 * Left navigation sidebar for desktop / tablet.
 * Mobile bottom navigation bar rendered separately via CSS.
 *
 * @param {string}   activeTab    - Currently active view identifier
 * @param {function} setActiveTab - Navigate to a view
 * @param {function} onOpenCreate - Open the Create Post page
 * @param {object}   currentUser  - Logged-in user data for avatar display
 */
function Sidebar({ activeTab, setActiveTab, onOpenCreate, currentUser }) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode (CSS-class based — beginner-friendly approach)
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.body.classList.toggle('dark-mode', next);
      return next;
    });
  };

  // Primary nav items — each has an id that matches App.jsx view names
  const navItems = [
    { id: 'home',          label: 'Home',          icon: Home },
    { id: 'search',        label: 'Search',         icon: Search },
    { id: 'explore',       label: 'Explore',        icon: Compass },
    { id: 'reels',         label: 'Reels',          icon: Film },
    { id: 'messages',      label: 'Messages',       icon: MessageCircle, badge: '3' },
    { id: 'notifications', label: 'Notifications',  icon: Heart, dot: true },
    { id: 'create',        label: 'Create',         icon: PlusSquare },
    { id: 'profile',       label: 'Profile',        isProfile: true }
  ];

  const handleNavClick = (item) => {
    if (item.id === 'create') {
      onOpenCreate();
    } else {
      setActiveTab(item.id);
    }
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* ── Desktop & Tablet Left Sidebar ── */}
      <aside className="sidebar-container" aria-label="Main Navigation">

        {/* Logo */}
        <div
          className="sidebar-logo-area"
          onClick={() => setActiveTab('home')}
          role="button"
          tabIndex={0}
          title="Instagram Home"
          onKeyDown={(e) => e.key === 'Enter' && setActiveTab('home')}
        >
          <span className="sidebar-logo-text">Instagram</span>
          <Camera className="sidebar-logo-icon" size={26} />
        </div>

        {/* Nav list */}
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id} className="sidebar-nav-item">
                  <button
                    type="button"
                    className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    title={item.label}
                  >
                    <div className="sidebar-icon-wrapper">
                      {item.isProfile ? (
                        <img
                          src={currentUser?.avatar}
                          alt={currentUser?.username}
                          className={`sidebar-profile-avatar ${isActive ? 'active-avatar' : ''}`}
                        />
                      ) : (
                        <IconComponent
                          size={24}
                          strokeWidth={isActive ? 2.5 : 2}
                          className="sidebar-icon"
                        />
                      )}
                      {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                      {item.dot && <span className="sidebar-dot" />}
                    </div>
                    <span className={`sidebar-label ${isActive ? 'bold-label' : ''}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* More Button */}
        <div className="sidebar-bottom" style={{ position: 'relative' }}>
          <button
            type="button"
            className={`sidebar-nav-link more-btn ${showMoreMenu ? 'active' : ''}`}
            onClick={() => setShowMoreMenu((v) => !v)}
            title="More Options"
          >
            <div className="sidebar-icon-wrapper">
              <Menu size={24} />
            </div>
            <span className="sidebar-label">More</span>
          </button>

          {/* More Dropdown Menu */}
          {showMoreMenu && (
            <div className="more-menu-popup">
              <div className="more-menu-header">
                <span>Options</span>
                <button
                  type="button"
                  className="more-menu-close"
                  onClick={() => setShowMoreMenu(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <button type="button" className="more-menu-item" onClick={() => { alert('Settings page (frontend demo)'); setShowMoreMenu(false); }}>
                <Settings size={18} /> Settings
              </button>

              <button type="button" className="more-menu-item" onClick={() => { alert('Your activity stats (frontend demo)'); setShowMoreMenu(false); }}>
                <Activity size={18} /> Your activity
              </button>

              <button type="button" className="more-menu-item" onClick={() => { setActiveTab('notifications'); setShowMoreMenu(false); }}>
                <Bookmark size={18} /> Saved
              </button>

              <button type="button" className="more-menu-item" onClick={handleToggleDarkMode}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
              </button>

              <div className="more-menu-divider" />

              <button type="button" className="more-menu-item danger" onClick={() => alert('Logged out! (Frontend demo)')}>
                <LogOut size={18} /> Log out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
        <button
          type="button"
          className={`mobile-bottom-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
          title="Home"
        >
          <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        </button>

        <button
          type="button"
          className={`mobile-bottom-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
          title="Search"
        >
          <Search size={24} strokeWidth={activeTab === 'search' ? 2.5 : 2} />
        </button>

        <button
          type="button"
          className="mobile-bottom-btn"
          onClick={onOpenCreate}
          title="Create"
        >
          <PlusSquare size={24} />
        </button>

        <button
          type="button"
          className={`mobile-bottom-btn ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
          title="Reels"
        >
          <Film size={24} strokeWidth={activeTab === 'reels' ? 2.5 : 2} />
        </button>

        <button
          type="button"
          className={`mobile-bottom-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          title="Profile"
        >
          <img
            src={currentUser?.avatar}
            alt={currentUser?.username}
            className={`mobile-avatar ${activeTab === 'profile' ? 'active-mobile-avatar' : ''}`}
          />
        </button>
      </nav>
    </>
  );
}

export default Sidebar;
