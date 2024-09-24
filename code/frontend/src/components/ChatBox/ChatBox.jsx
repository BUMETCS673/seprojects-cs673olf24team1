/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from 'react'
// import CourseProvider from '../CourseProvider/CourseProvider'
import InputField from '../InputField/InputField'
import './ChatBox.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider'

const ChatBox = () => {

  const { recentPrompt, showResult, loading, resultData } = useContext(Context);
  
  // State to track the conversation history
  const [conversations, setConversations] = useState([]);

  // Ref to track the chat container and scroll automatically
  const chatContainerRef = useRef(null);

  // Simulate chatbot interaction (replace this with actual backend call or chatbot logic)
  const handleNewMessage = (input) => {
    const jsonConversations = [
      {
        "input": "Hello, I'm John. I took CS521 last semester and want to take 3 courses this semester that related to secure web development",
        "response": "Hello John, based on the details on the courses you've taken..."
      },
      {
        "input": "Yes, what do I learn in CS673?",
        "response": "CS673, titled Software Engineering, is a comprehensive course..."
      },
      {
            "input": "Is there any prerequisites for the data structure class?",
            "response": "Yes, there are prerequisites for the Data Structure classes. For CS526 - Data Structure and Algorithms, the prerequisites are MET CS 300 and either MET CS 520 or MET CS 521. This course includes implementing data structures using a high-level programming language and analyzing computational complexity. Other data structure courses like CS341 (with C++) and CS342 (with Java) have their own prerequisites, such as MET CS 231 and 232, respectively."
        },
        {
            "input": "What classes can benefit me to be in the secure software development industry?",
            "response": "If you're aiming to enter the secure software development industry, key courses to consider include: CS763 - Secure Software Development, CS633 - Software Quality, Testing, and Security Management, CS695 - Cybersecurity, CS674 - Database Security, CS684 - Enterprise Cybersecurity Management, CS602 - Server-Side Web Development, and CS690 - Network Security. These courses cover a wide range of topics such as application security, security testing, project management, and cybersecurity mechanisms, and will provide you with the necessary skills for this industry."
        },
        {
            "input": "I'm actually interested in artificial intelligence too. Does BU offer any courses about it?",
            "response": "Yes, Boston University offers several courses related to Artificial Intelligence. Some key AI courses include: CS664 - Artificial Intelligence, CS767 - Advanced Machine Learning and Neural Networks, CS793 - Special Topics in Computer Science (Generative AI), CS688 - Web Mining and Graph Analytics, and CS699 - Data Mining. These courses cover topics such as machine learning, neural networks, AI models, web mining, and data mining, providing a strong foundation in AI and its applications."
        }
    ];

    // Add the new conversation (input and matching response)
    const newConversation = jsonConversations.find(conv => conv.input === input) || { input, response: "Sorry, I didn't understand that. Please try again." };
    
    // Update conversation history
    setConversations([...conversations, newConversation]);
  };

  // Scroll to the bottom whenever conversations change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversations]);

  return (
    <div className='main'>
      <div className="nav">
        <div className="branding">
          <img src={assets.eagle_logo} alt="" />
          <p>BUAN CHATBOT</p>
        </div>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {/* Dynamically render conversation history */}
        <div className="chat-history" ref={chatContainerRef}>
          {conversations.length === 0 ? (
            <div className="greet">
              <p><span>Hello, BU Student</span></p>
              <p>How can I help you today?</p>
            </div>
          ) : (
            conversations.map((conversation, index) => (
              <div key={index} className="conversation">
                <div className="result-title">
                  <img src={assets.user_icon} alt="User Icon" />
                  <p>{conversation.input}</p>
                </div>
                <div className="result-data">
                  <img src={assets.eagle_logo} alt="Bot Icon" />
                  <p>{conversation.response}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* InputField to send new messages */}
        <InputField onSend={handleNewMessage} />
        
      </div>
    </div>
  )
}

export default ChatBox;