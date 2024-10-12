/*import React, { createContext, useState, useEffect, useContext, act } from 'react';
import { useUser } from './deprecated_UserContext';
import { ChatSession, Message } from '../interfaces/ChatSession';
import ChatService from '../services/chatService';


interface ChatContextType {
  messages: Message[];
  error: string;
  history: ChatSession[];
  isActive: boolean;
  isSendingMessage: boolean;
  isFetchingNetworkData: boolean;
  selectedSession: string;
  isNewlyCreated: boolean;
  handleCreateNewSession: () => void;
  handleSelectSession: (sessionId: string) => void;
  handleSendMessage: (input: string) => void;
  handleDeleteSessionHistory: (sessionId: string) => Promise<void>;
  handleSaveChatSession: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

  const setCachedSessions = (sessionHistory: ChatSession[]) => sessionStorage.setItem('chatSessions', JSON.stringify(sessionHistory));
  const getCachedSessions = () => {
    const cachedSessions = JSON.parse(sessionStorage.getItem('chatSessions') || '[]') as ChatSession[];
    return cachedSessions.map(session => ({
      ...session,
      createdTime: new Date(session.createdTime),
    }));
  };

  const { user } = useUser();
  const [selectedSession, setSelectesSession] = useState<string>('none');
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
        text: response.text,
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

  const handleSelectSession = async (sessionId: string) => {

    const messages = await ChatService.getMessageHistory(user.userId.toString(), sessionId);

    setIsActive(false);
    setMessages(messages);
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
    setSelectesSession('none');
    setIsNewlyCreated(true);
  };

  const handleDeleteSessionHistory = async (sessionId: string) => {
    return; // need db implementation
    const updatedSessions = history.filter((session) => session.id !== sessionId);
    setHistory(updatedSessions);
  };

  const handleSaveChatSession = async () => {
    if (isNewlyCreated) return;
    const result = await ChatService.saveChatSession(user.userId, messages);
    if (result) {
      const history = await ChatService.getSessionHistory(user.userId.toString());
      setHistory(history);
      handleCreateNewSession();
    }
  }

  const onInit = async () => {
    handleCreateNewSession();
    setIsFetchingNetworkData(false);
    
    const history = await ChatService.getSessionHistory(user.userId.toString());
    setHistory(history);
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
*/