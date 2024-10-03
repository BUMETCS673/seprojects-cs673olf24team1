import { UserProvider } from './UserContext';
import { AuthProvider } from './AuthContext';
import { ChatProvider } from './ChatContext';

const ContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default ContextProvider;