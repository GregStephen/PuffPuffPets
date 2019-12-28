import axios from 'axios';

const baseUrl = 'https://localhost:44332/api/productType'

const getAllProductTypes = () => new Promise ((resolve, reject) => {
  axios.get(`${baseUrl}`)
  .then(result => resolve(result.data))
  .catch(err => reject(err));
});

export default { getAllProductTypes };
