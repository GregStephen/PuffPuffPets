import React from 'react';
import {
  Form, FormGroup, Label, Input, ModalBody, ModalFooter, Button,
} from 'reactstrap';

class LoginModal extends React.Component {

  toggleModal = () => {
    const { toggleLogin } = this.props;
    toggleLogin();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.toggleModal();
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="emailaddress">Email</Label>
              <Input type="input" name="emailaddress" id="emailaddress" required/>
              <Label for="password">Password</Label>
              <Input type="input" name="password" id="password" required/>
            </FormGroup>            
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