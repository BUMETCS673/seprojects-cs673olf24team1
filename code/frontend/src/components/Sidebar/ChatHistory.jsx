/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../../assets/assets';
import { useChat } from '../../context/ChatContext';
import './Sidebar.css';

const ChatHistory = () => {
  const {
    sessions,
    activeSessionId,
    isFetchingNetworkData,
    error,
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
      ) : sessions.length > 0 ? (
        <>
          {sessions
            .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)) // Sort by createdTime (latest first)
            .map((session) => (
              <div 
                key={session.id} 
                className={`recent-entry-history ${activeSessionId === session.id ? 'active' : ''}`} 
                onClick={() => handleSelectSession(session.id)}
              >
                <img src={assets.message_icon} alt="" />
                <span>{new Date(session.createdTime).toUTCString()}</span> {/* Convert to UTC string */}
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
