import React from 'react';
import {
  Form, Label, Input, Button,
} from 'reactstrap';
import UserRequests from '../../Data/UserRequests';

const defaultUser = {
  UserName: '',
  FirstName: '',
  LastName: '',
  IsSeller: false,
  Password: '',
  Email: '',
  BusinessName: null,
  AddressLine1: '',
  AddresLine2: '',
  City: '',
  State: '',
  ZipCode: ''
};

class CreateAcctModal extends React.Component {
  state = {
    newUser: defaultUser,
    error: '',
  }

  componentDidMount() {
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { newUser } = this.state;
    UserRequests.addUser(newUser)
      .then(() => {
        var Password = newUser.Password;
        var Email = newUser.Email;
        UserRequests.logInUser(Email, Password)
          .then((user) => {
            this.props.userLoggedIn(user)
          });
      })
      .catch();
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  render() {
    const { newUser, error } = this.state;
    return (
      <div className="CreateAcctModal container">
        <Form className="row justify-content-center" onSubmit={this.formSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="UserName">Username:</Label>
              <Input
                type="input"
                name="UserName"
                id="UserName"
                value={newUser.UserName}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="FirstName">First Name:</Label>
              <Input
                type="input"
                name="FirstName"
                id="FirstName"
                value={newUser.FirstName}
                onChange={this.formFieldStringState}
                required />
              <Label for="LastName">Last Name:</Label>
              <Input
                type="input"
                name="LastName"
                id="LastName"
                value={newUser.LastName}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="input"
                name="Email"
                id="Email"
                value={newUser.Email}
                onChange={this.formFieldStringState}
                required />
              <Label for="Password">Password</Label>
              <Input
                type="input"
                name="Password"
                id="Password"
                value={newUser.Password}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Create Account</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </div>
    )
  }
}

export default CreateAcctModal;