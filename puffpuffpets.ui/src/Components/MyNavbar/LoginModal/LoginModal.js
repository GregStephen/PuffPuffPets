import React from 'react';
import {
  Form, ModalBody, ModalFooter, Button, FormGroup, Input, Label
} from 'reactstrap';

class LoginModal extends React.Component {
  state = {
    email: '',
    password: '',
  }
  toggleModal = () => {
    const { toggleLogin } = this.props;
    toggleLogin();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const { loggedIn } = this.props;
    loggedIn(email,password);
    this.toggleModal();
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
          </ModalBody>
          <ModalFooter>
         <Button type="submit" color="primary">Login</Button>{' '}
         <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
         <p>{error}</p>
       </ModalFooter>
        </Form>
      </div>
    );
  }
}

export default LoginModal;