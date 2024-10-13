// Created by Natt
// Annotated by Tash

// import { StrictMode } from 'react'; // Uncomment if you want to enable StrictMode for development
import { createRoot } from 'react-dom/client'; // Importing createRoot for rendering the application
import App from './App.jsx'; // Importing the main application component
import ContextProvider from './pages/ContextProvider'; // Importing the context provider for managing state
import './index.css'; // Importing global styles for the application

/**
 * Main entry point for the React application.
 * 
 * This function initializes the application by rendering the App component
 * wrapped in the ContextProvider, allowing context values to be accessible 
 * throughout the component tree.
 * 
 * @returns {void} 
 */
createRoot(document.getElementById('root')).render(
  <ContextProvider> {/* Provides context to the entire application */}
    <App /> {/* The main application component */}
  </ContextProvider>,
);
