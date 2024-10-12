// chatActions.tsx
// Created by Tash

import { Message, ChatSession, AuthError } from '../interfaces/ChatSession';

// Define action types for chat actions
export enum ChatActionTypes {
    FETCH_SESSION_HISTORY = 'FETCH_SESSION_HISTORY',
    ADD_MESSAGE = 'ADD_MESSAGE',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
    CLEAR_CHAT = 'CLEAR_CHAT',
    FETCH_SESSION_ID = 'FETCH_SESSION_ID', // New action type for fetching session ID
}

// Action to fetch session history
export const fetchSessionHistory = (sessions: ChatSession[]) => ({
    type: ChatActionTypes.FETCH_SESSION_HISTORY,
    payload: sessions,
});

// Action to add a new message
export const addMessage = (message: Message) => ({
    type: ChatActionTypes.ADD_MESSAGE,
    payload: message,
});

// Action to set loading state
export const setLoading = (isLoading: boolean) => ({
    type: ChatActionTypes.SET_LOADING,
    payload: isLoading,
});

// Action to set an error state
export const setError = (error: AuthError) => ({
    type: ChatActionTypes.SET_ERROR,
    payload: error,
});

// Action to clear the chat
export const clearChat = () => ({
    type: ChatActionTypes.CLEAR_CHAT,
});

// Action to fetch the session ID
export const fetchSessionId = (sessionId: number) => ({
    type: ChatActionTypes.FETCH_SESSION_ID,
    payload: sessionId,
});