// hooks/useSignUpForm.tsx
// Created by Poom
// Updated to Redux, added errors, and annotation by Tash
// Custom hook for managing user sign-up form state and behavior
// This hook handles input changes, validation, error management, and form submission.

import { useState } from 'react';
import availableCourses from '../assets/availableCourses';
import { SignUpFormState, AuthError, SignUpVisibilityState, CourseSelectionState } from '../interfaces/AuthSession'; // Import interfaces
import { loginSuccess, loginFailure } from '../actions/authActions'; // Import action creators
import { useDispatch } from 'react-redux'; // Import useDispatch for Redux actions
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Import authService for API calls

export const useSignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize useDispatch

    // State to manage form data
    const [formState, setFormState] = useState<SignUpFormState>({
        authId: '',
        email: '',
        password: '',
        confirmPassword: '',
        fName: '',
        lName: '',
        programCode: 'mssd', // Default program code
        pathOfInterest: 'web development', // Default path of interest
        coursesToTake: 3, // Default number of courses to take
        coursesTaken: [],
    });

    // State for visibility and messages
    const [visibilityState, setVisibilityState] = useState<SignUpVisibilityState>({
        showPassword: false,
        showConfirmPassword: false,
        successMessage: '',
        errorMessage: null,
    });

    // State for course selection
    const [courseSelection, setCourseSelection] = useState<CourseSelectionState>({
        inputValue: '',
        filteredCourses: [],
    });

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setVisibilityState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setVisibilityState(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
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

        // Initialize error message
        let newErrors: Record<string, string> = {};

        // Validation checks
        if (!formState.authId) {
            newErrors.authId = 'Username is required.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formState.email)) {
            newErrors.email = 'Email must be in the correct format.';
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (formState.password && !passwordRegex.test(formState.password)) {
            newErrors.password = 'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }

        if (formState.password !== formState.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }

        if (!formState.fName) {
            newErrors.fName = 'First name is required.';
        }

        if (!formState.lName) {
            newErrors.lName = 'Last name is required.';
        }

        // Check for any validation errors
        if (Object.keys(newErrors).length > 0) {
            setVisibilityState(prev => ({ ...prev, errorMessage: Object.values(newErrors).join(' ') }));
            return;
        }

        try {
            // Call the sign-up function from the authService
            const response = await authService.signupUser(formState);

            // Check response type
            if ('jwtToken' in response) {
                dispatch(loginSuccess(response)); // Dispatch login success with JWT token
                setVisibilityState(prev => ({
                    ...prev,
                    successMessage: "Sign up successful!",
                    errorMessage: null,
                }));
                navigate('/chat'); // Navigate to chat page on success
            } else {
                const authError = response as AuthError;
                dispatch(loginFailure(authError)); // Dispatch the failure action
                setVisibilityState(prev => ({
                    ...prev,
                    errorMessage: authError.message || "Sign up failed.",
                    successMessage: '',
                }));
            }
        } catch (error) {
            const authError: AuthError = {
                code: "SIGN_UP_ERROR",
                message: "An unexpected error occurred during sign-up.",
            };
            dispatch(loginFailure(authError)); // Dispatch login failure action
            setVisibilityState(prev => ({
                ...prev,
                errorMessage: authError.message,
                successMessage: '',
            }));
        }
    };

    // Handle input change for course selection
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCourseSelection(prev => ({ ...prev, inputValue: value }));

        if (value === '') {
            setCourseSelection(prev => ({ ...prev, filteredCourses: [] }));
            return;
        }

        const filtered = availableCourses.filter(course =>
            course.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10);

        setCourseSelection(prev => ({ ...prev, filteredCourses: filtered.length > 0 ? filtered : [] }));
    };

    // Handle course selection
    const handleCourseSelect = (course: string) => {
        if (course && !formState.coursesTaken.includes(course)) {
            const newCoursesTaken: string[] = [...formState.coursesTaken, course];
            setFormState(prev => ({
                ...prev,
                coursesTaken: newCoursesTaken,
            }));

            setCourseSelection(prev => ({ ...prev, inputValue: '', filteredCourses: [] }));
        }
    };

    // Handle course removal
    const handleRemoveCourse = (courseToRemove: string) => {
        const newCoursesTaken: string[] = formState.coursesTaken.filter(course => course !== courseToRemove);
        setFormState(prev => ({
            ...prev,
            coursesTaken: newCoursesTaken,
        }));
    };

    return {
        formState,
        showPassword: visibilityState.showPassword,
        showConfirmPassword: visibilityState.showConfirmPassword,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        handleChange,
        handleFormSubmit,
        successMessage: visibilityState.successMessage,
        errorMessage: visibilityState.errorMessage,
        inputValue: courseSelection.inputValue,
        filteredCourses: courseSelection.filteredCourses,
        handleInputChange,
        handleCourseSelect,
        handleRemoveCourse,
    };
};
