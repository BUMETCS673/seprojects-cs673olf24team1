/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useChat } from '../../context/ChatContext'

const SaveButton = () => {
    const {handleSaveChatSession} = useChat();

    const handleSaveChat = () => {
        console.log('saving chat...')
        handleSaveChatSession();
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleSaveChat}>
            <img src={assets.share} alt="save chat" />
            <p>Save</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    )
}

export default SaveButton;
