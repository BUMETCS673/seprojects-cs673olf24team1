/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Created by Natt 
// Updated by Poom and Natasya Liew
// Annotated by Natasya Liew

import { Link } from 'react-router-dom'; // Import necessary modules from React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import password visibility toggle icons

// Import styling for the Signup page
import '../assets/styles/SignupPage.scss';
import { assets } from '../assets/assets'; // Import asset resources

import { useAuth } from '../context/AuthContext'; // Import authentication context
import { useSignUpForm } from '../context/SigupContext'; // Import Signup context for handling sign-up logic

const SignupPage = () => {
  const {
    formState,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleChange,
    handleFormSubmit,
    successMessage,
    errorMessage, // Added to handle error messages
    inputValue,
    filteredCourses,
    handleInputChange,
    handleCourseSelect,
    handleRemoveCourse,
  } = useSignUpForm();

  return (
    <main className="flex-row justify-center mb-4 h-screen" style={{ height: '100vh' }}>
      <div className="form-container h-screen">
        <div className="form-content-left">
          <img src={assets.bu_logo} alt="bu-logo" className="form-img" style={{ height: '40%' }} />
        </div>
        <div className="form-content-right col-10 col-md-6">
          <form className="form" onSubmit={handleFormSubmit}>
            <h1>BUAN CHATBOT</h1>
            <h2>Sign Up</h2>

            {/* Username Input */}
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

            {/* First Name Input */}
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

            {/* Last Name Input */}
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

            {/* BU ID Input */}
            <div className="form-inputs">
              <label className="form-label">BU ID</label>
              <input
                className="form-input"
                placeholder="Insert your BU ID"
                name="buId" // Input name matches the state variable
                type="text"
                value={formState.buId} // Controlled input
                onChange={handleChange} // Update state on change
              />
            </div>

            {/* Program Type Selection */}
            <div className="form-inputs">
              <label className="form-label">Program Type</label>
              <select
                name="programType" // Input name matches the state variable
                value={formState.programType} // Controlled input
                onChange={handleChange} // Update state on change
                className="form-input"
                required
              >
                <option value="MS degree">MS degree</option>
              </select>
            </div>

            {/* Program Name Selection */}
            <div className="form-inputs">
              <label className="form-label">Program Name</label>
              <select
                name="programCode" // Input name matches the state variable
                value={formState.programCode} // Controlled input
                onChange={handleChange} // Update state on change
                className="form-input"
                required
              >
                <option value="mssd">MS of Software Development</option>
              </select>
            </div>

            {/* Path of Interest Selection */}
            <div className="form-inputs">
              <label className="form-label">Path of Interest</label>
              <select
                name="pathOfInterest" // Input name matches the state variable
                value={formState.pathOfInterest}  // Controlled input
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="app development">App Development</option>
                <option value="web development">Web Development</option>
                <option value="secure software development">Secure Software Development</option>
                <option value="data science">Data Science</option>
                <option value="ai/ml">Artificial Intelligence and Machine Learning</option>
              </select>
            </div>

            {/* Number of Courses to Take Selection */}
            <div className="form-inputs">
              <label className="form-label">Number of Courses to Take for the Semester</label>
              <select
                name="coursesToTake" // Input name matches the state variable
                value={formState.coursesToTake} // Controlled input
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Courses Taken Section */}
            <div className="course-taken-container">
              <label>Courses Taken:</label>      
              {formState.coursesTaken.length > 0 ? (
                <div className="course-list">
                  <ul>
                    {formState.coursesTaken.map(course => (
                      <li key={course}>
                        {course}
                        <span
                          onClick={() => handleRemoveCourse(course)}
                          className="remove-course-icon"
                        >
                          X
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (null)}
              <div className="add-course-container">
                <input
                  type="text"
                  placeholder="Type to search courses..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {filteredCourses.length > 0 && (
                  <ul className="dropdown">
                    {filteredCourses.map(course => (
                      <li key={course} onClick={() => handleCourseSelect(course)}>
                        {course}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Submit Button to trigger form submission */}
            <button className="form-input-btn" type='submit'>
              Sign Up
            </button>

            {/* Display success message if signup is successful */}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Link to navigate to the login page if the user already has an account */}
            <span className="form-input-login">
              Already have an account? <Link to="/login">Log in</Link>
            </span>
            <div className="spacer"></div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignupPage; // Export the SignupPage component for use in other parts of the application
