// Created  by Natasya Liew
// Auth interfaces

// Define the shape of the context value
export interface AuthContextType {
    isAuth: boolean;                // Indicates if the user is authenticated
    isIncorrectPassword: boolean;    // Indicates if the last login attempt was unsuccessful due to incorrect password
    isLoading: boolean;              // Indicates if the authentication process is currently loading
    signUp: (
        authId: string,               // Username for the user account
        email: string,                // User's email address
        password: string,             // User's password
        fName: string,                // User's first name
        lName: string,                // User's last name
        buId: string,                 // Unique identifier for the user (BU ID)
        programType: string,          // Type of academic program (e.g., "MS degree", can be dynamic)
        programCode: string,          // Code for the academic program (e.g., "mssd", can be dynamic)
        pathOfInterest: string,       // User's area of interest (e.g., "AI/ML", "Web Development", can be dynamic)
        coursesToTake: number,        // Number of courses the user plans to take for the semester
        coursesTaken: string[]        // Array of course IDs or names representing completed courses
    ) => Promise<boolean>; // Function to sign up a new user
    login: (authId: string, password: string) => Promise<boolean>; // Function to log in an existing user
    logout: () => Promise<boolean>;  // Function to log out the user
}

// Define the interface for sign-up parameters
export interface SignUpParams {
    authId: string;               // Username for the user account
    email: string;                // User's email address
    password: string;             // User's password
    fName: string;                // User's first name
    lName: string;                // User's last name
    buId: string;                 // Unique identifier for the user (BU ID)
    programType: string;          // Type of academic program (e.g., "MS degree")
    programCode: string;          // Code for the academic program (e.g., "mssd")
    pathOfInterest: string;       // User's area of interest
    coursesToTake: number;        // Number of courses the user plans to take for the semester
    coursesTaken: string[];       // Array of course IDs or names representing completed courses
}

// Define the type for the form state
export interface FormState {
    authId: string;
    email: string;
    password: string;
    confirmPassword: string;
    fName: string;
    lName: string;
    buId: string;
    programType: string;
    programCode: string;
    pathOfInterest: string;
    coursesToTake: number;
    coursesTaken: string[];
}
