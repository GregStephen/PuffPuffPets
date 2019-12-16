import axios from 'axios';

const baseUrl = 'https://localhost:44332/api'


const getMyAddresses = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/address/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const getMyPaymentTypes = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/paymentType/user/${uid}`)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
});

export default {
  getMyAddresses,
  getMyPaymentTypes
};