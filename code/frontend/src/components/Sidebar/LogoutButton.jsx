/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';

const LogoutButton = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { setConversations, setRecentPrompt, setInput } = useContext(Context); // Context values


    const handleEndChat = async () => {
        console.log("End chat and logout");
        // Implement logout logic (Okta integration later)

        try {
            // Implement logout logic (connect to backend)
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies for session if needed
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Clear session data
            setConversations([]); // Clear chat history
            setRecentPrompt(''); // Clear recent prompt
            setInput(''); // Clear input field

            // Redirect to login page
            navigate('/login'); // Navigate to the login screen

            // Optionally, show a confirmation message (you can integrate a toast notification here)
            alert('You have successfully logged out.');
        } catch (error) {
            console.error('Logout error:', error);
            alert('An error occurred while logging out. Please try again.');
        }
    };
    return (
        <div className="bottom-item recent-entry" onClick={handleEndChat}>
            <img src={assets.logout} alt="logout" />
            <Link to="/" className="logoutButton">
                <p>Logout</p>
            </Link>
            {/* {extended ? <p>Logout</p> : null} */}
        </div>
    )
}

export default LogoutButton;
