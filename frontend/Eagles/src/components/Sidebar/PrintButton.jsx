/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const PrintButton = () => {

    const handlePrintChat = () => {
        window.print();
    };

    return (
        <div className="bottom-item recent-entry" onClick={handlePrintChat}>
            <img src={assets.print} alt="" />
            <p>Print</p>
            {/* {extended ? <p>Print</p> : null} */}
        </div>
    )
}

export default PrintButton;
