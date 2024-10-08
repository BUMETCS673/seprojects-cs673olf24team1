// Created by Poom
// Updated and Annotated by Natasya Liew

import axios from "axios";

// Base URL for the authentication API, configured for JWT Auth
const REACT_APP_API_BASE_URL = 'http://localhost:8080/api';

// Service to manage authentication-related operations
const authService = {
    loginUser: async (authId, password) => {
        try {
            const response = await axios.post(`${REACT_APP_API_BASE_URL}/v1/auth/login`, {
                username: authId,
                password: password,
            });
    
            if (response.status === 200) {
                sessionStorage.setItem('token', response.data.jwt); // Store JWT token in local storage
                return true;
            } else {
                // Handle login error
                console.error('JWT login failed:', response.data.message);
                return false;
            }
        } catch (error) {
            console.error('Error during JWT login:', error);
        }
    }
};

export default authService; // Exporting the authService for use in other parts of the application

