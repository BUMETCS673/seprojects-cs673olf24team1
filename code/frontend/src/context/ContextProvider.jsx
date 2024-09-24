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
    };

  return (
    <Context.Provider value={{
      loading,
      setLoading,
      recentPrompt,
      setRecentPrompt,
      resultData,
      setResultData,
      showResult,
      setShowResult,
      input,
      setInput
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;