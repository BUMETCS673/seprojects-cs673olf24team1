import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatHistory from '../components/Sidebar/ChatHistory';
import { useChat } from '../context/ChatContext';

// Mocking assets
jest.mock('../_mocks_/assets', () => ({
  message_icon: 'message_icon',
  clear: 'message_icon',
}));

// Mocking the useChat hook
jest.mock('../context/ChatContext', () => ({
  useChat: jest.fn(),
}));

describe('ChatHistory Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('renders loading state when fetching data', () => {
    // Mock useChat to simulate loading state
    useChat.mockReturnValue({
      history: [],
      isFetchingNetworkData: true,
      error: null,
      selectedSession: null,
      handleDeleteSessionHistory: jest.fn(),
      handleSelectSession: jest.fn(),
    });

    render(<ChatHistory />);

    // Expect loading text to be displayed
    expect(screen.getByText(/loading chat history.../i)).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    // Mock useChat to simulate an error
    useChat.mockReturnValue({
      history: [],
      isFetchingNetworkData: false,
      error: 'Failed to load chat history',
      selectedSession: null,
      handleDeleteSessionHistory: jest.fn(),
      handleSelectSession: jest.fn(),
    });

    render(<ChatHistory />);

    // Expect error message to be displayed
    expect(screen.getByText(/failed to load chat history/i)).toBeInTheDocument();
  });

  test('renders chat history when available', () => {
    const now = new Date();

    // Mock useChat to simulate chat history
    useChat.mockReturnValue({
      history: [
        {
          id: '1',
          createdTime: now, // Use a Date object directly
        },
        {
          id: '2',
          createdTime: new Date(now.getTime() - 1000 * 60 * 60), // One hour earlier
        },
      ],
      isFetchingNetworkData: false,
      error: null,
      selectedSession: null,
      handleDeleteSessionHistory: jest.fn(),
      handleSelectSession: jest.fn(),
    });

    render(<ChatHistory />);

    // Expect chat history entries to be displayed
    expect(screen.getByText(/chat history/i)).toBeInTheDocument();
    expect(screen.getByText(now.toUTCString())).toBeInTheDocument(); // Check for the most recent entry
    expect(screen.getByText(new Date(now.getTime() - 1000 * 60 * 60).toUTCString())).toBeInTheDocument(); // Check for the earlier entry
  });
});
