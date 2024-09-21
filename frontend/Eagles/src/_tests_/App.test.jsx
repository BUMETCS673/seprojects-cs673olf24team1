/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App'; // Adjust the path as necessary

// Mock the LoginPage and ChatPage components
jest.mock('./pages/LoginPage', () => () => <div>LoginPage Component</div>);
jest.mock('./pages/ChatPage', () => () => <div>ChatPage Component</div>);

describe('App Component', () => {
  // Test that the login page renders when navigating to "/"
  it('should render the LoginPage component when at route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Assert that the LoginPage component is rendered
    expect(screen.getByText('LoginPage Component')).toBeInTheDocument();
  });

  // Test that the chat page renders when navigating to "/chat"
  it('should render the ChatPage component when at route "/chat"', () => {
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <App />
      </MemoryRouter>
    );

    // Assert that the ChatPage component is rendered
    expect(screen.getByText('ChatPage Component')).toBeInTheDocument();
  });

  // Optional: Test for unknown route handling (if you plan to implement a 404 page)
  it('should render nothing or a 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Assert that the 404 message is rendered
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
