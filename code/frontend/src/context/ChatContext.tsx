import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';
/**
 * Message Interface
 *
 * This interface defines the structure of a chat message exchanged in a chat session. 
 * Each message contains the text content, a timestamp of when it was sent, 
 * and a flag indicating whether it was sent by the user or the AI.
 */
interface Message {
  /**
   * The text content of the message.
   * This field contains the actual message text that is being sent or received.
   */
  text: string;

  /**
   * The timestamp when the message was created.
   * This field helps track the timing of the message and can be used 
   * for displaying message order in the chat interface.
   */
  timestamp: Date;

  /**
   * A boolean flag indicating if the message was sent by the user.
   * If true, the message was sent by the user; if false, it was sent by the AI.
   */
  isUser: boolean;
}

/**
 * ChatSession Interface
 *
 * This interface represents a chat session, encapsulating the details 
 * of a specific conversation. Each session has a unique identifier, 
 * a preview for display purposes, and a timestamp for when it was created.
 */
interface ChatSession {
  /**
   * The unique identifier for the chat session.
   * This ID is used to differentiate between multiple chat sessions 
   * and allows for session management within the application.
   */
  sessionId: string;

  /**
   * A preview of the chat session.
   * This field contains a brief description or snippet of the conversation 
   * that can be displayed in the side panel for easy identification of sessions.
   */
  sessionPreview: string;

  /**
   * The timestamp indicating when the chat session was created.
   * This field helps track the creation time of the session and can be used 
   * for sorting or displaying session history.
   */
  createdTime: Date;
}

/**
 * ChatContextType Interface
 *
 * This interface defines the shape of the context used for managing chat sessions 
 * and messages in a chat application. It provides the necessary state and methods 
 * to handle chat interactions, including creating new sessions, sending messages, 
 * and managing session history. 
 */
interface ChatContextType {
  /**
   * The ID of the currently active chat session.
   * This ID is used to identify which chat session is currently being interacted with.
   */
  activeSessionId: string;

  /**
   * An array of messages exchanged in the current chat session.
   * Each message includes the text, timestamp, and whether it was sent by the user or the AI.
   */
  messages: Message[];

  /**
   * A string representing any error messages related to chat operations.
   * This can be used to display errors to the user if something goes wrong.
   */
  error: string;

  /**
   * A boolean indicating whether a chat operation is currently loading.
   * This can be used to show loading indicators in the UI while awaiting responses.
   */
  isLoading: boolean;

  /**
   * Creates a new chat session.
   * This method initializes a new session, sets a greeting message, 
   * and updates the session state accordingly.
   */
  createNewSession: () => void;

  /**
   * Selects an active chat session by its ID.
   * This method updates the activeSessionId and sets the associated messages 
   * for the selected session.
   *
   * @param sessionId - The ID of the session to be activated.
   */
  selectActiveSession: (sessionId: string) => void;

  /**
   * Sends a message to the chat.
   * This method validates the input, updates the messages state with the user's 
   * message, and retrieves a response from the AI. 
   *
   * @param input - The text input from the user that will be sent as a message.
   */
  handleSendMessage: (input: string) => void;

  /**
   * Initializes the chat session when the component mounts.
   * This method checks for existing sessions in local storage and either loads 
   * an existing session or creates a new one based on the stored session ID.
   */
  initChatSession: () => void;

  /**
   * Loads the session history for a specific user.
   * This method retrieves past chat sessions from the server or local storage 
   * and updates the sessions state.
   *
   * @param userId - The ID of the user whose session history should be loaded.
   * This method is typically called in the authentication context after logging in.
   */
  loadSessionHistory: (userId: string) => void;

  /**
   * Clears all cached data related to chat sessions.
   * This method is used to remove stored session IDs and chat history from local 
   * storage, effectively resetting the chat context. It is usually called 
   * when the user logs out of the application.
   */
  clearCachedData: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCachedActiveId = () => localStorage.getItem('activeSessionId') as string;
  const setCachedActiveId = (sessionId: string) => localStorage.setItem('activeSessionId', sessionId);
  const getCachedSessions = () => JSON.parse(localStorage.getItem('chatSessions') || '[]') as ChatSession[];
  const setCachedSessions = (sessionHistory: ChatSession[]) => localStorage.setItem('chatSessions', JSON.stringify(sessionHistory));
  const generateSessionId = () => Math.random().toString(36).substring(2, 9);

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
    setActiveSessionId(sessionId);
    setCachedActiveId(sessionId);
  };

  const createNewSession = () => {
    const newSessionId = generateSessionId();
    console.log(`initting a new chat session: ${newSessionId}`);

    const newSession: ChatSession = {
      sessionId: activeSessionId,
      sessionPreview: 'New Conversation',
      createdTime: new Date(Date.now()),
    }

    const greetingMessage: Message = {
      text: `Hi ${user?.firstName}! How can I help you today?`,
      timestamp: new Date(),
      isUser: false,
    };

    const updatedSessions = [...sessions, newSession];
    setCachedSessions(updatedSessions);
    setActiveSessionId(newSessionId)
    setMessages([greetingMessage]);
    setSessions(updatedSessions);
    setIsLoading(false);
  };

  const loadExistingSession = async (sessionId: string) => {
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
      const lastSessionId = sessionHistory[sessionHistory.length - 1].sessionId
      setActiveSessionId(lastSessionId);
    }

    setSessions(sessionHistory);
    setCachedSessions(sessionHistory)

  };

  const initChatSession = async () => {
    const cachedActiveId = getCachedActiveId();
    const storedSessions = getCachedSessions();
    const isEmpty = !cachedActiveId;
    const isExisted = storedSessions.some((session: ChatSession) => session.sessionId === cachedActiveId);
    const isNewSession = !isExisted || isEmpty;

    if (isNewSession) {
      createNewSession();
    } else {
      await loadExistingSession(cachedActiveId);
    }
  };

  const clearCachedData = () => {
    localStorage.removeItem('activeSessionId');
    localStorage.removeItem('chatSessions');
    setSessions([]);
    setActiveSessionId('');
    setMessages([]);
    setError('');
  };

  const exportedValues = {
    activeSessionId,
    messages,
    error,
    isLoading,
    createNewSession,
    selectActiveSession,
    handleSendMessage,
    initChatSession,
    loadSessionHistory,
    clearCachedData,
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
