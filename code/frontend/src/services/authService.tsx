/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Created by Poom
// Updated and Annotated by Natasya Liew

import axios from 'axios'; // Importing axios for making HTTP requests
import { API_BASE_URL, loginRequirement } from "../params/paramsLog"; // Importing base URL and login requirement function
import { LoginParams, LoginResponse } from '../interfaces/AuthSession'; // Importing LoginParams type for type safety

// Service to manage authentication-related operations
const authService = {
    /**
     * Logs in a user using the provided credentials.
     * 
     * This function sends a POST request to the authentication endpoint
     * with the user's username and password. On successful login, 
     * it stores the JWT token in session storage.
     * 
     * @param {LoginParams} params - An object containing the username and password.
     * @returns {Promise<{ success: boolean; message: string }>} 
     *          - A promise that resolves to an object indicating success status and message.
     */
    loginUser: async (authId:string, password:string): Promise<{ success: boolean; message: string }> => {
        // Requirement Condition: Validate input parameters using the loginRequirement function
        const validationMessage = loginRequirement(authId, password); // Pass authId and password for validation

        if (validationMessage !== 'Login requirements met.') {
            console.error(validationMessage); // Log validation error
            return {
                success: false,
                message: validationMessage, // Return the validation message
            }; // Return early if requirements are not met
        }

        try {
            // Send a POST request to the authentication endpoint
            const response = await axios.post<LoginResponse>(`${API_BASE_URL}/v1/auth/login`, {
                username: authId, // Username from params
                password: password, // Password from params
            });

            // Check for successful response
            if (response.status === 200) {
                sessionStorage.setItem('jwtToken', response.data.jwt); // Store JWT token in session storage
                return {
                    success: true, 
                    message: 'Login successful!', // Success message
                }; // Login was successful
            } else {
                // Handle login error based on response status
                console.error('JWT login failed:', response.data.message); // Log the error message
                return {
                    success: false,
                    message: response.data.message || 'Login failed due to an unknown error.', // Provide meaningful error message
                }; // Login failed
            }
        } catch (error) {
            console.error('Error during JWT login:', error); // Log the error for debugging
            return {
                success: false,
                message: 'An unexpected error occurred during login. Please try again later.', // Inform about unexpected errors
            }; // Return error response
        }
    }
};

export default authService; // Exporting the authService for use in other parts of the application
