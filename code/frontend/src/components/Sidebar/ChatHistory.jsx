/* eslint-disable no-unused-vars */
// Created by Natt
// Updated by Tash

import { assets } from '../../assets/assets'; // Import asset resources (e.g., icons)
import { useChatService } from '../../hooks/useChatService'; // Use the custom hook for chat service
import './Sidebar.css'; // Import styles for the Sidebar component

const ChatHistory = () => {
  const {
    getSessionHistory,
    sessionHistory, // Updated from history to sessionHistory
    isFetchingNetworkData,
    error,
    selectedSession,
    deleteSessionHistory,
    getMessageHistory,
  } = useChatService(); // Use the chat service hook

  // Handle deletion of chat history
  const handleDeleteHistory = async (sessionId) => { // Renamed id to sessionId for clarity
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      const result = await deleteSessionHistory(sessionId); // Call deleteSessionHistory
      if (result && result.code) {
        alert(result.message); // Show error message if deletion fails
      } else {
        alert('Chat history deleted successfully.'); // Success message
        // Optionally, refresh the chat history
        await getSessionHistory(); // Refresh history without needing userId
      }
    }
  };

  return (
    <div className="recent">
      <p className='recent-title'>Chat History</p>
      {error && <p className="error-message">{error.message}</p>} {/* Display error message */}

      {/* Show loading indicator when fetching data */}
      {isFetchingNetworkData ? (
        <p>Loading chat history...</p>
      ) : sessionHistory.length > 0 ? ( // Updated to use sessionHistory
        <>
          {sessionHistory
            .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime)) // Sort by createdTime (latest first)
            .map((session) => (
              <div
                key={session.sessionId} // Updated to use sessionId
                className={`recent-entry-history ${selectedSession === session.sessionId ? 'active' : ''}`}
                onClick={() => getMessageHistory(session.sessionId)} // Fetch messages for the selected session
              >
                <img src={assets.message_icon} alt="Message icon" />
                <span>{session.createdTime.toUTCString()}</span> {/* Convert to UTC string */}
                <div onClick={(e) => { e.stopPropagation(); handleDeleteHistory(session.sessionId); }}>
                  <img src={assets.clear} alt="Clear chat history" />
                </div>
              </div>
            ))}
        </>
      ) : (
        <p>No chat history available.</p> // Message when no history exists
      )}
    </div>
  );
};

export default ChatHistory; // Export the ChatHistory component for use in other parts of the application
