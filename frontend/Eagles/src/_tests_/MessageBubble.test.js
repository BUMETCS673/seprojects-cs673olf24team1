// // MessageBubble.test.js
// import React from 'react';
// import { render } from '@testing-library/react';
// import MessageBubble from '../components/MessageBubble';

// test('renders user message bubble', () => {
//     const message = { text: 'This is a test message', sender: 'user' };
//     const { getByText } = render(<MessageBubble message={message} />);
//     const bubble = getByText(/This is a test message/i);
//     expect(bubble).toBeInTheDocument();
//     expect(bubble).toHaveClass('message-bubble user');
// });

// test('renders bot message bubble', () => {
//     const message = { text: 'This is a bot message', sender: 'bot' };
//     const { getByText } = render(<MessageBubble message={message} />);
//     const bubble = getByText(/This is a bot message/i);
//     expect(bubble).toBeInTheDocument();
//     expect(bubble).toHaveClass('message-bubble bot');
// });
