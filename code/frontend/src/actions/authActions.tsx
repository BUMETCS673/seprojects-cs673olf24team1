// authActions.tsx
// Actions for managing authentication state using JWT
// Created by Tash

import { AuthError, LoginResponse } from '../interfaces/AuthSession'; // Import the AuthError and LoginResponse interfaces

// Define action types as constants
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // Action type for successful login
export const LOGOUT = 'LOGOUT'; // Action type for logout
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // Action type for login failure
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'; // Action type for successful signup
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'; // Action type for signup failure
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'; // Action type for logout failure

// Define the action creator for successful login
export const loginSuccess = (payload: LoginResponse) => ({
    type: LOGIN_SUCCESS,
    payload,
});

// Define the action creator for login failure
export const loginFailure = (error: AuthError) => ({
    type: LOGIN_FAILURE, // Action type for login failure
    payload: error, // Error message or reason for failure
});

// Define the action creator for successful signup
export const signupSuccess = (payload: LoginResponse) => ({
    type: SIGNUP_SUCCESS,
    payload,
});

// Define the action creator for signup failure
export const signupFailure = (error: AuthError) => ({
    type: SIGNUP_FAILURE, // Action type for signup failure
    payload: error, // Error message or reason for failure
});

// Define the action creator for logout
export const logout = () => ({
    type: LOGOUT, // Action type for logout
});

// Define the action creator for logout failure
export const logoutFailure = (error: AuthError) => ({
    type: LOGOUT_FAILURE, // Action type for logout failure
    payload: error, // Error message or reason for failure
});
