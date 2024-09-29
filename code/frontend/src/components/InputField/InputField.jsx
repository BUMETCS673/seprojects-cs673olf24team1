 
/* eslint-disable react/prop-types */
 
import React, { useState } from 'react'
import './InputField.css'
import { assets } from '../../assets/assets'

const InputField = ({ onSend }) => {

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);  // Pass the input message to parent component
      setInput('');   // Clear the input field after sending
    }
  };

  return (
    <div className="main-bottom">
      <div className="search-box">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder='Type your message'
        />
        <div>
          {/* <img src={assets.gallery_icon} width={30} alt="Gallery Icon" />
          <img src={assets.mic_icon} width={30} alt="Mic Icon" /> */}
          {/* {input ? <img onClick={handleSend} src={assets.send_icon} width={30} alt="Send Icon" /> : null} */}
          <img onClick={handleSend} src={assets.send_icon} width={30} alt="Send Icon" />
        </div>
      </div>
    </div>
  );
};

export default InputField;

