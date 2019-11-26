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

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    loginOpen: false,
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      loginOpen: !prevState.loginOpen,
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
                  <button to={'/userprofile'}/*Create Account Modal here*/>Create New Account</button>
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

  logMeOut = (e) => {
    e.preventDefault();
    this.props.userLoggedOut();
  };

  render() {
    const buildNavbar = () => {
      if (this.props.authed === false)
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displayUnauthedNav()}
          </Nav>
        );
      } else if (this.props.authed === true && this.props.userObj.AcctType === 'buyer')
      {
        return (
          <Nav className="ml-auto" navbar>
            {this.displayBuyerNav()}
          </Nav>
        );
      }
      else if (this.props.authed === true && this.props.userObj.AcctType === 'seller')
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
                        <ModalHeader toggle={this.loginOpen}>Add Candy!</ModalHeader>
                        <LoginModal
                        toggleLogin={this.toggleLogin}                       
                        />
                    </Modal>
                </div>
      </div>
    );
  }
}

export default MyNavbar;