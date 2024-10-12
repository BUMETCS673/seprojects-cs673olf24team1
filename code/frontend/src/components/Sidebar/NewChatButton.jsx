/* eslint-disable no-unused-vars */
// Created by Natt, Updated by Tash

import React from 'react'; // Import React library
import { assets } from '../../assets/assets'; // Import asset resources (e.g., icons)
import './Sidebar.css'; // Import styles for the Sidebar component
import { useChatService } from '../../hooks/useChatService'; // Use the custom hook for chat service

const NewChatButton = () => {
    const { handleCreateNewSession } = useChatService(); // Use handleCreateNewSession from the chat service

    const handleNewChat = async () => {
        const result = await handleCreateNewSession(); // Call the function to create a new chat session
        if (result && result.code) {
            alert(result.message); // Show error message if creation fails
        } else if (result && result.success) {
            alert(result.message); // Show success message
        }
    };

    return (
        <div onClick={handleNewChat} className="new-chat">
            <img src={assets.newchat} alt="new chat" />
            <p>New Chat</p>
        </div>
    );
};

export default NewChatButton; // Export the NewChatButton component for use in other parts of the application
