// api.jsc
// Created by Poom, updated by Tash 


import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9000/api/v1'; // Update this if your backend runs on a different port
const BACKEND_URL = 'http://localhost:8080/api'; // Adjust this based on your backend server

// Create an Axios instance
const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token in headers
apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token'); // Get the JWT token from session storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// API Calls
export const getChatbotResponse = async (userInput) => {
    try {
        const response = await apiClient.post(`${API_BASE_URL}/chatbot/chat`, userInput);
        return response.data;
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        throw error.response?.data?.message || "Failed to fetch chatbot response"; // More graceful error handling
    }
};

// Auth API Calls
export const login = async (authId, password) => {
    try {
        const response = await apiClient.post('/login', { authId, password });
        return response.data; // { token, user }
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const signup = async (userDetails) => {
    try {
        const response = await apiClient.post('/signup', userDetails);
        return response.data; // { message: "Signup successful" }
    } catch (error) {
        throw error.response?.data?.message || "Signup failed";
    }
};

export const forgotPassword = async (authId) => {
    try {
        const response = await apiClient.post('/forgot-password', { authId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error sending reset link";
    }
};

// Chat History API Call
export const getChatHistory = async () => {
    try {
        const response = await apiClient.get('/chat-history'); // Token is automatically included from the interceptor
        return response.data; // [{message, response, timestamp}]
    } catch (error) {
        throw error.response?.data?.message || "Error fetching chat history";
    }
};

// Send message to OpenAI and get response
export const sendMessageToOpenAI = async (message) => {
    try {
        const response = await axios.post(OPENAI_URL, {
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text.trim(); // Return bot response
    } catch (error) {
        throw error.response?.data?.message || "Error in AI response";
    }
};
