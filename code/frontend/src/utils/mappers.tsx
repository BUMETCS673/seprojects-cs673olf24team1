// mappers.jsx
// Created by Poom
// Annotated and Updated by Tash

import { Message } from "../interfaces/ChatSession"; // Importing the Message interface
import { User } from "../interfaces/UserSession"; // Importing the User interface

/**
 * Extracts course IDs from an array of course names.
 * 
 * @param {string[]} courses - Array of course names.
 * @returns {string[]} - Array of extracted course IDs.
 */
function extractCourseIds(courses: string[]): string[] {
    return courses.map(course => {
        // Match the digits following 'CS'
        const match = course.match(/CS(\d+)/);
        return match ? match[1] : '';
    }).filter(id => id !== ''); // Filter out any empty strings
}

/**
 * Maps User object to API request body format.
 * 
 * @param {User} user - User object to map.
 * @returns {string} - JSON string of the mapped user data for API request.
 */
export function mapUserToAPIBody(user: User): string {
    // Requirement Condition: Ensure that user has necessary properties
    if (!user.authId || !user.email || !user.password || !user.fName || !user.lName) {
        throw new Error('User object is missing required fields.'); // Error message for missing fields
    }

    return JSON.stringify({
        "authId": user.authId,
        "email": user.email,
        "password": user.password,
        "fName": user.fName,
        "lName": user.lName,
        "programCode": user.programCode,
        "courseTaken": extractCourseIds(user.coursesTaken), // Extract course IDs
        "pathInterest": user.pathOfInterest,
        "courseToTake": user.coursesToTake,
    });
}

/**
 * Creates a JSON string from an array of messages, separating user and bot responses.
 * 
 * @param {Message[]} messages - Array of messages to convert.
 * @returns {string} - JSON string of combined messages.
 */
export function createChatJson(messages: Message[]): string {
    const userMessages: string[] = [];
    const botResponses: string[] = [];

    messages.forEach(message => {
        if (message.isUser) {
            userMessages.push(message.text); // Collect user messages
        } else {
            botResponses.push(message.text); // Collect bot responses
        }
    });

    const combinedMessages: any = [];

    // Combine user messages and chatbot responses
    for (let i = 0; i < Math.min(botResponses.length, userMessages.length); i++) {
        combinedMessages.push({
            user: userMessages[i],
            chatbot: botResponses[i],
        });
    }

    return JSON.stringify(combinedMessages); // Return JSON string of combined messages
}

/**
 * Parses a JSON string into an array of Message objects.
 * 
 * @param {string} chatJson - JSON string representing chat messages.
 * @returns {Message[]} - Array of parsed Message objects.
 */
export function parseChatJson(chatJson: string): Message[] {
    const chatList: { "1": string, chatbot: string }[] = JSON.parse(chatJson); // Parse JSON string
    const messages: Message[] = [];
    let currentDate = new Date(); // Start with the current date

    chatList.forEach(chat => {
        // Push user message with incremented date
        messages.push({
            text: chat["user"], // User message
            isUser: true,
            timestamp: new Date(currentDate), // Assign current date
        });

        // Increment the date for the next message
        currentDate.setMinutes(currentDate.getMinutes() + 1); // Increment by 1 minute for simplicity

        // Push bot response with incremented date
        messages.push({
            text: chat.chatbot, // Bot message
            isUser: false,
            timestamp: new Date(currentDate), // Assign current date
        });

        // Increment the date for the next message
        currentDate.setMinutes(currentDate.getMinutes() + 1);
    });

    return messages; // Return array of Message objects
}

/**
 * Parses a chat log input string into a structured JSON string.
 * 
 * @param {string} input - Input string containing chat log.
 * @returns {string} - Formatted JSON string of combined chat messages.
 */
function parseChatLog(input: string): string {
    // Parse the input string to an array of objects
    const chatArray = JSON.parse(input) as Array<{ [key: string]: string }>;

    // Initialize an object to hold the combined chat messages
    const combinedChat: { [key: string]: string } = {};

    // Iterate through each chat object in the array
    for (const chat of chatArray) {
        for (const [key, value] of Object.entries(chat)) {
            combinedChat[key] = value as string; // Assert value as string
        }
    }

    // Convert the combined chat object back to a JSON string
    return JSON.stringify([combinedChat], null, 2); // Return formatted JSON string
}
