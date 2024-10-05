import { User } from "../interfaces/User";

const API_BASE_URL = 'https://localhost:8080';

export const UserService = {
    async getUserData(authId: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${authId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${authId}`);
            }
            const user = await response.json();
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },


     // Sign up a new user
     createUser: async (user: User): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST', // HTTP method for creating a user
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                },
                body: JSON.stringify(user), // User details in JSON format
            });

            // Check if the response indicates failure
            if (!response.ok) {
                throw new Error('Failed to create user'); // Throw error for non-200 responses
            }

            const data = await response.json(); // Parse the response data
            return data.user; // Return the user object from the response
        } catch (error) {
            console.error('Error during sign-up:', error); // Log any errors encountered
            return false; // Return null in case of an error
        }
    },
};
