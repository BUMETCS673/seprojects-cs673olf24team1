import React, { useState } from 'react';
import './CourseTakenField.css'; // Import the CSS file
import useSignUpForm from '../../pages/useSignUpForm';

const CourseTakenField = () => {
    const {
        formState,
        inputValue,
        filteredCourses,
        handleInputChange,
        handleCourseSelect,
        handleRemoveCourse,
      } = useSignUpForm();

    return (
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
    );
};

export default CourseTakenField;
