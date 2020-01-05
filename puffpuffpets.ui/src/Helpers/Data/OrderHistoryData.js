import axios from 'axios';


const baseUrl = 'https://localhost:44332/api/order'


const getAllCompletedOrdersByCustomerId = customerId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customerOrderHistory/${customerId}`)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
});

const updateShippedDate = (shippedDate, id) => new Promise((resolve, reject) => {
  axios.put(`https://localhost:44332/api/productOrder/shippedDate/${id}`, shippedDate)
    .then(result => resolve(result.data))
    .catch(err => reject(console.error(err), err));
});

const getMyUnshippedOrders = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sellerOrders/${uid}/0`)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
});

const getAllShippedOrdersBySellerId = sellerId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sellerOrders/${sellerId}/1`)
      .then(result => resolve(result.data))
      .catch(err => reject(err));
});

export default {
  getAllCompletedOrdersByCustomerId,
  getMyUnshippedOrders,
  updateShippedDate,
  getAllShippedOrdersBySellerId
};