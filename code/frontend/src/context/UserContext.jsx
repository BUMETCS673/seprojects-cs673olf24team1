import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {
            buId: '',
            firstName: '',
            lastName: '',
            email: '',
            programType: '',
            programName: '',
            path_interest: '',
            courses_to_take: 0,
            courses_taken: [],
            chat_session_ids: [],
            isNew: true,
        };
    });

    useEffect(() => {
        // Save user data to localStorage whenever it changes
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const updateUser = (newUser) => {
        setUser((prevUser) => ({ ...prevUser, ...newUser }));
    };

    const resetUser = () => {
        setUser({
            buId: '',
            firstName: '',
            lastName: '',
            email: '',
            programType: '',
            programName: '',
            path_interest: '',
            courses_to_take: 0,
            courses_taken: [],
            chat_session_ids: [],
            isNew: true,
        });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
