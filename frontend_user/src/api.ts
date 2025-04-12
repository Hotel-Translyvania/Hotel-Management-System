import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Change to your backend URL

export const placeOrder = async (bookingId, items) => {
  // Ensure the items is an array and transform it correctly
  const payload = {
    bookingId,
    items, // No need to map here, since items are already in the correct format
  };

  return await axios.post(`${API_BASE_URL}/api/v1/hotels/1/orders`, payload);
};