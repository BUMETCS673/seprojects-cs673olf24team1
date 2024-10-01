import React, { useState } from 'react';
import './StudentForm.css';

function StudentForm() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    id: '',
    programType: 'MS degree',
    programName: '',
    pathOfInterest: '',
    coursesToTake: '1'
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
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">BUAN Profile</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>BU ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Program Type:</label>
          <select
            name="programType"
            value={formData.programType}
            onChange={handleChange}
          >
            <option value="MS degree">MS degree</option>
          </select>
        </div>

        <div>
          <label>Program Name:</label>
          <select
            name="programName"
            value={formData.programType}
            onChange={handleChange}
          >
            <option value="MS in Computer Science">MS in Computer Science</option>
          </select>
        </div>

        <div>
          <label>Path of Interest:</label>
          <input
            type="text"
            name="pathOfInterest"
            value={formData.pathOfInterest}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Courses to Take:</label>
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

        <button type="submit">Submit</button>
      </form>
  );
}

export default StudentForm;
