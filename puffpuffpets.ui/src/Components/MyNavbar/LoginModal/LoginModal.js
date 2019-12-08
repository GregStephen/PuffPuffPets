import React from 'react';
import {
  Form, ModalBody, ModalFooter, Button, FormGroup, Input, Label
} from 'reactstrap';
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
    UserRequests.logInUser(email, password)
      .then((user) => {
        loggedIn(user);
        this.toggleModal();
      })
      .catch(err => this.setState({ error: err.message}));
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value,
    });
};

  render() {
    const { email, password } = this.state;
    const { error } = this.props;
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
            <p>{error}</p>            
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