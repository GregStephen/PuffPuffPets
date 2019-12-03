import axios from 'axios';

const baseUrl = 'https://localhost:44332/api/user'


const getAllUsers = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const getUserById = uid => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const logInUser = (email, password) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/${email}/p/${password}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const editUser = (editedUser) => new Promise((resolve, reject) => {
    axios.put(`${baseUrl}`, editedUser)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

const addUser = userObj => axios.post(`${baseUrl}`, userObj);

const deleteUser = uid => new Promise((resolve, reject) => {
    axios.delete(`${baseUrl}/${uid}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
});

export default {
    getAllUsers,
    getUserById,
    addUser,
    logInUser,
    editUser,
    deleteUser,
};
