//Created by poom, updated by tash

// interfaces/UserSession.ts
// User interface representing the structure of a user object in the application
export interface User {
    authId: string;               // Username for the user account
    userId: number;               // Unique identifier for the user
    email: string;                // User's email address
    password: string;             // User's password (not typically stored, usually for temporary use during login)
    fName: string;                // User's first name
    lName: string;                // User's last name
    programCode: string;          // Code for the academic program (e.g., "mssd", can be dynamic)
    pathOfInterest: string;       // User's area of interest (e.g., "AI/ML", "Web Development", can be dynamic)
    coursesToTake: number;        // Number of courses the user plans to take for the semester
    coursesTaken: string[];       // Array of course IDs or names representing completed courses
    chatSessionIds: string[];     // Array of chat session identifiers related to this user
    isNew: boolean;               // Flag indicating if the user is new (true) or returning (false)
}

// Response interface for user data retrieval
export interface UserResponse {
    user: User;                  // The user object
    jwtToken: string;               // JWT token for authenticated requests
}

export interface AuthError {
    code: string;                // Error code for identifying the type of error
    message: string;             // Human-readable error message
}
