/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './ProfileForm.css';
import CourseTakenField from './CourseTakenField';
import { assets } from '../../assets/assets';

function ProfileForm() {
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
    <div className='profile-form-container'>
      <form onSubmit={handleSubmit}>
        <div className="user-avatar-container">
          <img className="user-avatar" src={assets.user_icon} alt="user avatar" />
        </div>

        <div>
          <label>Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>BU ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Program Type</label>
          <select
            name="programType"
            value={formData.programType}
            onChange={handleChange}
          >
            <option value="MS degree">MS degree</option>
          </select>
        </div>

        <div>
          <label>Program Name</label>
          <select
            name="programName"
            value={formData.programType}
            onChange={handleChange}
          >
            <option value="MS in Computer Science">MS in Computer Science</option>
          </select>
        </div>

        <div>
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

        <div>
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

        <div>
          <CourseTakenField />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;