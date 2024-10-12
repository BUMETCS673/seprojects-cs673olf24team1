/* eslint-disable no-unused-vars */
//Updated by Tash

import React from 'react'; // Import React library
import './Sidebar.css'; // Import styles for the Sidebar component
import { assets } from '../../assets/assets'; // Import asset resources (e.g., icons)
import { useChatService } from '../../hooks/useChatService'; // Import the custom hook for chat-related functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LogoutButton = () => {
    const navigate = useNavigate(); // Get navigate function from react-router
    const { logoutUser } = useChatService(); // Get logout function from useChatService

    const handleLogoutClick = async () => {
        const result = await logoutUser(); // Call logoutUser function
        if (result && result.code) {
            // If there's an error, log the error message
            console.error(result.message);
            alert(result.message); // Optionally, show an alert with the error message
        } else {
            // If logout is successful, navigate to the home page
            alert('Successfully logged out.'); // Optionally, show a success message
            navigate('/'); // Navigate to the home page
        }
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleLogoutClick}>
            <img src={assets.logout} alt="logout" /> {/* Logout icon */}
            <span className="logoutButton">Logout</span> {/* Logout text */}
        </div>
    );
};

export default LogoutButton; // Export the LogoutButton component for use in other parts of the application