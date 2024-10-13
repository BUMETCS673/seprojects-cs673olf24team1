/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Created by Natt 
// Updated by Poom and Natasya Liew
// Annotated by Natasya Liew

import { Link, useNavigate } from 'react-router-dom'; // Import necessary modules from React Router
import React from 'react'; // Import React
import { useLogin } from '../context/LoginContext'; // Custom hook for login context
import '../assets/styles/SignupPage.scss'; // Importing styles for the Signup page
import { assets } from '../assets/assets'; // Import asset resources (e.g., logo)

// LoginPage component for user authentication
const LoginPage = () => {
    // Destructure login-related functions from the LoginContext
    const { handleChange, handleLogin } = useLogin();
    const navigate = useNavigate(); // Hook to programmatically navigate after login

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const result = await handleLogin(); // Attempt to log in using the credentials provided

            // Check for successful login
            if (result) {
                // Success message
                alert('Login successful!'); // Inform the user of successful login
                navigate('/chat'); // Navigate to the chat page
            } else {
                // Error message for failed login
                alert('Invalid username or password. Please try again.'); // Inform the user of failed login
            }
        } catch (error) {
            console.error("Login failed: ", error); // Log any errors encountered during the login process
            alert('An unexpected error occurred during login. Please try again later.'); // Inform user of error
        }
    };

    return (
        <main className='flex-row justify-center mb-4 h-screen' style={{ height: '100vh' }}>
            <div className='form-container h-screen'>
                {/* Left section: Display logo */}
                <div className="form-content-left">
                    <img src={assets.bu_logo} alt="bu-logo" className='form-img' style={{ height: '40%' }} />
                </div> 
                {/* Right section: Form for login */}
                <div className='form-content-right col-10 col-md-6'>
                    <form onSubmit={handleFormSubmit} className='form'>
                        <h1>BUAN CHATBOT</h1>
                        <h2>Sign In</h2>

                        {/* Username Input Field */}
                        <div className='form-inputs'>
                            <label className='form-label'>Username</label>
                            <input
                                className='form-input'
                                placeholder='Insert your account username [text]: '
                                name='authId' // Input name matches the state variable
                                type='text'
                                id='authId'
                                onChange={handleChange} // Update state on change
                            />
                        </div>

                        {/* Password Input Field */}
                        <div className='form-inputs'>
                            <label className='form-label'>Password</label>
                            <input
                                className='form-input'
                                placeholder='******'
                                name='password' // Input name matches the state variable
                                type='password'
                                id='password'
                                onChange={handleChange} // Update state on change
                            />
                        </div>

                        {/* Submit Button for login */}
                        <button className='form-input-btn' type='submit'>
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage; // Export the LoginPage component for use in other parts of the application
