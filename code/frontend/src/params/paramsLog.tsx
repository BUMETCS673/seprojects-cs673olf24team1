// Created by Natasya Liew
import { FormState } from '../interfaces/AuthSession'; // Importing LoginParams and FormState interfaces
import { Message } from '../interfaces/ChatSession'; // Importing Message and ChatHistoryRetrieval interfaces
import { useUser } from '../context/UserContext'; // Importing useUser hook to access user context
import { User } from '../interfaces/UserSession'; // Importing User interface

// Define base URLs for the API
export const API_BASE_URL = 'http://localhost:8080/api/v1'; // Primary API base URL
export const API_BASE_URL2 = 'http://localhost:5000/api'; // Secondary API base URL
export const REACT_API_BASE_URL1 = process.env.REACT_APP_API_BASE_URL || API_BASE_URL2; // Use environment variable or fallback
export const REACT_API_BASE_URL2 = process.env.REACT_APP_API_BASE_URL || API_BASE_URL; // Use environment variable or fallback

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
export const loginRequirement = (authId: string, password: string): string => {
    // Access the user context
    const { user } = useUser(); 

    // Requirement Condition: Check if both authId and password are provided
    if (!authId || !password) {
        return 'Both username and password are required.'; // Return error message if requirements are not met
    }

    // Password complexity checks
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regex for password validation
    if (!passwordRegex.test(password)) {
        return 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'; // Password does not meet complexity requirements
    }

    // Check if the user exists
    if (!user || user.authId !== authId) {
        return 'User not found. Please check your authId.'; // Return message if user does not exist
    }

    // Check if the password matches
    if (user.password !== password) {
        return 'Password does not match. Please try again.'; // Return message if password does not match
    }

    // If all requirements are met, return a success message
    return 'Login successful.'; // Indicate successful validation
};

/**
 * Checks if a given session ID exists and belongs to the specified user.
 * 
 * @param {ChatHistoryRetrieval} params - The parameters containing userId and sessionId.
 * @returns {boolean} - Returns true if the session exists and belongs to the user, otherwise false.
 */
export const isSessionBelongsToUser = (userId: number, sessionId: number): boolean => {
    const { user } = useUser(); // Access the user context

    // Check if user exists and if the sessionId is in the user's sessions
    if (user && user.chatSessionIds.includes(sessionId)) {
        return true; // Session belongs to the user
    }
    
    return false; // Session does not belong to the user or user does not exist
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

// Function to check if a user exists by authId, email, or buId
export const checkUserExists = async (authId: string, email: string, buId: string) => {
    // Get the current user context
    const { user } = useUser(); // Access the user context

    // Requirement Check: Ensure user data is available for checks
    if (user) {
        // Check if any of the provided values match the stored user data
        const authIdExists = user.authId === authId; // Check for existing authId
        const emailExists = user.email === email; // Check for existing email
        const buIdExists = user.buId === buId; // Check for existing BU ID

        // Return an object indicating the existence of each value
        return { authIdExists, emailExists, buIdExists }; 
    }

    // If user is not defined, return false for all checks
    return { authIdExists: false, emailExists: false, buIdExists: false };
};
