// api.js
// Created by Poom, updated and annotated by Tash

import axios from 'axios';
import { LoginParams, SignUpParams, SuccessResponse, ErrorResponse } from '../interfaces/AuthSession'; // Import necessary interfaces

const API_BASE_URL = 'http://localhost:9000/api/v1'; // Update this if your backend runs on a different port

/**
 * Sends user input to the chatbot API and retrieves the response.
 * 
 * @param {string} userInput - The input message from the user.
 * @returns {Promise<SuccessResponse<any> | ErrorResponse>} 
 *          - A promise that resolves to the chatbot's response.
 */
export const getChatbotResponse = async (userInput: string): Promise<SuccessResponse<any> | ErrorResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chatbot/chat`, { input: userInput }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { success: true, data: response.data }; // Return successful response
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return { success: false, message: error.response.data.message || "Error fetching chatbot response" }; // Return error response
    }
};

// Backend API URL
const BACKEND_URL = 'http://localhost:8080/api'; // Adjust this based on your backend server

// OpenAI API key - In a real-world scenario, this should be handled securely in the backend
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use environment variable for security
const OPENAI_URL = 'https://api.openai.com/v1/completions';

/**
 * Logs in a user with provided credentials.
 * 
 * @param {LoginParams} params - The login credentials.
 * @returns {Promise<SuccessResponse<any> | ErrorResponse>} 
 *          - A promise that resolves to a success response containing user data or an error response.
 */
export const login = async (params: LoginParams): Promise<SuccessResponse<any> | ErrorResponse> => {
    // Requirement Condition: Ensure both username and password are provided
    if (!params.authId || !params.password) {
        return { success: false, message: 'Please provide both username and password.' }; // Return error message
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/login`, params);
        return { success: true, data: response.data }; // Return successful response
    } catch (error) {
        return { success: false, message: error.response.data.message || "Login failed" }; // Return error response
    }
};

/**
 * Signs up a new user with the provided details.
 * 
 * @param {SignUpParams} userDetails - The details for signing up the user.
 * @returns {Promise<SuccessResponse<any> | ErrorResponse>} 
 *          - A promise that resolves to a success response or an error response.
 */
export const signup = async (userDetails: SignUpParams): Promise<SuccessResponse<any> | ErrorResponse> => {
    // Requirement Condition: Ensure all required fields are filled
    if (!userDetails.authId || !userDetails.email || !userDetails.password || !userDetails.confirmPassword) {
        return { success: false, message: 'All fields are required.' }; // Return error message for missing fields
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/signup`, userDetails);
        return { success: true, data: response.data }; // Return successful response
    } catch (error) {
        return { success: false, message: error.response.data.message || "Signup failed" }; // Return error response
    }
};

/**
 * Sends a password reset link to the user's email address.
 * 
 * @param {string} authId - The user's authentication ID.
 * @returns {Promise<SuccessResponse<any> | ErrorResponse>} 
 *          - A promise that resolves to a success response or an error response.
 */
export const forgotPassword = async (authId: string): Promise<SuccessResponse<any> | ErrorResponse> => {
    // Requirement Condition: Ensure authId is provided
    if (!authId) {
        return { success: false, message: 'Authentication ID is required.' }; // Return error message for missing authId
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/forgot-password`, { authId });
        return { success: true, data: response.data }; // Return successful response
    } catch (error) {
        return { success: false, message: error.response.data.message || "Error sending reset link" }; // Return error response
    }
};

/**
 * Retrieves the chat history for the logged-in user.
 * 
 * @param {string} token - The authentication token of the user.
 * @returns {Promise<SuccessResponse<any> | ErrorResponse>} 
 *          - A promise that resolves to the chat history or an error response.
 */
export const getChatHistory = async (token: string): Promise<SuccessResponse<any> | ErrorResponse> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/chat-history`, {
            headers: { Authorization: `Bearer ${token}` } // Include the token in the header
        });
        return { success: true, data: response.data }; // Return successful response
    } catch (error) {
        return { success: false, message: error.response.data.message || "Error fetching chat history" }; // Return error response
    }
};

/**
 * Sends a message to OpenAI and retrieves the response.
 * 
 * @param {string} message - The message to send to OpenAI.
 * @returns {Promise<string | ErrorResponse>} 
 *          - A promise that resolves to the OpenAI response or an error response.
 */
export const sendMessageToOpenAI = async (message: string): Promise<string | ErrorResponse> => {
    // Requirement Condition: Ensure message is provided
    if (!message) {
        return { success: false, message: 'Message is required.' }; // Return error message for missing message
    }

    try {
        const response = await axios.post(OPENAI_URL, {
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`, // Use the OpenAI API key for authorization
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text.trim(); // Return bot response
    } catch (error) {
        return { success: false, message: error.response.data.message || "Error in AI response" }; // Return error response
    }
};
