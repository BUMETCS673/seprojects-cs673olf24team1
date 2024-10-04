/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css';
import { assets } from '../../assets/assets';

const InputField = ({ input, onSend, onChange }) => {
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="search-box">
      <input
        onChange={onChange}
        onKeyDown={handleKeyPress}
        value={input}
        type="text"
        placeholder='Type your message'
      />
      <div>
        <img
          onClick={onSend}
          src={assets.send_icon}
          width={30}
          alt="Send Icon"
          style={{ opacity: input ? 1 : 0.5, cursor: input ? 'pointer' : 'not-allowed' }}
        />
      </div>
    </div>
  );
};

InputField.propTypes = {
  input: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
