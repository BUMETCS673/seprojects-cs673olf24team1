// hooks/useUserService.tsx
// Custom hook for managing user-related operations
// Created by Tash



import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../store/store'; 
import UserService from '../services/userService'; 
import { User, AuthError } from '../interfaces/UserSession'; 
import { SuccessResponse } from '../interfaces/AuthSession';
import { logout, loginFailure } from '../actions/AuthActions'; 
import authService from '../services/authService'; // Import AuthService

export const useUserService = () => {
    const dispatch = useDispatch(); 
    const jwtToken = useSelector((state: RootState) => state.auth.jwtToken); 

    const getUserData = async (authId: string): Promise<User | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        try {
            const user = await UserService.getUserData(authId); 
            return user; 
        } catch (error) {
            console.error(error); 
            dispatch(loginFailure({ code: 'USER_DATA_ERROR', message: 'Failed to fetch user data.' })); 
            return { code: 'USER_DATA_ERROR', message: 'Failed to fetch user data.' } as AuthError; 
        }
    };

    const createUser = async (user: User): Promise<number | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        try {
            const userId = await UserService.createUser(user); 
            return userId; 
        } catch (error) {
            console.error(error); 
            dispatch(loginFailure({ code: 'USER_CREATION_ERROR', message: 'Failed to create user.' })); 
            return { code: 'USER_CREATION_ERROR', message: 'Failed to create user.' } as AuthError; 
        }
    };

    const logoutUser = async (): Promise<SuccessResponse | AuthError> => {
        if (!jwtToken) {
            return { code: 'AUTH_ERROR', message: 'No authentication token found.' } as AuthError; 
        }

        try {
            const result = await authService.logoutUser(); // Call logoutUser from AuthService
            dispatch(logout()); 
            return result; // Return the result directly
        } catch (error) {
            console.error(error); 
            return { code: 'LOGOUT_ERROR', message: 'Failed to logout user.' } as AuthError; 
        }
    };

    return {
        getUserData,
        createUser,
        logoutUser, // Expose logout function
    };
};

export default useUserService; // Export the hook for use in components