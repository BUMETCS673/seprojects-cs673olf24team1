/* eslint-disable no-unused-vars */
// Created by Natt
// Updated by Poom
// Updated and Annotated by Tash: Success/Error Message and Input Requirements

import React, { useState } from 'react'; // Import necessary React hooks
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import '../InputField/InputField.css'; // Import styles for the InputField component

/**
 * InputField component for sending messages in the chat application.
 * 
 * This component allows users to type messages and send them to the chat.
 * It includes validation to prevent empty inputs or inputs consisting solely of spaces.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.input - The current value of the input field.
 * @param {Function} props.onSend - Function to handle sending the message.
 * @param {Function} props.onChange - Function to handle changes in the input field.
 * @returns {JSX.Element} The rendered InputField component.
 */
const InputField = ({ input, onSend, onChange }) => {
    const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages
    const [successMessage, setSuccessMessage] = useState(''); // State for storing success messages

    // Handle sending the message
    const handleSend = () => {
        // Requirement Condition: Validate input to prevent empty messages
        if (!input || !input.trim()) { // Check for empty input or only whitespace
            setErrorMessage('Message cannot be empty or just spaces.'); // Set error message
            setSuccessMessage(''); // Clear success message if there's an error
            return; // Exit the function if validation fails
        }

        // Clear any previous messages
        setErrorMessage(''); // Clear error message
        setSuccessMessage('Message sent successfully!'); // Set success message
        onSend(); // Call the function to send the message
    };

    return (
        <div className="input-field-container"> {/* Container for the input field */}
            <input
                type="text" // Input field for typing messages
                placeholder="Type your message..." // Placeholder text
                value={input} // Controlled input value
                onChange={onChange} // Handle input changes
                onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send message on Enter key press
            />
            <button onClick={handleSend}>Send</button> {/* Button to send the message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
        </div>
    );
};

// Prop validation for the InputField component
InputField.propTypes = {
    input: PropTypes.string.isRequired, // Input field value
    onSend: PropTypes.func.isRequired, // Function to handle sending messages
    onChange: PropTypes.func.isRequired, // Function to handle input changes
};

export default InputField; // Exporting the InputField component for use in other parts of the application
