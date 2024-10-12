/* eslint-disable no-unused-vars */
// Updated by Tash

import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { assets } from '../../assets/assets'; // Importing asset resources (e.g., icons)
import './ChatBubble.css'; // Importing styles specific to the ChatBubble component

// ChatBubble component to display individual chat messages
const ChatBubble = ({ message }) => {
    const { text, isUser } = message; // Destructuring message object to extract text and user status

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

// PropTypes for type-checking props passed to ChatBubble component
ChatBubble.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string.isRequired, // Expected text as a string
        isUser: PropTypes.bool.isRequired,  // Expected isUser as a boolean
    }).isRequired, // message prop is required
};

export default ChatBubble; // Exporting the ChatBubble component for use in other parts of the application
