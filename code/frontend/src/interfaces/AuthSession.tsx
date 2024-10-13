// Created by Natasya Liew
// Auth interfaces

// Define the interface for sign-up parameters
export interface SignUpParams {
    authId: string;               // Username for the user account
    email: string;                // User's email address
    password: string;             // User's password
    confirmPassword: string;      // Confirm password
    fName: string;                // User's first name
    lName: string;                // User's last name
    buId: string;                 // Unique identifier for the user (BU ID)
    programType: string;          // Type of academic program (e.g., "MS degree")
    programCode: string;          // Code for the academic program (e.g., "mssd")
    pathOfInterest: string;       // User's area of interest
    coursesToTake: number;        // Number of courses the user plans to take for the semester
    coursesTaken: number[];       // Array of course IDs or names representing completed courses
}

// Define the interface for login parameters
export interface LoginParams {
    authId: string;               // Username for logging in
    password: string;             // Password for logging in
}

// Define the type for the form state used in the signup process
export interface FormState {
    authId: string;               // Username for the user account
    email: string;                // User's email address
    password: string;             // User's password
    confirmPassword: string;      // Confirm password
    fName: string;                // User's first name
    lName: string;                // User's last name
    buId: string;                 // Unique identifier for the user (BU ID)
    programType: string;          // Type of academic program (e.g., "MS degree")
    programCode: string;          // Code for the academic program (e.g., "mssd")
    pathOfInterest: string;       // User's area of interest
    coursesToTake: number;        // Number of courses the user plans to take for the semester
    coursesTaken: string[];       // Array of course names representing completed courses
}

// Define the shape of the authentication context value
export interface AuthContextType {
    isAuth: boolean;                    // Indicates if the user is authenticated
    isIncorrectPassword: boolean;        // Indicates if the last login attempt was unsuccessful due to incorrect password
    isLoading: boolean;                  // Indicates if the authentication process is currently loading
    signUp: (params: SignUpParams) => Promise<boolean>; // Function to sign up a new user
    login: (params: LoginParams) => Promise<boolean>;   // Function to log in an existing user
    logout: () => Promise<boolean>;      // Function to log out the user
}

// Define the shape of the login context
export interface LoginContextType {
    handleLogin: () => Promise<void>;                         // Function to handle user login
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
    setAuthId: (authId: string) => void;                     // Function to set authId
    setPassword: (password: string) => void;                 // Function to set password
}
