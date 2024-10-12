import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar/Sidebar';

// Mock the subcomponents to ensure they do not affect the test
jest.mock('../components/Sidebar/NewChatButton', () => () => <div>New Chat Button</div>);
jest.mock('../components/Sidebar/ChatHistory', () => () => <div>Chat History</div>);
jest.mock('../components/Sidebar/SaveButton', () => () => <div>Save Button</div>);
jest.mock('../components/Sidebar/DownloadButton', () => () => <div>Download Button</div>);
jest.mock('../components/Sidebar/LogoutButton', () => () => <div>Logout Button</div>);

describe('Sidebar Component', () => {
  test('renders Sidebar', () => {
    // Render the Sidebar component
    render(<Sidebar />);

    // Check that the sidebar is in the document
    expect(screen.getByText('New Chat Button')).toBeInTheDocument();
    expect(screen.getByText('Chat History')).toBeInTheDocument();
    expect(screen.getByText('Save Button')).toBeInTheDocument();
    expect(screen.getByText('Download Button')).toBeInTheDocument();
    expect(screen.getByText('Logout Button')).toBeInTheDocument();
  });
});
