import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        buId: '',
        firstName: '',
        lastName: '',
        email: '',
        programType: '',
        programName: '',
        path_interest: '',
        courses_to_take: 0,
        coures_taken: [],
        session_ids: [],
        isNew: true,
    });

    const updateUser = (newUser) => {
        setUser((prevUser) => ({ ...prevUser, ...newUser }));
    };

    const resetUser = () => {
        setUser({ id: null, name: '', email: '', age: null });
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
