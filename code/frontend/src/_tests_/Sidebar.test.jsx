/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import { Context } from '../../context/ContextProvider';

// Mocking the assets
jest.mock('../../assets/assets', () => ({
    assets: {
        newchat: 'mock-newchat-icon',
        clear: 'mock-clear-icon',
        email: 'mock-email-icon',
        print: 'mock-print-icon',
        share: 'mock-share-icon',
        logout: 'mock-logout-icon',
        message_icon: 'mock-message-icon'
    },
}));

describe('Sidebar Component', () => {
    const mockOnSent = jest.fn();
    const mockSetRecentPrompt = jest.fn();
    const mockNewChat = jest.fn();
    const prevPromptsMock = ["Prompt 1", "Prompt 2"];

    const renderComponent = () => {
        return render(
            <Context.Provider value={{
                onSent: mockOnSent,
                prevPrompts: prevPromptsMock,
                setRecentPrompt: mockSetRecentPrompt,
                newChat: mockNewChat,
            }}>
                <Sidebar />
            </Context.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the sidebar with all buttons and chat history', () => {
        renderComponent();
        
        // Top buttons
        expect(screen.getByText(/New Chat/i)).toBeInTheDocument();
        expect(screen.getByText(/Chat History/i)).toBeInTheDocument();
        
        // Bottom buttons
        expect(screen.getByText(/Clear/i)).toBeInTheDocument();
        expect(screen.getByText(/Email/i)).toBeInTheDocument();
        expect(screen.getByText(/Print/i)).toBeInTheDocument();
        expect(screen.getByText(/Share/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });

    it('calls newChat when New Chat button is clicked', () => {
        renderComponent();
        const newChatButton = screen.getByText(/New Chat/i);
        fireEvent.click(newChatButton);
        expect(mockNewChat).toHaveBeenCalled();
    });

    it('displays chat history and calls loadPrompt when a chat history entry is clicked', async () => {
        renderComponent();
        const chatEntry = screen.getByText('Prompt 1 ...');
        fireEvent.click(chatEntry);
        expect(mockOnSent).toHaveBeenCalledWith('Prompt 1');
        expect(mockSetRecentPrompt).toHaveBeenCalledWith('Prompt 1');
    });

    it('calls console.log and clears chat history when Clear button is clicked', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        renderComponent();
        const clearButton = screen.getByText(/Clear/i);
        fireEvent.click(clearButton);
        expect(consoleSpy).toHaveBeenCalledWith("Clear Chat History");
    });

    it('calls console.log when Email button is clicked', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        renderComponent();
        const emailButton = screen.getByText(/Email/i);
        fireEvent.click(emailButton);
        expect(consoleSpy).toHaveBeenCalledWith("Email chat history");
    });

    it('calls window.print when Print button is clicked', () => {
        const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});
        renderComponent();
        const printButton = screen.getByText(/Print/i);
        fireEvent.click(printButton);
        expect(printSpy).toHaveBeenCalled();
    });

    it('calls console.log when Share button is clicked', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        renderComponent();
        const shareButton = screen.getByText(/Share/i);
        fireEvent.click(shareButton);
        expect(consoleSpy).toHaveBeenCalledWith("Share chat history link");
    });

    it('calls console.log when Logout button is clicked', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        renderComponent();
        const logoutButton = screen.getByText(/Logout/i);
        fireEvent.click(logoutButton);
        expect(consoleSpy).toHaveBeenCalledWith("End chat and logout");
    });
});
