import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';

import LoginModal from './LoginModal/LoginModal';
import CreateAcctModal from './CreateAcctModal/CreateAcctModal';
import UserRequests from '../../Helpers/Data/UserRequests';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    loginOpen: false,
    createAccountModal: false,
    error: '',
  }

  static propTypes = {
    authed: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
    userLoggedIn: PropTypes.func,
    userLoggedOut: PropTypes.func,
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      loginOpen: !prevState.loginOpen,
    }));
  }

  toggleCreateAccount = () => {
    this.setState(prevState => ({
      createAccountModal: !prevState.createAccountModal,
    }));
  }

  displayUnauthedNav = () => {
    return <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Sign In
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.toggleLogin}>
                  Log In to Existing
                </DropdownItem>
                <DropdownItem onClick={this.toggleCreateAccount}>
                  Create New Account
                </DropdownItem>                
              </DropdownMenu>
            </UncontrolledDropdown>;
  }

  displayBuyerNav = () => {
    return <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              {this.props.userObj.userName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to={'/user'}>User Profile</Link>
                </DropdownItem>                
                <DropdownItem onClick={this.logMeOut}>
                    Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>;
  }

  displaySellerNav = () => {
    return <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.userObj.userName}
              </DropdownToggle>
              <DropdownMenu right>                
                <DropdownItem>
                  <Link to={'/sellerprofile'}>Seller Profile</Link>
                </DropdownItem>
                <DropdownItem onClick={this.logMeOut}>
                    Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>;
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  loggedIn = (email, password) => {
    UserRequests.logInUser(email, password)
      .then((user) => {
        this.props.userLoggedIn(user)
      })
      .catch(err => this.setState({ error: err}));
  }

  createNewUser = (newUser) => {
    UserRequests.addUser(newUser)
    .then(() => {
      this.loggedIn(newUser.Email, newUser.Password)
    })
    .catch(err => this.setState({ error: err}));
  }

  logMeOut = (e) => {
    e.preventDefault();
    this.props.userLoggedOut();
  };

  render() {
    const { error } = this.state;
    const buildNavbar = () => {
      const { authed, userObj } = this.props;
      if (!authed)
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displayUnauthedNav()}
          </Nav>
        );
      } else if (authed && !userObj.isSeller)
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displayBuyerNav()}
          </Nav>
        );
      }
      else if (authed && userObj.isSeller)
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displaySellerNav()}
          </Nav>
        );
      }
    };

    return (
      <div className="MyNavbar">
        <Navbar dark color="dark" expand="md">
          <NavbarBrand className="navbar-brand" tag={RRNavLink} to='/home'>Puff Puff Pets</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
        <div>
          <Modal isOpen={this.state.loginOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.loginOpen}>Login</ModalHeader>
              <LoginModal
              toggleLogin={this.toggleLogin} 
              loggedIn={this.loggedIn}  
              error={error}                    
              />
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.createAccountModal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleCreateAccount}>Create Account!</ModalHeader>
              <CreateAcctModal
              toggleCreateAccount={this.toggleCreateAccount}
              createNewUser={this.createNewUser}
              error={error}
              />
          </Modal>
        </div>
      </div>
    );
  }
}

export default MyNavbar;