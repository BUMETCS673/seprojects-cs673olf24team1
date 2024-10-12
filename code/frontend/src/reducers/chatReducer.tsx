// chatReducer.tsx
// Created by Tash

import { ChatState, ChatAction } from '../interfaces/ChatSession'; // Import interfaces
import { ChatActionTypes } from '../actions/ChatActions'; // Corrected casing

// Initial state for the chat reducer
const initialState: ChatState = {
    messages: [],               // List of chat messages
    sessionId: 0,              // Initial session ID, set to 0 or a default value
    sessionHistory: [],         // History of chat sessions
    error: null,                // Error message, if any
    isLoading: false,           // Loading state for fetching data
};

// Chat reducer function
const chatReducer = (state = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionTypes.FETCH_SESSION_HISTORY:
            return { ...state, sessionHistory: action.payload, error: null }; // Update session history
        case ChatActionTypes.ADD_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] }; // Add new message
        case ChatActionTypes.SET_LOADING:
            return { ...state, isLoading: action.payload }; // Update loading state
        case ChatActionTypes.SET_ERROR:
            return { ...state, error: action.payload }; // Set error message
        case ChatActionTypes.CLEAR_CHAT:
            return { ...state, messages: [], error: null }; // Clear chat messages
        case ChatActionTypes.FETCH_SESSION_ID: // Add a new case to handle session ID updates
            return { ...state, sessionId: action.payload }; // Update session ID
        default:
            return state; // Return current state for unhandled actions
    }
};

export default chatReducer; // Export the chat reducer
