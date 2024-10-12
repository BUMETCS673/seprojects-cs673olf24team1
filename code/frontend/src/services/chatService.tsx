// chatService.tsx
// Service for handling chat-related API operations
// Created by Poom
// Updated for Redux integration by Tash

// services/chatService.tsx
import axios from 'axios'; // Import axios for HTTP requests
import { SuccessResponse } from '../interfaces/AuthSession'; // Import SuccessResponse interface
import { Input, ChatSession, Message, GetSessionHistoryParams, GetMessageHistoryParams, GetChatBotResponseParams, SaveChatSessionParams, DeleteSessionHistoryParams, NewChatSessionParams, AuthError } from '../interfaces/ChatSession'; 

const API_BASE_URL = 'http://localhost:8080/api/v1/chat'; // Base URL for chat-related API endpoints

const ChatService = {
    // Fetch session history
    async getSessionHistory(params: GetSessionHistoryParams): Promise<ChatSession[] | AuthError> {
        try {
            const response = await axios.get<ChatSession[]>(`${API_BASE_URL}/sessions`, { params }); // Call the API endpoint
            return response.data; // Return the session history
        } catch (error) {
            console.error(error);
            return { code: 'FETCH_ERROR', message: 'Failed to fetch session history.' } as AuthError; // Return AuthError on failure
        }
    },

    // Fetch message history for a specific session
    async getMessageHistory(params: GetMessageHistoryParams): Promise<Message[] | AuthError> {
        try {
            const response = await axios.get<Message[]>(`${API_BASE_URL}/messages`, { params }); // Call the API endpoint
            return response.data; // Return the messages
        } catch (error) {
            console.error(error);
            return { code: 'FETCH_ERROR', message: 'Failed to fetch message history.' } as AuthError; // Return AuthError on failure
        }
    },

    // Get chatbot response
    async getChatBotResponse(params: GetChatBotResponseParams): Promise<Message | null | AuthError> {
        try {
            const response = await axios.post<Message>(`${API_BASE_URL}/chatbot`, params); // Call the API endpoint
            return response.data; // Return the chatbot response
        } catch (error) {
            console.error(error);
            return { code: 'CHATBOT_ERROR', message: 'Failed to get chatbot response.' } as AuthError; // Return AuthError on failure
        }
    },

    // Save chat session
    async saveChatSession(params: SaveChatSessionParams): Promise<SuccessResponse | AuthError> {
        try {
            const response = await axios.post<SuccessResponse>(`${API_BASE_URL}/save`, params); // Call the API endpoint
            return response.data; // Return success status
        } catch (error) {
            console.error(error);
            return { code: 'SAVE_SESSION_ERROR', message: 'Failed to save chat session.' } as AuthError; // Return AuthError on failure
        }
    },

    // Delete chat session
    async deleteSessionHistory(params: DeleteSessionHistoryParams): Promise<SuccessResponse | AuthError> {
        try {
            const response = await axios.delete<SuccessResponse>(`${API_BASE_URL}/sessions/${params.sessionId}`); // Call the API endpoint
            return response.data; // Return success status
        } catch (error) {
            console.error(error);
            return { code: 'DELETE_ERROR', message: 'Failed to delete session history.' } as AuthError; // Return AuthError on failure
        }
    },

    // Create a new chat session
    async createNewSession(params: NewChatSessionParams): Promise<ChatSession | AuthError> {
        try {
            const response = await axios.post<ChatSession>(`${API_BASE_URL}/sessions`, { userId: params.userId }); // Call the API endpoint
            return response.data; // Return new chat session data
        } catch (error) {
            console.error(error);
            return { code: 'SESSION_CREATION_ERROR', message: 'Failed to create new chat session.' } as AuthError; // Return AuthError on failure
        }
    }
};

// Function to create a new user message
export const createUserMessage = async (input: Input): Promise<Message> => {
    return {
        text: input.text,
        timestamp: new Date(),
        isUser: true,
    };
};

// Function to create a new AI message
export const createAIMessage = async (response: Input): Promise<Message> => {
    return {
        text: response.text,
        timestamp: new Date(),
        isUser: false,
    };
};

export default ChatService; // Export the ChatService for use in the application
