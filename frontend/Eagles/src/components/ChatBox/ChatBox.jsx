/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import CourseProvider from '../CourseProvider/CourseProvider'
import InputField from '../InputField/InputField'
import './ChatBox.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider'

const ChatBox = () => {

  const { 
    recentPrompt,
    showResult,
    loading,
    resultData,
  } = useContext(Context);

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
        {showResult
          ? <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.eagle_logo} alt="" />
              {loading
                ? <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>

          </div>
          : <>
            <div className="greet">
              <p><span>Hello, BU Student</span></p>
              <p>How can I help you today?</p>
            </div>

            {/* Course selection */}
            <CourseProvider />
          
          </>
        }


        {/* InputField */}
        <InputField />
        
      </div>
    </div>
  )
}

export default ChatBox;
