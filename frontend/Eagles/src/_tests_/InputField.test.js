// InputField.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputField from '../components/InputField';

test('input value changes on user input', () => {
    const { getByPlaceholderText } = render(<InputField />);
    const input = getByPlaceholderText(/Type your message here/i);
    fireEvent.change(input, { target: { value: 'Test Message' } });
    expect(input.value).toBe('Test Message');
});

test('clears input on send', () => {
    const { getByPlaceholderText, getByText } = render(<InputField />);
    const input = getByPlaceholderText(/Type your message here/i);
    const sendButton = getByText(/Send/i);

    fireEvent.change(input, { target: { value: 'Test Message' } });
    fireEvent.click(sendButton);

    expect(input.value).toBe(''); // Ensure the input is cleared after sending
});
