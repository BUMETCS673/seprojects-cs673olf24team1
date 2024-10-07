import { Message } from '../interfaces/Message';
import { ChatSession } from '../interfaces/ChatSession';
import { createChatJson } from '../utils/mappers';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const ChatService = {
    // Fetches chat history for a given session ID
    getSessionHistory: async (sessionId: string): Promise<Message[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}/messages`);
            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }
            const data = await response.json();
            return data.messages as Message[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    // Sends a message to the chat API and retrieves the response
    getChatBotResponse: async (input: string, studentName: string, userId: string): Promise<Message | null> => {
        const token = sessionStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/chat_conversation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user_id": userId,
                    "student_name": studentName,
                    "message": input,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to get response from chat bot');
            }
            const data = await response.json();
            return {
                text: data.response, // Assuming the response has a "response" field
                timestamp: new Date(),
                isUser: false,
            } as Message;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Uploads a chat message to the API
    saveChatSession: async (userId: number, messages: Message[], prevSessionId: number): Promise<number> => {
        try {
            const response = await fetch(`${API_BASE_URL}/sessions/user/${userId}/conversation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversation: createChatJson(messages),
                }),
            });
            return prevSessionId + 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    },
};

export default ChatService;
