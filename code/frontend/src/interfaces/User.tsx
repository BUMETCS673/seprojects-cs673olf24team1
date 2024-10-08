// Created by Poom
// Annotated by Natasya Liew

// User interface representing the structure of a user object in the application
export interface User {
    authId: string;               // Username for the user account
    userId: number;
    email: string;                // User's email address
    password: string;             // User's password (not typically stored, usually for temporary use during login)
    fName: string;            // User's first name
    lName: string;             // User's last name
    buId: string;                 // Unique identifier for the user (BU ID)
    programType: string;          // Type of academic program (e.g., "MS degree", can be dynamic)
    programCode: string;          // Code for the academic program (e.g., "mssd", can be dynamic)
    pathOfInterest: string;       // User's area of interest (e.g., "AI/ML", "Web Development", can be dynamic)
    coursesToTake: number;        // Number of courses the user plans to take for the semester
    coursesTaken: string[];       // Array of course IDs or names representing completed courses
    chatSessionIds: string[];     // Array of chat session identifiers related to this user
    isNew: boolean;               // Flag indicating if the user is new (true) or returning (false)
}

