/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'; // Import necessary React hooks
import { assets } from '../../assets/assets'; // Import asset resources (e.g., logos and icons)
import { useChat } from '../../context/ChatContext'; // Custom hook for managing chat context
import InputField from '../InputField/InputField'; // Input field component for sending messages
import ChatBubble from './ChatBubble'; // Component for individual chat messages
import PacmanLoader from 'react-spinners/PacmanLoader'
import './ChatBox.css'; // Import styles for the ChatBox component

// ChatBox component to manage the chat interface and interactions
const ChatBox = () => {
  // Destructure values and functions from the chat context
  const {
    handleSendMessage, // Function to handle sending messages
    messages,          // Array of chat messages
    isSendingMessage,  // Boolean indicating if a message is currently being sent
    error,             // Error messages (if any)
    sessions,          // Array of chat sessions
  } = useChat(); // Accessing the chat context

  // Local state management for the profile panel and input field
  const [isProfilePanelOpen, setProfilePanelOpen] = useState(false); // State for controlling the profile panel visibility
  const [input, setInput] = useState(''); // State for managing the message input field

  // Toggle the visibility of the profile panel
  const toggleProfilePanel = () => {
    setProfilePanelOpen(!isProfilePanelOpen);
  };

  // Handle changes to the input field
  const handleInputChange = (event) => {
    setInput(event.target.value); // Update input state with the current value
  };

  // Handle sending the message when the user triggers it
  const handleInputSend = () => {
    handleSendMessage(input); // Call function to send the message
    setInput(''); // Clear the input field after sending
  };

  // Scroll to the bottom when sending a new message
  const chatEndRef = useRef(null); // Ref to track the end of the chat history
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the bottom of chat history
  }, [messages]); // Dependency on messages to trigger the effect when they change

  return (
    <div className='main'>
      {/* Navigation bar with branding and user avatar */}
      <div className="nav">
        <div className="branding">
          <img src={assets.bu_logo} alt="logo" />
          <p>BUAN CHATBOT</p>
        </div>
        {/* Profile Avatar for accessing user profile */}
        <div className="avatar-container" onClick={toggleProfilePanel}>
          <img src={assets.user_icon} alt="User Avatar" />
        </div>
      </div>

      {/* Sliding Profile Panel */}
      <div className={`profile-panel ${isProfilePanelOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleProfilePanel}>X</button> {/* Close button for the profile panel */}
        <h2>User Profile</h2>
        {/* <ProfileForm /> */}
      </div>

      {/* Overlay to dim background when profile panel is open */}
      {isProfilePanelOpen && <div className="overlay" onClick={toggleProfilePanel}></div>}

      {/* Chat container for displaying chat messages and input field */}
      <div className="chat-container">
        <div className="chat-history-container">
          {/* Conditional rendering based on the presence of chat sessions */}
          {messages.length === 0 ? (
            <div className="no-sessions-message">
              <p style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>
                (๑•̀ᄇ•́)و ✧ Let's create a new chat to start!
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatBubble key={index} message={message} /> // Render each chat bubble for messages
            ))
          )}
          <div ref={chatEndRef} /> {/* Empty div to enable scrolling to the bottom */}
          {isSendingMessage ? <div className='loading-indicator'><PacmanLoader color="#e54500" /></div> : null}
        </div>
        {/* Input field only visible when there are sessions */}
        {messages.length === 0 ? null :
          <InputField input={input} onSend={handleInputSend} onChange={handleInputChange} />
        }
      </div>
    </div>
  );
};

export default ChatBox; // Exporting the ChatBox component for use in other parts of the application
