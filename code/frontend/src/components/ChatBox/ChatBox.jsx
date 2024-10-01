/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from 'react'
// import CourseProvider from '../CourseProvider/CourseProvider'
import InputField from '../InputField/InputField'
import './ChatBox.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider'
import Cookies from 'js-cookie'; // Import the js-cookie library
import axios from 'axios'; // Import Axios for API calls
import ProfileForm from '../Profile/ProfileForm'

const ChatBox = () => {

  const [isProfilePanelOpen, setProfilePanelOpen] = useState(false);

  const { recentPrompt, showResult, loading, resultData } = useContext(Context);

  // State to track the conversation history
  const [conversations, setConversations] = useState([]);

  // Ref to track the chat container and scroll automatically
  const chatContainerRef = useRef(null);

  // Load chat history from cookies on initial load
  useEffect(() => {
    const cachedConversations = Cookies.get('chatHistory');
    if (cachedConversations) {
      setConversations(JSON.parse(cachedConversations));
    }
  }, []);

  // Save chat history to cookies whenever conversations change
  useEffect(() => {
    if (conversations.length > 0) {
      Cookies.set('chatHistory', JSON.stringify(conversations), { expires: 7 }); // Store for 7 days
    }
  }, [conversations]);

  // Handle new user messages
  const handleNewMessage = async (input) => {
    // Add user input to the conversation history
    const newConversation = { input, response: "Loading..." };
    setConversations([...conversations, newConversation]);

    try {
      // Call the backend API to get a response from OpenAI http://localhost:8080/api/v1/chatbot/chat_conversation
      // const response = await axios.post('/api/openai-chat', { message: input });
      const response = await axios.post('http://localhost:8080/api/v1/chatbot/chat_conversation', { message: input });
      const botResponse = response.data.response;

      // Update the conversation history with the bot's response
      const updatedConversation = { input, response: botResponse };
      setConversations((prevConversations) =>
        prevConversations.map((conv, idx) =>
          idx === prevConversations.length - 1 ? updatedConversation : conv
        )
      );
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      const errorResponse = { input, response: "Sorry, something went wrong. Please try again." };
      setConversations((prevConversations) =>
        prevConversations.map((conv, idx) =>
          idx === prevConversations.length - 1 ? errorResponse : conv
        )
      );
    }
  };

  // new chat function
  const newChat = () => {
    // Clear the current conversations
    setConversations([]);
    // Optional: Show a greeting message for the new chat
    const newGreeting = { input: "Start a new chat", response: "Hello, BU Student! How can I assist you today?" };
    // Set the new greeting as the first entry
    setConversations([newGreeting]);
  };

  // Scroll to the bottom whenever conversations change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversations]);

  // Clear chat history from cookies
  // const handleClearCache = () => {
  //   Cookies.remove('chatHistory');
  //   setConversations([]); // Clear chat history in state as well
  // };

  const toggleProfilePanel = () => {
    setProfilePanelOpen(!isProfilePanelOpen);
  };

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
        {<ProfileForm />}
      </div>

      {/* Overlay */}
      {isProfilePanelOpen && <div className="overlay" onClick={toggleProfilePanel}></div>}

      <div className="main-container">
        {/* Dynamically render conversation history */}
        <div className="chat-history" ref={chatContainerRef}>
          {conversations.length === 0 ? (
            <div className="greet">
              <p><span>Hello, BU Student</span></p>
              <p>How can I help you today?</p>
            </div>
          ) : (
            conversations.map((conversation, index) => (
              <div key={index} className="conversation">
                <div className="result-title">
                  <img src={assets.user_icon} alt="User Icon" />
                  <p>{conversation.input}</p>
                </div>
                <div className="result-data">
                  <img src={assets.eagle_logo} alt="Bot Icon" />
                  <p>{conversation.response}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Button to clear chat cache */}
        {/* <div className="clear-cache">
          <button onClick={handleClearCache}>Clear Cache</button>
        </div> */}
        {/* InputField to send new messages */}
        <InputField onSend={handleNewMessage} />


      </div>
    </div>
  )
}

export default ChatBox;