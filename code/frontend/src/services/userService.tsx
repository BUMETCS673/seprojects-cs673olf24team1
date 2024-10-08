import { User } from "../interfaces/User";
import { mapUserToAPIBody } from "../utils/mappers";

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const UserService = {
    async getUserData(authId: string) {
        const token = sessionStorage.getItem('token'); // Retrieve token from localStorage
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/user/${authId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
     createUser: async (user: User): Promise<number> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/user`, {
                method: 'POST', // HTTP method for creating a user
                headers: {
                    'Content-Type': 'application/json', // Specify content type for JSON
                },
                body: mapUserToAPIBody(user), // User details in JSON format
            });

            // Check if the response indicates failure
            if (!response.ok) {
                throw new Error('Failed to create user'); // Throw error for non-200 responses
            }

            const data = await response.json(); // Parse the response data

            return data; // Return the user object from the response
        } catch (error) {
            console.error('Error during sign-up:', error); // Log any errors encountered
            return -1; // Return null in case of an error
        }
    },
};
