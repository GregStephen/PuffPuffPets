import axios from 'axios';

const baseUrl = 'https://localhost:44332/api/productOrder'


const getMyCartProducts = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const deleteFromCart = productOrderId => axios.delete(`${baseUrl}/delete/${productOrderId}`);

const editQuantityInCart = (quantityOrdered, id) => new Promise((resolve, reject) => {
axios.put(`${baseUrl}/quantityOrdered/${id}`, quantityOrdered)
  .then(result => resolve(result.data))
  .catch(err => reject(console.error(err), err));
})

export default {
  getMyCartProducts,
  deleteFromCart,
  editQuantityInCart
};