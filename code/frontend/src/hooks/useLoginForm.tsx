// hooks/useLoginForm.tsx
// created by Tash
// Custom hook for managing user login form state and behavior
// This hook handles input changes, validation, error management, and form submission.

import { useState } from 'react';
import { LoginCredentials, AuthError, LoginVisibilityState } from '../interfaces/AuthSession'; // Import interfaces
import { loginSuccess, loginFailure } from '../actions/authActions'; // Import action creators
import { useDispatch } from 'react-redux'; // Import useDispatch for Redux actions
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Import authService for API calls

export const useLoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize useDispatch

    // State to manage form data
    const [formState, setFormState] = useState<LoginCredentials>({
        authId: '',
        password: '',
    });

    // State for visibility and messages
    const [visibilityState, setVisibilityState] = useState<LoginVisibilityState>({
        showPassword: false,
        successMessage: '',
        errorMessage: null,
    });

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setVisibilityState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    // Handle changes to form input fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prev => ({
            ...prev,
            [name]: value, // Dynamically update form state based on input name
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newErrors: Record<string, string> = {}; // Create an object to hold error messages

        // Validation checks
        if (!formState.authId) newErrors.authId = 'Username is required.'; 
        if (!formState.password) newErrors.password = 'Password is required.'; 

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; 
        if (formState.password && !passwordRegex.test(formState.password)) {
            newErrors.password = 'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }

        // If errors exist, return them
        if (Object.keys(newErrors).length > 0) {
            setVisibilityState(prev => ({
                ...prev,
                errorMessage: "Please fix the errors in the form.", // General error message
            }));
            return; // Exit if there are validation errors
        }

        try {
            const response = await authService.loginUser({ 
                authId: formState.authId, 
                password: formState.password 
            }); // Pass the entire object

            // Check response type
            if (response && 'jwtToken' in response) { // Check if response has jwtToken property
                dispatch(loginSuccess(response)); // Dispatch login success with JWT token
                navigate('/chat'); // Navigate to chat page on success
            } else {
                throw new Error('Login failed. Please check your credentials.'); 
            }
        } catch (error) {
            const authError: AuthError = {
                code: "LOGIN_ERROR",
                message: error.message || "An unexpected error occurred during login.",
            };
            dispatch(loginFailure(authError)); // Dispatch login failure action
            setVisibilityState(prev => ({
                ...prev,
                errorMessage: authError.message, // Set error message
                successMessage: '', // Clear success message on error
            }));
        }
    };

    return {
        formState,
        showPassword: visibilityState.showPassword,
        togglePasswordVisibility,
        handleChange,
        handleFormSubmit,
        successMessage: visibilityState.successMessage,
        errorMessage: visibilityState.errorMessage,
    };
};
