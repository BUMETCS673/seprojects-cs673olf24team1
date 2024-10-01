import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const ProfileAvatar = () => {
    return (
        <div className="avatar-container">
            <Link to="/profile">
                <img className="user-avatar" src={assets.user_icon} alt="User Avatar" />
            </Link>
        </div>
    );
};

export default ProfileAvatar;
