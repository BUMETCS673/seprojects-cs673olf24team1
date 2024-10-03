import React, { createContext, useState, useContext } from 'react';
import { useUser } from './UserContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, updateUser, resetUser } = useUser();
    const [auth, setAuth] = useState({
        isAuth: false,
        isLoading: false,
    });

    const signUp = async (name, email, password) => {
        setAuth({ isAuth: false, isLoading: true });
        // Implement the API service
        // const newUser = await authService.createUser(name, email, password);

        // Fake user
        const newUser = ({ id: 'U123456' });

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
            console.log('an error occured when signing up the user')
            setAuth({ isAuth: false, isLoading: false });
        }
    };

    const login = async (email, password) => {
        setAuth({ isAuth: false, isLoading: true });
        // Example API call to log in the user
        // const userData = await authService.getUser(userId);

        // Fake user
        const fakeUserData = ({
            buId: 'U123456',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@bu.edu',
            programType: 'MS',
            programName: 'Computer Science',
            path_interest: 'ai/ml',
            courses_to_take: 3,
            coures_taken: [521],
            session_ids: [1, 2, 3, 4],
        });

        // Log the user in
        if (fakeUserData) {
            setAuth({ isAuth: true, isLoading: false });
            updateUser({
                ...fakeUserData,
                isNew: false,
            });
        } else {
            console.log('an error occured when logging in the user')
            setAuth({ isAuth: false, isLoading: false });
        }
    };

    const logout = async () => {
        // Log the user out
        // result = await AuthService.logout();
        if (result) {
            resetUser();
            setAuth({ isAuth: false, isLoading: false });
        } else {
            console.log(result)
            setAuth({ isAuth: true, isLoading: false });
        }
    };

    return (
        <AuthContext.Provider value={{ auth, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
