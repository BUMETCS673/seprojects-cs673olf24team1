// InputField.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../components/InputField/InputField'; // Import the InputField component

describe('InputField', () => {
  let inputValue;
  const mockOnSend = jest.fn(); // Mock function for onSend
  const mockOnChange = jest.fn((e) => {
    inputValue = e.target.value; // Update inputValue based on input change
  });

  beforeEach(() => {
    inputValue = ''; // Reset inputValue before each test
  });

  test('renders correctly with initial props', () => {
    render(<InputField input={inputValue} onSend={mockOnSend} onChange={mockOnChange} />);
    
    // Check if input field is rendered
    const inputElement = screen.getByPlaceholderText(/type your message/i);
    expect(inputElement).toBeInTheDocument();
    
    // Check if send icon is rendered
    const sendIcon = screen.getByAltText(/send icon/i);
    expect(sendIcon).toBeInTheDocument();
  });

  
  test('calls onSend when Enter key is pressed', () => {
    render(<InputField input={inputValue} onSend={mockOnSend} onChange={mockOnChange} />);
    
    const inputElement = screen.getByPlaceholderText(/type your message/i);
    
    // Simulate typing in the input field
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    expect(mockOnSend).toHaveBeenCalledTimes(1); // Check that onSend is called
  });

  test('calls onSend when send icon is clicked', () => {
    render(<InputField input={inputValue} onSend={mockOnSend} onChange={mockOnChange} />);
    
    const sendIcon = screen.getByAltText(/send icon/i);
    
    // Simulate click on the send icon
    fireEvent.click(sendIcon);
    
    expect(mockOnSend).toHaveBeenCalledTimes(1); // Check that onSend is called
  });

  test('send icon is disabled when input is empty', () => {
    render(<InputField input="" onSend={mockOnSend} onChange={mockOnChange} />);
    
    const sendIcon = screen.getByAltText(/send icon/i);
    
    expect(sendIcon).toHaveStyle('opacity: 0.5'); // Check that the icon is semi-transparent
    expect(sendIcon).toHaveStyle('cursor: not-allowed'); // Check that the cursor is not allowed
  });

  test('send icon is enabled when input is not empty', () => {
    render(<InputField input="Hello" onSend={mockOnSend} onChange={mockOnChange} />);
    
    const sendIcon = screen.getByAltText(/send icon/i);
    
    expect(sendIcon).toHaveStyle('opacity: 1'); // Check that the icon is fully opaque
    expect(sendIcon).toHaveStyle('cursor: pointer'); // Check that the cursor is pointer
  });
});
