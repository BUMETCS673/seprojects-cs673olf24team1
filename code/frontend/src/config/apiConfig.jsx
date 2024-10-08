import axios from 'axios'; // Importing axios for making HTTP requests

// Base URL for the API, using environment variable or defaulting to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Function to fetch data from the API
const fetchData = async () => {
  try {
    // Making a GET request to the specified endpoint
    const response = await axios.get(`${API_BASE_URL}/endpoint`);
    console.log(response.data); // Log the response data for debugging
  } catch (error) {
    // Handling any errors that occur during the fetch operation
    console.error('Error fetching data:', error);
  }
};

// Immediately invoking the fetchData function to perform the data fetch
fetchData();
