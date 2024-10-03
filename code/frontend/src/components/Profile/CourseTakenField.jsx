import React, { useState } from 'react';
import './CourseTakenField.css'; // Import the CSS file
import availableCourses from './availableCourses.js'

const CourseTakenField = () => {
    const [courses, setCourses] = useState(['CS521 - Information Structure with Java']);
    const [inputValue, setInputValue] = useState(''); // Track the input value
    const [filteredCourses, setFilteredCourses] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Clear the filtered courses if the input is empty
        if (value === '') {
            setFilteredCourses([]);
            return;
        }

        // Filter available courses based on input
        const filtered = availableCourses.filter(course =>
            course.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10);

        // Set the filtered courses or clear if no matches
        setFilteredCourses(filtered.length > 0 ? filtered : []);
    };

    const handleCourseSelect = (course) => {
        if (course && !courses.includes(course)) {
            setCourses([...courses, course]);
            setInputValue(''); // Clear input after selection
            setFilteredCourses([]); // Clear the dropdown after selection
        }
    };

    const handleRemoveCourse = (courseToRemove) => {
        setCourses(courses.filter(course => course !== courseToRemove));
    };

    return (
        <div className="course-taken-container">
            <label>Courses Taken:</label>      {courses.length > 0 ? (
                <div className="course-list">
                    <ul>
                        {courses.map(course => (
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
