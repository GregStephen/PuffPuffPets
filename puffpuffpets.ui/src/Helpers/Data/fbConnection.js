import firebase from 'firebase';
import constants from '../apiKeys.json';

const firebaseApp = () => {
  firebase.initializeApp(constants.firebaseKeys);
};

export default firebaseApp;