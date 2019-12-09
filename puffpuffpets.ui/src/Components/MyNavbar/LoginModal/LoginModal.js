import React from 'react';
import {
  Form, ModalBody, ModalFooter, Button, FormGroup, Input, Label
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import UserRequests from '../../../Helpers/Data/UserRequests';

class LoginModal extends React.Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  toggleModal = () => {
    const { toggleLogin } = this.props;
    toggleLogin();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const { loggedIn } = this.props;
    // attempts to log in to firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(cred => {
        //get token from firebase
        cred.user.getIdToken()
            //save the token to the session storage
          .then(token => sessionStorage.setItem('token',token))
          .then(() => {
            const firebaseUid =  firebase.auth().currentUser.uid;
            // gets the user data from PPP database by firebaseUid
            UserRequests.logInUser(firebaseUid)
              .then((user) => {
                // stores the user's data at APP level
                loggedIn(user);
                this.toggleModal();
          }) 
      })
    }).catch(err => {
      // if anything breaks this will show up on the log in modal why it broke
      this.setState({ error: err.message});
      })
  };

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value,
    });
};

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
          <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="input"
                name="email"
                id="email"
                value={email}
                onChange={this.handleChange}
                required />
              <Label for="[assword">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                required />
            </FormGroup>
            <p className="error">{error}</p>            
          </ModalBody>
          <ModalFooter>
         <Button type="submit" color="primary">Login</Button>{' '}
         <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
       </ModalFooter>
        </Form>
      </div>
    );
  }
}

export default LoginModal;