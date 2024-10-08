/* eslint-disable no-unused-vars */
// Created by Poom
import React, { useState } from 'react';
// import './ProfileForm.css';
import { assets } from '../assets/assets';
import bu_logo from '../assets/images/bu_logo.png';
import '../assets/styles/NewProfilePage.css'
import '../components/Profile/ProfileForm.css'
import CourseTakenField from '../components/Profile/CourseTakenField'
import { Link } from 'react-router-dom';

function NewProfilePage() {
  const [formData, setFormData] = useState({
    password: 'johndoe_password',
    fName: 'John',
    lName: 'Doe',
    buId: 'U123456',
    programType: 'MS degree',
    programCode: 'mssd',
    courseTaken: [],
    pathOfInterest: 'ai/ml',
    coursesToTake: 3
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
                <img src={bu_logo} alt="bu-logo" className="profile-sidebar-logo" />
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

                                    {/* password */}
                                    <div className='col-3 me-3'>
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* f_name */}
                                    <div className='col-3 me-3'>
                                        <label>First Name</label>
                                        <input
                                            type="first name"
                                            name="fName"
                                            value={formData.fName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* l_name */}
                                    <div className='col-3 me-3'>
                                        <label>Last Name</label>
                                        <input
                                            type="last name"
                                            name="lName"
                                            value={formData.lName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* BU ID */}
                                    <div className='col-3'>
                                    <label>BU ID</label>
                                        <input
                                            type="text"
                                            name="buId"
                                            value={formData.buId}
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

                                    {/* program type */}
                                    <div className='col-4 me-3'>
                                        <label>Program Name</label>
                                        <select
                                            name="programCode"
                                            value={formData.programCode}
                                            onChange={handleChange}
                                        >
                                            <option value="mssd">MS of Software Development</option>
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
                                    {/* Course to take */}
                                    <div className='col-4'>
                                        <label>Number of Courses to Take for the Semester</label>
                                        <select
                                            name="coursesToTake"
                                            value={formData.coursesToTake}
                                            onChange={(e) => handleChange({ 
                                                ...e, 
                                                target: { 
                                                    ...e.target, 
                                                    value: Number(e.target.value) // Convert to integer
                                                } 
                                            })}
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
