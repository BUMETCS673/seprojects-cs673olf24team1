/* eslint-disable no-unused-vars */
// Created by Natt
// Updated and Annotated by Tash: Success/Error Messages

// Import necessary styles and assets
import './Sidebar.css'; // Import styles for the Sidebar component
import { assets } from '../../assets/assets'; // Import asset resources (e.g., logout icon)
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAuth } from '../../context/authContext'; // Custom hook for managing authentication context

/**
 * LogoutButton component for logging out the user.
 * 
 * This component allows users to log out of their account. It includes
 * feedback messages to inform users about the success or failure of the operation.
 * 
 * @returns {JSX.Element} The rendered LogoutButton component.
 */
const LogoutButton = () => {
    const navigate = useNavigate(); // Hook for navigation
    const { logout } = useAuth(); // Destructure the logout function from the auth context

    /**
     * Handles the click event to log out the user.
     * 
     * This function attempts to log out the user and navigates
     * to the home page upon successful logout. It also provides
     * feedback based on the outcome of the operation.
     */
    const handleLogout = async () => {
        try {
            const result = await logout(); // Attempt to log out the user
            if (result) {
                alert('Logout successful!'); // Success message
                navigate('/'); // Navigate to the home page
            } else {
                alert('Logout failed. Please try again.'); // Error message for logout failure
            }
        } catch (error) {
            console.error('Error during logout:', error); // Log error for debugging
            alert('An unexpected error occurred while logging out.'); // Error message for unexpected errors
        }
    }

    return (
        <div className="bottom-item recent-entry" onClick={handleLogout}> {/* Button for logging out */}
            <img src={assets.logout} alt="logout" /> {/* Icon for logout */}
            <span className="logoutButton">Logout</span> {/* Label for the button */}
        </div>
    );
}

export default LogoutButton; // Exporting the LogoutButton component for use in other parts of the application
