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



// // eslint-disable-next-line no-unused-vars
// import * as React from 'react';
// import { AppProvider, SignInPage } from '@toolpad/core';
// import { useTheme } from '@mui/material/styles';

// // preview-start
// const providers = [{ id: 'credentials', name: 'Email and Password' }];
// // preview-end

// const signIn = async (provider, formData) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       alert(
//         `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
//       );
//       resolve();
//     }, 300);
//   });
//   return promise;
// };

// export default function LoginPage() {
//   const theme = useTheme();
//   return (
//     // preview-start
//     <AppProvider theme={theme}>
//       <SignInPage signIn={signIn} providers={providers} />
//     </AppProvider>
//     // preview-end
//   );
// }


/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button, TextField, Typography, Box } from '@mui/material';

// // Mock function for username/password authentication (replace with actual logic)
// const authenticateUser = async (username, password) => {
//     // Hardcoded sample credentials
//     const validUsername = 'user';
//     const validPassword = 'password';
    
//     if (username === validUsername && password === validPassword) {
//         return { success: true };
//     }
//     return { success: false };
// };

// const LoginPage = () => {
//     const { oktaAuth, authState } = useOktaAuth() || {}; // Okta authentication hook
//     const navigate = useNavigate(); // Navigation hook for redirecting
//     const [username, setUsername] = useState(''); // State for username
//     const [password, setPassword] = useState(''); // State for password
//     const [error, setError] = useState(''); // State for error messages

//     useEffect(() => {
//         // Check if authState and oktaAuth are available
//         if (authState && authState.isAuthenticated) {
//             // Redirect to chat page if logged in
//             navigate('/chat');
//         }
//     }, [authState, navigate]);

//     // Function to handle Okta login
//     const handleOktaLogin = async () => {
//         try {
//             await oktaAuth.signInWithRedirect(); // Redirects to Okta login page
//         } catch (err) {
//             console.error('Error signing in with Okta:', err);
//             setError('Failed to login with Okta.');
//         }
//     };

//     // Function to handle username/password login
//     const handleUsernamePasswordLogin = async () => {
//         setError(''); // Clear previous errors
//         const result = await authenticateUser(username, password); // Call mock authentication function
//         if (result.success) {
//             navigate('/chat'); // Redirect to chat page on successful login
//         } else {
//             setError('Invalid username or password'); // Display error message
//         }
//     };

//     // Redirect to signup page
//     const handleSignUp = () => {
//         navigate('/signup'); // Replace with your actual signup route
//     };

//     // Redirect to forgot password page
//     const handleForgotPassword = () => {
//         navigate('/forgot-password'); // Replace with your actual forgot password route
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Typography variant="h4" gutterBottom>
//                 BUAN CHATBOT
//             </Typography>

//             {/* Login with username and password */}
//             <Box>
//                 {/* <Typography variant="h6" gutterBottom>
//                     Or
//                 </Typography> */}
//                 <TextField
//                     label="Username"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)} // Update username state
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} // Update password state
//                 />
//                 {error && <Typography color="error">{error}</Typography>} {/* Display error messages */}
                
//                 <Box mb={3}>
//                     <Button variant="contained" color="#e54500" onClick={handleUsernamePasswordLogin} style={{ marginTop: '20px', marginBottom:'20px' }}>
//                         Login
//                     </Button>
//                 </Box>

//                 {/* Login with Okta Authentication */}
//                 <Box mb={3}>
//                     <Button variant="contained" color="#E54500" onClick={handleOktaLogin} style={{ marginBottom: '20px' }}>
//                         Login with Okta
//                     </Button>
//                 </Box>

//                 <Box mt={2}>
//                     <Button onClick={handleSignUp} style={{ marginRight: '10px' }}>
//                         Sign Up
//                     </Button>
//                     <Button onClick={handleForgotPassword}>
//                         Forgot Password
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default LoginPage;



// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button, TextField, Typography, Box } from '@mui/material';

// // Mock function for username/password authentication (replace with actual logic)
// const authenticateUser = async (username, password) => {
//     // Replace this mock authentication with a real API call
//     if (username === 'user' && password === 'password') {
//         return { success: true };
//     }
//     return { success: false };
// };

// const LoginPage = () => {
//     // const { oktaAuth } = useOktaAuth(); // Okta authentication hook
//     const navigate = useNavigate(); // Navigation hook for redirecting
//     const [username, setUsername] = useState(''); // State for username
//     const [password, setPassword] = useState(''); // State for password
//     const [error, setError] = useState(''); // State for error messages
//     const { oktaAuth, authState } = useOktaAuth() || {};

//     useEffect(() => {
//         // Check if authState and oktaAuth are available
//         if (authState && authState.isAuthenticated) {
//             // Redirect to home if logged in
//             window.location.href = '/';
//         }
//     }, [authState]);

