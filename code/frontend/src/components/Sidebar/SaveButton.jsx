/* eslint-disable no-unused-vars */
//Created by Natt, Updated by Tash

import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useChatService } from '../../hooks/useChatService'; // Import the useChatService hook

const SaveButton = () => {
    const { saveChatSession } = useChatService(); // Use the saveChatSession function from the hook

    const handleSaveChat = async () => {
        const result = await saveChatSession(); // Call the saveChatSession method

        if (result && result.success) {
            alert(result.message); // Show success message
        } else {
            alert(result.message); // Show error message if saving fails
        }
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleSaveChat}>
            <img src={assets.share} alt="save chat" />
            <p>Save to History</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    );
};

export default SaveButton;

