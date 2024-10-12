import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewChatButton from '../components/Sidebar/NewChatButton'; // Adjust the import path as necessary
import { useChat } from '../context/ChatContext'; // Import the context

// Mock the useChat context
jest.mock('../context/ChatContext', () => ({
    useChat: jest.fn(),
}));

describe('NewChatButton', () => {
    let mockCreateNewSession;

    beforeEach(() => {
        // Initialize mock function before each test
        mockCreateNewSession = jest.fn();
        useChat.mockReturnValue({ handleCreateNewSession: mockCreateNewSession });
        jest.clearAllMocks(); // Clear any previous mocks
    });

    test('renders correctly', () => {
        render(<NewChatButton />);

        // Check if the new chat button is rendered
        expect(screen.getByAltText(/new chat/i)).toBeInTheDocument();
        expect(screen.getByText(/new chat/i)).toBeInTheDocument();
    });

    test('calls createNewSession when button is clicked', () => {
        render(<NewChatButton />);

        const newChatButton = screen.getByText(/new chat/i);
        fireEvent.click(newChatButton); // Simulate click event

        // Check if createNewSession was called
        expect(mockCreateNewSession).toHaveBeenCalledTimes(1);
    });
});
