import axios from 'axios';

const baseUrl = 'https://localhost:44332/api/productOrder'


const getMyCartProducts = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

export default {
  getMyCartProducts
};