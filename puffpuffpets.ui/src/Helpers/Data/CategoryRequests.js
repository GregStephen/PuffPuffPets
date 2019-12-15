import axios from 'axios';

const baseUrl = 'https://localhost:44332/api/category'

const getAllCategories = () => new Promise ((resolve, reject) => {
  axios.get(`${baseUrl}`)
  .then(result => resolve(result.data))
  .catch(err => reject(err));
});

export default { getAllCategories };
