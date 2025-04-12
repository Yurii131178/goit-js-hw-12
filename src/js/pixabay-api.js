import axios from 'axios';

export async function doFetch(aim, page) {
  const API_KEY = '49632917-f700970c30bc9937fd82e83ee';
  const url = 'https://pixabay.com/api/';

  const response = await axios({
    url,
    params: {
      key: API_KEY,
      q: aim,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response;
}