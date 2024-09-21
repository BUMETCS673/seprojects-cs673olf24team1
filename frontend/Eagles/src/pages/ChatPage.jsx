// eslint-disable-next-line no-unused-vars
import React from 'react';
// import Header from '../components/Header';
import ChatBox from '../components/ChatBox/ChatBox';
import SideBar from '../components/Sidebar/Sidebar';
// import InputField from '../components/InputField';
// import '..assets/styles/ChatPage.css'; // Custom styles for this page
import '../App.css';

const ChatPage = () => {
    return (
        <>
            <SideBar />
            <ChatBox />
        </>
    );
};

export default ChatPage;
