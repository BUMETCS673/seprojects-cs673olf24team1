/**
 * Validates the signup form data for a user registration process.
 * 
 * Created by: Natasya Liew
 * Updated by: Poom
 *
 * This function checks the validity of various fields in the signup form, including:
 * - Username: Must be between 6 and 50 characters long.
 * - Email: Must be a valid email format and is required.
 * - Password: Must be at least 8 characters long and include at least one uppercase letter,
 *   one lowercase letter, one digit, and one special character. It is required and must match 
 *   the confirm password field.
 * - First Name: Must be between 2 and 50 characters long and is required.
 * - Last Name: Must be between 2 and 50 characters long and is required.
 * - BU ID: Must be less than 10 characters long and is required.
 *
 * @param {FormState} formData - The form data object containing user input values.
 * @returns {{ isValid: boolean, newErrors: FormError }} An object containing:
 *   - `isValid`: A boolean indicating whether the form is valid or not.
 *   - `newErrors`: An object containing error messages for each field if validation fails.
 */

import { FormError, FormState } from "../interfaces/AuthSession";

export const validateSignupForm = (formData: FormState) => {
    let isValid = true;
    const newErrors: FormError = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        buId: '',
    };

    // Validate username
    if (!formData.authId) {
        newErrors.username = "Username is required";
        isValid = false;
    } else if (formData.authId.trim().length < 6) {
        newErrors.username = "Username must be at least 6 characters";
        isValid = false;
    }
    else if (formData.authId.trim().length > 50) {
        newErrors.username = "Username must be at less than 50 characters";
        isValid = false;
    }

    // Email validation (regex check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email is not valid";
        isValid = false;
    }

    // Password validation (required and must match confirmPassword)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
    }

    // First name validation
    if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
        isValid = false;
    } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters";
        isValid = false;
    }
    else if (formData.firstName.trim().length > 50) {
        newErrors.firstName = "First name must be at less than 50 characters";
        isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
        isValid = false;
    }else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters";
        isValid = false;
    }
    else if (formData.lastName.trim().length > 50) {
        newErrors.lastName = "Last name must be at less than 50 characters";
        isValid = false;
    }

    // BU ID validation (required, can add format checks)
    if (!formData.buId.trim()) {
        newErrors.buId = "BU ID is required";
        isValid = false;
    } else if (formData.buId.trim().length > 10) {
        newErrors.buId = "BU ID must be at less than 10 characters";
        isValid = false;
    }

    // Set the errors
    return { isValid, newErrors };
};
