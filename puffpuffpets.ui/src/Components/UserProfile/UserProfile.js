import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';

import EditUserInfoModal from '../EditUserInfoModal/EditUserInfoModal';
import DeleteUserModal from '../DeleteUserModal/DeleteUserModal';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';

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
    AddressRequests.getAllAddressesByUserId(userObj.id)
      .then((results) => {
        this.setState({ allAddresses: results });
        const prefAddress = results.filter(address => address.isPreferred === true);
        this.setState({ preferredAddress: prefAddress[0] });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { preferredAddress, modalOpen } = this.state;
    const { userObj } = this.props;

    return (
      <div className="UserProfile">
        <h1>Hey {userObj.firstName} {userObj.lastName}</h1>
        <p>Preferred Address:</p>
        <p>{preferredAddress.addressLine1}</p>
        {preferredAddress.addressLine2 != null 
        ? <p>{preferredAddress.addressLine2}</p>
        : ''}
        <p>{preferredAddress.city}, {preferredAddress.state} {preferredAddress.zipCode}</p>
        <button className='btn btn-info' onClick={() => this.toggleModalOpen('info')}>Change Personal Info</button>
        <button className='btn btn-info' onClick={() => this.toggleModalOpen('password')}>Change Password</button>
        <button className='btn btn-danger' onClick={() => this.toggleModalOpen('delete')}>DELETE PROFILE</button>
        <Modal isOpen={this.state.userPageModalIsOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.userPageModalIsOpen}>{modalOpen === 'info' ? 'Edit Account' : 
        modalOpen === 'password' ? 'Change Password' : 'Delete Account'}</ModalHeader>
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
          :              
          <DeleteUserModal
          toggleDeleteUser = { this.toggleModalOpen } 
          userObj = { userObj }
          userDeleted = { this.userDeleted } 
          />
        }
        </Modal>
      </div>
    )
  }
}

export default UserProfile;
