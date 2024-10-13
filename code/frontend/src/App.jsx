/* eslint-disable no-unused-vars */
// Create by Natt
// Annotated by Tash

// Import necessary components and libraries
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing Router and routing components from React Router
import ChatPage from './pages/ChatPage'; // Importing the ChatPage component for chat functionality
import LoginPage from './pages/LoginPage'; // Importing the LoginPage component for user login
import SignupPage from './pages/SignupPage'; // Importing the SignupPage component for user registration

/**
 * App component that sets up routing for the application.
 * 
 * This component uses React Router to define the different routes available in the application,
 * allowing users to navigate between the login, signup, and chat pages.
 * 
 * @returns {JSX.Element} The rendered App component with defined routes.
 */
const App = () => {
  return (
    <Router> {/* Router component to manage routing */}
      <Routes> {/* Container for Route components */}
        <Route path="/" element={<LoginPage />} /> {/* Default route for the login page */}
        <Route path="/login" element={<LoginPage />} /> {/* Route for the login page */}
        <Route path="/signup" element={<SignupPage />} /> {/* Route for the signup page */}
        <Route path="/chat" element={<ChatPage />} /> {/* Route for the chat page */}
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component for use in other parts of the application