//     // Function to handle Okta login
//     const handleOktaLogin = async () => {
//         try {
//             await oktaAuth.signInWithRedirect(); // Redirects to Okta login page
//         } catch (err) {
//             console.error('Error signing in with Okta:', err);
//             setError('Failed to login with Okta.');
//         }
//     };

//     // Function to handle username/password login
//     const handleUsernamePasswordLogin = async () => {
//         setError(''); // Clear previous errors
//         const result = await authenticateUser(username, password); // Call mock authentication function
//         if (result.success) {
//             navigate('/chat'); // Redirect to chat page on successful login
//         } else {
//             setError('Invalid username or password'); // Display error message
//         }
//     };

//     // Redirect to signup page
//     const handleSignUp = () => {
//         navigate('/signup'); // Replace with your actual signup route
//     };

//     // Redirect to forgot password page
//     const handleForgotPassword = () => {
//         navigate('/forgot-password'); // Replace with your actual forgot password route
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Typography variant="h4" gutterBottom>
//                 Login Page
//             </Typography>
//             <Box mb={3}>
//                 <Button variant="contained" color="primary" onClick={handleOktaLogin} style={{ marginBottom: '20px' }}>
//                     Login with Okta
//                 </Button>
//             </Box>
//             <Box>
//                 <Typography variant="h6" gutterBottom>
//                     Or
//                 </Typography>
//                 <TextField
//                     label="Username"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)} // Update username state
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} // Update password state
//                 />
//                 {error && <Typography color="error">{error}</Typography>} {/* Display error messages */}
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleUsernamePasswordLogin}
//                     style={{ marginTop: '20px' }}
//                 >
//                     Login
//                 </Button>
//                 <Box mt={2}>
//                     <Button onClick={handleSignUp} style={{ marginRight: '10px' }}>
//                         Sign Up
//                     </Button>
//                     <Button onClick={handleForgotPassword}>
//                         Forgot Password
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default LoginPage;



// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button, TextField, Typography, Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';

// // Mock function for username/password authentication
// const authenticateUser = async (username, password) => {
//     // Replace this with actual authentication logic
//     if (username === 'user' && password === 'password') {
//         return { success: true };
//     }
//     return { success: false };
// };

// const LoginPage = () => {
//     // const { oktaAuth } = useOktaAuth();
//     const navigate = useNavigate();
//     const [loginMethod, setLoginMethod] = useState('okta');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const { oktaAuth, authState } = useOktaAuth() || {};

//     useEffect(() => {
//         // Check if authState and oktaAuth are available
//         if (authState && authState.isAuthenticated) {
//             // Redirect to home if logged in
//             window.location.href = '/';
//         }
//     }, [authState]);

//     // const handleLogin = async () => {
//     //     // Check if oktaAuth is available
//     //     if (oktaAuth) {
//     //         await oktaAuth.signInWithRedirect();
//     //     } else {
//     //         console.error('OktaAuth instance is not available');
//     //     }
//     // };

//     const handleOktaLogin = async () => {
//         try {
//             await oktaAuth.signInWithRedirect();
//         } catch (err) {
//             console.error('Error signing in with Okta:', err);
//         }
//     };

//     const handleUsernamePasswordLogin = async () => {
//         setError('');
//         const result = await authenticateUser(username, password);
//         if (result.success) {
//             // Redirect to chat page upon successful authentication
//             navigate('/chat');
//         } else {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Typography variant="h4" gutterBottom>
//                 Login Page
//             </Typography>
//             <Box mb={3}>
//                 <RadioGroup
//                     row
//                     aria-label="login method"
//                     name="loginMethod"
//                     value={loginMethod}
//                     onChange={(e) => setLoginMethod(e.target.value)}
//                 >
//                     <FormControlLabel value="okta" control={<Radio />} label="Login with Okta" />
//                     <FormControlLabel value="usernamePassword" control={<Radio />} label="Login with Username/Password" />
//                 </RadioGroup>
//             </Box>
//             {loginMethod === 'okta' && (
//                 <Button variant="contained" color="primary" onClick={handleOktaLogin}>
//                     Login with Okta
//                 </Button>
//             )}
//             {loginMethod === 'usernamePassword' && (
//                 <Box mt={3}>
//                     <Typography variant="h6" gutterBottom>
//                         Username and Password Login
//                     </Typography>
//                     <TextField
//                         label="Username"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <TextField
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {error && <Typography color="error">{error}</Typography>}
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handleUsernamePasswordLogin}
//                         style={{ marginTop: '20px' }}
//                     >
//                         Login
//                     </Button>
//                 </Box>
//             )}
//         </Container>
//     );
// };

// export default LoginPage;


// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button, TextField, Typography, Box } from '@mui/material';

