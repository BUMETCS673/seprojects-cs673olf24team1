// src/tests/Auth.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserAuth from '../components/UserAuth';
import { AuthProvider } from '../context/AuthContext';

test('renders login form', () => {
  render(
    <AuthProvider>
      <UserAuth />
    </AuthProvider>
  );
  const emailInput = screen.getByPlaceholderText('Email');
  expect(emailInput).toBeInTheDocument();
});

test('signup form displays confirm password', () => {
  render(
    <AuthProvider>
      <UserAuth />
    </AuthProvider>
  );
  fireEvent.click(screen.getByText(/New user\? Sign Up/i));
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  expect(confirmPasswordInput).toBeInTheDocument();
});

test('forgot password flow', () => {
  render(
    <AuthProvider>
      <UserAuth />
    </AuthProvider>
  );
  fireEvent.click(screen.getByText(/Forgot Password/i));
  const emailInput = screen.getByPlaceholderText('Enter your email');
  expect(emailInput).toBeInTheDocument();
});

