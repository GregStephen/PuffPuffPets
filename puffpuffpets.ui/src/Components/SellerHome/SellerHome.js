import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import moment from 'moment';

import EditUserInfoModal from '../EditUserInfoModal/EditUserInfoModal';
import DeleteUserModal from '../DeleteUserModal/DeleteUserModal';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import ChangeEmailModal from '../ChangeEmailModal/ChangeEmailModal';

import SellerStats from '../SellerStats/SellerStats';
import UnshippedOrders from '../UnshippedOrders/UnshippedOrders'

import './SellerHome.scss';


class SellerHome extends Component {
  state = {
    userSince: '',
    modalOpen: '',
    sellerPageModalIsOpen: false,
  }

  componentDidMount() {
    const {userObj} = this.props;
    const now = moment(userObj.dateCreated).fromNow(true)
    this.setState({ userSince: now });
  }
  
  toggleModalOpen = (value) => {
    this.setState({ modalOpen: value })
    this.setState(prevState => ({
      sellerPageModalIsOpen: !prevState.sellerPageModalIsOpen,
    }));
  };

  userEdited = (editedUser) => {
    const {editThisUser} = this.props;
    editThisUser(editedUser);
  }

  userDeleted = () => {
    const {deleteThisUser} = this.props;
    deleteThisUser();
  }

  render () {
    const {userSince, modalOpen} = this.state;
    const {userObj} = this.props;
    return (
      <div className="SellerHome container">
        <h1>Welcome {userObj.firstName}</h1>
        <h5>You've been a valued member for {userSince}</h5>
        <div className="row">
          <SellerStats 
          userObj = { userObj } />
                  <div className="col-lg-3 offset-lg-3 col-md-4 offset-md-2 col-sm-12 modal-group">
            <ListGroup flush>
              <ListGroupItem className="profile-modal" tag="a" onClick={() => this.toggleModalOpen('info')}>Change Personal Info</ListGroupItem>
              <ListGroupItem className="profile-modal" tag="a" onClick={() => this.toggleModalOpen('password')}>Change Password</ListGroupItem>
              <ListGroupItem className="profile-modal" tag="a" onClick={() => this.toggleModalOpen('email')}>Change Email</ListGroupItem>
              <ListGroupItem className="profile-modal delete-profile" tag="a" onClick={() => this.toggleModalOpen('delete')}>Delete Profile</ListGroupItem>
            </ListGroup>
          </div>
        </div>
        <br/>
        <div className="row unshippedOrders">
          <UnshippedOrders 
          userObj={userObj}/>
        </div>
        <Modal isOpen={this.state.sellerPageModalIsOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.sellerPageModalIsOpen}>
            {modalOpen === 'info' ? 'Edit Account' : 
            modalOpen === 'password' ? 'Change Password' : 
            modalOpen === 'email' ? 'Change Email' : 
            modalOpen === 'delete' ? 'Delete Account' : ''}
          </ModalHeader>
          { modalOpen === 'info' ? 
            <EditUserInfoModal
            toggleEditUserInfo = { this.toggleModalOpen } 
            userObj = { userObj }  
            userEdited = { this.userEdited }                 
            /> 
            : modalOpen === 'password' ?
            <ChangePasswordModal
            toggleChangePassword = { this.toggleModalOpen } 
            userObj = { userObj }               
            />
            : modalOpen === 'email' ?
            <ChangeEmailModal
            toggleChangeEmail = { this.toggleModalOpen }
            userObj = { userObj }
            />
            : modalOpen === 'delete' ? 
            <DeleteUserModal
            toggleDeleteUser = { this.toggleModalOpen } 
            userObj = { userObj }
            userDeleted = { this.userDeleted } 
            />
            : ''
          }
          </Modal>
      </div>
    );
  }
}

export default SellerHome;