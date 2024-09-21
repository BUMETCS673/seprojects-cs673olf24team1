/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import ChatBox from './ChatBox';
import { Context } from '../../context/ContextProvider';
import '@testing-library/jest-dom/extend-expect';

// Mock assets
jest.mock('../../assets/assets', () => ({
  eagle_logo: 'eagle_logo_mock',
  user_icon: 'user_icon_mock',
}));

// Mock Context
const mockContext = {
  recentPrompt: 'Course selection for MSSD',
  showResult: false,
  loading: false,
  resultData: 'Here are your course suggestions',
};

test('renders branding and greeting message when there is no result', () => {
  render(
    <Context.Provider value={mockContext}>
      <ChatBox />
    </Context.Provider>
  );

  // Check for branding
  expect(screen.getByText('BUAN CHATBOT')).toBeInTheDocument();
  expect(screen.getByAltText('')).toHaveAttribute('src', 'eagle_logo_mock');

  // Check for greeting
  expect(screen.getByText(/Hello, BU Student/i)).toBeInTheDocument();
  expect(screen.getByText(/How can I help you today?/i)).toBeInTheDocument();
});

test('renders course provider when showResult is false', () => {
  render(
    <Context.Provider value={mockContext}>
      <ChatBox />
    </Context.Provider>
  );

  expect(screen.getByText('Course suggestion MSSD')).toBeInTheDocument();
});

test('renders result when showResult is true', () => {
  render(
    <Context.Provider value={{ ...mockContext, showResult: true }}>
      <ChatBox />
    </Context.Provider>
  );

  expect(screen.getByText('Course selection for MSSD')).toBeInTheDocument();
  expect(screen.getByText('Here are your course suggestions')).toBeInTheDocument();
});
