import axios from 'axios';

const baseUrl = 'https://localhost:443322/api/user'

const addUser = userObj => axios.post(`${baseUrl}`, userObj);

export default {addUser};
