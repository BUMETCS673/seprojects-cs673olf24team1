// Created by Poom
// Annotated by Natasya Liew

// User interface representing the structure of a user object in the application
export interface User {
    authId: string;               // Username for the user account
    userId: number;               // Unique identifier for the user (e.g., from the database)
    email: string;                // User's email address
    password: string;             // User's password (not typically stored, usually for temporary use during login)
    fName: string;                // User's first name
    lName: string;                // User's last name
    buId: string;                 // Unique identifier for the user (BU ID)
    programType: string;          // Type of academic program (e.g., "MS degree", can be dynamic)
    programCode: string;          // Code for the academic program (e.g., "mssd", can be dynamic)
    pathOfInterest: string;       // User's area of interest (e.g., "AI/ML", "Web Development", can be dynamic)
    coursesToTake: number;        // Number of courses the user plans to take for the semester
    coursesTaken: string[];       // Array of course IDs or names representing completed courses
    chatSessionIds: number[];     // Array of chat session identifiers related to this user
    isNew: boolean;               // Flag indicating if the user is new (true) or returning (false)
}

// User interface for retrieving user data
export interface UserRetrieval {
    authId: string;               // Username for retrieving the user
}

// Context type for managing user state
export interface UserContextType {
    user: User;                   // The current user object
    updateUser: (newUser: Partial<User>) => void; // Function to update the user object
    resetUser: () => void;        // Function to reset the user state
}

// Interface for storing new user information
export interface StoredNewUser {
    firstName: string;            // User's first name
    lastName: string;             // User's last name
    email: string;                // User's email address
    programName: string;          // Name of the user's academic program
    path_interest: string;        // User's area of interest
    courses_to_take: number;      // Number of courses the user plans to take
    courses_taken: string[];      // Array of course IDs or names representing completed courses
    chat_session_ids: number[];   // Array of chat session IDs associated with the user
    isNew: boolean;               // Flag indicating if the user is new
}

// Define the structure of an error response
export interface ErrorResponse {
    success: false;               // Indicates that the operation was unsuccessful
    message: string;              // A human-readable message explaining the error
    code?: number;                // Optional error code for programmatic handling
    details?: string;             // Optional additional details about the error
}

// Define the structure of a success response
export interface SuccessResponse<T> {
    success: true;                // Indicates that the operation was successful
    data: T;                      // The data returned from the operation (generic type for flexibility)
    message?: string;             // Optional message to provide additional context
}
