import { Message } from "../interfaces/Message";
import { User } from "../interfaces/User";

function extractCourseIds(courses: string[]): string[] {
    return courses.map(course => {
        // Match the digits following 'CS'
        const match = course.match(/CS(\d+)/);
        return match ? match[1] : '';
    }).filter(id => id !== ''); // Filter out any empty strings
}

// Mapping function from DisplayUser to ApiUser
export function mapUserToAPIBody(user: User): string {

    return JSON.stringify({
        "authId": user.authId,
        "email": user.email,
        "password": user.password,
        "fName": user.fName,
        "lName": user.lName,
        "programCode": user.programCode,
        "courseTaken": extractCourseIds(user.coursesTaken),
        "pathInterest": user.pathOfInterest,
        "courseToTake": user.coursesToTake,
    });
}


export function createChatJson(messages: Message[]): string {
    const userMessages: string[] = [];
    const botResponses: string[] = [];

    messages.forEach(message => {
        if (message.isUser) {
            userMessages.push(message.text);
        } else {
            botResponses.push(message.text);
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

    return JSON.stringify(combinedMessages);
}

export function parseChatJson(chatJson: string): Message[] {
    const chatList: { "1": string, chatbot: string }[] = JSON.parse(chatJson);
    const messages: Message[] = [];
    let currentDate = new Date(); // Start with the current date

    chatList.forEach(chat => {
        // Push user message with incremented date
        messages.push({
            text: chat["user"], // User message
            isUser: true,
            timestamp: new Date(currentDate) // Assign current date
        });

        // Increment the date for the next message
        currentDate.setMinutes(currentDate.getMinutes() + 1); // Increment by 1 minute for simplicity

        // Push bot response with incremented date
        messages.push({
            text: chat.chatbot, // Bot message
            isUser: false,
            timestamp: new Date(currentDate) // Assign current date
        });

        // Increment the date for the next message
        currentDate.setMinutes(currentDate.getMinutes() + 1);
    });

    return messages;
}


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
    return JSON.stringify([combinedChat], null, 2);
}