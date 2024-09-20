// src/pages/ChatPage.js

// eslint-disable-next-line no-unused-vars
// import React from 'react';
// import Header from '../components/Header';
// import ChatBox from '../components/ChatBox';
// import '../assets/styles/ChatPage.css';

// const ChatPage = () => {
//   return (
//     <div className="chat-page">
//       <Header />
//       <ChatBox />
//     </div>
//   );
// };

// export default ChatPage;



// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import ChatHistory from '../components/ChatHistory';
// import InputField from '../components/InputField';
// import { useNavigate } from 'react-router-dom';

// // Connect to WebSocket server
// const socket = io('http://localhost:4000'); // Your WebSocket server URL

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // For logout navigation

//   useEffect(() => {
//     // Listen for bot responses from the server
//     socket.on('botResponse', (response) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: response.text },
//       ]);
//       setLoading(false);
//     });

//     // Clean up WebSocket connection when the component unmounts
//     return () => {
//       socket.off('botResponse');
//     };
//   }, []);

//   // Function to handle sending messages
//   const handleSendMessage = (userMessage) => {
//     if (!userMessage.trim()) return;

//     // Add user message to the chat history
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: userMessage },
//     ]);

//     // Emit the user message to the server
//     socket.emit('userMessage', { text: userMessage });

//     // Set loading state while waiting for bot response
//     setLoading(true);
//   };

//   // Function to end chat (clear all messages)
//   const handleEndChat = () => {
//     setMessages([]); // Clear chat history
//   };

//   // Function to print the chat
//   const handlePrintChat = () => {
//     window.print(); // Trigger browser print dialog
//   };

//   // Function to share chat history via email
//   const handleShareChat = () => {
//     const chatHistory = messages.map((msg) => `${msg.sender}: ${msg.text}`).join('\n');
//     const emailSubject = encodeURIComponent("Chat History");
//     const emailBody = encodeURIComponent(chatHistory);

//     window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Clear session storage or any authentication tokens
//     sessionStorage.clear();
//     // Navigate to login page
//     navigate('/login');
//   };

//   return (
//     <div className="chat-page">
//       <header>
//         <h1>ChatBot</h1>
//         <div className="header-buttons">
//           <button onClick={handleEndChat}>End Chat</button>
//           <button onClick={handlePrintChat}>Print Chat</button>
//           <button onClick={handleShareChat}>Share via Email</button>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       </header>

//       <ChatHistory messages={messages} loading={loading} />
//       <InputField onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatPage;




// src/pages/ChatPage.js
// src/pages/ChatPage.js (Long-polling version)

// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import ChatHistory from '../components/ChatHistory';
// import InputField from '../components/InputField';
// import { fetchMessages, sendMessage } from '../services/chatService'; // Axios services

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch new messages periodically (every 5 seconds)
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const newMessages = await fetchMessages();
//       setMessages(newMessages);
//     }, 5000); // Poll every 5 seconds

//     return () => clearInterval(interval); // Clear the interval on unmount
//   }, []);

//   const handleSendMessage = async (userMessage) => {
//     if (!userMessage.trim()) return;

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: userMessage },
//     ]);

//     setLoading(true);

//     // Send user message and receive bot response
//     await sendMessage(userMessage);

//     // Stop loading spinner
//     setLoading(false);
//   };

//   return (
//     <div className="chat-page">
//       <ChatHistory messages={messages} loading={loading} />
//       <InputField onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatPage;




// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import ChatHistory from '../components/ChatHistory';
// import InputField from '../components/InputField';

// const socket = io('http://localhost:4000'); // Connect to your backend WebSocket server

// const ChatPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Listen for bot responses from the server
//     socket.on('botResponse', (response) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: response.text },
//       ]);
//       setLoading(false);
//     });

//     // Clean up the socket connection when the component unmounts
//     return () => {
//       socket.off('botResponse');
//     };
//   }, []);

//   // Function to handle sending messages
//   const handleSendMessage = (userMessage) => {
//     if (!userMessage.trim()) return;

