// // src/tests/Auth.test.js
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import UserAuth from '../components/UserAuth';
// import { AuthProvider } from '../context/AuthContext';

// test('renders login form', () => {
//   render(
//     <AuthProvider>
//       <UserAuth />
//     </AuthProvider>
//   );
//   const emailInput = screen.getByPlaceholderText('Email');
//   expect(emailInput).toBeInTheDocument();
// });

// test('signup form displays confirm password', () => {
//   render(
//     <AuthProvider>
//       <UserAuth />
//     </AuthProvider>
//   );
//   fireEvent.click(screen.getByText(/New user\? Sign Up/i));
//   const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
//   expect(confirmPasswordInput).toBeInTheDocument();
// });

// test('forgot password flow', () => {
//   render(
//     <AuthProvider>
//       <UserAuth />
//     </AuthProvider>
//   );
//   fireEvent.click(screen.getByText(/Forgot Password/i));
//   const emailInput = screen.getByPlaceholderText('Enter your email');
//   expect(emailInput).toBeInTheDocument();
// });



// // // src/tests/UserAuth.test.js
// // import { render, screen, fireEvent } from '@testing-library/react';
// // import UserAuth from '../components/UserAuth';
// // import { AuthContext } from '../context/AuthContext';

// // const mockLogin = jest.fn();

// // test('renders login form', () => {
// //   render(
// //     <AuthContext.Provider value={{ login: mockLogin }}>
// //       <UserAuth />
// //     </AuthContext.Provider>
// //   );
// //   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
// //   expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
// //   expect(screen.getByText('Login')).toBeInTheDocument();
// // });

// // test('calls login function when login form is submitted', () => {
// //   render(
// //     <AuthContext.Provider value={{ login: mockLogin }}>
// //       <UserAuth />
// //     </AuthContext.Provider>
// //   );
// //   fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
// //   fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
// //   fireEvent.click(screen.getByText('Login'));
// //   expect(mockLogin).toHaveBeenCalledTimes(1);
// // });



// // // src/tests/UserAuth.test.js

// // import { render, screen, fireEvent } from '@testing-library/react';
// // import UserAuth from '../components/UserAuth';
// // import { AuthContext } from '../context/AuthContext';
// // import { login } from '../services/auth';

// // // Mock the login service
// // jest.mock('../services/auth', () => ({
// //   login: jest.fn(),
// // }));

// // test('renders login form', () => {
// //   render(<UserAuth />);
// //   expect(screen.getByText('Login')).toBeInTheDocument();
// //   expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
// //   expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
// // });

// // test('logs in a user successfully', async () => {
// //   login.mockResolvedValueOnce({ token: 'fake-jwt-token' });

// //   render(
// //     <AuthContext.Provider value={{ setUser: jest.fn() }}>
// //       <UserAuth />
// //     </AuthContext.Provider>
// //   );

// //   // Fill in the form
// //   fireEvent.change(screen.getByPlaceholderText('Email'), {
// //     target: { value: 'test@example.com' },
// //   });
// //   fireEvent.change(screen.getByPlaceholderText('Password'), {
// //     target: { value: 'password' },
// //   });

// //   // Submit the form
// //   fireEvent.click(screen.getByText('Login'));

// //   // Assert login is called with correct credentials
// //   expect(login).toHaveBeenCalledWith('test@example.com', 'password');
// // });