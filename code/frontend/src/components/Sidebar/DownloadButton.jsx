/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useChat } from '../../context/ChatContext';
import { jsPDF } from 'jspdf' // using jspdf library to generate the PDF

const DownloadButton = () => {
    // const { downloadChatHistory } = useChat();
    const { messages } = useChat(); // Access messages from chat context

    // old implementation
    // const handleDownloadChat = () => {
    //     console.log("Download chat history link");
    //     // Generate shareable link (backend needed)
    //     downloadChatHistory();  // Call the function to download chat history
    // };

    // new implement
    const handleDownloadChat = () => {
        // Initialize jsPDF
        const doc = new jsPDF();

        // Add logo
        const logo = assets.bu_logo;

        // Add logo to PDF (adjust width, height, and position)
        const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the PDF page
        const logoWidth = 20; // Width of the logo
        const logoHeight = 20; // Height of the logo
        const xPos = pageWidth - logoWidth - 10; // Subtract logo width and margin from the page width
        const yPos = 5; // Y position for the top-right placement

        doc.addImage(logo, 'PNG', xPos, yPos, logoWidth, logoHeight);
        // doc.addImage(logo, 'PNG', 20, 5, 40, 40); // Adjust position and size as needed

        // Add a title to the PDF
        doc.setFontSize(20);
        doc.text('Chat History', 10, 10);

        // Set font size for the message
        doc.setFontSize(12);
        let yPosition = 20; // Starting Y position for messages

        // Loop through messages and add them to the PDF
        messages.forEach((message, index) => {
            const { text, isUser } = message; // Destructure message object
            const role = isUser ? 'User' : 'Bot'; // Determine the sender

            // const formattedTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss'); // Format the timestamp
            // Add message with timestamp to PDF
            // doc.text(`${role} [${formattedTime}]: ${text}`, 10, yPosition);

            doc.text(`${role}: ${text}`, 10, yPosition);
            yPosition += 10; // Move down for the next message
        });

        // Save the generated PDF
        doc.save('chat_history.pdf');
    }

    return (
        <div className="bottom-item recent-entry" onClick={handleDownloadChat}>
            <img src={assets.download} alt="download" />
            <p>Download</p>
            {/* {extended ? <p>Share</p> : null} */}
        </div>
    )
}

export default DownloadButton;
