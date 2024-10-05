// Created by Poom
// Updated and Annotated by Natasya Liew

import { User } from "../interfaces/User"; // Importing the User interface for type checking

// Base URL for the authentication API, configured for JWT Auth
const API_BASE_URL = 'some auth API endpoint through JWT Auth';

// Service to manage authentication-related operations
const authService = {

    // Login an existing user
    loginUser: async (authId: string, password: string): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST', // HTTP method for user login
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                },
                body: JSON.stringify({ authId, password }), // Credentials in JSON format
            });

            // Check if the response indicates failure
            if (!response.ok) {
                throw new Error('Invalid username or password'); // Throw error for non-200 responses
            }

            const data = await response.json(); // Parse the response data
            return data.user; // Return the user object from the response
        } catch (error) {
            console.error('Error during login:', error); // Log any errors encountered
            return null; // Return null in case of an error
        }
    },

    // Logout the user
    logoutUser: async (): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST', // HTTP method for user logout
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                },
            });

            // Return true if the logout was successful
            return response.ok; // Check if the response indicates success
        } catch (error) {
            console.error('Error during logout:', error); // Log any errors encountered
            return false; // Return false in case of an error
        }
    },
};

export default authService; // Exporting the authService for use in other parts of the application

