/* eslint-disable no-unused-vars */
// Created by Natt
// Annotated and Updated by Tash: Success/Error Message, added details and requirement checks

import { assets } from '../../assets/assets'; // Import asset resources (e.g., icons)
import { useChat } from '../../context/chatContext'; // Custom hook for managing chat context

/**
 * SaveChatButton component for saving the chat history as a PDF document.
 * 
 * This component triggers the saving of the chat history, provides feedback
 * messages to the user regarding the success or failure of the operation,
 * and includes necessary checks before attempting to save.
 * 
 * @returns {JSX.Element} The rendered SaveChatButton component.
 */
const SaveChatButton = () => {
    const { chatHistory } = useChat(); // Access chat history from the chat context

    /**
     * Handles the click event to save the chat history.
     * 
     * This function checks if there is chat history available before attempting to save it.
     * It generates a filename with a timestamp and provides feedback messages for success or failure.
     */
    const handleSaveChatHistory = async () => {
        // Requirement Condition: Check if there is chat history to save
        if (!chatHistory || chatHistory.length === 0) {
            alert('No chat history available to save.'); // Error message for no chat history
            return; // Exit the function if there is no history
        }

        try {
            // Generate a timestamp for the filename
            const timestamp = new Date().toISOString().replace(/:/g, '-'); // Replace colons with dashes for filename compatibility
            const filename = `chat_history_${timestamp}.pdf`; // Create the filename

            // Implement your logic to save the chat history as a PDF
            // For example, you could use a library like jsPDF to generate the PDF document
            const doc = new jsPDF(); // Create a new PDF document

            // Add chat history content to the PDF
            chatHistory.forEach((message, index) => {
                doc.text(`${index + 1}. ${message.text}`, 10, 10 + index * 10); // Example of adding messages
            });

            // Save the PDF with the generated filename
            doc.save(filename); // Save the document

            alert('Chat history saved successfully!'); // Success message
        } catch (error) {
            console.error('Error saving chat history:', error); // Log error for debugging
            alert('Failed to save chat history. Please try again.'); // Error message for saving failure
        }
    };

    return (
        <div onClick={handleSaveChatHistory} className="save-chat-button"> {/* Button to save chat history */}
            <img src={assets.save_icon} alt="Save Chat" /> {/* Icon for saving chat */}
            <span>Save Chat History</span> {/* Label for the button */}
        </div>
    );
};

export default SaveChatButton; // Exporting the SaveChatButton component for use in other parts of the application
