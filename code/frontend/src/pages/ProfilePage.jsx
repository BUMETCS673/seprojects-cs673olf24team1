import React from 'react';
import StudentForm from '../components/Form/StudentForm';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="page-container">
            <button className="go-back-button" onClick={handleGoBack}>
                &#8592; Go Back
            </button>
            {<StudentForm />}
        </div>
    );
};

export default ProfilePage;
