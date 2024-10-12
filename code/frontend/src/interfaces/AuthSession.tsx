// authSession.tsx
// Type definitions for authentication-related operations
// Created by Tash

import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT, LOGOUT_FAILURE } from '../actions/AuthActions';
import { User } from './UserSession'; // Import the User interface


// Interface for user login credentials
export interface LoginCredentials {
    authId: string; // Username input for login
    password: string; // Password input for login
}

// Interface for managing visibility of password fields and messages
export interface LoginVisibilityState {
    showPassword: boolean; // Password visibility state
    successMessage: string; // Message to indicate successful login
    errorMessage: string | null; // Message to indicate error during login
}
// Interface for managing visibility of messages
export interface LogoutVisibilityState {
    isLoggingOut: boolean; // Indicates if the logout request is in progress
    logoutMessage: string | null; // Message to display after logout
}

// New interface for sign-up form state
export interface SignUpFormState extends LoginCredentials {
    email: string; // User's email address
    confirmPassword: string; // User's confirm password
    fName: string; // User's first name
    lName: string; // User's last name
    programCode: string; // Program code for user's study
    pathOfInterest: string; // User's area of interest
    coursesToTake: number; // Number of courses user wants to take
    coursesTaken: string[]; // List of courses the user has already taken
}

// Interface for managing visibility of password fields and messages
export interface SignUpVisibilityState {
    showPassword: boolean; // Password visibility state
    showConfirmPassword: boolean; // Confirm password visibility state
    successMessage: string; // Message to indicate successful sign-up
    errorMessage: string | null; // Message to indicate error during sign-up
}

// Interface for course selection state
export interface CourseSelectionState {
    inputValue: string; // Value for course selection input
    filteredCourses: string[]; // List of filtered courses
}

// Unified interface for authentication response
export interface AuthResponse {
    jwtToken: string; // JWT token received upon successful login
    user: User; // The user object
    message?: string; // Optional message, usually for error handling
}

// Interface for authentication-related errors
export interface AuthError {
    code: string; // Error code for identifying the type of error
    message: string; // Human-readable error message
}

// Interface for authentication state
export interface AuthState {
    jwtToken: string | null;      // JWT token or null if not authenticated
    isAuthenticated: boolean;      // Authentication status
    error: AuthError | null;       // Error object for failed login attempts
    user: User | null;             // User object or null if not authenticated
}

// Interface for authentication actions
export interface AuthAction {
    type: typeof LOGIN_SUCCESS | typeof LOGIN_FAILURE | typeof SIGNUP_SUCCESS | typeof SIGNUP_FAILURE | typeof LOGOUT | typeof LOGOUT_FAILURE; // Ensure the type is one of the defined action types
    payload?: AuthResponse | AuthError; // Payload can be either a LoginResponse or AuthError
}

// Interface for successful responses
export interface SuccessResponse {
    success: boolean; // Indicates the success of the operation
    message: string;  // Message providing details about the operation
}