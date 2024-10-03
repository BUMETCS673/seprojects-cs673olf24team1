/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const LogoutButton = () => {
   const navigate = useNavigate();
   const { logout } = useAuth(); 

   return (
       <div className="bottom-item recent-entry" onClick={logout}>
           <img src={assets.logout} alt="logout" />
           <Link to="/" className="logoutButton">
               <p>Logout</p>
           </Link>
       </div>
   )
}

export default LogoutButton;