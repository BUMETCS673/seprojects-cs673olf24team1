// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.

import { User, SuccessResponse, ErrorResponse } from "../interfaces/UserSession"; // Importing necessary types for User and LoginParams[0]
import { LoginParams } from "../interfaces/AuthSession";
import { mapUserToAPIBody } from "../utils/mappers"; // Importing utility function to map user data to API format
import { API_BASE_URL } from "../params/paramsLog"; // Importing the API base URL

export const UserService = {
    /**
     * Fetches user data based on the provided parameters.
     * 
     * This function retrieves user data associated with a specific user ID.
     * It requires an authentication token to be present in the session storage.
     * 
     * @param {LoginParams[0]} params - An object containing the user ID for retrieval.
     * @returns {Promise<SuccessResponse<any> | ErrorResponse>} 
     *          - A promise that resolves to either a success response containing user data,
     *            or an error response with relevant messages and HTTP status code.
     */
    async getUserData(params: LoginParams[0]): Promise<SuccessResponse<any> | ErrorResponse> {
        const token = sessionStorage.getItem('token'); // Retrieve authentication token from sessionStorage
        
        // Requirement Condition: Validate that the token is present
        if (!token) {
            return {
                success: false,
                message: 'No authentication token found', // Inform user of missing token
            };
        }

        try {
            // Fetch user data from the API
            const response = await fetch(`${API_BASE_URL}/users/user/${params.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the authentication token in the header
                    'Content-Type': 'application/json', // Set content type to JSON
                },
            });

            // Check if the response is not OK and handle different status codes
            if (!response.ok) {
                const errorData: ErrorResponse = {
                    success: false,
                    message: `Failed to fetch user with ID ${params.userId}`, // Provide meaningful error message
                    code: response.status, // Include HTTP status code for reference
                    details: 'Please check the user ID and try again.', // Additional error details
                };
                return errorData; // Return structured error response
            }

            const user = await response.json(); // Parse the user data from the response
            return {
                success: true,
                data: user, // Return the user data
                message: 'User retrieved successfully', // Success message
            }; 
        } catch (error) {
            console.error('Error fetching user:', error); // Log the error for debugging
            return {
                success: false,
                message: 'An unexpected error occurred while fetching user data', // Inform about unexpected errors
            }; // Return structured error response
        }
    },

    /**
     * Creates a new user in the system.
     * 
     * This function sends a request to create a new user based on the provided user object.
     * It requires an authentication token to be present in the session storage.
     * 
     * @param {User} user - The user object containing the necessary information to create a new user.
     * @returns {Promise<SuccessResponse<number> | ErrorResponse>} 
     *          - A promise that resolves to either a success response containing the user ID,
     *            or an error response with relevant messages and HTTP status code.
     */
    createUser: async (user: User): Promise<SuccessResponse<number> | ErrorResponse> => {
        // Requirement Condition: Validate user input here for required fields
        if (!user || !user[0] || !user[2] || !user[3] || !user[4] || !user[5] || !user[7] || !user[8] || !user[9] || !user[10]) {
            return {
                success: false,
                message: 'User data is incomplete', // Return early if user data is invalid
            };
        }

        try {
            // Send a POST request to create a new user
            const response = await fetch(`${API_BASE_URL}/users/user`, {
                method: 'POST', // HTTP method for creating a user
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                },
                body: mapUserToAPIBody(user), // Map user details to the required API format
            });

            // Check if the response indicates failure
            if (!response.ok) {
                const errorData: ErrorResponse = {
                    success: false,
                    message: 'Failed to create user', // Provide failure message
                    code: response.status, // Include HTTP status code
                    details: 'Please check the provided user data and try again.', // Additional context for the error
                };
                return errorData; // Return structured error response
            }

            const data = await response.json(); // Parse the response data
            return {
                success: true,
                data: data.id, // Return the user ID from the created user object
                message: 'User created successfully', // Success message
            }; // Return structured success response
        } catch (error) {
            console.error('Error during sign-up:', error); // Log any errors encountered during sign-up
            return {
                success: false,
                message: 'An unexpected error occurred during user creation', // Inform about unexpected errors
            }; // Return structured error response
        }
    },
};

export default UserService;
