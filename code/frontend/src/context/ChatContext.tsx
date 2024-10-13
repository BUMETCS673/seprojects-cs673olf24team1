// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.
// Annotated by Natasya Liew

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'; // Import necessary React hooks
import { useUser } from './UserContext'; // Importing the UserContext to manage user details
import { ChatSession, Message } from '../interfaces/ChatSession'; // Importing interfaces for chat sessions and messages
import ChatService from '../services/chatService'; // Importing the chat service for API calls
import { isSessionBelongsToUser, newUserMessage, newAIMessage } from '../params/paramsLog'; // Import the session validation function and message templates
import { ChatContextType } from '../interfaces/ChatSession'; // Import ChatContext type

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

  const setCachedSessions = (sessionHistory: ChatSession[]) => sessionStorage.setItem('chatSessions', JSON.stringify(sessionHistory));
  const getCachedSessions = () => {
    const cachedSessions = JSON.parse(sessionStorage.getItem('chatSessions') || '[]') as ChatSession[];
    return cachedSessions.map(session => ({
      ...session,
      createdTime: new Date(session.createdAt),
    }));
  };

  const { user } = useUser();
  const [selectedSession, setSelectesSession] = useState<number>(-1);
  const [history, setHistory] = useState<ChatSession[]>(getCachedSessions());
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isNewlyCreated, setIsNewlyCreated] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string>('');
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [isFetchingNetworkData, setIsFetchingNetworkData] = useState<boolean>(true);

  const isValidInput = (input: string) => {
    const isNotEmpty = input.trim() !== ''
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
    return isNotEmpty && wordCount <= 200;
  };

  const handleSendMessage = async (input: string) => {
    if (!isValidInput(input)) return;

    const newUserMessage: Message = {
      text: input,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setIsSendingMessage(true);

    // Insert a service API call here to fetch AI response.
    const response = await ChatService.getChatBotResponse(input, user.fName, user.authId);

    if (response) {
      const newAIMessage: Message = {
        text: response['data'].text,
        timestamp: new Date(),
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, newAIMessage]);

    } else {
      setError('Error occurred while getting the AI response');
    }
    setIsSendingMessage(false);
    setIsNewlyCreated(false);
  };

  const handleSelectSession = async (sessionId: number) => {

    const messages = await ChatService.getMessageHistory(user.userId, sessionId);

    setIsActive(false);
    setMessages(messages['data']);
    setSelectesSession(sessionId);
  };

  const handleCreateNewSession = () => {
    const greetingMessage: Message = {
      text: `Hi! How can I help you today?`,
      timestamp: new Date(),
      isUser: false,
    };

    setIsActive(true);
    setMessages([greetingMessage]);
    setSelectesSession(-1);
    setIsNewlyCreated(true);
  };

  const handleDeleteSessionHistory = async (sessionId: number) => {
    return; // need db implementation
  };

  const handleSaveChatSession = async () => {
    if (isNewlyCreated) return;
    const result = await ChatService.saveChatSession(user.userId, messages);
    if (result) {
      const history = await ChatService.getSessionHistory(user.userId);
      setHistory(history['data']);
      handleCreateNewSession();
    }
  }

  const onInit = async () => {
    handleCreateNewSession();
    setIsFetchingNetworkData(false);
    
    const history = await ChatService.getSessionHistory(user.userId);
    setHistory(history['data']);
  };

  const onDismount = () => {
    sessionStorage.removeItem('activeSessionId');
    sessionStorage.removeItem('chatSessions');
    setHistory([]);
    setMessages([]);
    setError('');
  };

  // Caching on change
  useEffect(() => {
    setCachedSessions(history);
  }, [history]);

  // Set up and tear down
  useEffect(() => {
    onInit();
    return () => onDismount();
  }, []);

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
  };

  return <ChatContext.Provider value={exportedValues}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};