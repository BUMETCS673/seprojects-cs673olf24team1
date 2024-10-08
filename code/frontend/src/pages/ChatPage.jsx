// eslint-disable-next-line no-unused-vars
// Created by Natt
// Updated and annotated by Natasya Liew

import React from 'react'; // Import React library
import ChatBox from '../components/ChatBox/ChatBox'; // Import the ChatBox component for displaying chat messages
import SideBar from '../components/Sidebar/Sidebar'; // Import the Sidebar component for navigation
import { ChatProvider } from '../context/ChatContext'; // Import ChatProvider for managing chat state context
import '../App.css'; // Import global styles for the application

// ChatPage component which serves as the main container for the chat application
const ChatPage = () => {
    return (
        <ChatProvider> {/* Wraps the chat components to provide context for chat state */}
            <SideBar /> {/* Sidebar for navigation and chat options */}
            <ChatBox /> {/* Main chat interface where messages are displayed */}
        </ChatProvider>
    );
};

export default ChatPage; // Export the ChatPage component for use in other parts of the application
