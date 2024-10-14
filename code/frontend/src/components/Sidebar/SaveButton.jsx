/* eslint-disable no-unused-vars */
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useChat } from '../../context/ChatContext'

const SaveButton = () => {
    const {handleSaveChatSession} = useChat();

    const handleSaveChat = () => {
        handleSaveChatSession();
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleSaveChat}>
            <img src={assets.share} alt="save chat" />
            <p>Save to History</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    )
}

export default SaveButton;
