// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1'; // Update this if your backend runs on a different port

export const getChatbotResponse = async(userInput) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chatbot/chat`, userInput, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        throw error;
    }
};

// api.js - Responsible for making requests to backend and OpenAI

// Backend API URL
const BACKEND_URL = 'http://localhost:8080/api'; // Adjust this based on your backend server

// OpenAI API key - In a real-world scenario, this should be handled securely in the backend
const OPENAI_API_KEY = 'your-openai-api-key';
const OPENAI_URL = 'https://api.openai.com/v1/completions';

// Auth API Calls
export const login = async(authId, password) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/login`, { authId, password });
        return response.data; // { token, user }
    } catch (error) {
        throw error.response.data.message || "Login failed";
    }
};

export const signup = async(userDetails) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/signup`, userDetails);
        return response.data; // { message: "Signup successful" }
    } catch (error) {
        throw error.response.data.message || "Signup failed";
    }
};

export const forgotPassword = async(authId) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/forgot-password`, { authId });
        return response.data;
    } catch (error) {
        throw error.response.data.message || "Error sending reset link";
    }
};

// Chat History API Call
export const getChatHistory = async(token) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/chat-history`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // [{message, response, timestamp}]
    } catch (error) {
        throw error.response.data.message || "Error fetching chat history";
    }
};

// Send message to OpenAI and get response
export const sendMessageToOpenAI = async(message) => {
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
        throw error.response.data.message || "Error in AI response";
    }
};