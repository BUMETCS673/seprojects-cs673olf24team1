import axios from 'axios';

// eslint-disable-next-line no-undef
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/endpoint`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
