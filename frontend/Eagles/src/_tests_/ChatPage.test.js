/* eslint-disable no-undef */
// src/pages/Chat.test.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cookies from 'js-cookie';
import ChatPage from '../pages/ChatPage';
import { sendMessageToAI, sendEmail } from '../services/api';

// Mocking API calls
jest.mock('../services/api', () => ({
    sendMessageToAI: jest.fn(),
    sendEmail: jest.fn(),
}));

describe('Chat Component', () => {
    // Test rendering of the component and initial state
    test('renders Chat component with initial UI', () => {
        render( < ChatPage / > );

        expect(screen.getByLabelText(/type your message/i)).toBeInTheDocument();
        expect(screen.getByText(/send/i)).toBeInTheDocument();
        expect(screen.getByText(/email chat history/i)).toBeInTheDocument();
        expect(screen.getByText(/share chat history/i)).toBeInTheDocument();
    });

    // Test message sending functionality
    test('sends message and updates chat history', async() => {
        // Mock AI response
        sendMessageToAI.mockResolvedValue({ text: 'AI Response' });

        // Render the Chat component
        render( < ChatPage / > );

        // Simulate user typing a message
        fireEvent.change(screen.getByLabelText(/type your message/i), {
            target: { value: 'Hello' }
        });

        // Simulate sending the message
        fireEvent.click(screen.getByText(/send/i));

        // Check if the message is added to chat history
        expect(await screen.findByText(/user: hello/i)).toBeInTheDocument();
        expect(await screen.findByText(/ai: ai response/i)).toBeInTheDocument();
    });

    // Test chat history caching with cookies
    test('caches chat history in cookies', () => {
        // Set a dummy chat history
        const dummyChatHistory = [{ sender: 'User', text: 'Hello' }, { sender: 'AI', text: 'AI Response' }];
        Cookies.set('chatHistory', JSON.stringify(dummyChatHistory));

        // Render the Chat component
        render( < ChatPage / > );

        // Check if chat history is loaded from cookies
        expect(screen.getByText(/user: hello/i)).toBeInTheDocument();
        expect(screen.getByText(/ai: ai response/i)).toBeInTheDocument();
    });

    // Test sending email functionality
    test('sends email with chat history', async() => {
        // Mock email sending
        sendEmail.mockResolvedValue({ success: true });

        // Render the Chat component
        render( < ChatPage / > );

        // Simulate clicking the email button
        fireEvent.click(screen.getByText(/email chat history/i));

        // Expect email sending to be called
        expect(sendEmail).toHaveBeenCalled();
        expect(await screen.findByText(/chat history sent to your email/i)).toBeInTheDocument();
    });

    // Test chat history sharing functionality
    test('shares chat history', () => {
        // Set a dummy chat history in cookies
        Cookies.set('chatHistory', JSON.stringify([{ sender: 'User', text: 'Hello' }]));

        // Render the Chat component
        render( < ChatPage / > );

        // Simulate clicking the share button
        fireEvent.click(screen.getByText(/share chat history/i));

        // Check if sharing alert is shown
        expect(window.alert).toHaveBeenCalledWith('Chat history shared!');
    });

    // Clean up after each test
    afterEach(() => {
        jest.clearAllMocks();
    });
});