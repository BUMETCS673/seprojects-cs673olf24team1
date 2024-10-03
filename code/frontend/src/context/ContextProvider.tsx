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
      <ChatProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ChatProvider>
    </UserProvider>
  );
};

export default ContextProvider;
