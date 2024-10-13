// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.
// Annotated by Natasya Liew

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'; // Import necessary React hooks
import { useUser } from './UserContext'; // Importing the UserContext to manage user details
import authService from '../services/authService'; // Importing the authentication service for API calls
import { UserService } from '../services/userService'; // Importing user service for fetching user data
import { User } from '../interfaces/UserSession'; // Importing User interface
import { AuthContextType, LoginParams, SignUpParams, SuccessResponse, ErrorResponse } from '../interfaces/AuthSession'; // Import necessary types
import { initializeUserState } from '../params/paramsLog'; // Importing initial user state

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component for the AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { updateUser, resetUser } = useUser(); // Destructure user update functions from UserContext

    // State variables to manage authentication state
    const [isAuth, setIsAuth] = useState<boolean>(getCachedIsAuth()); // Initialize from session storage
    const [isIncorrectPassword, setIsIncorrectPassword] = useState<boolean>(false); // State for incorrect password flag
    const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading indicator

    // Helper function to get authentication status from sessionStorage
    const getCachedIsAuth = (): boolean => {
        const cachedAuth = sessionStorage.getItem('isAuth'); // Retrieve cached authentication status
        return cachedAuth === 'true'; // Parse boolean value
    };

    /**
     * Signs up a new user with the provided parameters.
     * 
     * This function validates the input, creates a new user, and logs them in.
     * It sets loading state and handles success/error messages appropriately.
     * 
     * @param {SignUpParams} params - Parameters containing user details for sign up.
     * @returns {Promise<SuccessResponse<boolean> | ErrorResponse>} 
     *          - A promise that resolves to a success response if sign up is successful,
     *            or an error response if it fails.
     */
    const signUp = async (params: SignUpParams): Promise<SuccessResponse<boolean> | ErrorResponse> => {
        setIsLoading(true); // Set loading state to true
        setIsIncorrectPassword(false); // Reset incorrect password state

        // Requirement Condition: Ensure all required parameters are provided
        if (params.length < 11) { // Check if all necessary fields are filled
            return {
                success: false,
                message: 'Incomplete sign-up information.', // Provide error message for missing parameters
            };
        }

        try {
            // Attempt to create the new user in the backend
            const userId = await UserService.createUser(initializeUserState);

            // Security: Check if user creation was successful
            if (userId > 0) {
                const newUser: User = { ...initializeUserState, userId }; // Construct new user object

                const isLoggedIn = await authService.loginUser(params); // Use LoginParams
                if (isLoggedIn) {
                    updateUser(newUser); // Update user context with new user information
                    setIsAuth(true); // Update authentication status
                    return {
                        success: true,
                        data: true, // Indicate user is created and logged in successfully
                        message: 'User registered and logged in successfully!', // Success message
                    };
                } else {
                    return {
                        success: false,
                        message: 'Login failed. Please check your credentials.', // Error message on login failure
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'An error occurred when signing up the user.', // Log error
                };
            }
        } catch (error) {
            console.error('Sign-up failed:', error); // Log error during sign-up
            return {
                success: false,
                message: 'An unexpected error occurred during sign-up.', // Error message for unexpected errors
            };
        } finally {
            setIsLoading(false); // Ensure loading state is reset
        }
    };

    /**
     * Logs in an existing user with the provided credentials.
     * 
     * This function validates the input, attempts to log in the user,
     * and updates the user context if successful.
     * 
     * @param {LoginParams} params - Parameters containing the username and password.
     * @returns {Promise<SuccessResponse<boolean> | ErrorResponse>} 
     *          - A promise that resolves to a success response if login is successful,
     *            or an error response if it fails.
     */
    const login = async (params: LoginParams): Promise<SuccessResponse<boolean> | ErrorResponse> => {
        setIsLoading(true); // Set loading state to true
        setIsIncorrectPassword(false); // Reset incorrect password state

        // Requirement Condition: Ensure both username and password are provided
        if (!params[0] || !params[1]) {
            return {
                success: false,
                message: 'Please provide both username and password.', // Provide error message
            };
        }

        try {
            // Attempt to log in the user
            const isLoggedIn = await authService.loginUser(params); // Use LoginParams

            // Security: Check if login was successful
            if (isLoggedIn) {
                setIsAuth(true); // Update authentication status
                setIsLoading(false); // Reset loading state
                setIsIncorrectPassword(false); // Reset incorrect password state

                // Fetch user data to update context
                const userData = await UserService.getUserData({ userId: params[0] }); // Fetch user data from your API
                updateUser({
                    ...userData, // Update user context with fetched user data
                    isNew: false, // Mark user as returning
                });

                return {
                    success: true,
                    data: true, // Indicate successful login
                    message: 'Login successful!', // Success message
                };
            } else {
                setIsAuth(false); // Set authentication status to false
                setIsLoading(false); // Reset loading state
                setIsIncorrectPassword(true); // Indicate incorrect password
                return {
                    success: false,
                    message: 'Invalid username or password.', // Error message for invalid credentials
                };
            }
        } catch (error) {
            console.error("Login failed: ", error.message); // Log login error
            return {
                success: false,
                message: 'An unexpected error occurred during login.', // Error message for unexpected errors
            }; // Indicate failed login
        } finally {
            setIsLoading(false); // Ensure loading state is reset
        }
    };

    /**
     * Logs out the current user.
     * 
     * This function resets the authentication context and clears
     * the user's authentication status from session storage.
     * 
     * @returns {Promise<SuccessResponse<boolean>>} 
     *          - A promise that resolves to a success response indicating the logout status.
     */
    const logout = async (): Promise<SuccessResponse<boolean>> => {
        resetUser(); // Reset user context
        setIsAuth(false); // Set authentication status to false
        setIsLoading(false); // Reset loading state
        setIsIncorrectPassword(false); // Reset incorrect password state
        sessionStorage.removeItem('isAuth'); // Clear authentication status from sessionStorage
        // Uncomment when JWT is ready
        // sessionStorage.removeItem('token'); // Clear JWT token from sessionStorage

        return {
            success: true,
            data: true, // Indicate successful logout
            message: 'Logout successful!', // Success message for logout
        };
    };

    // Effect to update cached authentication status in sessionStorage
    useEffect(() => {
        sessionStorage.setItem('isAuth', JSON.stringify(isAuth)); // Update sessionStorage whenever isAuth changes
    }, [isAuth]);

    // Provide the authentication context to child components
    return (
        <AuthContext.Provider value={{ isAuth, isIncorrectPassword, isLoading, signUp, login, logout }}>
            {children} // Render child components with access to authentication context
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext); // Access the AuthContext
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider'); // Ensure the hook is used within the provider
    }
    return context; // Return the context value
};
