
import axios from 'axios';

const API_KEY = '49632917-f700970c30bc9937fd82e83ee';
const URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;  // Returning the 'data' directly
  } catch (error) {
    console.error('Error fetching images:', error);
    
  }
}