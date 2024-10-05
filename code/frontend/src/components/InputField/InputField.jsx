/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'; // Import React library
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import './InputField.css'; // Import styles for the InputField component
import { assets } from '../../assets/assets'; // Import asset resources (e.g., send icon)

// InputField component for handling user input and sending messages
const InputField = ({ input, onSend, onChange }) => {
  
  // Handle key press event to send message on 'Enter' key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
      onSend(); // Trigger the send function
    }
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
          onClick={onSend} // Trigger the send function on icon click
          src={assets.send_icon} // Source for the send icon
          width={30} // Set icon width
          alt="Send Icon" // Accessible alt text for the icon
          style={{ opacity: input ? 1 : 0.5, cursor: input ? 'pointer' : 'not-allowed' }} // Change icon opacity and cursor based on input
        />
      </div>
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
