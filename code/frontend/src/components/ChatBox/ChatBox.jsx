/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useChat } from '../../context/ChatContext';
import InputField from '../InputField/InputField';
import ProfileForm from '../Profile/ProfileForm';
import ChatBubble from './ChatBubble';
import './ChatBox.css';

const ChatBox = () => {
  const {
    handleSendMessage,
    messages,
    isSendingMessage,
    error,
    sessions,
  } = useChat();

  const [isProfilePanelOpen, setProfilePanelOpen] = useState(false);
  const [input, setInput] = useState('');

  const toggleProfilePanel = () => {
    setProfilePanelOpen(!isProfilePanelOpen);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputSend = () => {
    handleSendMessage(input);
    setInput('');
  };

  // Scroll to the bottom when sending a new message
  const chatEndRef = useRef(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages]);

  return (
    <div className='main'>
      <div className="nav">
        <div className="branding">
          <img src={assets.bu_logo} alt="logo" />
          <p>BUAN CHATBOT</p>
        </div>
        {/* Profile Avatar */}
        <div className="avatar-container" onClick={toggleProfilePanel}>
          <img src={assets.user_icon} alt="User Avatar" />
        </div>
      </div>

      {/* Sliding Profile Panel */}
      <div className={`profile-panel ${isProfilePanelOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleProfilePanel}>X</button>
        <h2>User Profile</h2>
        <ProfileForm />
      </div>

      {/* Overlay */}
      {isProfilePanelOpen && <div className="overlay" onClick={toggleProfilePanel}></div>}

      <div className="chat-container">
        <div className="chat-history-container">
          {sessions.length === 0 ? (
            <div className="no-sessions-message">
              <p style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>
                (๑•̀ᄇ•́)و ✧ Let's create a new chat to start!
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))
          )}
          <div ref={chatEndRef} /> {/* Empty div to scroll to */}
        </div>
        {sessions.length === 0 ? (null) :
          <InputField input={input} onSend={handleInputSend} onChange={handleInputChange} />}
      </div>
    </div>
  );
};

export default ChatBox;
