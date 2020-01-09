import React from 'react';
import {
  Modal,
  ModalHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import EditUserInfoModal from '../EditUserInfoModal/EditUserInfoModal';
import DeleteUserModal from '../DeleteUserModal/DeleteUserModal';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import ChangeEmailModal from '../ChangeEmailModal/ChangeEmailModal';

import AddressRequests from '../../Helpers/Data/AddressRequests';

import './UserProfile.scss';

const defaultAddress = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
}

class UserProfile extends React.Component {
  state = {
    preferredAddress: defaultAddress,
    allAddresses: [],
    modalOpen: '',
    userPageModalIsOpen: false,
    userSince: '',
  }

  static propTypes = {
    userObj: PropTypes.object.isRequired,
    editThisUser: PropTypes.func,
    deleteThisUser: PropTypes.func,
  }

  toggleModalOpen = (value) => {
    this.setState({ modalOpen: value })
    this.setState(prevState => ({
      userPageModalIsOpen: !prevState.userPageModalIsOpen,
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

  componentDidMount() {
    const {userObj} = this.props;
    const now = moment(userObj.dateCreated).fromNow(true)
    this.setState({ userSince: now });
    AddressRequests.getAllAddressesByUserId(userObj.id)
      .then((results) => {
        this.setState({ allAddresses: results });
        const prefAddress = results.filter(address => address.isPreferred === true);
        this.setState({ preferredAddress: prefAddress[0] });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { preferredAddress, modalOpen, userSince } = this.state;
    const { userObj } = this.props;

    return (
      <div className="UserProfile container">
        <div className="row">
          <div className="user-info col-md-6 col-sm-12">
            <h1>Hey {userObj.firstName} {userObj.lastName}</h1>
            <p>You've been with us for: {userSince}</p>
            <p>Preferred Address:</p>
            <p>{preferredAddress.addressLine1}</p>
            {preferredAddress.addressLine2 != null 
            ? <p>{preferredAddress.addressLine2}</p>
            : ''}
            <p>{preferredAddress.city}, {preferredAddress.state} {preferredAddress.zipCode}</p>
          </div>
          <div className="col-lg-3 offset-lg-3 col-md-4 offset-md-2 col-sm-12 modal-group">
            <ListGroup flush>
              <ListGroupItem className="profile-modal" tag="a" onClick={() => this.toggleModalOpen('info')}>Change Personal Info</ListGroupItem>
              <ListGroupItem className="profile-modal" tag="a" onClick={() => this.toggleModalOpen('password')}>Change Password</ListGroupItem>
              <ListGroupItem className="profile-modal" tag="a" onClick={() => this.toggleModalOpen('email')}>Change Email</ListGroupItem>
              <ListGroupItem className="profile-modal delete-profile" tag="a" onClick={() => this.toggleModalOpen('delete')}>Delete Profile</ListGroupItem>
            </ListGroup>
          </div>
          <Modal isOpen={this.state.userPageModalIsOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.userPageModalIsOpen}>
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
      </div>
    )
  }
}

export default UserProfile;
