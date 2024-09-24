/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import eaglelogo from '../assets/images/eagle_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';

// import styling
import '../assets/styles/SignupPage.scss';


const LoginPage = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  // // const [login, {error}] =useMutation(LOGIN_USER)
  // // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} =await login({
        variables: {...formState}
      })
      // Auth.login(data.login.token)
    }catch(e){
      console.error(e)
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className='flex-row justify-center mb-4 h-screen' style={{height:'100vh'}}>
    <div className='form-container h-screen'>
    <div className="form-content-left">
      <img src={eaglelogo} alt="silver-socials-logo" className='form-img' style={{height:'40%'}}/>
    </div> 
    <div className='form-content-right col-12 col-md-6'>
      <form onSubmit={handleFormSubmit} className='form'>
        <h1>BUAN CHATBOT</h1>
        <h2>Sign In</h2>
        
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
          {/* {errors.email && <p>{errors.email}</p>} */}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
          {/* {errors.password && <p>{errors.password}</p>} */}
        </div>
        <Link to="/chat" className='login-btn'>Login</Link>
        {/* <button className='form-input-btn' type='submit'><a href="/chat">Log in</a></button> */}
        {/* {error && <div><p style={{color:"red"}}>Login failed</p></div>} */}

        <span className='form-input-login'>
            Do not have an account? <Link to="/signup">Sign Up
            {/* {"Don't have an account? Sign Up"} */}
          </Link>
          {/* <p>Already have an account? Login <a href='/'>here</a></p> */}
        </span>
        <span className='form-input-login'>
          <Link to="/forgetpassword">
            {"Forgot password"}
          </Link>
          {/* Already have an account? Login <a href='/login'>here</a> */}
        </span>
      </form>
    </div>
    </div>
    </main>
  );
};

export default LoginPage;
