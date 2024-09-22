/* eslint-disable no-undef */
import { render, fireEvent, screen } from '@testing-library/react';
import InputField from './InputField';
import { Context } from '../../context/ContextProvider';
import '@testing-library/jest-dom/extend-expect';

// Mock assets
jest.mock('../../assets/assets', () => ({
  gallery_icon: 'gallery_icon_mock',
  mic_icon: 'mic_icon_mock',
  send_icon: 'send_icon_mock',
}));

const mockContext = {
  input: '',
  setInput: jest.fn(),
  onSent: jest.fn(),
};

test('renders input field and icons', () => {
  render(
    <Context.Provider value={mockContext}>
      <InputField />
    </Context.Provider>
  );

  // Check input box
  const inputBox = screen.getByPlaceholderText(/Type your message/i);
  expect(inputBox).toBeInTheDocument();

  // Check icons
  expect(screen.getByAltText('')).toHaveAttribute('src', 'gallery_icon_mock');
  expect(screen.getByAltText('')).toHaveAttribute('src', 'mic_icon_mock');
});

test('calls setInput on input change', () => {
  render(
    <Context.Provider value={mockContext}>
      <InputField />
    </Context.Provider>
  );

  const inputBox = screen.getByPlaceholderText(/Type your message/i);
  fireEvent.change(inputBox, { target: { value: 'Hello chatbot' } });

  expect(mockContext.setInput).toHaveBeenCalledWith('Hello chatbot');
});

test('calls onSent when send icon is clicked', () => {
  render(
    <Context.Provider value={{ ...mockContext, input: 'Hello chatbot' }}>
      <InputField />
    </Context.Provider>
  );

  const sendIcon = screen.getByAltText('send icon');
  fireEvent.click(sendIcon);

  expect(mockContext.onSent).toHaveBeenCalled();
});
