/* eslint-disable no-unused-vars */
// Created by Poom and Natt
// Updated and Annotated by Tash: Success/Error Message

// Import necessary styles and assets
import './Sidebar.css'; // Import styles for the Sidebar component
import { assets } from '../../assets/assets'; // Import asset resources (e.g., save chat icon)
import { useChat } from '../../context/ChatContext'; // Custom hook for managing chat context

/**
 * SaveButton component for saving the current chat session.
 * 
 * This component allows users to save their current chat session to history.
 * It includes validation and feedback messages for the save operation.
 * 
 * @returns {JSX.Element} The rendered SaveButton component.
 */
const SaveButton = () => {
    const { handleSaveChatSession } = useChat(); // Destructure the function to save chat session from the context

    /**
     * Handles the click event to save the chat session.
     * 
     * This function checks if the chat session can be saved and provides
     * feedback to the user based on the success or failure of the operation.
     */
    const handleSaveChat = async () => {
        try {
            const success = await handleSaveChatSession(); // Attempt to save the chat session
            if (success) {
                alert('Chat session saved successfully!'); // Success message
            } else {
                alert('Failed to save chat session. Please try again.'); // Error message
            }
        } catch (error) {
            console.error('Error saving chat session:', error); // Log error for debugging
            alert('An unexpected error occurred while saving the chat session.'); // Error message for unexpected errors
        }
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleSaveChat}>
            <img src={assets.share} alt="save chat" /> {/* Icon for saving chat */}
            <p>Save to History</p> {/* Label for the button */}
        </div>
    );
}

export default SaveButton; // Exporting the SaveButton component for use in other parts of the application
