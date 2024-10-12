// eslint-disable-next-line no-unused-vars
// Created by Natt
// Updated and annotated by Natasya Liew

import React from 'react'; // Import React library
import ChatBox from '../components/ChatBox/ChatBox'; // Import the ChatBox component for displaying chat messages
import Sidebar from '../components/Sidebar/Sidebar'; // Import the Sidebar component for navigation
import { useUserService } from '../hooks/useUserService'; // Import useUserService for user-related functions
import '../App.css'; // Import global styles for the application

// ChatPage component which serves as the main container for the chat application
const ChatPage = () => {
    const { logoutUser } = useUserService(); // Get logoutUser from useUserService

    // Handle logout functionality
    const handleLogout = async () => {
        const result = await logoutUser(); // Call the logout function
        if (result && 'code' in result) {
            alert(result.message); // Show error message if logout fails
        } else {
            alert('Successfully logged out.'); // Optionally add success message handling
        }
    };

    return (
        <div className="chat-page">
            <Sidebar handleLogout={handleLogout} /> {/* Pass handleLogout to Sidebar */}
            <ChatBox /> {/* Main chat interface where messages are displayed */}
        </div>
    );
};

export default ChatPage; // Export the ChatPage component for use in other parts of the application
