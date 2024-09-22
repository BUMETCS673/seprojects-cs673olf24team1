/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const LogoutButton = () => {

    const handleEndChat = () => {
        console.log("End chat and logout");
        // Implement logout logic (Okta integration later)
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleEndChat}>
            <img src={assets.logout} alt="" />
            <p>Logout</p>
            {/* {extended ? <p>Logout</p> : null} */}
        </div>
    )
}

export default LogoutButton;
