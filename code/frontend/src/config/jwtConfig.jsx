/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Created by Poom
// Updated and Annotated by Natasya Liew


import axios from 'axios';

// Load environment variables for API configuration
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Manual Authentication method (fallback until JWT authentication is ready)
export const manualLogin = async (authId, password) => {
    try {
        const response = await axios.post(`${REACT_APP_API_BASE_URL}/manual/auth/login`, {
            authId,
            password,
        });

        if (response.status === 200) {
            // Handle successful login, e.g., store user info or session
            console.log('Manual login successful:', response.data);
        } else {
            // Handle login error
            console.error('Manual login failed:', response.data.message);
        }
    } catch (error) {
        console.error('Error during manual login:', error);
    }
};

export const jwtLogin = async (authId, password) => {
    try {
        const response = await axios.post(`${REACT_APP_API_BASE_URL}/v1/auth/login`, {
            authId,
            password,
        });

        if (response.status === 200) {
            console.log(response)
            const { token } = response.data; // Assuming the token is returned in the response
            sessionStorage.setItem('token', token); // Store JWT token in local storage
            console.log('JWT login successful:', response.data);
        } else {
            // Handle login error
            console.error('JWT login failed:', response.data.message);
        }
    } catch (error) {
        console.error('Error during JWT login:', error);
    }
};

// Utility function to get authorization header with JWT token for API calls
export const getAuthHeader = () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token from local storage
    return token ? { 'Authorization': `Bearer ${token}` } : {}; // Return the authorization header if token exists
};

// Function to call the API with JWT authorization
export const callApi = async (url, method = 'GET', body = null) => {
    const response = await axios({
        url,
        method,
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(), // Include authorization header
        },
        data: body ? JSON.stringify(body) : null, // Stringify body if provided
    });

    if (response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login page)
        window.location.href = '/login';
    }

    return response.data; // Return response data
};
