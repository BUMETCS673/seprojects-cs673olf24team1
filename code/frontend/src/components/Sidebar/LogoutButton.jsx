/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';

const LogoutButton = () => {

    const handleEndChat = () => {
        console.log("End chat and logout");
        // Implement logout logic (Okta integration later)
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleEndChat}>
            <img src={assets.logout} alt="" />
            <Link to="/" className="logoutButton">
                <p>Logout</p>
            </Link>
            {/* {extended ? <p>Logout</p> : null} */}
        </div>
    )
}

export default LogoutButton;
