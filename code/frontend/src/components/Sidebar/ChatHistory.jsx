/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useChat } from '../../context/ChatContext';
import './Sidebar.css';

const ChatHistory = () => {
  const { sessions, activeSessionId, deleteChatHistory, selectActiveSession } = useChat();
  const [error, setError] = useState(null);

  const handleDeleteHistory = async (id) => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      await deleteChatHistory(id);
    }
  };

  return (
    <div className="recent">
      <p className='recent-title'>Chat History</p>
      {error && <p className="error-message">{error}</p>}
      {sessions.length > 0 ? (
        <>
          {sessions.map((session, index) => (
            <div key={session.id} className="recent-entry-history" onClick={() => selectActiveSession(session.id)}>
              <img src={assets.message_icon} alt="" />
              <span>{session.createdTime.toUTCString()}</span>
              <div onClick={(e) => { e.stopPropagation(); handleDeleteHistory(session.id) }}>
                <img src={assets.clear} alt="clear" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No chat history available.</p>
      )}
    </div>
  );
}

export default ChatHistory;