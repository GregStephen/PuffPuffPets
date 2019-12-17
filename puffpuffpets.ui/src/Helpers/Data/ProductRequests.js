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

const searchProducts = (term, searchCategories) => new Promise((resolve, reject) => {
    const categoryIds = Object.keys(searchCategories);
    const selectedCategories = categoryIds.filter(function(id) {
        return searchCategories[id]
    })
    let stringedCategories = "?";
    selectedCategories.forEach((category, index) => {
        let toAdd =  '';
        if (index === 0) {
            toAdd += `cat=${category}`;
        }
        else {
            toAdd += `&cat=${category}`;
        }
        stringedCategories += toAdd;
    }) 
    axios.get(`${baseUrl}/search/q=${term}/categories${stringedCategories}`)
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
    searchProducts,
    addProduct,
    editProduct,
    deleteProduct,
};