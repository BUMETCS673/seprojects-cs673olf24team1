/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { useChat } from '../../context/ChatContext'


const NewChatButton = () => {

    const { handleCreateNewSession: createNewSession } = useChat();

    const handleNewChat = () => {
        createNewSession();
    }

    return (
        <div onClick={handleNewChat} className="new-chat">
            <img src={assets.newchat} alt="new chat" /> <p>New Chat</p>
        </div>
    )
}

export default NewChatButton;