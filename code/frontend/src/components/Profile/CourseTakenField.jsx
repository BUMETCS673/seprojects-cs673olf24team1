/* eslint-disable no-unused-vars */
// Created by Poom, updated by Tash

import { useDispatch, useSelector } from 'react-redux'; // Import hooks for accessing Redux state
import './CourseTakenField.css'; // Import the CSS file
import { addCourse, removeCourse } from '../../store/actions/courseActions'; // Import actions for adding/removing courses

const CourseTakenField = () => {
    const dispatch = useDispatch(); // Initialize dispatch for Redux actions
    const { coursesTaken } = useSelector((state) => state.user); // Access the courses taken from Redux state
    const [inputValue, setInputValue] = React.useState(''); // Local state for the input field
    const [filteredCourses, setFilteredCourses] = React.useState([]); // Local state for filtered courses

    // Handle input change to update local state and filter courses
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Filter courses based on user input (you may replace this with your own filtering logic)
        const filtered = coursesTaken.filter(course => course.toLowerCase().includes(value.toLowerCase()));
        setFilteredCourses(filtered);
    };

    // Handle course selection
    const handleCourseSelect = (course) => {
        dispatch(addCourse(course)); // Dispatch action to add course
        setInputValue(''); // Clear the input field
        setFilteredCourses([]); // Clear filtered courses
    };

    // Handle course removal
    const handleRemoveCourse = (course) => {
        dispatch(removeCourse(course)); // Dispatch action to remove course
    };

    return (
        <div className="course-taken-container">
            <label>Courses Taken:</label>
            {coursesTaken.length > 0 ? (
                <div className="course-list">
                    <ul>
                        {coursesTaken.map(course => (
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
            ) : null}
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
