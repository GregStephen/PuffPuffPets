import axios from 'axios';

const baseUrl = 'https://localhost:44332/api/address'


const getAllAddressesByUserId = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const addAddress = newAddress => axios.post(`${baseUrl}`, newAddress);

export default {
    getAllAddressesByUserId,
    addAddress,
};