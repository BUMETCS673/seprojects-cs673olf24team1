/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
// ChatPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatPage from '../ChatPage'; // Adjust the path as necessary
import SideBar from '../components/Sidebar/Sidebar';
import ChatBox from '../components/ChatBox/ChatBox';

// Mock the child components (SideBar and ChatBox) to isolate the test
jest.mock('../components/Sidebar/Sidebar', () => () => <div>Sidebar Component</div>);
jest.mock('../components/ChatBox/ChatBox', () => () => <div>ChatBox Component</div>);

describe('ChatPage Component', () => {
  // Test to check if the Sidebar and ChatBox components render correctly
  it('should render the Sidebar and ChatBox components', () => {
    render(<ChatPage />);

    // Check if Sidebar and ChatBox components are in the document
    expect(screen.getByText('Sidebar Component')).toBeInTheDocument();
    expect(screen.getByText('ChatBox Component')).toBeInTheDocument();
  });

  // Test to verify that the ChatPage is structured correctly
  it('should have a Sidebar and a ChatBox in the correct order', () => {
    render(<ChatPage />);

    const sidebar = screen.getByText('Sidebar Component');
    const chatbox = screen.getByText('ChatBox Component');

    expect(sidebar).toBeInTheDocument();
    expect(chatbox).toBeInTheDocument();

    // Optionally, you can check if the elements are ordered correctly in the DOM
    expect(sidebar.compareDocumentPosition(chatbox)).toBe(4); // Document position 4 means chatbox follows sidebar
  });
});
