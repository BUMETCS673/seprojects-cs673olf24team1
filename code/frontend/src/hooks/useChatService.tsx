// useChatService.tsx
// Custom hook for managing chat-related operations
// Created by Tash

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store'; 
import ChatService from '../services/chatService'; 
import { ChatSession, Input, Message, AuthError } from '../interfaces/ChatSession'; 
import { SuccessResponse } from '../interfaces/AuthSession'; // Import SuccessResponse interface

export const useChatService = () => {
    const dispatch = useDispatch(); 
    const jwtToken = useSelector((state: RootState) => state.auth.jwtToken); 
    const userId = useSelector((state: RootState) => state.auth.user?.userId); // Access userId correctly
    const messages = useSelector((state: RootState) => state.chat.messages); // Access messages
    const sessionId = useSelector((state: RootState) => state.chat.sessionId); // Access session ID
    const studentName = useSelector((state: RootState) => state.auth.user?.fName);

    // Store input in session storage
    const storeInput = (input: Input): void => {
        sessionStorage.setItem('chatInput', input.text);
    };

    // Retrieve input from session storage
    const getStoredInput = (): string => {
        return sessionStorage.getItem('chatInput') || ''; // Return empty string if not found
    };

    // Clear input from session storage when needed
    const clearStoredInput = (): void => {
        sessionStorage.removeItem('chatInput');
    };

    // Function to create a new user message
    const createUserMessage = async (input: Input): Promise<Message> => {
        return {
            text: input.text,
            timestamp: new Date(),
            isUser: true,
        };
    };

    // Function to create a new AI message
    const createAIMessage = async (input: Input): Promise<Message> => {
        return {
            text: input.text,
            timestamp: new Date(),
            isUser: false,
        };
    };

    const getSessionHistory = async (): Promise<ChatSession[] | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError;
        }

        if (userId === undefined) {
            return { code: 'USER_ERROR', message: 'User ID is not defined.' } as AuthError; // Handle undefined userId
        }

        try {
            const sessionHistory = await ChatService.getSessionHistory({ userId }); 
            return sessionHistory; // Returns chat sessions
        } catch (error) {
            console.error(error);
            return { code: 'FETCH_ERROR', message: 'Failed to fetch session history.' } as AuthError; 
        }
    };

    const getMessageHistory = async ({ sessionId }): Promise<Message[] | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        if (userId === undefined) {
            return { code: 'USER_ERROR', message: 'User ID is not defined.' } as AuthError; // Handle undefined userId
        }

        if (sessionId === undefined) {
            return { code: 'SESSION_ERROR', message: 'Session ID is not defined.' } as AuthError; // Handle undefined sessionId
        }

        try {
            const messageHistory = await ChatService.getMessageHistory({ userId, sessionId }); 
            return messageHistory; // Returns message history for a specific session
        } catch (error) {
            console.error(error);
            return { code: 'FETCH_ERROR', message: 'Failed to fetch message history.' } as AuthError; 
        }
    };

    const getChatBotResponse = async (input: Input): Promise<Message | null | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        if (userId === undefined) {
            return { code: 'USER_ERROR', message: 'User ID is not defined.' } as AuthError; // Handle undefined userId
        }

        if (studentName === undefined) {
            return null; 
        }

        // Store the input in session storage
        storeInput(input);

        try {
            const response = await ChatService.getChatBotResponse({ input: input.text ?? '', studentName, userId }); 
            clearStoredInput(); // Clear the input after use
            return response; // Returns the chatbot response
        } catch (error) {
            console.error(error);
            return { code: 'CHATBOT_ERROR', message: 'Failed to get chatbot response.' } as AuthError; 
        }
    };

    const saveChatSession = async (): Promise<SuccessResponse | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        if (userId === undefined) {
            return { code: 'USER_ERROR', message: 'User ID is not defined.' } as AuthError; // Handle undefined userId
        }

        try {
            await ChatService.saveChatSession({ userId, messages }); 
            return { success: true, message: 'Chat session saved successfully.' }; // Return success response
        } catch (error) {
            console.error(error);
            return { code: 'SAVE_SESSION_ERROR', message: 'Failed to save chat session.' } as AuthError; 
        }
    };

    const deleteSessionHistory = async ({ sessionId }): Promise<SuccessResponse | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        if (userId === undefined) {
            return { code: 'USER_ERROR', message: 'User ID is not defined.' } as AuthError; // Handle undefined userId
        }

        if (sessionId === undefined) {
            return { code: 'SESSION_ERROR', message: 'Session ID is not defined.' } as AuthError; // Handle undefined sessionId
        }

        try {
            await ChatService.deleteSessionHistory({ sessionId }); 
            return { success: true, message: 'Chat history deleted successfully.' }; // Success response
        } catch (error) {
            console.error(error);
            return { code: 'DELETE_ERROR', message: 'Failed to delete session history.' } as AuthError; 
        }
    };

    const handleCreateNewSession = async (): Promise<SuccessResponse | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        if (userId === undefined) {
            return { code: 'USER_ERROR', message: 'User ID is not defined.' } as AuthError; // Handle undefined userId
        }

        try {
            const newSession = await ChatService.createNewSession({ userId });

            if (newSession && 'sessionId' in newSession) {
                dispatch({ type: 'CREATE_NEW_SESSION', payload: newSession }); 
                return { success: true, message: 'New chat session created successfully.' }; 
            } else {
                throw new Error('Failed to create new chat session.'); 
            }
        } catch (error) {
            console.error(error);
            dispatch({ type: 'SESSION_ERROR', payload: { message: 'Failed to create new session.' } }); 
            return { code: 'SESSION_ERROR', message: error.message || 'An unexpected error occurred.' } as AuthError; 
        }
    };

    return {
        getSessionHistory,
        getMessageHistory,
        createAIMessage,
        createUserMessage,
        getChatBotResponse,
        saveChatSession,
        deleteSessionHistory,
        handleCreateNewSession, 
    };
};

export default useChatService; 
