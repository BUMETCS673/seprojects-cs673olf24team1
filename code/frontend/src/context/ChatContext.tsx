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
  sessions: ChatSession[];
  isSendingMessage: boolean;
  isFetchingNetworkData: boolean;
  handleCreateNewSession: () => void;
  handleSelectSession: (sessionId: string) => void;
  handleSendMessage: (input: string) => void;
  handleDeleteSessionHistory: (sessionId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {

  const setCachedActiveId = (sessionId: string) => localStorage.setItem('activeSessionId', sessionId);
  const getCachedActiveId = (): string => {
    const cachedActiveSessionId = localStorage.getItem('activeSessionId');
    return cachedActiveSessionId ? cachedActiveSessionId : '';
  }

  const setCachedSessions = (sessionHistory: ChatSession[]) => localStorage.setItem('chatSessions', JSON.stringify(sessionHistory));
  const getCachedSessions = () => {
    const cachedSessions = JSON.parse(localStorage.getItem('chatSessions') || '[]') as ChatSession[];
    return cachedSessions.map(session => ({
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
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [isNewSessionCreated, setIsNewSessionCreated] = useState<boolean>(true);
  const [isFetchingNetworkData, setIsFetchingNetworkData] = useState<boolean>(true);

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

    setIsSendingMessage(true);

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
    setIsSendingMessage(false);
  };

  const handleSelectSession = (sessionId: string) => {
    if (sessionId !== activeSessionId) {
      console.log(`selecting ${sessionId}`)
      setIsNewSessionCreated(false);
      setActiveSessionId(sessionId);
    }
  };

  const handleCreateNewSession = () => {
    const newSessionId = generateSessionId();
  
    const newSession: ChatSession = {
      id: newSessionId,
      sessionPreview: 'New Conversation',
      createdTime: new Date(),
    };
  
    const greetingMessage: Message = {
      text: `Hi ${user?.firstName}! How can I help you today?`,
      timestamp: new Date(),
      isUser: false,
    };
  
    setIsNewSessionCreated(true);
    setActiveSessionId(newSession.id);
    setMessages([greetingMessage]);
    setSessions((prevSessions) => [...prevSessions, newSession]); 
  };
  

  const loadExistingChatData = async (sessionId: string) => {
    if (sessionId === '') return;

    // Load chat messages from the API
    // Example const existingMessages = await ChatContext.getChatHistory();

    const existingMessages: Message[] = [
      {
        text: "This is the existing chat message from the server",
        timestamp: new Date(Date.UTC(2024, 10, 2, 0)),
        isUser: false,
      },
    ];

    if (existingMessages) {
      setMessages(existingMessages);
    } else {
      setError('Failed to load chat messages');
    }
  }

  const handleDeleteSessionHistory = async (sessionId: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== sessionId);
    setSessions(updatedSessions);

    // If the deleted session was the active session, reset to the latest session
    if (activeSessionId === sessionId) {
      if (updatedSessions.length > 0) {
        const latestSession = updatedSessions.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime())[0];
        setActiveSessionId(latestSession.id);
      } else {
        setActiveSessionId('');
      }
    }
  };



  const fetchSessionHistory = async () => {
    // Get session history from API
    // Example const sessionHistory = await UserService.getSessionHistory();

    // Fake session history
    const sessionHistory: ChatSession[] = [];

    if (sessionHistory.length > 0) {
      const lastSessionId = sessionHistory[sessionHistory.length - 1].id
      setActiveSessionId(lastSessionId);
    }
    setSessions(sessionHistory);
  };

  const onInit = async () => {

    // await fetchSessionHistory();

    const isNull = !activeSessionId
    const isExisted = sessions.some((session: ChatSession) => session.id === activeSessionId);

    if (isNull || !isExisted) {
      handleCreateNewSession();
    } else {
      await loadExistingChatData(activeSessionId);
    }
    setIsFetchingNetworkData(false); 
  };

  const onDismount = () => {
    localStorage.removeItem('activeSessionId');
    localStorage.removeItem('chatSessions');
    setSessions([]);
    setActiveSessionId('');
    setMessages([]);
    setError('');
  };

  // Caching on change
  useEffect(() => {
    setCachedSessions(sessions);
    setCachedActiveId(activeSessionId);
  }, [sessions, activeSessionId]);

  // Load new messages on change
  useEffect(() => {
    !isNewSessionCreated ? loadExistingChatData(activeSessionId) : setIsNewSessionCreated(false);
  }, [activeSessionId]);

  // Set up and tear down
  useEffect(() => {
    onInit();
    return () => onDismount();
  }, []);

  const exportedValues = {
    activeSessionId,
    messages,
    sessions,
    error,
    isSendingMessage,
    isFetchingNetworkData,
    handleCreateNewSession,
    handleSelectSession,
    handleSendMessage,
    handleDeleteSessionHistory,
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
