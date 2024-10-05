/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import the icons

// import styling
import '../assets/styles/SignupPage.scss';
import { assets } from '../assets/assets';

const SignupPage = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false); // state for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state for confirm password visibility
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
    
//     if (formState.password !== formState.confirmPassword) {
//       alert("Passwords don't match");
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8080/api/signup', formState);
//       if (response.status === 201) {
//         setSuccessMessage('Signup successful! Please go to the login page.');
//         setFormState({ fullName: '', email: '', password: '', confirmPassword: '' });
//         // Show the popup for success
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000); // Redirect after 3 seconds
//       }
//     } catch (e) {
//       console.error(e);
//       alert('Signup failed. Please try again.');
//     }
//   };
const handleFormSubmit = async (event) => {
  event.preventDefault();

  if (formState.password !== formState.confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  try {
    // Log the form state before making the request
    console.log('Form data:', formState);
    
    const response = await axios.post('http://localhost:8080/api/signup', formState);

    // Log the response from the backend
    console.log('API response:', response);

    if (response.status === 201) {
      setSuccessMessage('Signup successful! Please go to the login page.');
      setFormState({ fullName: '', email: '', password: '', confirmPassword: '' });

      // Show the popup for success
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
    } else {
      alert('Signup failed. Please try again.');
    }
  } catch (e) {
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

            {/* Full Name Input */}
            <div className="form-inputs">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                placeholder="Your full name"
                name="fullName"
                type="text"
                id="fullName"
                value={formState.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-inputs">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
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
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password
                  id="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button className="form-input-btn" type="submit">
              Sign Up
            </button>

            {/* Success Message */}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <span className="form-input-login">
              Already have an account? <Link to="/login">Log in</Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
