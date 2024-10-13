// Created by Poom
// Annotated by Natasya Liew

// Interface representing the structure of a chat session in the application
export interface ChatSession {
    sessionId: number;      // Unique identifier for the chat session
    createdAt: Date;        // The date and time when the chat session was created
}

// Interface representing the structure of a chat message in the application
export interface Message {
    text: string;           // The content of the message
    timestamp: Date;       // The date and time when the message was sent
    isUser: boolean;       // Flag indicating if the message was sent by the user (true) or the bot/system (false)
}

// Interface to combine ChatSession and Message
export interface ChatHistory {
    session: ChatSession;   // The chat session information
    messages: Message[];    // Array of messages in the chat session
}

// Interface for chat history retrieval by user and session
export interface ChatHistoryRetrieval {
    userId: number;        // ID of the user retrieving the chat history
    sessionId: number;     // Unique identifier for the chat session being retrieved
}

// Interface representing the structure of the chat bot response
export interface ChatBotResponse {
    input: string;         // User input sent to the bot
    studentName: string;   // Name of the student interacting with the bot
    userId: number;        // ID of the user interacting with the bot
}

// Interface representing the structure of a saved chat
export interface SaveChat {
    userId: number;        // ID of the user saving the chat
    messages: Message[];   // Array of messages to be saved
}

// Define the structure of the props for the InputField component
export interface InputFieldProps {
    input: string;                           // The current value of the input field
    onSend: () => void;                      // Function to handle sending the message
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle changes in the input field
}

// Context type for the chat context
export interface ChatContextType {
    messages: Message[];                     // Array of messages in the current chat
    error: string;                           // Error message if any issues arise
    history: ChatSession[];                  // Array of chat sessions
    isActive: boolean;                        // Flag indicating if the chat session is active
    isSendingMessage: boolean;                // Flag indicating if a message is currently being sent
    isFetchingNetworkData: boolean;          // Flag indicating if network data is being fetched
    selectedSession: string;                  // ID of the currently selected chat session
    isNewlyCreated: boolean;                  // Flag indicating if the chat session was newly created
    handleCreateNewSession: () => void;      // Function to create a new chat session
    handleSelectSession: (sessionId: string) => void; // Function to select an existing chat session
    handleSendMessage: (input: string) => void; // Function to send a message in the chat
    handleDeleteSessionHistory: (sessionId: string) => Promise<void>; // Function to delete chat session history
    handleSaveChatSession: () => Promise<void>; // Function to save the current chat session
}
