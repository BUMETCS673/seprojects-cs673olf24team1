// Created by Natasya Liew
import axios from 'axios'; // Importing axios for making HTTP requests
import { LoginParams } from '../interfaces/AuthSession'; // Importing LoginParams interface
import { Message, ChatHistoryRetrieval } from '../interfaces/ChatSession'; // Importing Message interface

// Define base URLs for the API
export const API_BASE_URL = 'http://localhost:8080/api/v1'; // Primary API base URL
export const API_BASE_URL2 = 'http://localhost:5000/api'; // Secondary API base URL
export const REACT_API_BASE_URL1 = process.env.REACT_APP_API_BASE_URL || API_BASE_URL2; // Use environment variable or fallback
export const REACT_API_BASE_URL2 = process.env.REACT_APP_API_BASE_URL || API_BASE_URL1; // Use environment variable or fallback

// Placeholder for JWT token
export const jwtToken = token; // Assuming token is defined elsewhere

/**
 * Retrieves token response using axios.
 * 
 * @returns {Promise<AxiosResponse>} - The response from the API containing the token.
 */
export const tokenResponse = await axios.get(`${REACT_API_BASE_URL}/endpoint`, {
    headers: {
        Authorization: `Bearer ${tokenResponse.data}`, // Using token for authorization
    },
});

/**
 * Manually logs in a user and retrieves the token response.
 * 
 * @param {string} authId - The authentication ID (username) of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<AxiosResponse>} - The response from the API containing the token.
 */
export const tokenResponseManual = async (params: LoginParams) => {
    return await axios.post(`${REACT_APP_API_BASE_URL}/manual/auth/login`, {
        authId,
        password,
    });
};

/**
 * Logs in a user and retrieves the token response.
 * 
 * @param {string} authId - The authentication ID (username) of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<AxiosResponse>} - The response from the API containing the token.
 */
export const tokenResponseLogin = async (params: LoginParams) => {
    return await axios.post(`${REACT_APP_API_BASE_URL}/v1/auth/login`, {
        authId,
        password,
    });
};

/**
 * Makes a generic API call with axios.
 * 
 * @param {string} url - The API endpoint.
 * @param {string} method - The HTTP method (GET, POST, etc.).
 * @param {Object} body - The request body.
 * @returns {Promise<AxiosResponse>} - The response from the API.
 */
export const tokenResponseAPICall = async (url: string, method: 'GET' | 'POST', body?: Object) => {
    return await axios({
        url,
        method,
        headers: {
            'Content-Type': 'application/json', // Set content type for the request
            ...getAuthHeader(), // Include authorization header
        },
        data: body ? JSON.stringify(body) : null, // Stringify body if provided
    });
};

/**
 * Checks login requirements for authId and password.
 * 
 * This function validates the provided authId and password against defined criteria:
 * 1. Both fields must be provided and cannot be empty.
 * 2. The password must contain at least one uppercase letter, one lowercase letter,
 *    one number, one special character, and must be at least 8 characters long.
 * 
 * @param {LoginParams} params - The login parameters containing authId and password.
 * @returns {string} - A message indicating the result of the validation.
 */
export const loginRequirement = (params: LoginParams): string => {
    // Requirement Condition: Check if both authId and password are provided
    if (!params.authId || !params.password) {
        return 'Both username and password are required.'; // Return error message if requirements are not met
    }

    // Password complexity checks
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regex for password validation
    if (!passwordRegex.test(params.password)) {
        return 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'; // Password does not meet complexity requirements
    }

    // Check if the user exists (assuming getUserByAuthId is defined elsewhere)
    const user = getUserByAuthId(params.authId); // This function should retrieve user by authId
    if (!user) {
        return 'User not found. Please check your authId.'; // Return message if user does not exist
    }

    // Check if the password matches
    if (user.password !== params.password) {
        return 'Password does not match. Please try again.'; // Return message if password does not match
    }

    // If all requirements are met, return a success message
    return 'Login successful.'; // Indicate successful validation
};

/**
 * Checks if a given session ID exists and belongs to the specified user.
 * 
 * @param {string} userId - The ID of the user.
 * @param {string} sessionId - The ID of the session to check.
 * @returns {boolean} - Returns true if the session exists and belongs to the user, otherwise false.
 */
export const isSessionBelongsToUser = (params: ChatHistoryRetrieval): boolean => {
    // Find the user based on the userId (assuming users is an array defined elsewhere)
    const user = users.find(u => u.id === params.userId);
    
    // Check if user exists and if the sessionId is in the user's sessions
    if (user && user.sessions.includes(params.sessionId)) {
        return true; // Session belongs to the user
    }
    
    return false; // Session does not belong to the user or user does not exist
};

// Define the structure for the default user data
export const defaultUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    buId: '',
    programType: '',
    programName: '',
    path_interest: '',
    courses_to_take: 0,
    courses_taken: [],
    chat_session_ids: [],
    isNew: true,
};

// Define the structure for the initial user state
export const initializeUserState: User = {
    authId: '',
    userId: -1,
    fName: '',
    lName: '',
    email: '',
    password: '',
    buId: '',
    programType: '',
    programCode: '',
    pathOfInterest: '',
    coursesToTake: 0,
    coursesTaken: [],
    chatSessionIds: [],
    isNew: true,
};

// Default form state for user sign-up
export const defaultFormState: FormState = {
    authId: '',
    email: '',
    password: '',
    confirmPassword: '',
    fName: '',
    lName: '',
    buId: '',
    programType: 'MS degree',
    programCode: 'mssd',
    pathOfInterest: 'web development',
    coursesToTake: 3,
    coursesTaken: [],
};

// Message templates for chat interactions
export const newUserMessage: Message = {
    text: '', // Placeholder for user input
    timestamp: new Date(),
    isUser: true,
};

export const newAIMessage: Message = {
    text: '', // Placeholder for AI response
    timestamp: new Date(),
    isUser: false,
};
