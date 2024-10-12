/* eslint-disable no-unused-vars */
// Updated by Tash

/* eslint-disable no-unused-vars */
import NewChatButton from './NewChatButton';
// import ClearButton from './ClearButton';
// import EmailButton from './EmailButton';
// import PrintButton from './PrintButton'
import LogoutButton from './LogoutButton';
import ChatHistory from './ChatHistory';
import './Sidebar.css';
import DownloadButton from './DownloadButton';
import SaveButton from './SaveButton';
import { useUserService } from '../../hooks/useUserService'; // Import the useUserService hook

const Sidebar = () => { // Remove handleLogout from props and use the hook directly
    const { logoutUser } = useUserService(); // Get logout function from useUserService

    const handleLogout = async () => {
        const result = await logoutUser(); // Call the logout function
        if (result && 'code' in result) {
            alert(result.message); // Show error message if logout fails
        } else {
            alert('Successfully logged out.'); // Optionally add success message handling
        }
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <NewChatButton />
                <ChatHistory />
            </div>
            <div className="bottom">
                {/* <ClearButton /> */}
                {/* <EmailButton /> */}
                {/* <PrintButton /> */}
                <SaveButton />
                <DownloadButton />
                <LogoutButton handleLogout={handleLogout} /> {/* Pass handleLogout to LogoutButton */}
            </div>
        </div>
    );
};

export default Sidebar;