// // Mock function for username/password authentication
// const authenticateUser = async (username, password) => {
//     // Replace this with actual authentication logic
//     if (username === 'user' && password === 'password') {
//         return { success: true };
//     }
//     return { success: false };
// };

// const LoginPage = () => {
//     const { oktaAuth } = useOktaAuth();
//     const navigate = useNavigate();
//     const [loginMethod, setLoginMethod] = useState('okta');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleOktaLogin = async () => {
//         try {
//             await oktaAuth.signInWithRedirect();
//         } catch (err) {
//             console.error('Error signing in with Okta:', err);
//         }
//     };

//     const handleUsernamePasswordLogin = async () => {
//         setError('');
//         const result = await authenticateUser(username, password);
//         if (result.success) {
//             // Redirect to chat page upon successful authentication
//             navigate('/chat');
//         } else {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Typography variant="h4" gutterBottom>
//                 Login Page
//             </Typography>
//             <Box mb={3}>
//                 <Button variant="contained" color="primary" onClick={handleOktaLogin}>
//                     Login with Okta
//                 </Button>
//             </Box>
//             <Box>
//                 <Typography variant="h6" gutterBottom>
//                     Or Login with Username and Password
//                 </Typography>
//                 <TextField
//                     label="Username"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {error && <Typography color="error">{error}</Typography>}
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleUsernamePasswordLogin}
//                     style={{ marginTop: '20px' }}
//                 >
//                     Login
//                 </Button>
//             </Box>
//         </Container>
//     );
// };

// export default LoginPage;


// eslint-disable-next-line no-unused-vars
// import React, { useEffect } from 'react';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button } from '@mui/material';

// const Login = () => {
//     const { oktaAuth, authState } = useOktaAuth() || {};

//     useEffect(() => {
//         // Check if authState and oktaAuth are available
//         if (authState && authState.isAuthenticated) {
//             // Redirect to home if logged in
//             window.location.href = '/';
//         }
//     }, [authState]);

//     const handleLogin = async () => {
//         // Check if oktaAuth is available
//         if (oktaAuth) {
//             await oktaAuth.signInWithRedirect();
//         } else {
//             console.error('OktaAuth instance is not available');
//         }
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Button variant="contained" color="primary" onClick={handleLogin}>
//                 Login with Okta
//             </Button>
//         </Container>
//     );
// };

// export default Login;


// // eslint-disable-next-line no-unused-vars
// import React, { useEffect }from 'react';
// // eslint-disable-next-line no-unused-vars
// import { useNavigate } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button } from '@mui/material';

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const { oktaAuth, authState } = useOktaAuth();

//     useEffect(() => {
//         if (authState && authState.isAuthenticated) {
//             // Redirect to home if logged in
//             window.location.href = '/';
//         }
//     }, [authState]);

//     const handleLogin = () => {
//         console.log('Logging in...');
//         // Okta login logic
//         navigate('/chat'); // Redirect to chat page after successful login
//     };
//     const handleLoginOkta = async () => {
//         await oktaAuth.signInWithRedirect();
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Button variant="contained" color="primary" onClick={handleLoginOkta}>
//                 Login with Okta
//             </Button>
//             <div className="login-page">
//             <h2>Login to BUAN Chatbot</h2>
//             <Button onClick={handleLogin}>Login with BU Credentials</Button>
//         </div>
//         </Container>
//     );
    
//     // const { oktaAuth, authState } = useOktaAuth();

//     // useEffect(() => {
//     //     if (authState && authState.isAuthenticated) {
//     //         // Redirect to home if logged in
//     //         window.location.href = '/';
//     //     }
//     // }, [authState]);

//     // const handleLogin = async () => {
//     //     await oktaAuth.signInWithRedirect();
//     // };

//     // return (
//     //     <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//     //         <Button variant="contained" color="primary" onClick={handleLogin}>
//     //             Login with Okta
//     //         </Button>
//     //     </Container>
//     // );
// };

// export default LoginPage;


// // src/components/Login.js
// import React, { useEffect } from 'react';
// import { useOktaAuth } from '@okta/okta-react';
// import { Container, Button } from '@mui/material';

// const Login = () => {
//     const { oktaAuth, authState } = useOktaAuth();

//     useEffect(() => {
//         if (authState && authState.isAuthenticated) {
//             // Redirect to home if logged in
//             window.location.href = '/';
//         }
//     }, [authState]);

//     const handleLogin = async () => {
//         await oktaAuth.signInWithRedirect();
//     };

//     return (
//         <Container style={{ textAlign: 'center', marginTop: '50px' }}>
//             <Button variant="contained" color="primary" onClick={handleLogin}>
//                 Login with Okta
//             </Button>
//         </Container>
//     );
// };

// export default Login;
