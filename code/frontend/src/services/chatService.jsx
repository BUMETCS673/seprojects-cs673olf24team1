import axios from 'axios';

const API_URL = '/api/v1/chat-history/chatbot-response';

const getChatbotResponse = async (userInput) => {
    try {
        const response = await axios.post(API_URL, { input: userInput });
        return response.data.response || "I'm sorry, I couldn't understand that.";
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return "There was an error fetching the response.";
    }
};

export default getChatbotResponse;