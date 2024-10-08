/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = async () => {
        const result = await logout();
        if (result) {
            navigate('/');
        }
    }

    return (
        <div className="bottom-item recent-entry" onClick={handleLogout}>
            <img src={assets.logout} alt="logout" />
            <span className="logoutButton">Logout</span>
        </div>
    )
}

export default LogoutButton;