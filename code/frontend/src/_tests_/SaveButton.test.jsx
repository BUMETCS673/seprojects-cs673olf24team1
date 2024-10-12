import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useChat } from '../context/ChatContext';
import SaveButton from '../components/Sidebar/SaveButton';

// Mocking assets
jest.mock('../_mocks_/assets', () => ({
  save: 'share.png',
}));

// Mocking the useChat hook
jest.mock('../context/ChatContext', () => ({
  useChat: jest.fn(),
}));

describe('SaveButton Component', () => {
  const mockHandleSaveChatSession = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
    useChat.mockReturnValue({ handleSaveChatSession: mockHandleSaveChatSession }); // Mock implementation of useChat
  });

  test('calls handleSaveChatSession on click', () => {
    render(<SaveButton />); // Render the SaveButton component

    const saveButton = screen.getByText(/save to history/i); // Get the button by its text

    fireEvent.click(saveButton); // Simulate a click on the button

    expect(mockHandleSaveChatSession).toHaveBeenCalled(); // Expect the handleSaveChatSession to be called
  });
});
