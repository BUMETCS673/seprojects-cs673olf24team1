/* eslint-disable no-unused-vars */
// Created by Natt, Updated by Tash

import React from 'react'; // Import React library
import './Sidebar.css'; // Import styles for the Sidebar component
import { assets } from '../../assets/assets'; // Import asset resources (e.g., icons)
import { useChatService } from '../../hooks/useChatService'; // Import useChatService for chat-related functions
import { jsPDF } from 'jspdf'; // Using jsPDF library to generate the PDF

const DownloadButton = () => {
    const { messages } = useChatService(); // Access messages from the chat service

    const handleDownloadChat = () => {
        if (!messages || messages.length === 0) {
            alert('No chat messages available for download.'); // Alert if there are no messages
            return;
        }

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

            doc.text(`${role}: ${text}`, 10, yPosition); // Add message to PDF
            yPosition += 10; // Move down for the next message
        });

        // Save the generated PDF
        doc.save('chat_history.pdf');
    };

    return (
        <div className="bottom-item recent-entry" onClick={handleDownloadChat}>
            <img src={assets.download} alt="download" />
            <p>Download</p>
        </div>
    );
};

export default DownloadButton; // Export the DownloadButton component for use in other parts of the application
