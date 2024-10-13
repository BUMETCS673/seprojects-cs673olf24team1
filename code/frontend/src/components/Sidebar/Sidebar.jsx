/* eslint-disable no-unused-vars */

// Created by Natt
// Annotated by Tash

// Import necessary components and styles
import NewChatButton from './NewChatButton'; // Importing button to initiate a new chat
import LogoutButton from './LogoutButton'; // Importing button to log out of the application
import ChatHistory from './ChatHistory'; // Importing component to display chat history
import './Sidebar.css'; // Importing styles for the sidebar component
import DownloadButton from './DownloadButton'; // Importing button for downloading chat data
import SaveButton from './SaveButton'; // Importing button for saving chat data

/**
 * Sidebar component that provides navigation and functionality
 * for managing chat sessions.
 * 
 * This component contains buttons for starting a new chat,
 * viewing chat history, saving chats, downloading data, and logging out.
 * 
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = () => {
    return (
        <div className='sidebar'> {/* Main container for the sidebar */}
            <div className="top"> {/* Top section for new chat and chat history */}
                <NewChatButton /> {/* Button to create a new chat */}
                <ChatHistory /> {/* Component to display the chat history */}
            </div>
            <div className="bottom"> {/* Bottom section for save, download, and logout buttons */}
                <SaveButton /> {/* Button to save the current chat session */}
                <DownloadButton /> {/* Button to download chat data */}
                <LogoutButton /> {/* Button to log out of the application */}
            </div>
        </div>
    );
}

export default Sidebar; // Exporting the Sidebar component for use in other parts of the application
