import { User } from "../interfaces/User";

const API_BASE_URL = 'https://localhost:8080';

export const UserService = {
    async getUser(buId: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/user/${buId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch user with ID ${buId}`);
            }
            const user = await response.json();
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    async uploadUser(userData: Partial<User>) {
        try {
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            const newUser = await response.json();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
};
