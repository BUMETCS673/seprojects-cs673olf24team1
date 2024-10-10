import React from 'react'; // Importing React library
import PropTypes from 'prop-types'; // Importing PropTypes for props validation
import { assets } from '../../assets/assets'; // Importing asset resources (e.g., icons)
import './ChatBubble.css'; // Importing styles specific to the ChatBubble component
// import { useChat } from '../../context/ChatContext'; // Remove Unused Variables 

// ChatBubble component to display individual chat messages
const ChatBubble = ({ message }) => {
    const { text, isUser } = message; // Destructuring message object to extract text and user status
    // const { isSendingMessage } = useChat(); // Remove Unused Variables 

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

// Natt: Adding prop types for validation
ChatBubble.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string.isRequired, // text should be a required string
        isUser: PropTypes.bool.isRequired, // isUser should be a required boolean
    }).isRequired, // message should be a required object
};

export default ChatBubble; // Exporting the ChatBubble component for use in other parts of the application

