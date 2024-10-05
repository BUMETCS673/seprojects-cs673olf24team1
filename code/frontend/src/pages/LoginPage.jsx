/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Created by Natt 
// Updated by Poom and Natasya Liew
// Annotated by Natasya liew

// Import necessary modules from React and React Router
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Custom hook for authentication context
import '../assets/styles/SignupPage.scss'; // Importing styles for the Signup page
import { assets } from '../assets/assets'; // Import asset resources (e.g., logo)

// LoginPage component for user authentication
const LoginPage = (props) => {
  // Destructure authentication-related values and functions from the AuthContext
  const { isAuth, isLoading, isIncorrectPassword, login } = useAuth();
  
  // State to manage form inputs for authentication
  const [formState, setFormState] = useState({ authId: '', password: '' }); // Initial state for authId (username) and password
  
  const navigate = useNavigate(); // Hook to programmatically navigate after login

  // Handle changes to form input fields
  const handleChange = (event) => {
    const { name, value } = event.target; // Extract name and value from the input field

    // Update formState with the new value for the corresponding field
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!formState.authId || !formState.password) return; // Ensure both fields are filled

    try {
      // Attempt to log in using the credentials provided
      const result = await login(formState.authId, formState.password);
      if (result) {
        // Navigate to the chat page upon successful login
        navigate('/chat');
      }
    } catch (error) {
      // Log any errors encountered during the login process
      console.error("Login failed: ", error);
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
                value={formState.authId} // Controlled input
                onChange={handleChange} // Update state on change
              />
              {/* Uncomment for error display
              {errors.authId && <p className="error">{errors.authId}</p>} */}
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
                value={formState.password} // Controlled input
                onChange={handleChange} // Update state on change
              />
              {/* Uncomment for error display
              {errors.password && <p className="error">{errors.password}</p>} */}
            </div>

            {/* Submit Button for login */}
            <button className='form-input-btn' type='submit'>
              Log in
            </button>

            {/* Links for user navigation */}
            <span className='form-input-login'>
              Do not have an account? <Link to="/signup">Sign Up</Link>
            </span>
            <span className='form-input-login'>
              <Link to="/forgotpassword">
                Forgot password
              </Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage; // Export the LoginPage component for use in other parts of the application
