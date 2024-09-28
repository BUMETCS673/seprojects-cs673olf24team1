/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState('');
  const [resultData, setResultData] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [conversations, setConversations] = useState([]); // Add conversations state

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
    const handleNewChat = () => {
      setConversations([]); // Clear conversation history
      const newGreeting = { input: "Start a new chat", response: "Hello, how can I help you?" };
      setConversations([newGreeting]); // Start with a new greeting
      setRecentPrompt(''); // Clear recent prompt
      setInput(''); // Clear input
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