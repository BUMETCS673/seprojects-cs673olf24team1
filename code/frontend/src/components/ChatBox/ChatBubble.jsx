// Created by Natt
// Updated by Poom
// Annotated by Tash

// Import necessary assets and styles
import { assets } from '../../assets/assets'; // Importing asset resources (e.g., icons)
import './ChatBubble.css'; // Importing styles specific to the ChatBubble component
import { useChat } from '../../context/ChatContext'; // Importing chat context for accessing chat state

/**
 * ChatBubble component to display individual chat messages.
 * 
 * This component renders a chat message with conditional styling
 * based on whether the message is from the user or the bot.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} props.message - The message object containing text and user status.
 * @returns {JSX.Element} The rendered ChatBubble component.
 */
const ChatBubble = ({ message }) => {
    const { text, isUser } = message; // Destructuring message object to extract text and user status
    const { isSendingMessage } = useChat(); // Accessing sending message status from chat context

    return (
        <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}> {/* Conditional className for styling */}
            <div className="result-title">
                {/* Display user or bot icon based on who sent the message */}
                <img
                    src={isUser ? assets.user_icon : assets.bu_logo} // Use user icon for messages from the user, bot icon otherwise
                    alt={isUser ? "User Icon" : "Bot Icon"} // Accessible alt text for icons
                    className="icon" // CSS class for icon styling
                />
                <p className='text-message'>{text}</p> {/* Display the message text */}
            </div>
        </div>
    );
};

export default ChatBubble; // Exporting the ChatBubble component for use in other parts of the application
