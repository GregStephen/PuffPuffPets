import axios from 'axios';

const baseUrl = 'https://localhost:44332/api'


const getMyUnshippedOrders = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/product/unshippedOrders/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const updateQuantityInStock = (newQuantityInStockProduct, id) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/product/${id}`, newQuantityInStockProduct)
    .then(result => resolve(result.data))
    .catch(err => reject(console.error(err), err));
  })

// const addNewOrder = (newOrder) => new Promise((resolve, reject) => {
//   axios.post(`${baseUrl}/order`, newOrder)
//     .then(result => resolve(result.data))
//     .catch(err => reject(console.error(err), err));
//   })

export default {
  getMyUnshippedOrders,
  updateQuantityInStock,
  // editOrderCompleted,
  // addNewOrder
};