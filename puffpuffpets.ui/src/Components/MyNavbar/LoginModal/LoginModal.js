import React from 'react';
import {
  Form, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import UserRequests from '../../../Helpers/Data/UserRequests';

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
    UserRequests.logInUser(email,password)
      .then((user) => {
        loggedIn(user);
      }).catch()
    this.toggleModal();
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value,
    });
};

  render() {
    const {email, password} = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={this.handleChange}
              placeholder="John@puffpuffpets.com"
              required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={this.handleChange}
              required
              />
            </div>            
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