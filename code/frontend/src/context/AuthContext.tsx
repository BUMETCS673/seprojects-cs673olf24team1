// Created by Poom
// Updated and Annotated by Natasya Liew

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext'; // Importing the UserContext to manage user details
import authService from '../services/authService'; // Importing the authentication service for API calls
import { UserService } from '../services/userService';
import { User } from '../interfaces/User';

// Define the shape of the context value
interface AuthContextType {
    isAuth: boolean;                // Indicates if the user is authenticated
    isIncorrectPassword: boolean;    // Indicates if the last login attempt was unsuccessful due to incorrect password
    isLoading: boolean;              // Indicates if the authentication process is currently loading
    signUp: (
        authId: string,               // Username for the user account
        email: string,                // User's email address
        password: string,             // User's password
        fName: string,                // User's first name
        lName: string,                // User's last name
        buId: string,                 // Unique identifier for the user (BU ID)
        programType: string,          // Type of academic program (e.g., "MS degree", can be dynamic)
        programCode: string,          // Code for the academic program (e.g., "mssd", can be dynamic)
        pathOfInterest: string,       // User's area of interest (e.g., "AI/ML", "Web Development", can be dynamic)
        coursesToTake: number,        // Number of courses the user plans to take for the semester
        coursesTaken: string[]        // Array of course IDs or names representing completed courses
    ) => Promise<boolean>; // Function to sign up a new user
    login: (authId: string, password: string) => Promise<boolean>; // Function to log in an existing user
    logout: () => Promise<boolean>;  // Function to log out the user
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component for the AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { updateUser, resetUser } = useUser(); // Destructure user update functions from UserContext

    // Helper function to get authentication status from sessionStorage
    const getCachedIsAuth = (): boolean => {
        const cachedAuth = sessionStorage.getItem('isAuth');
        return cachedAuth === 'true' ? JSON.parse(cachedAuth) : false; // Parse boolean value
    };

    // Helper function to set authentication status in sessionStorage
    const setCachedIsAuth = (isAuth: boolean) => sessionStorage.setItem('isAuth', JSON.stringify(isAuth));

    // State variables to manage authentication state
    const [isAuth, setIsAuth] = useState<boolean>(() => getCachedIsAuth());
    const [isIncorrectPassword, setIsIncorrectPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Function to sign up a new user
    const signUp = async (
        authId: string,               // Username for the user account
        email: string,                // User's email address
        password: string,             // User's password
        fName: string,                // User's first name
        lName: string,                // User's last name
        buId: string,                 // Unique identifier for the user (BU ID)
        programType: string,          // Type of academic program (e.g., "MS degree", can be dynamic)
        programCode: string,          // Code for the academic program (e.g., "mssd", can be dynamic)
        pathOfInterest: string,       // User's area of interest (e.g., "AI/ML", "Web Development", can be dynamic)
        coursesToTake: number,        // Number of courses the user plans to take for the semester
        coursesTaken: string[]        // Array of course IDs or names representing completed courses
    ): Promise<boolean> => {
        setIsLoading(true); // Set loading state to true
        setIsIncorrectPassword(false); // Reset incorrect password state

        const newUser: User = {
            authId: authId,
            userId: -1, // place holder
            email: email,
            password: password,
            fName: fName,
            lName: lName,
            buId: buId,
            programType: programType,
            programCode: programCode,
            pathOfInterest: pathOfInterest,
            coursesToTake: coursesToTake,
            coursesTaken: coursesTaken,
            chatSessionIds: [],
            isNew: true,
        };

        try {
            // Call the authentication service to create a new user
            // const authResult = authService.signup();

            // Push the new user to the backend
            const userId = await UserService.createUser(newUser);

            console.log(userId);

            if (userId > 0) {
                newUser.userId = userId;

                // Update user context with new user details
                updateUser(newUser);

                // Uncomment when JWT is ready
                // sessionStorage.setItem('token', newUser.token); // Store JWT token in local storage
                setIsAuth(true);
                setIsLoading(false);
                return true;
            } else {
                console.log('An error occurred when signing up the user'); // Log error
                setIsAuth(false); // Set authentication status to false
                setIsLoading(false); // Reset loading state
                return false;
            }
        } catch (error) {
            console.error('Sign-up failed:', error); // Log error during sign-up
            setIsLoading(false); // Reset loading state
            return false;
        }
    };

    // Function to log in an existing user
    const login = async (authId: string, password: string): Promise<boolean> => {
        setIsLoading(true); // Set loading state to true
        setIsIncorrectPassword(false); // Reset incorrect password state

        try {
            // Call the authentication service to log in the user
            const isLoggedIn = await authService.loginUser(authId, password);

            if (isLoggedIn) {
                console.log("here")
                console.log(sessionStorage.getItem('token'));
                
                setIsAuth(true); // Set authentication status to true
                setIsLoading(false); // Reset loading state
                setIsIncorrectPassword(false); // Reset incorrect password state

                // Fetch user data to update context
                const userData = await UserService.getUserData(authId); // Fetch user data from your API
                updateUser({
                    ...userData, // Update user context with fetched user data
                    isNew: false, // Mark user as returning
                });

                // Uncomment when JWT is ready
                // sessionStorage.setItem('token', userData.token); // Store JWT token in local storage

                return true; // Indicate successful login
            } else {
                setIsAuth(false); // Set authentication status to false
                setIsLoading(false); // Reset loading state
                setIsIncorrectPassword(true); // Indicate incorrect password
                throw new Error('Invalid username or password'); // Throw error for invalid credentials
            }
        } catch (error) {
            console.error("Login failed: ", error.message); // Log login error
            return false; // Indicate failed login
        }
    };

    // Function to log out the user
    const logout = async () => {
        // Use API to log the user out
        // const result = await authService.logoutUser(); // Call the logout function in authService
        const result = true;
        if (result) {
            resetUser(); // Reset user context
            setIsAuth(false); // Set authentication status to false
            setIsLoading(false); // Reset loading state
            setIsIncorrectPassword(false); // Reset incorrect password state
            sessionStorage.removeItem('isAuth'); // Clear authentication status from sessionStorage
            // Clear JWT token from local storage if applicable
            // sessionStorage.removeItem('token'); // Uncomment when JWT is ready
        }
        return result; // Return logout result
    };

    // Effect to update cached authentication status in sessionStorage
    useEffect(() => {
        setCachedIsAuth(isAuth); // Update sessionStorage whenever isAuth changes
    }, [isAuth]);

    // Provide the authentication context to child components
    return (
        <AuthContext.Provider value={{ isAuth, isIncorrectPassword, isLoading, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider'); // Ensure the hook is used within the provider
    }
    return context; // Return the context value
};
