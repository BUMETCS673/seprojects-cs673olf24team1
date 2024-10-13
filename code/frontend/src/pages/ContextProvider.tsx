// Created by Poom: main functionality
// Annotated by Tash: moved from Context Folder to Pages Folder

import React, { ReactNode } from 'react';
import { UserProvider } from '../context/userContext'; // Importing UserProvider to manage user-related context
import { AuthProvider } from '../context/authContext'; // Importing AuthProvider to manage authentication-related context

interface ContextProviderProps {
  children: ReactNode; // Props type definition for children components
}

/**
 * ContextProvider component wraps the UserProvider and AuthProvider.
 * 
 * This component serves as a wrapper for managing both user and authentication contexts.
 * It allows child components to access user and auth context values easily.
 *
 * @param {ContextProviderProps} props - The props for the ContextProvider component.
 * @returns {JSX.Element} The wrapped child components within the UserProvider and AuthProvider.
 */
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  return (
    <UserProvider> 
        <AuthProvider>
          {children} {/* Render child components with access to user and auth contexts */}
        </AuthProvider>
    </UserProvider>
  );
};

export default ContextProvider; // Exporting the ContextProvider for use in the application
