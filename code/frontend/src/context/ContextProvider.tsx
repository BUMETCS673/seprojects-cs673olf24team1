import React, { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { AuthProvider } from './AuthContext';
import { ChatProvider } from './ChatContext';

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  return (
    <UserProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
    </UserProvider>
  );
};

export default ContextProvider;
