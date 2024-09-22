/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider';

const NewChatButton = () => {

    const [extended, setExtended] = useState(false);
    const {newChat} = useContext(Context);

    return (
        <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.newchat} alt="" /> <p>New Chat</p>
            {/* {extended ? <p>New Chat</p> : null} */}
        </div>
    )
}

export default NewChatButton;
