/* eslint-disable no-undef */
// App.test.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders login page', () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );
    expect(getByText(/Login to BUAN Chatbot/i)).toBeInTheDocument();
});

test('renders chat page after login', () => {
    const { getByText } = render(
        <MemoryRouter initialEntries={['/chat']}>
            <App />
        </MemoryRouter>
    );
    expect(getByText(/End Chat/i)).toBeInTheDocument();
});
