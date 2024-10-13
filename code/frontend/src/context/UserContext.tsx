// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.
// Annotated by Natasya Liew

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserContextType, StoredNewUser } from '../interfaces/UserSession'; // Importing User interfaces
import { defaultUser, initializeUserState } from '../params/paramsLog'; // Importing default user and remove user state

// Create a UserContext for managing user-related data and actions
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to wrap the application and provide user context
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // State to manage user data
    const [user, setUser] = useState<User>(() => {
        const storedUser = sessionStorage.getItem('user'); // Retrieve stored user data from sessionStorage
        return storedUser ? JSON.parse(storedUser) : { ...defaultUser }; // Use default user if no data found
    });

    // Effect to save user data to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user)); // Update sessionStorage with current user data
    }, [user]);

    // Function to update user data with new values
    const updateUser = (newUser: Partial<User>) => {
        setUser((prevUser) => ({ ...prevUser, ...newUser })); // Merge new user data with existing data
    };

    // Function to reset user data to initial state and remove from sessionStorage
    const resetUser = () => {
        setUser(initializeUserState); // Reset to default user state
        sessionStorage.removeItem('user'); // Remove user data from sessionStorage
    };

    // Function to check if a user exists by authId, email, or buId
    const checkUserExists = async (authId: string, email: string, buId: string) => {
        // Get the current user context
        const { user } = useUser(); // Access the user context

        // Requirement Check: Ensure user data is available for checks
        if (user) {
            // Check if any of the provided values match the stored user data
            const authIdExists = user.authId === authId; // Check for existing authId
            const emailExists = user.email === email; // Check for existing email
            const buIdExists = user.buId === buId; // Check for existing BU ID

            // Return an object indicating the existence of each value
            return { authIdExists, emailExists, buIdExists }; 
        }

        // If user is not defined, return false for all checks
        return { authIdExists: false, emailExists: false, buIdExists: false };
    };

    // Provide user data and actions to the context
    return (
        <UserContext.Provider value={{ user, updateUser, resetUser, checkUserExists }}>
            {children} {/* Render child components with access to user context */}
        </UserContext.Provider>
    );
};

// Custom hook to access the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext); // Get context value
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider'); // Ensure the hook is used within the provider
    }
    return context; // Return the context value
};

