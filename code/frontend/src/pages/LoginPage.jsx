/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/SignupPage.scss';
import { assets } from '../assets/assets';

const LoginPage = (props) => {
  const { isAuth, isLoading, isIncorrectPassword, login } = useAuth();
  const [formState, setFormState] = useState({ email: 'test@bu.edu', password: '1234' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!formState.email || !formState.password) return;
    try {
      const result = await login(formState.email, formState.password);
      if (result) {
        navigate('/chat');
        setFormState({ email: '', password: '' });
      }
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <main className='flex-row justify-center mb-4 h-screen' style={{height:'100vh'}}>
    <div className='form-container h-screen'>
    <div className="form-content-left">
      <img src={assets.bu_logo} alt="bu-logo" className='form-img' style={{height:'40%'}}/>
    </div> 
    <div className='form-content-right col-10 col-md-6'>
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

            <button className='form-input-btn' type='submit'>
              Log in
            </button>

            <span className='form-input-login'>
              Do not have an account? <Link to="/signup">Sign Up</Link>
            </span>
            <span className='form-input-login'>
              <Link to="/forgotpassword">
                Forgot password
              </Link>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
