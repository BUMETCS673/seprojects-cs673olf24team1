/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import './InputField.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/ContextProvider'

const InputField = () => {

    const { onSent, setInput, input } = useContext(Context);
  
    return (  
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Type your message' />
              <div>
                <img src={assets.gallery_icon} width={30} alt="" />
                <img src={assets.mic_icon} width={30} alt="" />
                {input ? <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" /> : null}
              </div>
            </div>
          </div>
    );
  };
  
  export default InputField;