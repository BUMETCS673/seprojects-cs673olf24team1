//Created by Poom
// Annotated by Natasya Liew

// ChatSession interface representing the structure of a chat session in the application
export interface ChatSession {
    id: string;                 // Unique identifier for the chat session
    createdTime: Date;          // The date and time when the chat session was created
}

// Message interface representing the structure of a chat message in the application
export interface Message {
    text: string;                // The content of the message
    timestamp: Date;             // The date and time when the message was sent
    isUser: boolean;             // Flag indicating if the message was sent by the user (true) or the bot/system (false)
}
