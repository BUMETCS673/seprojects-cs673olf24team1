/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useChat } from '../../context/ChatContext';
import './Sidebar.css';

const ChatHistory = () => {
  const {
    history,
    isFetchingNetworkData,
    error,
    selectedSession,
    handleDeleteSessionHistory,
    handleSelectSession,
  } = useChat();

  const handleDeleteHistory = async (id) => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      await handleDeleteSessionHistory(id);
    }
  };

  return (
    <div className="recent">
      <p className='recent-title'>Chat History</p>
      {error && <p className="error-message">{error}</p>}

      {/* Show loading indicator when fetching data */}
      {isFetchingNetworkData ? (
        <p>Loading chat history...</p>
      ) : history.length > 0 ? (
        <>
          {history
            .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)) // Sort by createdTime (latest first)
            .map((session) => (
              <div
                key={session.id}
                className={`recent-entry-history ${selectedSession === session.id ? 'active' : ''}`}
                onClick={() => handleSelectSession(session.id)}
              >
                <img src={assets.message_icon} alt="" />
                <span>{session.createdTime.toUTCString()}</span> {/* Convert to UTC string */}
                <div onClick={(e) => { e.stopPropagation(); handleDeleteHistory(session.id) }}>
                  <img src={assets.clear} alt="clear" />
                </div>
              </div>
            ))}
        </>
      ) : null}
    </div>
  );
}

export default ChatHistory;
