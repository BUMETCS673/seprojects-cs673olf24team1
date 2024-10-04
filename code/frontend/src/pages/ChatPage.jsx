// eslint-disable-next-line no-unused-vars
import React from 'react';
import ChatBox from '../components/ChatBox/ChatBox';
import SideBar from '../components/Sidebar/Sidebar';
import { ChatProvider } from '../context/ChatContext';
import '../App.css';


const ChatPage = () => {
    return (
        <ChatProvider>
            <SideBar />
            <ChatBox />
        </ChatProvider>
    );
};

export default ChatPage;
