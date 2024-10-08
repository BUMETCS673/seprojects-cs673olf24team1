import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../interfaces/User';

interface UserContextType {
    user: User;
    updateUser: (newUser: Partial<User>) => void;
    resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(() => {
        const storedUser = sessionStorage.getItem('user');
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

    // Save user data to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const updateUser = (newUser: Partial<User>) => {
        setUser((prevUser) => ({ ...prevUser, ...newUser }));
    };

    const resetUser = () => {
        const initialUserState: User = {
            authId: '',
            userId: -1,
            buId: '',
            fName: '',
            lName: '',
            email: '',
            password: '',
            programType: '',
            programCode: '',
            pathOfInterest: '',
            coursesToTake: 0,
            coursesTaken: [],
            chatSessionIds: [],
            isNew: true,
        };
        setUser(initialUserState);
        sessionStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
