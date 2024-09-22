/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const EmailButton = () => {

    const handleEmailChat = () => {
        console.log("Email chat history");
        // Open email modal (to be implemented)
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleEmailChat}>
            <img src={assets.email} alt="" />
            <p>Email</p>
            {/* {extended ? <p>Email</p> : null} */}
        </div>
    )
}

export default EmailButton;
