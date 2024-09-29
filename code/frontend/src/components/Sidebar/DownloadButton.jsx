/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider';

const DownloadButton = () => {
    const { downloadChatHistory } = useContext(Context);

    const handleDownloadChat = () => {
        console.log("Download chat history link");
        // Generate shareable link (backend needed)
        downloadChatHistory();  // Call the function to download chat history
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleDownloadChat}>
            <img src={assets.download} alt="download" />
            <p>Download</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    )
}

export default DownloadButton;
