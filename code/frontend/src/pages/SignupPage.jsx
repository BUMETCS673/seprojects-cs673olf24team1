/* eslint-disable no-unused-vars */
// Integrated code from depreciated_NewProfilePage.jsx created by Poom.
// Created by Natt 
//Updated, integrated, and annotated by Natasya Liew

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // // Import password visibility toggle icons

// Import styling for the Signup page
import '../assets/styles/SignupPage.scss';
import { assets } from '../assets/assets'; // Import asset resources
// import CourseTakenField from '../components/Profile/CourseTakenField';


import { useAuth } from '../context/AuthContext';
import { useSignUpForm } from './useSignUpForm';


const SignupPage = () => {
  const {
    formState,
    errors,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleChange,
    handleFormSubmit,
    successMessage,
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

            {/* AuthId/Username Input */}
            <div className='form-inputs'>
              <label className="form-label">Username</label>
              <input
                className={errors.username ? 'form-input-invalid' : 'form-input'}
                placeholder="Insert your desired username [text]: "
                name="authId" // Input name matches the state variable
                type="text"
                id="authId"
                value={formState.authId} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            {/* Email Input */}
            <div className='form-inputs'>
              <label className="form-label">Email</label>
              <input
                className={errors.email ? 'form-input-invalid': 'form-input'}
                placeholder="Insert your email [text]: "
                name="email" // Input name matches the state variable
                id="email"
                value={formState.email} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div className="form-inputs">
              <label className="form-label">Password</label>
              <div className="password-container">
                <input
                  className={errors.password ? 'form-input-invalid': 'form-input'}
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
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {/* Confirm Password Input */}
            <div className="form-inputs">
              <label className="form-label">Confirm Password</label>
              <div className="password-container">
                <input
                  className={errors.confirmPassword ? 'form-input-invalid': 'form-input'}
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
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            {/* New Fields from Profile Page */}
            <div className="form-inputs">
              <label className="form-label">First Name</label>
              <input
                className={errors.firstName ? 'form-input-invalid': 'form-input'}
                placeholder="Insert your first name"
                name="firstName" // Input name matches the state variable
                type="text"
                value={formState.firstName} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div className="form-inputs">
              <label className="form-label">Last Name</label>
              <input
                className={errors.lastName ? 'form-input-invalid': 'form-input'}
                placeholder="Insert your last name"
                name="lastName" // Input name matches the state variable
                type="text"
                value={formState.lastName} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <div className="form-inputs">
              <label className="form-label">BU ID</label>
              <input
                className={errors.buId ? 'form-input-invalid': 'form-input'}
                placeholder="Insert your BU ID"
                name="buId" // Input name matches the state variable
                type="text"
                value={formState.buId} // Controlled input
                onChange={handleChange} // Update state on change
                required
              />
              {errors.buId && <span className="error">{errors.buId}</span>}
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
                onChange={handleChange}
                className="form-input"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* <CourseTakenField /> */}
            <div className="course-taken-container">
              <label>Courses Taken:</label>      {formState.coursesTaken.length > 0 ? (
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

export default SignupPage; // Export SignupPage component for use in other parts of the application






