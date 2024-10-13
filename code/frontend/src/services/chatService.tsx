// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.

import { ChatHistoryRetrieval, ChatSession, Message, SaveChat, ChatBotResponse } from '../interfaces/ChatSession';
import { createChatJson } from '../utils/mappers';
import { API_BASE_URL } from '../params/paramsLog';

const ChatService = {
    /**
     * Fetches chat history for a given user.
     * 
     * This function retrieves the chat sessions associated with a specific user ID.
     * It requires an authentication token to be present in the session storage.
     * 
     * @param {ChatHistoryRetrieval[0]} params - An object containing the user ID for retrieval.
     * @returns {Promise<SuccessResponse<ChatSession[]> | ErrorResponse>} 
     *          - A promise that resolves to a success response containing an array of ChatSession objects,
     *            or an error response with relevant messages and HTTP status code.
     */
    getSessionHistory: async (params: ChatHistoryRetrieval[0]): Promise<SuccessResponse<ChatSession[]> | ErrorResponse> => {
        const token = sessionStorage.getItem('token'); // Retrieve authentication token

        // Security: Validate that the token is present
        if (!token) {
            return { success: false, message: 'No authentication token found' }; // Early return with error
        }

        try {
            // Fetch chat history from the API for the specified user
            const response = await fetch(`${API_BASE_URL}/sessions/user/${params.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the header
                    'Content-Type': 'application/json', // Set content type to JSON
                }
            });

            // Check if the response indicates failure
            if (!response.ok) {
                return {
                    success: false,
                    message: 'Failed to fetch chat history', // Provide a meaningful error message
                    code: response.status, // Include HTTP status code
                };
            }

            const data = await response.json(); // Parse the response data

            const history: ChatSession[] = data.map((session: any) => ({
                id: session[0], // Assume session data is structured appropriately
                createdTime: new Date(session[1]), // Convert timestamp to Date object
            }));

            return {
                success: true,
                data: history, // Return chat session history
                message: 'Chat history retrieved successfully', // Success message
            };
        } catch (error) {
            console.error('Error fetching user chat history:', error); // Log the error
            return {
                success: false,
                message: 'An unexpected error occurred while fetching chat history', // Inform about unexpected errors
            };
        }
    },

    /**
     * Fetches message history for a given session ID.
     * 
     * This function retrieves messages associated with a specific session ID for a user.
     * It requires an authentication token to be present in the session storage.
     * 
     * @param {ChatHistoryRetrieval} params - An object containing the user ID and session ID for retrieval.
     * @returns {Promise<SuccessResponse<Message[]> | ErrorResponse>} 
     *          - A promise that resolves to a success response containing an array of Message objects,
     *            or an error response with relevant messages and HTTP status code.
     */
    getMessageHistory: async (params: ChatHistoryRetrieval): Promise<SuccessResponse<Message[]> | ErrorResponse> => {
        const token = sessionStorage.getItem('token'); // Retrieve authentication token

        // Security: Validate that the token is present
        if (!token) {
            return { success: false, message: 'No authentication token found' }; // Early return with error
        }

        try {
            // Fetch message history from the API for the specified user and session
            const response = await fetch(`${API_BASE_URL}/sessions/user/${params.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the header
                    'Content-Type': 'application/json', // Set content type to JSON
                }
            });

            // Check if the response indicates failure
            if (!response.ok) {
                return {
                    success: false,
                    message: 'Failed to fetch message history', // Provide a meaningful error message
                    code: response.status, // Include HTTP status code
                };
            }

            const data = await response.json(); // Parse the response data

            // Filter conversations based on sessionId
            const conversations = data
                .filter((item: any) => item.sessionId === params.sessionId)
                .map((item: any) => item.conversation);

            const transformedMessages: Message[] = [];
            let order = 1; // Used to maintain the order of messages

            // Iterate through each message object
            conversations.forEach((conversation: string) => {
                const convos = JSON.parse(conversation); // Parse the conversation JSON

                convos.forEach((convo: any) => {
                    // Add user message to the transformed messages array
                    transformedMessages.push({
                        text: convo.user,
                        isUser: true,
                        timestamp: new Date(2020, 1, 1, order), // Assign a timestamp
                    });
                    // Add chatbot message to the transformed messages array
                    transformedMessages.push({
                        text: convo.chatbot,
                        isUser: false,
                        timestamp: new Date(2020, 1, 1, order), // Assign a timestamp
                    });
                    order++; // Increment order for the next message
                });
            });

            return {
                success: true,
                data: transformedMessages, // Return the transformed messages
                message: 'Message history retrieved successfully', // Success message
            };
        } catch (error) {
            console.error('Error fetching message history:', error); // Log the error
            return {
                success: false,
                message: 'An unexpected error occurred while fetching message history', // Inform about unexpected errors
            };
        }
    },

    /**
     * Sends a message to the chat API and retrieves the response from the chatbot.
     * 
     * This function sends user input to the chatbot and retrieves the response.
     * It requires an authentication token to be present in the session storage.
     * 
     * @param {Object} params - An object containing user ID, student name, and input message.
     * @returns {Promise<SuccessResponse<Message> | ErrorResponse>} 
     *          - A promise that resolves to either a success response with the message or an error response.
     */
    getChatBotResponse: async (params: ChatBotResponse): Promise<SuccessResponse<Message> | ErrorResponse> => {
        const token = sessionStorage.getItem('token'); // Retrieve authentication token

        // Security: Validate that the token is present
        if (!token) {
            return { success: false, message: 'No authentication token found' }; // Early return with error
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/chat_conversation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the header
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({
                    user_id: params[2], // User ID for the chatbot
                    student_name: params[1], // Name of the student
                    message: params[0], // User input message
                }),
            });

            // Check if the response indicates failure
            if (!response.ok) {
                return {
                    success: false,
                    message: 'Failed to get response from chat bot', // Provide a meaningful error message
                    code: response.status, // Include HTTP status code
                };
            }

            const data = await response.json(); // Parse the response data
            return {
                success: true,
                data: {
                    text: data.response, // Response from chatbot
                    timestamp: new Date(), // Current timestamp
                    isUser: false, // Indicates this message is from the chatbot
                },
                message: 'Chatbot response retrieved successfully', // Success message
            };
        } catch (error) {
            console.error('Error getting chatbot response:', error); // Log the error
            return {
                success: false,
                message: 'An unexpected error occurred while getting chatbot response', // Inform about unexpected errors
            };
        }
    },

    /**
     * Uploads a chat message to the API.
     * 
     * This function saves the chat session for a user. It requires an authentication token to be present in the session storage.
     * 
     * @param {SaveChat} params - An object containing session ID and messages to save.
     * @returns {Promise<SuccessResponse<boolean> | ErrorResponse>} 
     *          - A promise that resolves to either a success response indicating success or an error response.
     */
    saveChatSession: async (params: SaveChat): Promise<SuccessResponse<boolean> | ErrorResponse> => {
        const token = sessionStorage.getItem('token'); // Retrieve authentication token

        // Security: Validate that the token is present
        if (!token) {
            return { success: false, message: 'No authentication token found' }; // Early return with error
        }

        try {
            const messages = params[1]; // Assuming messages are passed in params

            // Requirement Condition: Check if messages are present before proceeding
            if (!messages || messages.length === 0) {
                return { success: false, message: 'No messages to save' }; // Return error if no messages
            }

            // Remove the greeting message if necessary
            if (messages.length > 0) {
                messages.shift(); // Remove the greeting message
            }

            const response = await fetch(`${API_BASE_URL}/sessions/user/${params[0]}/conversation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                    'Authorization': `Bearer ${token}`, // Include the token in the header
                },
                body: JSON.stringify({
                    conversation: createChatJson(messages), // Convert messages to JSON format
                }),
            });

            // Check if the response indicates failure
            if (!response.ok) {
                return {
                    success: false,
                    message: 'Failed to save chat session', // Provide a meaningful error message
                    code: response.status, // Include HTTP status code
                };
            }

            return {
                success: true,
                data: true, // Indicate that the chat session was saved successfully
                message: 'Chat session saved successfully', // Success message
            };
        } catch (error) {
            console.error('Error saving chat session:', error); // Log the error
            return {
                success: false,
                message: 'An unexpected error occurred while saving chat session', // Inform about unexpected errors
            };
        }
    },
};

export default ChatService;
