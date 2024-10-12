/* eslint-disable no-unused-vars */
// Created by Natt, updated by Poom and Natasya Liew

import React, { useState, useRef, useEffect } from 'react'; // Import necessary React hooks
import { assets } from '../../assets/assets'; // Import asset resources (e.g., logos and icons)
import InputField from '../InputField/InputField'; // Input field component for sending messages
import ChatBubble from './ChatBubble'; // Component for individual chat messages
import PacmanLoader from 'react-spinners/PacmanLoader'; // Loader for sending messages
import useChatService from '../../hooks/useChatService'; // Importing the custom hook
import './ChatBox.css'; // Import styles for the ChatBox component

// ChatBox component to manage the chat interface and interactions
const ChatBox = () => {
  const {
    createUserMessage,
    createAIMessage,
    getChatBotResponse,
  } = useChatService(); // Accessing chat service functions

  const userId = useSelector((state) => state.auth.user?.userId); // Get userId from Redux state


  const [messages, setMessages] = useState([]); // State for chat messages
  const [isActive, setIsActive] = useState(true); // State for active chat session
  const [isSendingMessage, setIsSendingMessage] = useState(false); // State for message sending
  const [input, setInput] = useState(''); // State for message input field

  // Scroll to the bottom when sending a new message
  const chatEndRef = useRef(null); // Ref to track the end of the chat history
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the bottom of chat history
  }, [messages]); // Dependency on messages to trigger the effect when they change

  // Handle changes to the input field
  const handleInputChange = (event) => {
    setInput(event.target.value); // Update input state with the current value
  };

  // Handle sending the message when the user triggers it
  const handleInputSend = async () => {
    if (!input.trim()) return; // Ignore empty inputs

    const newUserMessage = await createUserMessage({ text: input, isUser: true }); // Create user message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]); // Add user message to chat

    setIsSendingMessage(true); // Set sending state

    try {
        const response = await getChatBotResponse({ text: input, isUser: true }); // Get bot response
        if (response && response.text) {
            const newAIMessage = await createAIMessage({ text: response.text, isUser: false }); // Create AI message
            setMessages((prevMessages) => [...prevMessages, newAIMessage]); // Add AI message to chat
        } else {
            alert(response.message); // Alert the error message
        }
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        alert('Failed to get response from the chatbot.'); // General error alert
    } finally {
        setInput(''); // Clear input
        setIsSendingMessage(false); // Reset sending state
    }
  };

  return (
    <div className='main'>
      {/* Navigation bar with branding and user avatar */}
      <div className="nav">
        <div className="branding">
          <img src={assets.bu_logo} alt="logo" />
          <p>BUAN CHATBOT</p>
        </div>
        <div className="avatar-container">
          <img src={assets.user_icon} alt="User Avatar" />
        </div>
      </div>

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
          {isSendingMessage && <div className='loading-indicator'><PacmanLoader color="#e54500" /></div>} {/* Show sending indicator */}
        </div>
        {isActive && <InputField input={input} onSend={handleInputSend} onChange={handleInputChange} />} {/* Input field for messages */}
      </div>
    </div>
  );
};

export default ChatBox; // Exporting the ChatBox component for use in other parts of the application
