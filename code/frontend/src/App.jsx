/* eslint-disable no-unused-vars */
// Created by Natt, updated by Poom and Natasya Liew

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import store from '../store/store'; // Import your Redux store

const PrivateRoute = ({ children }) => {
  const jwtToken = useSelector((state) => state.auth.jwtToken); // Get JWT token from the Redux store

  return jwtToken ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const App = () => {
  return (
    <Provider store={store}> {/* Wrap the application with Provider and pass the store */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/chat" 
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
