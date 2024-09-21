/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// LoginPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage'; // Adjust the import path accordingly

// Mock the 'useNavigate' hook and 'useDispatch' to avoid issues in test
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('LoginPage Component', () => {
  // Test to check if the component renders correctly
  it('should render the login form with email and password fields', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Check if the title exists
    expect(screen.getByText(/BUAN CHATBOT/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();

    // Check if input fields and labels are present
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  // Test to check if input fields update state on change
  it('should update email and password fields on change', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Select the input elements
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Simulate user typing in the input fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if the values have been updated
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Test to check form submission behavior
  it('should submit the form with email and password', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText(/Login/i);

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // In real form submission, check if form handling was called
    // Here we simulate by checking console log or any form of dispatch that might have occurred

    // Since the login action is mocked, you can assert form clearing after submission
    expect(emailInput.value).toBe(''); // Check if form is cleared
    expect(passwordInput.value).toBe('');
  });

  // Test to check for 'Forgot password' and 'Sign Up' links
  it('should display "Forgot password" and "Sign Up" links', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const signUpLink = screen.getByText(/Sign Up/i);
    const forgotPasswordLink = screen.getByText(/Forgot password/i);

    expect(signUpLink).toBeInTheDocument();
    expect(forgotPasswordLink).toBeInTheDocument();
  });
});
