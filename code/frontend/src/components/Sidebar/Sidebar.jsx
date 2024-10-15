/* eslint-disable no-unused-vars */
import NewChatButton from './NewChatButton'
import LogoutButton from './LogoutButton'
import ChatHistory from './ChatHistory'
import './Sidebar.css'
import DownloadButton from './DownloadButton'
import SaveButton from './SaveButton'

const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className="top">
            <NewChatButton />
            <ChatHistory />
            </div>
            <div className="bottom">
                <SaveButton/>
                <DownloadButton />
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar;
