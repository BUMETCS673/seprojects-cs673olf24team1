// Created by Poom
// Updated and Annotated by Tash: Adding security layer

// Importing necessary libraries and parameters
import axios from 'axios'; // Importing axios for making HTTP requests
import { REACT_API_BASE_URL } from '../params/paramsLog'; // Importing API base URL

/**
 * Function to fetch data from the API.
 * 
 * This function utilizes axios to make a GET request to the specified API endpoint.
 * It handles any potential errors during the fetch operation and logs the response data
 * for debugging purposes.
 */
const fetchData = async () => {
  try {
    // Requirement Condition: Ensure the token is available before making the request
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
    if (!token) {
      throw new Error('Authentication token is not defined.'); // Error handling for missing token
    }

    // Making a GET request to the specified endpoint using the token for authorization
    const response = await axios.get(`${REACT_API_BASE_URL}/endpoint`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    // Log the response data for debugging
    console.log('Fetched data:', response.data); // Log the fetched data to console

  } catch (error) {
    // Handling any errors that occur during the fetch operation
    console.error('Error fetching data:', error.message || error); // Log error message for debugging
  }
};

// Immediately invoking the fetchData function to perform the data fetch
fetchData(); // Call the function to execute the data fetch operation
