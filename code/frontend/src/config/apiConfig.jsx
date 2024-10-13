// Created by Poom
// Updated and Annotated by Tash: Adding security layer

// Importing necessary libraries and parameters
import axios from 'axios'; // Importing axios for making HTTP requests
import { tokenResponse } from '../params/paramsLog'; // Importing API base URL and token response

/**
 * Function to fetch data from the API.
 * 
 * This function utilizes axios to make a GET request to the specified API endpoint.
 * It handles any potential errors during the fetch operation and logs the response data
 * for debugging purposes.
 */
const fetchData = async () => {
  try {
    // Requirement Condition: Ensure tokenResponse is available before making the request
    if (!tokenResponse) {
      throw new Error('Token response is not defined.'); // Error handling for missing token response
    }

    // Making a GET request to the specified endpoint
    tokenResponse;
    
    // Log the response data for debugging
    console.log(tokenResponse.data); // Log the fetched data to console

  } catch (error) {
    // Handling any errors that occur during the fetch operation
    console.error('Error fetching data:', error); // Log error for debugging
  }
};

// Immediately invoking the fetchData function to perform the data fetch
fetchData(); // Call the function to execute the data fetch operation
