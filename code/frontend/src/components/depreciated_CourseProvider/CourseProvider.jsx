/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './CourseProvider.css'

const CourseProvider = () => {
  
    return (  
        <div className="cards">
            <div className="card">
                <p>Course suggestion MSSD</p>
                {/* <img src={assets.compass_icon} alt="" /> */}
            </div>
            <div className="card">
                <p>Course suggestion MSSD</p>
                {/* <img src={assets.bulb_icon} alt="" /> */}
            </div>
            <div className="card">
                <p>Course suggestion MSSD</p>
                {/* <img src={assets.message_icon} alt="" /> */}
            </div>
            <div className="card">
                <p>Course suggestion MSSD</p>
                {/* <img src={assets.code_icon} alt="" /> */}
            </div>
        </div>
    );
  };
  
export default CourseProvider;
