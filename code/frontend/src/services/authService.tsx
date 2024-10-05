import { User } from "../interfaces/User";

const API_BASE_URL = 'some auth API endpoint like OKTAs';

// Service to manage authentication
const authService = {
    // Sign up a new user
    createUser: async (name: string, email: string, password: string): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            const data = await response.json();
            return data.user; // Adjust this according to your API response
        } catch (error) {
            console.error('Error during sign-up:', error);
            return null;
        }
    },

    // Login an existing user
    loginUser: async (email: string, password: string): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            const data = await response.json();
            return data.user; // Adjust this according to your API response
        } catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    },

    // Logout the user
    logoutUser: async (): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.ok;
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    },
};

export default authService;
