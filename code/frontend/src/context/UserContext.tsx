import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the user data
interface User {
    buId: string;
    firstName: string;
    lastName: string;
    email: string;
    programType: string;
    programName: string;
    path_interest: string;
    courses_to_take: number;
    courses_taken: string[];
    chat_session_ids: string[];
    isNew: boolean;
}

// Define the shape of the context value
interface UserContextType {
    user: User;
    updateUser: (newUser: Partial<User>) => void;
    resetUser: () => void;
}

// Create a UserContext with an empty object as the default value
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(() => {
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

    const updateUser = (newUser: Partial<User>) => {
        setUser((prevUser) => ({ ...prevUser, ...newUser }));
    };

    const resetUser = () => {
        const initialUserState: User = {
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
        setUser(initialUserState);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
