/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Sidebar from './components/Sidebar/Sidebar'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App;