/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider';


const NewChatButton = () => {

   const [extended, setExtended] = useState(false);
   const {handleNewChat} = useContext(Context);

   return (
       // <div onClick={()=>handleNewChat()} className="new-chat">
       <div onClick={handleNewChat} className="new-chat">
           <img src={assets.newchat} alt="new chat" /> <p>New Chat</p>
           {/* {extended ? <p>New Chat</p> : null} */}
       </div>
   )
}

export default NewChatButton;