import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, ArrowLeft } from 'lucide-react';
import { conversations as initialConversations, currentUser } from '../../data/dummyData';
import './Messages.css';

/**
 * Messages Page
 * Frontend-only direct messages layout.
 * - Left panel: conversation list with search
 * - Right panel: message thread with live send support
 * All messages live in React state only — no backend needed.
 */
function Messages() {
  const [convos, setConvos] = useState(
    // Deep-copy conversations so we can mutate messages array safely
    initialConversations.map((c) => ({
      ...c,
      messages: [...c.messages]
    }))
  );
  const [selectedId, setSelectedId] = useState(convos[0]?.id || null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileConvo, setShowMobileConvo] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to latest message whenever selected convo or messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId, convos]);

  const selectedConvo = convos.find((c) => c.id === selectedId);

  // Filter conversations in search
  const filteredConvos = searchQuery.trim()
    ? convos.filter((c) =>
        c.user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : convos;

  // Open a conversation
  const handleSelectConvo = (id) => {
    setSelectedId(id);
    setShowMobileConvo(true);
    // Mark messages as read
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Send a new message
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedId) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConvos((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMsg.text,
              lastTime: 'now'
            }
          : c
      )
    );

    setInputText('');
  };

  return (
    <div className="messages-page">
      {/* LEFT PANEL — conversation list */}
      <aside className={`messages-left-panel ${showMobileConvo ? 'hide-mobile' : ''}`}>
        <div className="messages-left-header">
          <h1 className="messages-title">{currentUser.username}</h1>
        </div>

        {/* Conversation Search */}
        <div className="msg-search-wrapper">
          <Search size={14} className="msg-search-icon" />
          <input
            type="text"
            placeholder="Search Direct"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="msg-search-input"
          />
        </div>

        {/* Conversation List */}
        <ul className="conversations-list">
          {filteredConvos.map((convo) => (
            <li
              key={convo.id}
              className={`convo-item ${selectedId === convo.id ? 'convo-active' : ''}`}
              onClick={() => handleSelectConvo(convo.id)}
            >
              <div className="convo-avatar-wrapper">
                <img
                  src={convo.user.avatar}
                  alt={convo.user.username}
                  className="convo-avatar"
                />
                {convo.user.isOnline && <span className="online-dot" />}
              </div>
              <div className="convo-info">
                <div className="convo-name-row">
                  <span className="convo-username">{convo.user.username}</span>
                  <span className="convo-time">{convo.lastTime}</span>
                </div>
                <p className="convo-last-msg">
                  {convo.lastMessage}
                </p>
              </div>
              {convo.unreadCount > 0 && (
                <span className="convo-unread-badge">{convo.unreadCount}</span>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT PANEL — active conversation */}
      <div className={`messages-right-panel ${showMobileConvo ? 'show-mobile' : ''}`}>
        {selectedConvo ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <button
                type="button"
                className="chat-back-btn"
                onClick={() => setShowMobileConvo(false)}
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>
              <img
                src={selectedConvo.user.avatar}
                alt={selectedConvo.user.username}
                className="chat-header-avatar"
              />
              <div className="chat-header-info">
                <span className="chat-header-username">{selectedConvo.user.username}</span>
                <span className="chat-header-status">
                  {selectedConvo.user.isOnline ? '🟢 Active now' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="messages-thread">
              {selectedConvo.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble-wrapper ${msg.sender === 'me' ? 'my-bubble' : 'their-bubble'}`}
                >
                  {msg.sender !== 'me' && (
                    <img
                      src={selectedConvo.user.avatar}
                      alt={selectedConvo.user.username}
                      className="bubble-avatar"
                    />
                  )}
                  <div className="message-bubble-col">
                    <div
                      className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}
                    >
                      {msg.text}
                    </div>
                    <span className="bubble-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form className="chat-input-bar" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-text-input"
                aria-label="Type a message"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="chat-send-btn"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="no-convo-state">
            <Send size={52} strokeWidth={1.5} />
            <h3>Your Messages</h3>
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
