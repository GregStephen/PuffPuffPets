import axios from 'axios';


const baseUrl = 'https://localhost:44332/api/product'

const getAllProducts = () => new Promise ((resolve, reject) => {
        axios.get(`${baseUrl}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const getProductById = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/${uid}`)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
});

const addProduct = userObj => axios.post(`${baseUrl}`, userObj);

const editProduct = (editedProduct) => new Promise((resolve, reject) => {
    axios.put(`${baseUrl}`, editedProduct)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const deleteProduct = uid => new Promise((resolve, reject) => {
    axios.delete(`${baseUrl}/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

export default {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
};