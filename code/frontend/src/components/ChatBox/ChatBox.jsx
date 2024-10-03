/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from 'react';
import InputField from '../InputField/InputField';
import { assets } from '../../assets/assets';
import ProfileForm from '../Profile/ProfileForm';
import useChat from '../../hooks/useChat';
import ChatBubble from './ChatBubble';
import './ChatBox.css';

const ChatBox = ({session_id}) => {
  const { messages, error, isLoading, sessionId, sessionCreatedTime, handleSendMessage } = useChat(session_id);
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

  // Scroll to the bottom when messages change
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='main'>
      <div className="nav">
        <div className="branding">
          <img src={assets.eagle_logo} alt="" />
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
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} />
          ))}
          <div ref={chatEndRef} /> {/* Empty div to scroll to */}
        </div>
        <InputField input={input} onSend={handleInputSend} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default ChatBox;
