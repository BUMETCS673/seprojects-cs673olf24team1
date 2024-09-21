/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatHistory from './ChatHistory';
import { Context } from '../../context/ContextProvider';

// Mocking the assets used in the component
jest.mock('../../assets/assets', () => ({
    assets: {
        message_icon: 'mock-message-icon',
    },
}));

describe('ChatHistory Component', () => {

    const mockOnSent = jest.fn();
    const mockSetRecentPrompt = jest.fn();
    const prevPromptsMock = ["Prompt 1", "Prompt 2", "Prompt 3"];

    const renderComponent = () => {
        return render(
            <Context.Provider value={{
                onSent: mockOnSent,
                prevPrompts: prevPromptsMock,
                setRecentPrompt: mockSetRecentPrompt,
            }}>
                <ChatHistory />
            </Context.Provider>
        );
    };

    it('renders the component and displays the title', () => {
        renderComponent();
        const titleElement = screen.getByText(/Chat History/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the correct number of chat history entries', () => {
        renderComponent();
        const chatEntries = screen.getAllByRole('img');
        expect(chatEntries.length).toBe(prevPromptsMock.length);
    });

    it('displays the truncated chat history prompts', () => {
        renderComponent();
        prevPromptsMock.forEach((prompt) => {
            const truncatedPrompt = prompt.slice(0, 10) + ' ...';
            expect(screen.getByText(truncatedPrompt)).toBeInTheDocument();
        });
    });

    it('calls loadPrompt function when a history entry is clicked', async () => {
        renderComponent();
        const chatEntry = screen.getByText('Prompt 1 ...');
        fireEvent.click(chatEntry);

        // Verify that onSent and setRecentPrompt were called with the correct prompt
        expect(mockOnSent).toHaveBeenCalledWith('Prompt 1');
        expect(mockSetRecentPrompt).toHaveBeenCalledWith('Prompt 1');
    });
});
