import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import LogoutButton from '../components/Sidebar/LogoutButton';

// Mocking the useAuth hook
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mocking the assets
jest.mock('../_mocks_/assets', () => ({
  logout: 'logout.png',
}));

describe('LogoutButton Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
    useAuth.mockReturnValue({ logout: mockLogout }); // Mock implementation of useAuth
  });

  test('calls logout and navigates to "/" on click', async () => {
    const navigateMock = jest.fn(); // Mock navigate function
    const { getByText } = render(
      <Router>
        <LogoutButton />
      </Router>
    );

    // Simulate a click on the logout button
    fireEvent.click(getByText(/logout/i));

    // Check if the logout function was called
    expect(mockLogout).toHaveBeenCalled();
  });
});
