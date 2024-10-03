import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { updateUser, resetUser } = useUser();
    const [auth, setAuth] = useState(() => {
        // Load auth data from localStorage if available
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : {
            isAuth: false,
            isIncorrectPassword: false,
            isLoading: false,
        };
    });

    useEffect(() => {
        // Save auth data to localStorage whenever it changes
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    const signUp = async (name, email, password) => {
        setAuth({ isAuth: false, isLoading: true });
        // Implement the API service
        // const newUser = await authService.createUser(name, email, password);

        // Fake user
        const newUser = { id: 'U123456' };

        // Log the user in
        if (newUser) {
            setAuth({ isAuth: true, isLoading: false });
            const [firstName, lastName] = name.split(" ");
            // Update user context with new user data
            updateUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                isNew: true,
            });
        } else {
            console.log('An error occurred when signing up the user');
            setAuth({ isAuth: false, isLoading: false });
        }
    };

    const login = async (email, password) => {
        setAuth({ isAuth: false, isLoading: true });
        // Example API call to log in the user
        // const userData = await authService.getUser(userId);

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
                    courses_taken: [521],
                    chat_session_ids: ["123", "456"],
                };

                setAuth({ isAuth: true, isLoading: false });
                updateUser({
                    ...testUserData,
                    isNew: false,
                });

                return true;
            } else {
                setAuth({ isAuth: false, isLoading: false });
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error("Login failed: ", error.message);
        }
    };

    const logout = async () => {
        // Log the user out
        // const result = await AuthService.logout();
        resetUser();
        setAuth({ isAuth: false, isLoading: false });
        localStorage.removeItem('auth'); // Clear auth data from localStorage
    };

    return (
        <AuthContext.Provider value={{ auth, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
