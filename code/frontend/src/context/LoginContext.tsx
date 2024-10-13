// Created by Natasya Liew

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './authContext'; // Import the AuthContext to access the login function
import { loginRequirement } from '../params/paramsLog'; // Import the loginRequirement function
import { LoginContextType, LoginParams } from '../interfaces/authSession';


// Create the LoginContext
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// LoginProvider component to provide login context to child components
export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { login } = useAuth(); // Get login function from AuthContext
    const [authId, setAuthId] = useState<string>(''); // State for username
    const [password, setPassword] = useState<string>(''); // State for password
    const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages
    const [successMessage, setSuccessMessage] = useState<string>(''); // State for success messages

    /**
     * Function to handle user login
     * - Validates login input using the loginRequirement function
     * - Attempts to log in using the credentials provided
     * - Sets success or error messages based on login result
     */
    // Function to handle user login
const handleLogin = async (authId: string, password: string): Promise<void> => {
    // Requirement Condition: Validate login requirements
    const validationMessage = loginRequirement( {authId, password} ); // Validate authId and password

    if (validationMessage !== 'Login requirements are met.') {
        setErrorMessage(validationMessage); // Set error message if validation fails
        setSuccessMessage(''); // Clear success message if there's an error
        return; // Exit the function if validation fails
    }

    try {
        const result = await login( authId, password ); // Attempt to log in

        if (result) {
            setSuccessMessage('Login successful!'); // Set success message on successful login
            setErrorMessage(''); // Clear any previous error message
        } else {
            setErrorMessage('Login failed. Please check your credentials and try again.'); // Set error message if login fails
        }
    } catch (error) {
        console.error("Login failed: ", error); // Log error if login fails
        setErrorMessage('An unexpected error occurred during login. Please try again later.'); // Set error message for unexpected errors
    }
};


    /**
     * Handle changes to form input fields
     * - Updates the corresponding state variable based on the input name
     * @param event - The change event from the input field
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Extract name and value from the input field

        // Update the corresponding state variable based on the input name
        if (name === 'authId') {
            setAuthId(value); // Update authId state
        } else if (name === 'password') {
            setPassword(value); // Update password state
        }
    };

    return (
        <LoginContext.Provider value={{ handleChange, handleLogin, setAuthId, setPassword }}>
            {children} {/* Render child components with access to login context */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages if present */}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success messages if present */}
        </LoginContext.Provider>
    );
};

// Custom hook to use the LoginContext
export const useLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginProvider'); // Ensure the hook is used within the provider
    }
    return context; // Return the context value
};
