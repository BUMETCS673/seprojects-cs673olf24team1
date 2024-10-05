/* eslint-disable no-unused-vars */
// Integrated code from depreciated_NewProfilePage.jsx created by Poom.
// Created by Natt 
//Updated, integrated, and annotated by Natasya Liew

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // // Import password visibility toggle icons

// Import styling for the Signup page
import '../assets/styles/SignupPage.scss';
import { assets } from '../assets/assets'; // Import asset resources

const SignupPage = () => {
  // State to manage form data
  const [formState, setFormState] = useState({
    authId: '', // Username
    email: '', // User email
    password: '', // User password
    confirmPassword: '', // Password confirmation
    fName: '', // User's first name
    lName: '', // User's last name
    buId: '', // Student's BU ID
    programType: 'MS degree', // Default program type
    programCode: 'mssd', // Default program code
    courseTaken: [], // Array to hold courses taken (initially empty)
    pathOfInterest: 'web development', // Default path of interest
    coursesToTake: 3 // Default number of courses to take
  });
  
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); // Message to show on successful signup
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle changes to form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value, // Update the corresponding field in formState
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if passwords match before sending the request
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Log the form data for debugging
      console.log('Form data:', formState);
      
      // Make POST request to signup API
      const response = await axios.post('http://localhost:8080/api/signup', formState);

      // Log the response from the backend
      console.log('API response:', response);

      // If signup is successful, show success message and navigate to login
      if (response.status === 201) {
        setSuccessMessage('Signup successful! Please go to the login page.');
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (e) {
      // Log any errors encountered during signup
      console.error(e);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <main className="flex-row justify-center mb-4 h-screen" style={{ height: '100vh' }}>
      <div className="form-container h-screen">
        <div className="form-content-left">
          <img src={assets.bu_logo} alt="bu-logo" className="form-img" style={{ height: '40%' }} />
        </div>
        <div className="form-content-right col-10 col-md-6">
          <form onSubmit={handleFormSubmit} className="form">
            <h1>BUAN CHATBOT</h1>
            <h2>Sign Up</h2>

            {/* AuthId/Username Input */}
            <div className="form-inputs">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                placeholder="Insert your desired username [text]: "
                name="authId" // Input name matches the state variable
                type="text"
                id="authId"
                value={formState.authId} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-inputs">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                placeholder="Insert your email [text]: "
                name="email" // Input name matches the state variable
                type="email"
                id="email"
                value={formState.email} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-inputs">
              <label className="form-label">Password</label>
              <div className="password-container">
                <input
                  className="form-input"
                  placeholder="******"
                  name="password" // Input name matches the state variable
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password
                  id="password"
                  value={formState.password} // Controlled input
                  onChange={handleChange} // Update state on change
                  required
                />
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="form-inputs">
              <label className="form-label">Confirm Password</label>
              <div className="password-container">
                <input
                  className="form-input"
                  placeholder="******"
                  name="confirmPassword" // Input name matches the state variable
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password
                  id="confirmPassword"
                  value={formState.confirmPassword} // Controlled input
                  onChange={handleChange} // Update state on change
                  required
                />
                <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* New Fields from Profile Page */}
            <div className="form-inputs">
              <label className="form-label">First Name</label>
              <input
                className="form-input"
                placeholder="Insert your first name"
                name="fName" // Input name matches the state variable
                type="text"
                value={formState.fName} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
            </div>

            <div className="form-inputs">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                placeholder="Insert your last name"
                name="lName" // Input name matches the state variable
                type="text"
                value={formState.lName} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
            </div>

            <div className="form-inputs">
              <label className="form-label">BU ID</label>
              <input
                className="form-input"
                placeholder="Insert your BU ID"
                name="buId" // Input name matches the state variable
                type="text"
                value={formState.buId} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
            </div>

            <div className="form-inputs">
              <label className="form-label">Program Type</label>
              <select
                name="programType" // Input name matches the state variable
                value={formState.programType} // Controlled input
                onChange={handleChange} // Update state on change
                className="form-input"
              >
                <option value="MS degree">MS degree</option>
              </select>
            </div>

            <div className="form-inputs">
              <label className="form-label">Program Name</label>
              <select
                name="programCode" // Input name matches the state variable
                value={formState.programCode} // Controlled input
                onChange={handleChange} // Update state on change
                className="form-input"
              >
                <option value="mssd">MS of Software Development</option>
              </select>
            </div>

            <div className="form-inputs">
              <label className="form-label">Path of Interest</label>
              <select
                name="pathOfInterest" // Input name matches the state variable
                value={formState.pathOfInterest}  // Controlled input
                onChange={handleChange}
                className="form-input"
              >
                <option value="app development">App Development</option>
                <option value="web development">Web Development</option>
                <option value="secure software development">Secure Software Development</option>
                <option value="data science">Data Science</option>
                <option value="ai/ml">Artificial Intelligence and Machine Learning</option>
              </select>
            </div>

            <div className="form-inputs">
              <label className="form-label">Number of Courses to Take for the Semester</label>
              <select
                name="coursesToTake" // Input name matches the state variable
                value={formState.coursesToTake} // Controlled input
                onChange={(e) => handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: Number(e.target.value) // Convert selected value to integer
                  }
                })}
                className="form-input"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Submit Button to trigger form submission */}
            <button className="form-input-btn" type="submit">
              Sign Up
            </button>

            {/* Display success message if signup is successful */}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Link to navigate to the login page if the user already has an account */}
            <span className="form-input-login">
              Already have an account? <Link to="/login">Log in</Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage; // Export SignupPage component for use in other parts of the application
