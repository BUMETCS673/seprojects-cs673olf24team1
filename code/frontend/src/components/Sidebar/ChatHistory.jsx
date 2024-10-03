/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import Context from '../../context/ContextProvider';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
  const { userId, setRecentPrompt } = useContext(Context);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`/api/chat/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch chat history');
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchChatHistory();
  }, [userId]);

  const handleDeleteHistory = async () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      try {
        const response = await fetch(`/api/chat/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to clear chat history');
        setChatHistory([]); // Clear the chat history in state
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="recent">
      <p className='recent-title'>Chat History</p>
      {error && <p className="error-message">{error}</p>}
      {chatHistory.length > 0 ? (
        <>
          {chatHistory.map((entry, index) => (
            <div key={index} className="recent-entry-history" onClick={() => setRecentPrompt(entry.message)}>
              <img src={assets.message_icon} alt="" />
              <p>{entry.message} <span>{new Date(entry.timestamp).toLocaleString()}</span></p>
            </div>
          ))}
          <Link onClick={handleDeleteHistory}>
            <img src={assets.clear} alt="clear" />
          </Link>
        </>
      ) : (
        <p>No chat history available.</p>
      )}
    </div>
  );
}

export default ChatHistory;


// /* eslint-disable no-unused-vars */
// import React, { useContext, useState, useEffect } from 'react';
// import './Sidebar.css';
// import { assets } from '../../assets/assets';
// import { Context } from '../../context/ContextProvider';
// import { Link } from 'react-router-dom';

// const ChatHistory = () => {
//   const { userId, onSent, setRecentPrompt } = useContext(Context);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await fetch(`/api/chat/${userId}`);
//         if (!response.ok) throw new Error('Failed to fetch chat history');
//         const data = await response.json();
//         setChatHistory(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchChatHistory();
//   }, [userId]);

//   const handleDeleteHistory = async () => {
//     if (window.confirm("Are you sure you want to clear your chat history?")) {
//       try {
//         const response = await fetch(`/api/chat/${userId}`, {
//           method: 'DELETE',
//         });
//         if (!response.ok) throw new Error('Failed to clear chat history');
//         setChatHistory([]);
//       } catch (error) {
//         setError(error.message);
//       }
//     }
//   };

//   return (
//     <div className="recent">
//       <p className='recent-title'>Chat History</p>
//       {error && <p className="error-message">{error}</p>}
//       {chatHistory.length > 0 ? (
//         chatHistory.map((entry, index) => (
//           <div key={index} className="recent-entry-history" onClick={() => setRecentPrompt(entry.message)}>
//             <img src={assets.message_icon} alt="" />
//             <p>{entry.message} <span>{new Date(entry.timestamp).toLocaleString()}</span></p>
//           </div>
//         ))
//       ) : (
//         <p>No chat history available.</p>
//       )}
      
//       <Link onClick={handleDeleteHistory}><img src={assets.clear} alt="clear" /></Link>
//     </div>
//   );
// }

// export default ChatHistory;


// // /* eslint-disable no-unused-vars */
// // import React, { useContext, useState } from 'react';
// // import './Sidebar.css';
// // import { assets } from '../../assets/assets';
// // import { Context } from '../../context/ContextProvider';

// // const ChatHistory = () => {
// //   const [extended, setExtended] = useState(false);
// //   const { prevPrompts, onSent, setRecentPrompt } = useContext(Context);

// //   const loadPrompt = async (prompt) => {
// //     await onSent(prompt);
// //     setRecentPrompt(prompt);
// //   };

// //   return (
// //     <div className="recent">
// //       <p className='recent-title'>Chat History</p>
// //       {Array.isArray(prevPrompts) && prevPrompts.length > 0 ? (
// //         prevPrompts.map((item, index) => (
// //           <div key={index} onClick={() => loadPrompt(item)} className="recent-entry-history">
// //             <img src={assets.message_icon} alt="" />
// //             <p>{item.slice(0, 10)} {"..."}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p>No chat history available.</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default ChatHistory;
