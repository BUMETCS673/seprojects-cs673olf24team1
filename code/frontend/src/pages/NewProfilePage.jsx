/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import './ProfileForm.css';
import { assets } from '../assets/assets';
import eaglelogo from '../assets/images/eagle_logo.png';
import '../assets/styles/NewProfilePage.css'
import '../components/Profile/ProfileForm.css'
import CourseTakenField from '../components/Profile/CourseTakenField'
import { Link } from 'react-router-dom';

function NewProfilePage() {
  const [formData, setFormData] = useState({
    userName: 'John Doe',
    email: 'john@bu.edu',
    id: 'U123456',
    programType: 'MS degree',
    programName: '',
    pathOfInterest: '',
    coursesToTake: '3'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted: ', formData);
  };

  return (
    <>
        {/* left panel: Profile section */}
        <div className='profile-sidebar'>
            <div className="top">
                <img src={eaglelogo} alt="eagle-logo" className="profile-sidebar-logo" />
            </div>
        </div>
        
        <main className="profilewindow d-fex flex-row">
            {/* title */}
            <div>
                <h1>BUAN PROFILE</h1>
            </div>

            <div className='d-flex flex-row'>

                <div className='middle-panel col-9'>
                    {/* middle panel: Profile section */}
                    <div className='profile-form-container form-profile-container'>
                        <div className='flex-row justify-center mb-4 h-screen'>
                           
                            {/* row 1 */}
                            <div className='d-flex flex-row'>
                                <div className='form-profile d-flex'>
                                    {/* username */}
                                    <div className='col-3 me-3'>
                                        <label htmlFor="">Username</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            value={formData.userName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* email address */}
                                    <div className='col-3 me-3'>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* BU ID */}
                                    <div className='col-3'>
                                    <label>BU ID</label>
                                        <input
                                            type="text"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                                
                            {/* row 2 */}
                            <div className='d-flex flex-row'>

                                <div className='form-profile d-flex'>
                                    {/* program type */}
                                    <div className='col-4 me-3'>
                                        <label>Program Type</label>
                                        <select
                                            name="programType"
                                            value={formData.programType}
                                            onChange={handleChange}
                                        >
                                            <option value="MS degree">MS degree</option>
                                        </select>
                                    </div>

                                    {/* path of interest */}
                                    <div className='col-4'>
                                        <label>Path of Interest</label>
                                        <select
                                            name="pathOfInterest"
                                            value={formData.pathOfInterest}
                                            onChange={handleChange}
                                        >
                                            <option value="app development">App Development</option>
                                            <option value="web development">Web Development</option>
                                            <option value="secure software development">Secure Software Development</option>
                                            <option value="data science">Data Science</option>
                                            <option value="ai/ml">Artificial Intelligence and Machine Learning</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            {/* row 3 */}
                            <div className='d-flex flex-row'>
                                <div className='form-profile d-flex'>
                                    {/* program name */}
                                    <div className='col-4 me-3'>
                                        <label>Program Name</label>
                                        <select
                                            name="programName"
                                            value={formData.programType}
                                            onChange={handleChange}
                                        >
                                            <option value="MS in Computer Science">MS in Computer Science</option>
                                        </select>
                                    </div>

                                    {/* Course to take */}
                                    <div className='col-4'>
                                        <label>Courses to Take</label>
                                        <select
                                            name="coursesToTake"
                                            value={formData.coursesToTake}
                                            onChange={handleChange}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>

                                    </div>
                                </div>
                            </div>

                            {/* row 4 */}
                            <div className='d-flex flex-row'>
                                <div className='form-profile d-flex'>
                                    {/* program name */}
                                    <div className='col-10 me-3'>
                                        <CourseTakenField />
                                    </div>

                                </div>
                            </div>                       
                        </div>
                    </div>  
                </div>
                
                {/* right panel: submit butto section */}
                <div className='right-panel'>
                    {/* Submit Button */}
                    <button className="form-input-btn" type="submit">
                        Save profile
                    </button>
                    <button className="form-input-btn-second" type="submit">
                        <Link to='/login' className='go-back-link'>Go back to log in</Link>
                    </button>
                </div>
            </div>
        </main>       
    </>
  );
}

export default NewProfilePage;
