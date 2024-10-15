import { useState } from 'react';
import availableCourses from '../assets/availableCourses';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { User } from '../interfaces/UserSession';
import { useNavigate } from 'react-router-dom';
import { FormError, FormState } from '../interfaces/AuthSession';
import { validateSignupForm } from '../utils/validators';


export const useSignUpForm = () => {

    const navigate = useNavigate();

    const { signUp } = useAuth();
    // State to manage form data
    const [formState, setFormState] = useState<FormState>({
        authId: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        buId: '',
        programType: 'MS degree',
        programCode: 'mssd',
        pathOfInterest: 'web development',
        coursesToTake: 3,
        coursesTaken: [],
    });

    // State to validate the form inputs
    const [errors, setErrors] = useState<FormError>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        buId: '',
    })

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

        const { isValid, newErrors } = validateSignupForm(formState);

        if (isValid) {
            const result = await signUp(
                formState.authId,
                formState.email,
                formState.password,
                formState.firstName,
                formState.lastName,
                formState.buId,
                formState.programType,
                formState.programCode,
                formState.pathOfInterest,
                formState.coursesToTake,
                formState.coursesTaken,
            );

            if (result) {
                navigate('/login');
            }
        } else {
            setErrors(newErrors);
        }

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
    };
};