import { useState } from 'react';
import availableCourses from '../assets/availableCourses';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { User } from '../interfaces/User';


// Define the type for the form state
interface FormState {
    authId: string;
    email: string;
    password: string;
    confirmPassword: string;
    fName: string;
    lName: string;
    buId: string;
    programType: string;
    programCode: string;
    pathOfInterest: string;
    coursesToTake: number;
    coursesTaken: string[];
}

export const useSignUpForm = () => {

    const { signUp } = useAuth();
    // State to manage form data
    const [formState, setFormState] = useState<FormState>({
        authId: '',
        email: '',
        password: '',
        confirmPassword: '',
        fName: '',
        lName: '',
        buId: '',
        programType: 'MS degree',
        programCode: 'mssd',
        pathOfInterest: 'web development',
        coursesToTake: 3,
        coursesTaken: [],
    });

    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // State for course selection
    const [inputValue, setInputValue] = useState('');
    const [filteredCourses, setFilteredCourses] = useState<string[]>([]); // Set the type to string[]

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    // Handle changes to form input fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Check if passwords match before sending the request
        if (formState.password !== formState.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        const result = await signUp(
            formState.authId,
            formState.email,
            formState.password,
            formState.fName,
            formState.lName,
            formState.buId,
            formState.programType,
            formState.programCode,
            formState.pathOfInterest,
            formState.coursesToTake,
            formState.coursesTaken,
        );

        // Your logic to submit the form goes here...
        setSuccessMessage('Signup successful!'); // Example success message
    };

    // Handle input change for course selection
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value === '') {
            setFilteredCourses([]);
            return;
        }

        const filtered = availableCourses.filter(course =>
            course.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10);

        setFilteredCourses(filtered.length > 0 ? filtered : []); // Now it accepts the string[]
    };

    // Handle course selection
    const handleCourseSelect = (course: string) => {
        if (course && !formState.coursesTaken.includes(course)) {

            const newCoursesTaken: string[] = [...formState.coursesTaken, course];
            setFormState((prev) => ({
                ...prev,
                coursesTaken: newCoursesTaken,
            }));

            setInputValue('');
            setFilteredCourses([]);
        }
    };

    // Handle course removal
    const handleRemoveCourse = (courseToRemove: string) => {

        const newCoursesTaken: string[] = formState.coursesTaken.filter(course => course !== courseToRemove);
        setFormState((prev) => ({
            ...prev,
            coursesTaken: newCoursesTaken,
        }));

    };

    return {
        formState,
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
    };
};