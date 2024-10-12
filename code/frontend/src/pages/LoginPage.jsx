/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Created by Natt 
// Updated by Poom and Natasya Liew
// Annotated by Natasya liew

// Import necessary modules from React and React Router
import { Link } from 'react-router-dom';
import React from 'react';
import '../assets/styles/SignupPage.scss'; // Importing styles for the Signup page
import { assets } from '../assets/assets'; // Import asset resources (e.g., logo)

// Note: Updated to Redux and using Interfaces for security by Tash.
// LoginPage component for user authentication
const LoginPage = (props) => {
  const {
    formState,
    showPassword,
    togglePasswordVisibility,
    handleChange,
    handleFormSubmit,
    successMessage,
    errorMessage,
  } = useLoginForm();

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
              {errorMessage && <p className="error">{errorMessage.authId}</p>} {/* Display error for authId */}
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
              {errorMessage && <p className="error">{errorMessage.password}</p>} {/* Display error for password */}
            </div>

            {/* General error message */}
            {errorMessage && <p className="error">{errorMessage.general}</p>} {/* Display general error */}


            {/* Submit Button for login */}
            <button className='form-input-btn' type='submit'>
              Log in
            </button>

            {/* Links for user navigation */}
            <span className='form-input-login'>
              Do not have an account? <Link to="/signup">Sign Up</Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage; // Export the LoginPage component for use in other parts of the application
