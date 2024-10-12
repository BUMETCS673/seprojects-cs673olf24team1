// Created by Natt, updated by Tash


// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App.jsx';
import store from '../store/store'; // Import your Redux store
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap the App component with Provider and pass the store */}
    <App />
  </Provider>
);

