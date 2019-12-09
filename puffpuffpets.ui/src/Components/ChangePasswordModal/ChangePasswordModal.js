import React from 'react';
import {
  Button, ModalBody, ModalFooter, FormGroup, Form, Label, Input
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

import './ChangePasswordModal.scss';


class ChangePasswordModal extends React.Component {
  state = {
    updatedPassword : {
      oldPassword: '',
      newPassword: ''
    },
    error: ''
  };

  static propTypes = {
    userObj: PropTypes.object.isRequired,
    toggleChangePassword: PropTypes.func,
  };

  toggleModal = (e) => {
    const { toggleChangePassword } = this.props;
    toggleChangePassword(e);
  };

  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword)
        .then(() => {
          this.toggleModal();
          console.log("Password updated!");
        }).catch((error) => { this.setState({error: error.message}) });
      }).catch((error) => { 
        if (error.code === "auth/wrong-password")
        {
          this.setState({ error: 'Old password is not correct'})
        }
    });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const {updatedPassword} = this.state;
    this.changePassword(updatedPassword.oldPassword, updatedPassword.newPassword);
  };

  formFieldStringState = (e) => {
    const tempPasswordChange = { ...this.state.updatedPassword };
    tempPasswordChange[e.target.id] = e.target.value;
    this.setState({ updatedPassword: tempPasswordChange });
  };

  render() {
    const { updatedPassword, error } = this.state;
    return (
      <div className='ChangePasswordModal container'>
        <Form className="row justify-content-center" onSubmit={this.formSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="oldPassword">Old Password</Label>
            <Input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={updatedPassword.oldPassword}
              onChange={this.formFieldStringState}
              required />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              value={updatedPassword.newPassword}
              onChange={this.formFieldStringState}
              required />
          </FormGroup>
          <p className="error">{error}</p>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Change Password</Button>{' '}
          <Button color="secondary" value="password" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Form>
      </div>
    )
  }
}

export default ChangePasswordModal;