/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const ClearButton = () => {


    const handleClearChatHistory = () => {
        console.log("Clear Chat History");
        // Implement Clear History
    }


    return (
        <div className="bottom-item recent-entry" onClick={handleClearChatHistory}>
            <img src={assets.clear} alt="" />
            <p>Clear</p>
            {/* {extended ? <p>Clear</p> : null} */}
        </div>
    )
}

export default ClearButton;
