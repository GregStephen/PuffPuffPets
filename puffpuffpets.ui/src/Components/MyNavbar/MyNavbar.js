import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
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
    createAccountModal: false
  }

  static propTypes = {
    authed: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
    userLogIn: PropTypes.func,
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

  loggedIn = () => {
    this.props.userLogIn();
  }

  createNewUser = (newUser, firebaseInfo) => {
    UserRequests.addUser(newUser, firebaseInfo)
    .then()
    .catch(err => console.error(err))
  }

  logMeOut = (e) => {
    e.preventDefault();
    this.props.userLoggedOut();
  };

  render() {
    const buildNavbar = () => {
      const { authed, userObj } = this.props;
      const myCart = `/myCart/${userObj.id}`;
      const productsPage = `/products/${userObj.id}`;
      const sellerOrderHistory = `/sellerOrderHistory/${userObj.id}`;
      const customerOrderHistory = `/customerOrderHistory/${userObj.id}`;
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
            <NavLink tag={RRNavLink} to={myCart}>Cart</NavLink>
            <NavLink tag={RRNavLink} to={customerOrderHistory}>Order History</NavLink>
            {this.displayBuyerNav()}
          </Nav>
        );
      }
      else if (authed && userObj.isSeller)
      {
        return (
          <Nav className="ml-auto" navbar>
            <NavLink tag={RRNavLink} to={productsPage}>Products Page</NavLink>
            <NavLink tag={RRNavLink} to={sellerOrderHistory}>Order History</NavLink>
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
              />
          </Modal>
        </div>
        <div>
          <Modal isOpen={this.state.createAccountModal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleCreateAccount}>Create Account!</ModalHeader>
              <CreateAcctModal
              toggleCreateAccount={this.toggleCreateAccount}
              createNewUser={this.createNewUser}
              />
          </Modal>
        </div>
      </div>
    );
  }
}

export default MyNavbar;