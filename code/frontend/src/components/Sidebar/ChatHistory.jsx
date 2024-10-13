/* eslint-disable no-unused-vars */
// Created by Natt
// Updated and Annotated by Tash: Move functions to the Chat Context page 

// Import necessary assets and context
import { assets } from '../../assets/assets'; // Import asset resources (e.g., icons)
import { useChat } from '../../context/chatContext'; // Custom hook for managing chat context
import './Sidebar.css'; // Import styles for the Sidebar component

/**
 * ChatHistory component displays the user's chat history.
 * 
 * This component fetches and presents chat sessions, allowing users
 * to select a session or delete history. It includes feedback for 
 * loading states, errors, and successful actions.
 * 
 * @returns {JSX.Element} The rendered ChatHistory component.
 */
const ChatHistory = () => {
  // Destructure values and functions from the chat context
  const {
    history, // Array of chat session history
    isFetchingNetworkData, // Boolean indicating if data is being fetched
    error, // Error messages if any
    selectedSession, // ID of the currently selected session
    handleDeleteSessionHistory, // Function to handle deleting session history
    handleSelectSession, // Function to handle selecting a session
    handleDeleteHistory // Handles deletion of a session history
  } = useChat(); // Accessing the chat context

  

  return (
    <div className="recent"> {/* Main container for chat history */}
      <p className='recent-title'>Chat History</p>
      {error && <p className="error-message">{error}</p>} {/* Display error message if present */}

      {/* Show loading indicator when fetching data */}
      {isFetchingNetworkData ? (
        <p>Loading chat history...</p> // Loading message
      ) : history.length > 0 ? (
        <>
          {history
            .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)) // Sort by createdTime (latest first)
            .map((session) => (
              <div
                key={session.id}
                className={`recent-entry-history ${selectedSession === session.id ? 'active' : ''}`}
                onClick={() => handleSelectSession(session.id)} // Select the session on click
              >
                <img src={assets.message_icon} alt="Chat Icon" /> {/* Icon for the chat session */}
                <span>{new Date(session.createdTime).toUTCString()}</span> {/* Convert to UTC string */}
                <div onClick={(e) => { e.stopPropagation(); handleDeleteHistory(session.id); }}> {/* Stop click propagation for delete */}
                  <img src={assets.clear} alt="Clear" /> {/* Clear icon */}
                </div>
              </div>
            ))}
        </>
      ) : (
        <p>No chat history available.</p> // Message when no chat history is present
      )}
    </div>
  );
}

export default ChatHistory; // Exporting the ChatHistory component for use in other parts of the application
