import { UserProvider } from './UserContext';
import { AuthProvider } from './AuthContext';

const ContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </UserProvider>
  );
};

export default ContextProvider;