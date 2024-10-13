// Created by Poom: main functionality
// Updated by Tash: adding encapsulation, success/error message, annotation, requirement conditions.
// Annotated by Natasya Liew
// Custom hook to manage the signup form state and functionality

import { useState } from 'react'; // Importing useState hook for managing state
import availableCourses from '../assets/availableCourses'; // Importing available courses from assets
import { useAuth } from './authContext'; // Importing authentication context to access auth functions
import { FormState } from '../interfaces/authSession'; // Importing form state interface for TypeScript
import { useNavigate } from 'react-router-dom'; // Importing navigation hook for redirection
import { defaultFormState, checkUserExists } from '../params/paramsLog'; // Importing default form state

// Custom hook to manage the signup form state and functionality
export const useSignUpForm = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate after signup
    const { signUp } = useAuth(); // Access functions from AuthContext

    // State to manage form data using defaultFormState
    const [formState, setFormState] = useState<FormState>(defaultFormState);
    

    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // State for success messages
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // State for course selection
    const [inputValue, setInputValue] = useState('');
    const [filteredCourses, setFilteredCourses] = useState<string[]>([]); // Set the type to string[]

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggle the visibility state of the password
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev); // Toggle the visibility state of the confirm password
    };

    // Handle changes to form input fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Extract name and value from input
        setFormState((prev) => ({
            ...prev,
            [name]: value, // Update the corresponding state variable
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Requirement checks for required fields
        if (!formState.authId || !formState.email || !formState.password || !formState.confirmPassword || !formState.fName || !formState.lName) {
            setErrorMessage('All fields are required.'); // Error message for empty fields
            return;
        }

        /// Check if the username already exists
    const { authIdExists, emailExists, buIdExists } = await checkUserExists(
        formState.authId,
        formState.email,
        formState.buId
    );

    if (authIdExists) {
        setErrorMessage('Username already exists. Please choose a different username or login to your existing account.'); // Error message for existing username
        return;
    }

    // Check if the email already exists
    if (emailExists) {
        setErrorMessage('Email already exists. Please use a different email or login to your existing account.'); // Error message for existing email
        return;
    }

    // Check if the BU id already exists
    if (buIdExists) {
        setErrorMessage('BU Id already exists. Login to your existing account.'); // Error message for existing BU ID
        return;
    }

        // Password validation using regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formState.password)) {
            setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'); // Error message for password complexity
            return;
        }

        // Confirm Password validation using regex
        const confirmPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!confirmPasswordRegex.test(formState.confirmPassword)) {
            setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'); // Error message for password complexity
            return;
        }

        // Email validation using regex
        if (!/\S+@\S+\.\S+/.test(formState.email)) {
            setErrorMessage('Please enter a valid email address.'); // Error message for invalid email
            return;
        }

        // Check if passwords match
        if (formState.password !== formState.confirmPassword) {
            setErrorMessage("Passwords don't match"); // Error message for mismatched passwords
            return;
        }

        // First name and last name validation
        if (/[^a-zA-Z]/.test(formState.fName) || /[^a-zA-Z]/.test(formState.lName)) {
            setErrorMessage('First name and last name must not contain numbers or special characters.'); // Error message for invalid name
            return;
        }

        // BU ID validation
        if (!/^U\d{8}$/.test(formState.buId)) {
            setErrorMessage('BU ID must start with a "U" followed by 8 digits.'); // Error message for invalid BU ID
            return;
        }

        // Attempt to sign up the user
        const result = await signUp(
            formState.authId,
            formState.email,
            formState.password,
            formState.fName,
            formState.lName,
            formState.buId,
            formState.programType,
            formState.programCode,
            formState.pathOfInterest,
            formState.coursesToTake,
            formState.coursesTaken
        );

        if (result) {
            setSuccessMessage('Signup successful! You can now log in.'); // Success message for signup
            navigate('/login'); // Navigate to login page after successful signup
        } else {
            setErrorMessage('Signup failed. Please try again.'); // Error message for failed signup
        }
    };

    // Handle input change for course selection
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the input value
        setInputValue(value); // Update the input value state

        if (value === '') {
            setFilteredCourses([]); // Reset filtered courses if input is empty
            return;
        }

        // Filter available courses based on input value
        const filtered = availableCourses.filter(course =>
            course.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10); // Limit to top 10 matches

        setFilteredCourses(filtered.length > 0 ? filtered : []); // Update filtered courses state
    };

    // Handle course selection
    const handleCourseSelect = (course: string) => {
        if (course && !formState.coursesTaken.includes(course)) {
            const newCoursesTaken: string[] = [...formState.coursesTaken, course]; // Add selected course to courses taken
            setFormState((prev) => ({
                ...prev,
                coursesTaken: newCoursesTaken, // Update courses taken state
            }));
            setInputValue(''); // Clear input value
            setFilteredCourses([]); // Reset filtered courses
        }
    };

    // Handle course removal
    const handleRemoveCourse = (courseToRemove: string) => {
        const newCoursesTaken: string[] = formState.coursesTaken.filter(course => course !== courseToRemove); // Remove course from courses taken
        setFormState((prev) => ({
            ...prev,
            coursesTaken: newCoursesTaken, // Update courses taken state
        }));
    };

    return {
        formState,
        showPassword,
        showConfirmPassword,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        handleChange,
        handleFormSubmit,
        successMessage,
        errorMessage, // Return error messages
        inputValue,
        filteredCourses,
        handleInputChange,
        handleCourseSelect,
        handleRemoveCourse,
    };
};
