/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar/Sidebar'
import ChatPage from './pages/ChatPage'
// import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';


const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
    // <>
    //   <Sidebar/>
    //   <ChatPage/>  
    // </>
  )
}

export default App;




/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import { useState } from "react";

// import Message from "./components/MessageBubble";
// import Input from "./components/Input";
// import History from "./components/ChatHistory";
// import Clear from "./components/Clear";

// import "./App.css";

// export default function App() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [history, setHistory] = useState([]);

//   const handleSubmit = async () => {
//     const prompt = {
//       role: "user",
//       content: input,
//     };

//     setMessages([...messages, prompt]);

//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [...messages, prompt],
//       }),
//     })
//       .then((data) => data.json())
//       .then((data) => {
//         const res = data.choices[0].message.content;
//         setMessages((messages) => [
//           ...messages,
//           {
//             role: "assistant",
//             content: res,
//           },
//         ]);
//         setHistory((history) => [...history, { question: input, answer: res }]);
//         setInput("");
//       });
//   };

//   const clear = () => {
//     setMessages([]);
//     setHistory([]);
//   };

//   return (
//     <div className="App">
//       <div className="Column">
//         <h3 className="Title">Chat Messages</h3>
//         <div className="Content">
//           {messages.map((el, i) => {
//             return <Message key={i} role={el.role} content={el.content} />;
//           })}
//         </div>
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onClick={input ? handleSubmit : undefined}
//         />
//       </div>
//       <div className="Column">
//         <h3 className="Title">History</h3>
//         <div className="Content">
//           {history.map((el, i) => {
//             return (
//               <History
//                 key={i}
//                 question={el.question}
//                 onClick={() =>
//                   setMessages([
//                     { role: "user", content: history[i].question },
//                     { role: "assistant", content: history[i].answer },
//                   ])
//                 }
//               />
//             );
//           })}
//         </div>
//         <Clear onClick={clear} />
//       </div>
//     </div>
//   );
// }


// eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ChatPage from './pages/ChatPage';
// import LoginPage from './pages/LoginPage';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/chat" element={<ChatPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// src/App.js
// eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserAuth from './components/UserAuth';
// import ProtectedRoute from './components/ProtectedRoute';
// import ChatPage from './pages/ChatPage';
// import AuthProvider from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       {/* Wrapping the app in BrowserRouter */}
//       <Router>
//         <Routes>
//           <Route path="/login" element={<UserAuth />} />
//           <Route path="/signup" element={<UserAuth />} />
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute>
//                 <ChatPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



// // src/App.js
// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserAuth from './components/UserAuth';
// import ProtectedRoute from './components/ProtectedRoute';
// import ChatPage from './pages/ChatPage';
// import AuthProvider from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Route for login page */}
//           <Route path="/login" element={<UserAuth />} />
          
//           {/* Route for signup page */}
//           <Route path="/signup" element={<UserAuth />} />
          
//           {/* Protected route for chat page */}
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute>
//                 <ChatPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




// // // src/App.js
// // // eslint-disable-next-line no-unused-vars
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import AuthProvider from './context/AuthContext';
// // import UserAuth from './components/UserAuth';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import ChatPage from './pages/ChatPage';
// // import OktaLoginButton from './components/OktaLoginButton';
// // import OktaLogoutButton from './components/OktaLogoutButton';

// // const App = () => {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/login" element={<UserAuth />} />
// //           <Route
// //             path="/chat"
// //             element={
// //               <ProtectedRoute>
// //                 <ChatPage />
// //               </ProtectedRoute>
// //             }
// //           />
// //         </Routes>
// //         <OktaLoginButton />
// //         <OktaLogoutButton />
// //       </Router>
// //     </AuthProvider>
// //   );
// // };

// // export default App;




// // // src/App.js

// // // eslint-disable-next-line no-unused-vars
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import AuthProvider from './context/AuthContext';
// // import UserAuth from './components/UserAuth';
// // import ChatPage from './pages/ChatPage';
// // import ProtectedRoute from './components/ProtectedRoute';

// // const App = () => {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/login" element={<UserAuth />} />
// //           <Route path="/signup" element={<UserAuth />} />
// //           <Route
// //             path="/chat"
// //             element={
// //               <ProtectedRoute>
// //                 <ChatPage />
// //               </ProtectedRoute>
// //             }
// //           />
// //         </Routes>
// //       </Router>
// //     </AuthProvider>
// //   );
// // };

