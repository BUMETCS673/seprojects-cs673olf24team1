import React, { createContext, useState, useEffect, useContext, act } from 'react';
import { useUser } from './UserContext';

interface Message {
  text: string;
  timestamp: Date;
  isUser: boolean;
}

interface ChatSession {
  id: string;
  sessionPreview: string;
  createdTime: Date;
}

interface ChatContextType {
  activeSessionId: string;
  messages: Message[];
  error: string;
  isLoading: boolean;
  sessions: ChatSession[];
  isNewSessionCreated: boolean;
  setIsNewSessionCreated: React.Dispatch<React.SetStateAction<boolean>>;
  createNewSession: () => void;
  selectActiveSession: (sessionId: string) => void;
  handleSendMessage: (input: string) => void;
  initChatSession: () => void;
  loadSessionHistory: (userId: string) => void;
  loadExistingSession: (sessionId: string) => Promise<void>;
  clearCachedChatData: () => void;
  deleteChatHistory: (sessionId: string) => Promise<void>;
  loadCachedData: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

  const setCachedActiveId = (sessionId: string) => localStorage.setItem('activeSessionId', sessionId);
  const getCachedActiveId = (): string => {
    const storedId = localStorage.getItem('activeSessionId');
    return storedId ? storedId : '';
  }

  const setCachedSessions = (sessionHistory: ChatSession[]) => localStorage.setItem('chatSessions', JSON.stringify(sessionHistory));
  const getCachedSessions = () => {
    const sessions = JSON.parse(localStorage.getItem('chatSessions') || '[]') as ChatSession[];
    return sessions.map(session => ({
      ...session,
      createdTime: new Date(session.createdTime),
    }));
  };

  const generateSessionId = () => Math.random().toString(36).substring(2, 16);


  const { user } = useUser();
  const [sessions, setSessions] = useState<ChatSession[]>(getCachedSessions());
  const [activeSessionId, setActiveSessionId] = useState<string>(getCachedActiveId());
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewSessionCreated, setIsNewSessionCreated] = useState<boolean>(true);

  const isValidInput = (input: string) => {
    const isNotEmpty = input.trim() !== ''
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
    return isNotEmpty && wordCount <= 200;
  };

  const handleSendMessage = (input: string) => {
    if (!isValidInput(input)) return;

    const newUserMessage: Message = {
      text: input,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newUserMessage,
    ]);

    setIsLoading(true);

    // Insert a service API call here to fetch AI response.
    // Example: ChatService.getChatBotResponse(input, ...);

    const fakeResponse = "Hi there. This is a fake AI response message";

    if (fakeResponse) {
      const newAIMessage: Message = {
        text: fakeResponse,
        timestamp: new Date(),
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, newAIMessage]);

    } else {
      setError('Error occurred while getting the AI response');
    }
    setIsLoading(false);
  };

  const selectActiveSession = (sessionId: string) => {
    if (sessionId !== activeSessionId) {
      console.log(`selecting ${sessionId}`)
      setIsNewSessionCreated(false);
      setActiveSessionId(sessionId);
      setCachedActiveId(sessionId);
    }
  };

  const createNewSession = () => {
    const newSessionId = generateSessionId();
    console.log(`initting a new chat session: ${newSessionId}`);

    const newSession: ChatSession = {
      id: newSessionId,
      sessionPreview: 'New Conversation',
      createdTime: new Date(Date.now()),
    }

    const greetingMessage: Message = {
      text: `Hi ${user?.firstName}! How can I help you today?`,
      timestamp: new Date(),
      isUser: false,
    };

    const updatedSessions = [...sessions, newSession];
    setIsNewSessionCreated(true);
    selectActiveSession(newSessionId);
    setMessages([greetingMessage]);
    setSessions(updatedSessions);
    setIsLoading(false);
  };

  const loadExistingSession = async (sessionId: string) => {
    if (sessionId === '') return;
    console.log(`initting an existing chat session: ${sessionId}`);

    // Load chat messages from the API
    // Example const existingMessages = await ChatContext.getChatHistory();

    const existingMessages: Message[] = [
      {
        text: "Hi John! How can I help you today?",
        timestamp: new Date(Date.UTC(2024, 10, 2, 0)),
        isUser: false,
      },
      {
        text: "I want to ask about CS675. What is it?",
        timestamp: new Date(Date.UTC(2024, 10, 2, 1)),
        isUser: true,
      },
      {
        text: "Sure! It is about blablabla",
        timestamp: new Date(Date.UTC(2024, 10, 2, 2)),
        isUser: false,
      },
      {
        text: "Is it hard?",
        timestamp: new Date(Date.UTC(2024, 10, 2, 3)),
        isUser: true,
      },
      {
        text: "Not really",
        timestamp: new Date(Date.UTC(2024, 10, 2, 4)),
        isUser: false,
      },
    ];

    if (existingMessages) {
      setMessages(existingMessages);
      setIsLoading(false);
    } else {
      setError('Failed to load chat messages');
      setIsLoading(false);
    }
  }

  const loadSessionHistory = async (userId: string) => {

    // Get session history from API
    // Example const sessionHistory = await UserService.getSessionHistory();

    // Fake session history
    const sessionHistory: ChatSession[] = [];

    const isNotEmpty = sessionHistory.length > 0;
    if (isNotEmpty) {
      const lastSessionId = sessionHistory[sessionHistory.length - 1].id
      setActiveSessionId(lastSessionId);
    }

    setSessions(sessionHistory);
    setCachedSessions(sessionHistory)

  };

  const initChatSession = async () => {
    console.log(`init chat session triggered`)
    const cachedActiveId = getCachedActiveId();
    const storedSessions = getCachedSessions();
    const isNull = !cachedActiveId
    const isExisted = storedSessions.some((session: ChatSession) => session.id === cachedActiveId);

    if (isNull && !isExisted) {
      createNewSession();
    } else {
      await loadExistingSession(cachedActiveId);
    }
  };

  const deleteChatHistory = async (sessionId: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== sessionId);
    setSessions(updatedSessions);
    setCachedSessions(updatedSessions);

    // If the deleted session was the active session, reset the active session
    if (activeSessionId === sessionId) {
      setActiveSessionId('');
      setCachedActiveId('');
      setMessages([]);
    }
  };

  const clearCachedChatData = () => {
    localStorage.removeItem('activeSessionId');
    localStorage.removeItem('chatSessions');
    setSessions([]);
    setActiveSessionId('');
    setMessages([]);
    setError('');
  };

  const loadCachedData = () => {
    const cachedSessions = getCachedSessions();
    const cachedActiveId = getCachedActiveId();
    setSessions(cachedSessions);
    setActiveSessionId(cachedActiveId);
  }

  useEffect(() => {
    setCachedSessions(sessions);
    setCachedActiveId(activeSessionId);
  }, [sessions, activeSessionId]);

  const exportedValues = {
    activeSessionId,
    messages,
    sessions,
    error,
    isLoading,
    isNewSessionCreated,
    setIsNewSessionCreated,
    createNewSession,
    selectActiveSession,
    handleSendMessage,
    initChatSession,
    loadSessionHistory,
    loadExistingSession,
    clearCachedChatData,
    deleteChatHistory,
    loadCachedData,
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
