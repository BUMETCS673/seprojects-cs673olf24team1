// ChatBubble.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatBubble from '../components/ChatBox/ChatBubble'; // Adjust the import path as necessary
import { assets } from '../assets/assets';

// Mock the assets used in the component
// jest.mock('../_mocks_/assets', () => ({
//     assets: {
//         user_icon: 'mock_user_icon.png',
//         bu_logo: 'mock_bu_logo.png',
//     },
// }));

describe('ChatBubble Component', () => {
    test('renders user message correctly', () => {
        const message = { text: 'Hello, how are you?', isUser: true };

        render(<ChatBubble message={message} />);

        // Assert the text is displayed
        expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();

        // Assert the user icon is displayed
        const userIcon = screen.getByAltText('User Icon');
        expect(userIcon).toBeInTheDocument();
        expect(userIcon.src).toContain(assets.user_icon); // Check if the correct icon is used
    });

    test('renders bot message correctly', () => {
        const message = { text: 'I am here to help!', isUser: false };

        render(<ChatBubble message={message} />);

        // Assert the text is displayed
        expect(screen.getByText('I am here to help!')).toBeInTheDocument();

        // Assert the bot icon is displayed
        const botIcon = screen.getByAltText('Bot Icon');
        expect(botIcon).toBeInTheDocument();
        expect(botIcon.src).toContain(assets.bu_logo); // Check if the correct icon is used
    });
});
