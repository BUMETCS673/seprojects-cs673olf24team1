import { Message } from '../interfaces/Message';
import { ChatSession } from '../interfaces/ChatSession';

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
  getChatBotResponse: async (input: string): Promise<Message | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
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
  uploadChatMessage: async (sessionId: string, message: Message): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default ChatService;
