import axios from 'axios';

const API_KEY = '35160864-8ca81e651f434a7e9dfe21623';

export default axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
  },
});
