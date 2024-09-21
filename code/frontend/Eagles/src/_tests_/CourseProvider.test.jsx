/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import CourseProvider from './CourseProvider';
import '@testing-library/jest-dom/extend-expect';

test('renders course suggestion cards', () => {
  render(<CourseProvider />);
  
  const courseCards = screen.getAllByText(/Course suggestion MSSD/i);
  expect(courseCards).toHaveLength(4); // There should be 4 cards
  courseCards.forEach(card => {
    expect(card).toBeInTheDocument();
  });
});
