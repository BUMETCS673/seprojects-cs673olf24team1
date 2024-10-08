import { Message } from '../interfaces/Message';
import { ChatSession } from '../interfaces/ChatSession';
import { createChatJson } from '../utils/mappers';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const ChatService = {

    // Fetches chat history for a given session ID
    getSessionHistory: async (userId: string): Promise<ChatSession[]> => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/sessions/user/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                },
            );
            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }
            const data = await response.json();

            const history: ChatSession[] = data.map((session: { sessionId: string; createdAt: string }) => ({
                id: session.sessionId,
                createdTime: new Date(session.createdAt),
            }));

            return history;
        } catch (error) {
            throw new Error(error);
        }
    },

    // Fetches chat history for a given session ID
    getMessageHistory: async (userId: string, sessionId: string): Promise<Message[]> => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/sessions/user/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                },
            );
            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }
            const data = await response.json();

            const conversations = data
                .filter((item) => item.sessionId === sessionId)
                .map((item) => item.conversation);

            const transformedMessages: Message[] = [];
            let order = 1; // sudo timestamp order

            // Iterate through each message object
            conversations.forEach((conversation) => {
                const convos = JSON.parse(conversation);

                convos.forEach((convo) => {
                    // Add the user message
                    transformedMessages.push({
                        text: convo.user,
                        isUser: true,
                        timestamp: new Date(2020, 1, 1, order),
                    });
                    // Add the chatbot message
                    transformedMessages.push({
                        text: convo.chatbot,
                        isUser: false,
                        timestamp: new Date(2020, 1, 1, order),
                    });
                    order++;
                });
            });

            return transformedMessages;
        } catch (error) {
            throw new Error(error as string);
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
                text: data.response,
                timestamp: new Date(),
                isUser: false,
            } as Message;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // Uploads a chat message to the API
    saveChatSession: async (userId: number, messages: Message[]): Promise<boolean> => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        messages.shift(); // remove the greeting message.
        try {
            const response = await fetch(`${API_BASE_URL}/sessions/user/${userId}/conversation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    conversation: createChatJson(messages),
                }),
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
};

export default ChatService;