// // export default App;



// // // eslint-disable-next-line no-unused-vars
// // import React from 'react';
// // // import { SecureRoute } from '@okta/okta-react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import ChatPage from './pages/ChatPage';
// // import LoginPage from './pages/LoginPage';

// // function App() {
// //     return (
// //         <Router>
// //             <Routes>
// //                 <Route path="/" element={<LoginPage />} />
// //                 <Route path="/chat" element={<ChatPage />} />
// //                 {/* <Route path="/chat" element={<SecureRoute><ChatPage /></SecureRoute>} /> */}
// //                 {/* Add more routes if needed */}
// //             </Routes>
// //         </Router>
// //     );
// // }

// // export default App;


// // // // eslint-disable-next-line no-unused-vars
// // // import React from 'react';
// // // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // // import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
// // // import OktaAuth from '@okta/okta-auth-js';
// // // import ChatPage from './pages/ChatPage';
// // // import LoginPage from './pages/LoginPage';

// // // // Initialize OktaAuth instance
// // // const oktaAuth = new OktaAuth({
// // //     issuer: 'https://{yourOktaDomain}/oauth2/default',
// // //     clientId: '{yourClientId}',
// // //     redirectUri: window.location.origin + '/login/callback',
// // // });

// // // // Callback function to handle restoring the original URI
// // // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
// // //     window.location.replace(originalUri);
// // // };

// // // function App() {
// // //     return (
// // //         <Router>
// // //             <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
// // //                 <Routes>
// // //                     <Route path="/" element={<LoginPage />} />
// // //                     <Route path="/login/callback" element={<LoginCallback />} />
// // //                     <Route
// // //                         path="/chat"
// // //                         element={
// // //                             <SecureRoute>
// // //                                 <ChatPage />
// // //                             </SecureRoute>
// // //                         }
// // //                     />
// // //                 </Routes>
// // //             </Security>
// // //         </Router>
// // //     );
// // // }

// // // export default App;


// // // // eslint-disable-next-line no-unused-vars
// // // import React from 'react';
// // // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // // import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
// // // import OktaAuth from '@okta/okta-auth-js';
// // // import ChatPage from './pages/ChatPage';
// // // import LoginPage from './pages/LoginPage';

// // // const oktaAuth = new OktaAuth({
// // //     issuer: 'https://{yourOktaDomain}/oauth2/default',
// // //     clientId: '{yourClientId}',
// // //     redirectUri: window.location.origin + '/login/callback',
// // //   });

// // // function App() {
// // //     return (
// // //         <Router>
// // //           <Security oktaAuth={oktaAuth}>
// // //             <Routes>
// // //                 <Route path="/" element={<LoginPage />} />
// // //                 <Route path="/login/callback" element={<LoginCallback />} />
// // //                 <SecureRoute path="/chat" element={<ChatPage />} />
// // //             </Routes>
// // //           </Security>
// // //         </Router>
// // //     );
// // // }

// // // export default App;


// // // import React from 'react';
// // // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // // import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
// // // import OktaAuth from '@okta/okta-auth-js';
// // // import ChatPage from './components/ChatPage';
// // // import LoginPage from './components/LoginPage';
// // // import Header from './components/Header';
// // // import SidePanel from './components/SidePanel';

// // // const oktaAuth = new OktaAuth({
// // //   issuer: 'https://{yourOktaDomain}/oauth2/default',
// // //   clientId: '{yourClientId}',
// // //   redirectUri: window.location.origin + '/login/callback',
// // // });

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Security oktaAuth={oktaAuth}>
// // //         <Routes>
// // //           <Route path="/" element={<LoginPage />} />
// // //           <Route path="/login/callback" element={<LoginCallback />} />
// // //           <SecureRoute path="/chat" element={<ChatLayout />} />
// // //         </Routes>
// // //       </Security>
// // //     </Router>
// // //   );
// // // }

// // // const ChatLayout = () => (
// // //   <div style={{ display: 'grid', gridTemplateRows: '60px auto', height: '100vh' }}>
// // //     <Header />
// // //     <div style={{ display: 'grid', gridTemplateColumns: '250px auto', height: '100%' }}>
// // //       <SidePanel />
// // //       <ChatPage />
// // //     </div>
// // //   </div>
// // // );

// // // export default App;
