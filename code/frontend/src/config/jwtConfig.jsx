/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Created by Poom
// Updated and Annotated by Natasya Liew

// Importing necessary libraries and parameters
import axios from 'axios'; // Importing axios for making HTTP requests
import { loginRequirement } from '../params/paramsLog'; // Importing login requirement validation

/**
 * Manual Authentication method (fallback until JWT authentication is ready).
 * 
 * This function attempts to manually log in a user by utilizing the provided login requirements.
 * It handles both success and error responses appropriately.
 * 
 * @param {Object} credentials - Contains authId and password for login.
 * @returns {Promise<void>} - A promise that resolves when the login attempt is completed.
 */
export const manualLogin = async ({ authId, password }) => {
    try {
        // Requirement Condition: Validate login inputs before proceeding
        const validationMessage = loginRequirement({ authId, password });
        if (validationMessage !== 'Login requirements met.') {
            console.error(validationMessage); // Log validation error
            return; // Stop execution if requirements are not met
        }

        // Making a POST request for manual login
        const response = await axios.post('/api/manual-login', { authId, password });

        if (response.status === 200) {
            // Handle successful login
            console.log('Manual login successful:', response.data);
            // Implement logic to store user info or handle session
        } else {
            // Handle login error with structured message
            console.error('Manual login failed:', response.data.message || 'Unknown error occurred.');
        }
    } catch (error) {
        // Handling any errors that occur during the login process
        console.error('Error during manual login:', error.message || 'An unexpected error occurred.');
    }
};

/**
 * JWT Authentication method.
 * 
 * This function attempts to log in a user using JWT authentication.
 * It handles success and error responses appropriately.
 * 
 * @param {Object} credentials - Contains authId and password for login.
 * @returns {Promise<void>} - A promise that resolves when the login attempt is completed.
 */
export const jwtLogin = async ({ authId, password }) => {
    try {
        // Requirement Condition: Validate login inputs before proceeding
        const validationMessage = loginRequirement({ authId, password });
        if (validationMessage !== 'Login requirements met.') {
            console.error(validationMessage); // Log validation error
            return; // Stop execution if requirements are not met
        }

        // Making a POST request for JWT login
        const response = await axios.post('/api/jwt-login', { authId, password });

        if (response.status === 200) {
            const { token } = response.data; // Extract token from the response
            sessionStorage.setItem('token', token); // Store JWT token in session storage for later use
            console.log('JWT login successful:', response.data);
        } else {
            // Handle login error with structured message
            console.error('JWT login failed:', response.data.message || 'Unknown error occurred.');
        }
    } catch (error) {
        // Handling any errors that occur during the login process
        console.error('Error during JWT login:', error.message || 'An unexpected error occurred.');
    }
};

/**
 * Utility function to get authorization header with JWT token for API calls.
 * 
 * @returns {Object} - An object containing the Authorization header if the token exists.
 */
export const getAuthHeader = () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
    return token ? { 'Authorization': `Bearer ${token}` } : {}; // Return the authorization header if token exists
};

/**
 * Function to call the API with JWT authorization.
 * 
 * This function makes an API call with the specified method and body, 
 * and handles unauthorized access by redirecting the user to the login page.
 * 
 * @param {string} url - The API endpoint URL.
 * @param {string} method - The HTTP method (default is 'GET').
 * @param {Object} body - The request body (optional).
 * @returns {Promise<any>} - A promise that resolves to the response data.
 */
export const callApi = async (url, method = 'GET', body = null) => {
    try {
        const headers = getAuthHeader(); // Get the authorization header

        // Make the API call
        const response = await axios({
            url,
            method,
            data: body,
            headers,
        });

        // Check for unauthorized access
        if (response.status === 401) {
            console.error('Unauthorized access - redirecting to login.');
            window.location.href = '/login'; // Redirect to login page
        }

        return response.data; // Return response data
    } catch (error) {
        // Handling any errors that occur during the API call
        console.error('API call error:', error.message || 'An unexpected error occurred.'); // Log error
        throw error; // Optionally re-throw the error to handle it at the call site
    }
};
