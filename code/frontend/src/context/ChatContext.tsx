// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.
// Annotated by Natasya Liew

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'; // Import necessary React hooks
import { useUser } from './UserContext'; // Importing the UserContext to manage user details
import { ChatSession, Message } from '../interfaces/ChatSession'; // Importing interfaces for chat sessions and messages
import ChatService from '../services/chatService'; // Importing the chat service for API calls
import { isSessionBelongsToUser, newUserMessage, newAIMessage } from '../params/paramsLog'; // Import the session validation function and message templates
import { ChatContextType } from '../interfaces/ChatSession'; // Import ChatContext type

// Create the Chat context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component for the ChatContext
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // Helper function to cache chat sessions in sessionStorage
  const setCachedSessions = (sessionHistory: ChatSession[]) => {
    sessionStorage.setItem('chatSessions', JSON.stringify(sessionHistory));
  };

  // Helper function to retrieve cached chat sessions from sessionStorage
  const getCachedSessions = () => {
    const cachedSessions = JSON.parse(sessionStorage.getItem('chatSessions') || '[]') as ChatSession[];
    return cachedSessions.map(session => ({
      ...session,
      createdTime: new Date(session.createdTime), // Convert createdTime to Date object
    }));
  };

  const { user } = useUser(); // Access user context
  const [selectedSession, setSelectesSession] = useState<string>('none'); // State for selected chat session
  const [history, setHistory] = useState<ChatSession[]>(getCachedSessions()); // State for chat session history
  const [isActive, setIsActive] = useState<boolean>(true); // State to track if chat is active
  const [isNewlyCreated, setIsNewlyCreated] = useState<boolean>(true); // State to track if a new session is created
  const [messages, setMessages] = useState<Message[]>([]); // State to store messages
  const [error, setError] = useState<string>(''); // State to store error messages
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false); // State to track message sending status
  const [isFetchingNetworkData, setIsFetchingNetworkData] = useState<boolean>(true); // State to track fetching status

  // Function to validate user input for sending messages
  const isValidInput = (input: string) => {
    const isNotEmpty = input.trim() !== ''; // Check if input is not empty
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length; // Count the number of words
    return isNotEmpty && wordCount <= 200; // Return true if input is valid
  };

  /**
   * Handles sending a message to the chat service.
   * 
   * This function validates the input, updates the message state,
   * and retrieves the AI response from the chat service.
   * 
   * @param {string} input - The message input from the user.
   */
  const handleSendMessage = async (input: string) => {
    if (!isValidInput(input)) {
      setError('Message must not be empty and should not exceed 200 words.'); // Error message for invalid input
      return;    
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage]); // Add user message to state

    setIsSendingMessage(true); // Set sending state to true

    try {
      // Insert a service API call here to fetch AI response.
      const response = await ChatService.getChatBotResponse(input, user.fName, user.authId); // Call to chat service

      if (response) {
        setMessages((prevMessages) => [...prevMessages, newAIMessage]); // Add AI message to state
      } else {
        setError('Error occurred while getting the AI response'); // Error message for API failure
      }
    } catch (error) {
      setError('Failed to send message. Please try again.'); // Error message for catching failure
    } finally {
      setIsSendingMessage(false); // Reset sending state
      setIsNewlyCreated(false); // Mark session as not newly created
    }
  };

  /**
   * Handles the selection of a chat session.
   * 
   * This function retrieves the message history for the selected session.
   * 
   * @param {string} session - The session ID to select.
   */
  const handleSelectSession = async (session: string) => {
    const messages = await ChatService.getMessageHistory(user.userId.toString(), session); // Fetch messages from service

    setIsActive(false); // Mark chat as inactive
    setMessages(messages); // Set retrieved messages
    setSelectesSession(session); // Set selected session
  };

  /**
   * Handles the creation of a new chat session.
   * 
   * This function initializes the chat with a greeting message.
   */
  const handleCreateNewSession = () => {
    const greetingMessage: Message = {
      text: `Hi! How can I help you today?`, // Greeting message for new sessions
      timestamp: new Date(), // Current timestamp
      isUser: false, // Flag to indicate message is from AI
    };

    setIsActive(true); // Set chat as active
    setMessages([greetingMessage]); // Initialize messages with greeting
    setSelectesSession('none'); // Reset selected session
    setIsNewlyCreated(true); // Mark session as newly created
  };

  /**
   * Handles the deletion of chat session history.
   * 
   * @param {string} session - The session ID to delete.
   */
  const handleDeleteSessionHistory = async (session: string) => {
    return; // Placeholder for database implementation
    const updatedSessions = history.filter((session) => session.sessionId !== session); // Filter out the session to be deleted
    setHistory(updatedSessions); // Update history state
  };

  /**
   * Saves the current chat session.
   * 
   * This function saves the messages of the current session to the chat service.
   */
  const handleSaveChatSession = async () => {
    if (isNewlyCreated) {
      setError('You cannot save a newly created session.'); // Error message for saving newly created session
      return; // Exit if session is newly created
    }

    const result = await ChatService.saveChatSession(user.userId, messages); // Call to save session
    if (result) {
      const history = await ChatService.getSessionHistory(user.userId.toString()); // Fetch updated session history
      setHistory(history); // Update history state
      handleCreateNewSession(); // Reset to new session
    } else {
      setError('Failed to save chat session. Please try again.'); // Error message for failed saving
    }
  };

  /**
   * Initializes the chat provider by creating a new session and fetching existing session history.
   */
  const onInit = async () => {
    handleCreateNewSession(); // Create a new session on init
    setIsFetchingNetworkData(false); // Set fetching state to false
    
    const history = await ChatService.getSessionHistory(user.userId.toString()); // Fetch existing session history
    setHistory(history); // Set session history
  };

  /**
   * Cleans up the chat provider state when unmounted.
   */
  const onDismount = () => {
    sessionStorage.removeItem('activeSessionId'); // Clear active session ID from sessionStorage
    sessionStorage.removeItem('chatSessions'); // Clear cached chat sessions
    setHistory([]); // Reset history
    setMessages([]); // Reset messages
    setError(''); // Clear any existing error messages
  };

  // Caching on change
  useEffect(() => {
    setCachedSessions(history); // Update cached sessions in sessionStorage whenever history changes
  }, [history]);

  // Set up and tear down
  useEffect(() => {
    onInit(); // Initialize the chat provider
    return () => onDismount(); // Clean up on unmount
  }, []);

  /**
   * Handles the deletion of chat history for a given session ID.
   * 
   * This function prompts the user for confirmation before proceeding
   * with the deletion of the chat history.
   * 
   * @param {string} session - The ID of the session to delete.
   */
  const handleDeleteHistory = async (session: string) => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      // Requirement Condition: Check if the session ID is valid and belongs to the user
      if (session) {
        // Validate if the session ID belongs to the current user
        if (isSessionBelongsToUser(user.userId, session)) {
          try {
            await handleDeleteSessionHistory(session); // Attempt to delete the session history
            alert('Chat history deleted successfully!'); // Success message
          } catch (deleteError) {
            console.error('Error deleting chat history:', deleteError); // Log error for debugging
            alert('Failed to delete chat history. Please try again.'); // Error message for deletion failure
          }
        } else {
          alert('Access denied: You do not have permission to delete this chat history.'); // Error message for unauthorized access
        }
      } else {
        alert('Invalid session ID.'); // Error message for invalid ID
      }
    }
  };

  const exportedValues = {
    messages,
    history,
    error,
    isNewlyCreated,
    isActive,
    isSendingMessage,
    isFetchingNetworkData,
    selectedSession,
    handleCreateNewSession,
    handleSelectSession,
    handleSendMessage,
    handleDeleteSessionHistory,
    handleSaveChatSession,
    handleDeleteHistory,
  };

  return <ChatContext.Provider value={exportedValues}>{children}</ChatContext.Provider>; // Provide context to child components
};

// Custom hook to use the ChatContext
export const useChat = () => {
  const context = useContext(ChatContext); // Access the ChatContext
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider"); // Ensure the hook is used within the provider
  }
  return context; // Return the context value
};
