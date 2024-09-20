/* eslint-disable no-undef */
// src/components/ChatBox.test.js

import { render, fireEvent, screen } from '@testing-library/react';
import ChatBox from './ChatBox';

test('sends user message and receives bot reply', async () => {
  render(<ChatBox />);

  // Find the input field and send button
  const inputField = screen.getByPlaceholderText(/type a message/i);
  const sendButton = screen.getByText(/send/i);

  // Simulate typing a message
  fireEvent.change(inputField, { target: { value: 'Hello' } });

  // Simulate clicking the send button
  fireEvent.click(sendButton);

  // Check if the user's message appears in the chat
  expect(screen.getByText(/hello/i)).toBeInTheDocument();

  // Wait for bot response (assuming a bot reply is always given for testing purposes)
  const botReply = await screen.findByText(/Sorry, there was an issue processing your request./i);
  expect(botReply).toBeInTheDocument();
});



// // ChatBox.test.js
// import React from 'react';
// import { render } from '@testing-library/react';
// import ChatBox from '../components/ChatBox';

// test('renders chat messages', () => {
//     const { getByText } = render(<ChatBox />);
//     expect(getByText('Hello! How can I assist you?')).toBeInTheDocument();
//     expect(getByText('I need help with course selection.')).toBeInTheDocument();
// });
