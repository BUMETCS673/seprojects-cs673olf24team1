/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Created by Natt
// Updated and Annotated by Tash: Success/Error Messages and Input Requirement Conditions

import PropTypes from 'prop-types'; // Import PropTypes for type checking
import './InputField.css'; // Import styles for the InputField component
import { assets } from '../../assets/assets'; // Import asset resources (e.g., send icon)
import React, { useState } from 'react'; // Import React and useState for managing local state

/**
 * InputField component for handling user input and sending messages.
 * 
 * This component allows users to type a message and send it by clicking
 * the send icon or pressing the 'Enter' key. It includes validation to 
 * ensure that the input is not empty or only whitespace.
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

  // Handle key press event to send message on 'Enter' key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
      handleSend(); // Trigger the send function
    }
  };

  // Handle sending the message
  const handleSend = () => {
    // Requirement Condition: Validate input to prevent empty messages
    if (!input.trim()) { // Check for empty input or only whitespace
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
    <div className="search-box"> {/* Container for input field and send button */}
      <input
        onChange={onChange} // Update input state when the user types
        onKeyDown={handleKeyPress} // Trigger send on 'Enter' key press
        value={input} // Controlled input to reflect current value
        type="text" // Text input for message
        placeholder='Type your message' // Placeholder text for the input
      />
      <div>
        <img
          onClick={handleSend} // Trigger the send function on icon click
          src={assets.send_icon} // Source for the send icon
          width={30} // Set icon width
          alt="Send Icon" // Accessible alt text for the icon
          style={{ opacity: input ? 1 : 0.5, cursor: input ? 'pointer' : 'not-allowed' }} // Change icon opacity and cursor based on input
        />
      </div>
      {/* Display error and success messages */}
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
    </div>
  );
};

// PropTypes for type-checking props passed to InputField component
InputField.propTypes = {
  input: PropTypes.string.isRequired, // Expected input as a string
  onSend: PropTypes.func.isRequired, // Expected onSend as a function
  onChange: PropTypes.func.isRequired, // Expected onChange as a function
};

export default InputField; // Exporting the InputField component for use in other parts of the application
