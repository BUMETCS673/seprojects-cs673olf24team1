// authReducer.tsx
// Reducer for managing authentication state in Redux
// Created by Tash

import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAILURE, LOGOUT_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/authActions'; // Import action types
import { AuthResponse, AuthError, AuthState, AuthAction } from '../interfaces/AuthSession'; // Import interfaces for the expected response and error

// Initial state
const initialState: AuthState = {
    jwtToken: null, // Start with no token
    isAuthenticated: false, // User is not authenticated initially
    error: null, // No error by default
    user: null, // Initial user state
};


// Reducer function to handle authentication actions
const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                jwtToken: (action.payload as AuthResponse).jwtToken, // Store the JWT token in state
                user: (action.payload as AuthResponse).user, // Set user information on successful login
                isAuthenticated: true, // Set authentication status to true
                error: null, // Clear any existing errors
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                jwtToken: (action.payload as AuthResponse).jwtToken, // Store the JWT token from sign-up
                user: (action.payload as AuthResponse).user, // Set user information on successful signup
                isAuthenticated: true, // Set authentication status to true
                error: null, // Clear any existing errors
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload as AuthError, // Set the error message on login failure
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                error: action.payload as AuthError, // Set the error message on sign-up failure
            };
        case LOGOUT:
            return initialState; // Reset state to initial on logout
        case LOGOUT_FAILURE: // Optional: handle logout failure
            return {
                ...state,
                error: action.payload as AuthError, // Set the error message on logout failure
            };
        default:
            return state; // Return current state for unhandled actions
    }
};

export default authReducer; // Export the reducer for use in the Redux store