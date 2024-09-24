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