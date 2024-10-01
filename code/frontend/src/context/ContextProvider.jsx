/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';
import axios from 'axios';
// import { MemoryStorage } from 'langchain/storage';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState('');
  const [resultData, setResultData] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [conversations, setConversations] = useState([]); // Add conversations state
  // const memory = new MemoryStorage();


  // other state or logic...
  const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        try {
            const response = await getChatbotResponse(prompt || input);
            setResultData(response);
            setPrevPrompts(prev => [...prev, prompt || input]);
            setRecentPrompt(prompt || input);
        } catch (error) {
            setResultData("Sorry, there was an error. Please try again.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    // Function to handle new chat
    const handleNewChat = async () => {
      setConversations([]); // Clear conversation history
      const newGreeting = { input: "Start a new chat", response: "Hello, how can I help you?" };
      setConversations([newGreeting]); // Start with a new greeting
      setRecentPrompt(''); // Clear recent prompt
      setInput(''); // Clear input

      // Optionally, send a request to the backend to initialize a new chat
      try {
        const response = await axios.post('/api/new-chat'); // Adjust the endpoint accordingly
        // Handle any data you need from the response
        console.log(response.data);
      } catch (error) {
        console.error('Error starting a new chat:', error);
      }
      
    };

    // Function to handle download of chat history from backend
    const downloadChatHistory = async () => {
        try {
            // Fetch chat history from the backend API
            const response = await axios.get('/api/chat/history'); // Replace with actual API URL
            const chatHistory = response.data;

            if (chatHistory.length === 0) {
                alert("No chat history available.");
                return;
            }

            // Convert chat history to JSON
            const json = JSON.stringify(chatHistory, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chat_history.json';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error fetching chat history", error);
            alert("Failed to retrieve chat history. Please try again.");
        }
    };

    const contextValue = {
      prevPrompts,
      setPrevPrompts,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      handleNewChat,
      downloadChatHistory,
      // conversations, // Include conversations in context value
      // setConversations, // Optionally expose setConversations if needed
    };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;