// services/userService.tsx
// Service for handling user-related API operations
// Created by Poom
// Updated for Redux integration by Tash

import { User, UserResponse, AuthError } from "../interfaces/UserSession"; // Import User and AuthError interfaces
import { mapUserToAPIBody } from "../utils/mappers"; // Import utility function to map user data
import store from '../store/store'; // Import the Redux store to access global state

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Base URL for the user API

export const UserService = {
    // Fetch user data by authId
    async getUserData(authId: string): Promise<User | AuthError> {
        const state = store.getState(); // Get the Redux state
        const token = state.auth.jwtToken; // Retrieve JWT token from Redux state

        if (!token) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; // Return error if token is missing
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/user/${authId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in Authorization header
                    'Content-Type': 'application/json', // Specify content type
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${authId}`); // Handle fetch error
            }

            const user: UserResponse = await response.json(); // Parse user data
            return user.user; // Return user data
        } catch (error) {
            console.error('Error fetching user:', error); // Log any errors
            return { code: 'USER_DATA_ERROR', message: 'Failed to fetch user data.' } as AuthError; // Return error
        }
    },

    // Sign up a new user
    async createUser(user: User): Promise<number | AuthError> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/user`, {
                method: 'POST', // HTTP method for creating a user
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                },
                body: mapUserToAPIBody(user), // User details in JSON format
            });

            // Check if the response indicates failure
            if (!response.ok) {
                throw new Error('Failed to create user'); // Handle failure
            }

            const data = await response.json(); // Parse response data
            return data.userId; // Return user ID from the response
        } catch (error) {
            console.error('Error during sign-up:', error); // Log any errors encountered
            return { code: 'USER_CREATION_ERROR', message: 'Failed to create user.' } as AuthError; // Return error
        }
    },

    // Logout user
    async logoutUser(): Promise<void | AuthError> {
        const state = store.getState(); // Get the Redux state
        const token = state.auth.jwtToken; // Retrieve JWT token from Redux state

        if (!token) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; // Return error if token is missing
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/logout`, {
                method: 'POST', // HTTP method for logout
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in Authorization header
                    'Content-Type': 'application/json', // Specify content type
                },
            });

            if (!response.ok) {
                throw new Error('Failed to logout user'); // Handle logout error
            }
        } catch (error) {
            console.error('Error during logout:', error); // Log any errors encountered
            return { code: 'LOGOUT_ERROR', message: 'Failed to logout user.' } as AuthError; // Return error
        }
    },
};

export default UserService; // Export UserService for use in other parts of the application
