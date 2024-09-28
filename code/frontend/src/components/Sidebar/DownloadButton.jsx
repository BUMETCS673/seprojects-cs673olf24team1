/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const DownloadButton = () => {

    const handleDownloadChat = () => {
        console.log("Download chat history link");
        // Generate shareable link (backend needed)
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleDownloadChat}>
            <img src={assets.download} alt="" />
            <p>Download</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    )
}

export default DownloadButton;
