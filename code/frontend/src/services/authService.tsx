// authService.tsx
// Created by Poom
// Updated and Annotated by Tash
// Service for handling authentication operations (login, logout, signup)

import axios from "axios";
import { LoginCredentials, AuthResponse, SignUpFormState, AuthError, SuccessResponse } from '../interfaces/AuthSession'; // Import interfaces

// Base URL for the authentication API, configured for JWT Auth
const REACT_APP_API_BASE_URL = 'http://localhost:8080/api';

// Function to handle user login
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse | AuthError> => {
    try {
        const response = await axios.post<AuthResponse>(`${REACT_APP_API_BASE_URL}/v1/auth/login`, {
            username: credentials.authId,
            password: credentials.password,
        });
        
        if (response.status === 200) {
            return response.data; // Return the response data as AuthResponse
        } else {
            return {
                code: "LOGIN_ERROR",
                message: response.data.message || "Login failed due to an unknown error.",
            } as AuthError; // Return AuthError
        }
    } catch (error) {
        return {
            code: "LOGIN_ERROR",
            message: error.response?.data?.message || error.message || "An unexpected error occurred during login.",
        } as AuthError; // Return AuthError
    }
};

// Function to handle user sign-up
export const signupUser = async (data: SignUpFormState): Promise<AuthResponse | AuthError> => {
    try {
        const response = await axios.post<AuthResponse>(`${REACT_APP_API_BASE_URL}/v1/auth/signup`, data);

        if (response.status === 201) { // Assuming a successful signup returns 201
            return response.data; // Return the response data as AuthResponse
        } else {
            return {
                code: "SIGN_UP_ERROR",
                message: response.data.message || "Sign up failed due to an unknown error.",
            } as AuthError; // Return AuthError
        }
    } catch (error) {
        return {
            code: "SIGN_UP_ERROR",
            message: error.response?.data?.message || error.message || "An unexpected error occurred during sign-up.",
        } as AuthError; // Return AuthError
    }
};

// Function to handle user logout
export const logoutUser = async (): Promise<SuccessResponse | AuthError> => {
    try {
        const response = await axios.post(`${REACT_APP_API_BASE_URL}/v1/auth/logout`, {}, { withCredentials: true }); // Assuming logout endpoint is set up
        
        if (response.status === 200) {
            return { success: true, message: 'Successfully logged out!' }; // Return success message

        } else {
            return {
                code: 'LOGOUT_ERROR',
                message: 'Failed to logout user due to an unknown error.',
            } as AuthError; // Return error if logout fails
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return { code: 'LOGOUT_ERROR', message: 'Failed to logout user.' } as AuthError; // Return error
    }
};

// Export the functions for use in other parts of the application
const authService = {
    loginUser,
    logoutUser,
    signupUser,
};

export default authService;
