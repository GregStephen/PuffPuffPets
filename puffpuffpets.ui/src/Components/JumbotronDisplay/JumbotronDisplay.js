import React from 'react';
import { Jumbotron, Button, Modal, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';

import CreateAcctModal from '../MyNavbar/CreateAcctModal/CreateAcctModal';

import UserRequests from '../../Helpers/Data/UserRequests';

import './JumbotronDisplay.scss';


class JumbotronDisplay extends React.Component {
  state = {
    createAccountModal: false,
    error: '',
  }

  static propTypes = {
    thisIsTheUserLoggingIn: PropTypes.func,
  }

  toggleCreateAccount = () => {
    this.setState(prevState => ({
      createAccountModal: !prevState.createAccountModal,
    }));
  }

  loggedIn = (email, password) => {
    UserRequests.logInUser(email, password)
      .then((user) => {
        this.props.thisIsTheUserLoggingIn(user)
      })
      .catch(err => this.setState({ error: err}));
  }

  createNewUser = (newUser) => {
    UserRequests.addUser(newUser)
    .then(() => {
      this.loggedIn(newUser.Email, newUser.Password)
    })
    .catch(err => console.error(err));
  }
  render() {
    
    return (
      <div className="JumbotronDisplay">
      <Jumbotron className="container">
        <div className="row justify-content-end">
          <h1 className="display-2 col-6">Welcome to Puff Puff Pets</h1>
        </div>
        <div className="row justify-content-end">
          <p className="lead col-6 align-self-end">This is your one stop shop for all CBD related products for whatever is ailing your furry, featherd or scaley friends.</p>
        </div>
        <div className="row justify-content-end">
        <Button className="btn btn-success col-6" onClick={this.toggleCreateAccount}>Create an account</Button>
        </div>
      </Jumbotron>
      <div>
          <Modal isOpen={this.state.createAccountModal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleCreateAccount}>Create Account!</ModalHeader>
              <CreateAcctModal
              toggleCreateAccount={this.toggleCreateAccount}
              createNewUser={this.createNewUser}
              error={this.state.error}
              />
          </Modal>
        </div>
    </div>
    )
  }
}

export default JumbotronDisplay;
