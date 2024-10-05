import React from 'react';
import { assets } from '../../assets/assets';
import './ChatBubble.css';

const ChatBubble = ({ message }) => {
    const { text, isUser } = message;

    return (
        <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
            <div className="result-title">
                <img
                    src={isUser ? assets.user_icon : assets.bu_logo}
                    alt={isUser ? "User Icon" : "Bot Icon"}
                    className="icon"
                />
                <p className='text-message'>{text}</p>
            </div>
        </div>
    );
};

export default ChatBubble;
