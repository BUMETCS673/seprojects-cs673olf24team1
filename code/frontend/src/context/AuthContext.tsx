import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { useChat } from './ChatContext';

// Define the shape of the context value
interface AuthContextType {
    isAuth: boolean;
    isIncorrectPassword: boolean;
    isLoading: boolean;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { updateUser, resetUser } = useUser();
    const { loadSessionHistory, clearCachedChatData } = useChat();

    const getCachedIsAuth = (): boolean => {
        const cachedAuth = localStorage.getItem('isAuth')
        return cachedAuth === 'true' ? JSON.parse(cachedAuth) : false;
    }
    const setCachnedIsAuth = (isAuth: boolean) => localStorage.setItem('isAuth', JSON.stringify(isAuth));

    const [isAuth, setIsAuth] = useState<boolean>(() => getCachedIsAuth());
    const [isIncorrectPassword, setIsIncorrectPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        setCachnedIsAuth(isAuth);
    }, [isAuth]);

    const signUp = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setIsIncorrectPassword(false);

        // Implement the API service
        // const newUser = await authService.createUser(name, email, password);

        // Fake user
        const newUser = { id: 'U123456' };

        if (newUser) {
            setIsAuth(true);
            setIsLoading(false);
            const [firstName, lastName] = name.split(" ");

            updateUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                isNew: true,
            });

        } else {
            console.log('An error occurred when signing up the user');
            setIsAuth(false);
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setIsIncorrectPassword(false);

        const testEmail = "test@bu.edu";
        const testPass = "1234";

        try {
            if (email === testEmail && password === testPass) {

                const testUserData = {
                    buId: 'U123456',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@bu.edu',
                    programType: 'MS',
                    programName: 'Computer Science',
                    path_interest: 'ai/ml',
                    courses_to_take: 3,
                    courses_taken: ['521'],
                    chat_session_ids: ['123', '456'],
                };

                setIsAuth(true);
                setIsLoading(false);
                setIsIncorrectPassword(false);
                updateUser({
                    ...testUserData,
                    isNew: false,
                });

                loadSessionHistory(testUserData.buId)
                return true;

            } else {
                setIsAuth(false);
                setIsLoading(false);
                setIsIncorrectPassword(true);
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error("Login failed: ", error.message);
            return false;
        }
    };

    const logout = async () => {
        // Use API to log the user out
        const result = true
        if (result) {
            resetUser();
            setIsAuth(false);
            setIsLoading(false);
            setIsIncorrectPassword(false);
            localStorage.removeItem('isAuth');
            clearCachedChatData();
        }
        return result
    };

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
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
