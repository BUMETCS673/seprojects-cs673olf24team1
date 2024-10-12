// Created by Poom
// Annotated and Updated by Natasya Liew

// chatSession.tsx
// Type definitions for chat-related operations

import { SuccessResponse } from './AuthSession'; // Import the User interface
import { ChatActionTypes } from '../actions/chatActions'; // Ensure correct path to the definition


// ChatSession interface representing the structure of a chat session in the application
export interface ChatSession {
    sessionId: number;                 // Unique identifier for the chat session
    createdTime: Date;          // The date and time when the chat session was created
    Message: [];                //Message
}

// Message interface representing the structure of a chat message in the application
export interface Message {
    text: string;                // The content of the message
    timestamp: Date;             // The date and time when the message was sent
    isUser: boolean;             // Flag indicating if the message was sent by the user (true) or the bot/system (false)
}

export interface Input {
    text: string;
    isUser: boolean;
}

// Interface for authentication-related errors
export interface AuthError {
    code: string;                // Error code for identifying the type of error
    message: string;             // Human-readable error message
}

// Parameters for service functions
export interface GetSessionHistoryParams {
    userId: number;              // User ID for fetching chat sessions
}

export interface GetMessageHistoryParams {
    userId: number;              // User ID for fetching messages
    sessionId: number;           // Session ID for fetching specific messages
}

// Define the initial state for the chat reducer
export interface ChatState {
    messages: Message[];             // List of chat messages
    sessionId: number;              // Session for fetching the session identifier
    sessionHistory: ChatSession[];    // History of chat sessions
    error: AuthError | null;          // Error message, if any
    isLoading: boolean;                // Loading state for fetching data
}

// Define action type interface
export interface ChatAction {
    type: ChatActionTypes;            // Action type
    payload?: any;                     // Optional payload of the action
}

export interface GetChatBotResponseParams {
    input: string;               // User input message
    studentName: string;         // Student's name for personalization
    userId: number;              // User ID for context
}

export interface SaveChatSessionParams {
    userId: number;              // User ID for saving the session
    messages: Message[];         // Messages to be saved
}

export interface DeleteSessionHistoryParams {
    sessionId: number;                  // ID of the session to delete
}

export interface NewChatSessionParams {
    userId: number;
}

// chatService.tsx interface
export interface ChatServiceInterface {
    getSessionHistory(params: GetSessionHistoryParams): Promise<ChatSession[] | AuthError>; 
    getMessageHistory(params: GetMessageHistoryParams): Promise<Message[] | AuthError>; 
    getChatBotResponse(params: GetChatBotResponseParams): Promise<Message | null | AuthError>; 
    saveChatSession(params: SaveChatSessionParams): Promise<SuccessResponse | AuthError>; 
    deleteSessionHistory(params: DeleteSessionHistoryParams): Promise<SuccessResponse | AuthError>; 
    getNewSession(params: NewChatSessionParams): Promise<ChatSession | AuthError>
}
