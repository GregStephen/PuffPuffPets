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

const editOrderCompleted = (updatedOrder, id) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/order/edit/${id}`, updatedOrder)
    .then(result => resolve(result.data))
    .catch(err => reject(console.error(err), err));
  })  

export default {
  getMyAddresses,
  getMyPaymentTypes,
  editOrderCompleted
};