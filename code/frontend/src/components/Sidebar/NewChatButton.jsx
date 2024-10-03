/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'


const NewChatButton = ({handleNewChat}) => {

    return (
        <div onClick={handleNewChat} className="new-chat">
            <img src={assets.newchat} alt="new chat" /> <p>New Chat</p>
        </div>
    )
}

export default NewChatButton;