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

import './MyNavbar.scss';
import LoginModal from './LoginModal/LoginModal';
import CreateAcctModal from './CreateAcctModal/CreateAcctModal';
import UserRequests from '../../Helpers/Data/UserRequests';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    loginOpen: false,
    createAccountModal: false,
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
                <DropdownItem>
                  <button onClick={this.toggleLogin}/*Login Modal here*/>Log In to Existing</button>
                </DropdownItem>
                <DropdownItem>
                  <button onClick={this.toggleCreateAccount}/*Create Account Modal here*/>Create New Account</button>
                </DropdownItem>                
              </DropdownMenu>
            </UncontrolledDropdown>;
  }

  displayBuyerNav = () => {
    return <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Username
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to={'/userprofile'}>User Profile</Link>
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
                Username
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

  loggedIn = (user) => {
    this.props.userLoggedIn(user);
  }

  logMeIn = (newUser) => {
    UserRequests.addUser(newUser)
    .then(() => {
      var Password = newUser.Password;
      var Email = newUser.Email;
      UserRequests.logInUser(Email, Password)
        .then((user) => {
          console.error('logged in');
          this.props.userLoggedIn(user)
        });
    })
    .catch();
  }

  logMeOut = (e) => {
    e.preventDefault();
    this.props.userLoggedOut();
  };

  render() {
    const buildNavbar = () => {
      const {authed, userObj} = this.props;
      if (!authed)
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displayUnauthedNav()}
          </Nav>
        );
      } else if (authed && !userObj.IsSeller)
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displayBuyerNav()}
          </Nav>
        );
      }
      else if (authed && userObj.IsSeller)
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
          <NavbarBrand className="navbar-brand" tag={RRNavLink} to='/home'>Puff Puff Parrots</NavbarBrand>
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
              />
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.createAccountModal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleCreateAccount}>Create Account!</ModalHeader>
              <CreateAcctModal
              toggleCreateAccount={this.toggleCreateAccount}
              logMeIn={this.logMeIn}
              />
          </Modal>
        </div>
      </div>
    );
  }
}

export default MyNavbar;