//     // Add user message to the chat history
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: userMessage },
//     ]);

//     // Emit the user message to the server
//     socket.emit('userMessage', { text: userMessage });

//     // Set loading state while waiting for bot response
//     setLoading(true);
//   };

//   return (
//     <div className="chat-page">
//       <ChatHistory messages={messages} loading={loading} />
//       <InputField onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatPage;




// // src/pages/ChatPage.js
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import Header from '../components/Header';
// import ChatBox from '../components/ChatBox';
// import InputField from '../components/InputField';
// import '../App.css'; // Use this or your CSS file

// const ChatPage = () => {
//     const [messages, setMessages] = useState([]);

//     const handleSendMessage = (message) => {
//         if (message.trim()) {
//             const newMessage = { sender: 'User', text: message, time: new Date().toLocaleTimeString() };
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         }
//     };

//     return (
//         <div className="chat-page-container">
//             <Header />
//             <div className="chat-content">
//                 <ChatBox messages={messages} />
//                 <InputField onSendMessage={handleSendMessage} />
//             </div>
//         </div>
//     );
// };

// export default ChatPage;


// eslint-disable-next-line no-unused-vars
import React from 'react';
// import Header from '../components/Header';
import ChatBox from '../components/ChatBox/ChatBox';
import SideBar from '../components/Sidebar/Sidebar';
// import InputField from '../components/InputField';
// import '..assets/styles/ChatPage.css'; // Custom styles for this page
import '../App.css';

const ChatPage = () => {
    return (
        <>
            <SideBar />
            <ChatBox />
        </>
    );
};

export default ChatPage;
// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
// import Sidebar from './components/Sidebar/Sidebar'
// import ChatPage from './components/ChatPage/ChatPage'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import ChatPage from './pages/ChatPage';
// import LoginPage from './pages/LoginPage';


// const App = () => {


//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/chat" element={<ChatPage />} />
//       </Routes>
//     </Router>
//     // <>
//     //   <Sidebar/>
//     //   <ChatPage/>  
//     // </>
//   )
// }

// export default App;

// eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, TextField, Box, Paper } from '@mui/material';

// const ChatPage = () => {
//   const [userMessage, setUserMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [error, setError] = useState('');

//   // Load chat history from local storage on page load
//   useEffect(() => {
//     const cachedHistory = localStorage.getItem('chatHistory');
//     if (cachedHistory) {
//       setChatHistory(JSON.parse(cachedHistory));
//     }
//   }, []);

//   const sendMessage = async () => {
//     if (!userMessage.trim()) {
//       setError('Message cannot be empty');
//       return;
//     }

//     try {
//       // Send user message to backend API
//       const response = await axios.post('/api/chat', { message: userMessage });

//       // Update chat history
//       const updatedHistory = [
//         ...chatHistory,
//         { user: 'User', text: userMessage },
//         { user: 'Bot', text: response.data.reply },
//       ];
//       setChatHistory(updatedHistory);
//       setUserMessage('');

//       // Cache the chat history
//       localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       setError('Failed to send message');
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Paper elevation={3} style={{ padding: 20, width: '80%' }}>
//         <Box style={{ height: '400px', overflowY: 'scroll', marginBottom: '20px' }}>
//           {chatHistory.map((msg, index) => (
//             <Box key={index} style={{ textAlign: msg.user === 'User' ? 'right' : 'left' }}>
//               <strong>{msg.user}</strong>: {msg.text}
//             </Box>
//           ))}
//         </Box>

//         {/* Message Input */}
//         <TextField
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           fullWidth
//           placeholder="Type your message..."
//           variant="outlined"
//           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//         />
//         <Button onClick={sendMessage} variant="contained" color="primary" style={{ marginTop: 10 }}>
//           Send
//         </Button>

//         {error && <Box style={{ color: 'red', marginTop: 10 }}>{error}</Box>}
//       </Paper>
//     </Box>
//   );
// };

// export default ChatPage;
