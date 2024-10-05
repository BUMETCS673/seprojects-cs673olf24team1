/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import NewChatButton from './NewChatButton'
// import ClearButton from './ClearButton'
// import EmailButton from './EmailButton'
// import PrintButton from './PrintButton'
// import ShareButton from './ShareButton'
import LogoutButton from './LogoutButton'
import ChatHistory from './ChatHistory'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import DownloadButton from './DownloadButton'

const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className="top">
            <NewChatButton />
            <ChatHistory />
            </div>
            <div className="bottom">
                {/* <ClearButton />
                <EmailButton />
                <PrintButton />
                <ShareButton /> */}
                {/* <DownloadButton /> */}
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar;
