/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const ShareButton = () => {

    const handleShareChat = () => {
        console.log("Share chat history link");
        // Generate shareable link (backend needed)
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleShareChat}>
            <img src={assets.share} alt="" />
            <p>Share</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    )
}

export default ShareButton;
