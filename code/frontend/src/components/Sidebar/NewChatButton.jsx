/* eslint-disable no-unused-vars */
// Created by Poom and Natt
// Annotated and Updated by Tash: Success/Error Messages

// Import necessary assets and context
import { assets } from '../../assets/assets'; // Import asset resources (e.g., new chat icon)
import './Sidebar.css'; // Import styles for the Sidebar component
import { useChat } from '../../context/chatContext'; // Custom hook for managing chat context

/**
 * NewChatButton component for initiating a new chat session.
 * 
 * This component allows users to create a new chat session. It includes
 * feedback messages to inform users about the success or failure of the operation.
 * 
 * @returns {JSX.Element} The rendered NewChatButton component.
 */
const NewChatButton = () => {
    const { handleCreateNewSession: createNewSession } = useChat(); // Destructure the function to create a new session from the context

    /**
     * Handles the click event to create a new chat session.
     * 
     * This function attempts to create a new chat session and provides
     * feedback based on the success or failure of the operation.
     */
    const handleNewChat = async () => {
        try {
            const success = await createNewSession(); // Attempt to create a new chat session
            if (success) {
                alert('New chat session created successfully!'); // Success message
            } else {
                alert('Failed to create a new chat session. Please try again.'); // Error message
            }
        } catch (error) {
            console.error('Error creating new chat session:', error); // Log error for debugging
            alert('An unexpected error occurred while creating the new chat session.'); // Error message for unexpected errors
        }
    };

    return (
        <div onClick={handleNewChat} className="new-chat"> {/* Button to create a new chat */}
            <img src={assets.newchat} alt="new chat" /> {/* Icon for new chat */}
            <p>New Chat</p> {/* Label for the button */}
        </div>
    );
}

export default NewChatButton; // Exporting the NewChatButton component for use in other parts of the application
