import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import EditUserInfoModal from '../EditUserInfoModal/EditUserInfoModal';
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
    editUserInfoModalIsOpen: false,
  }

  toggleEditUserInfo = () => {
    this.setState(prevState => ({
      editUserInfoModalIsOpen: !prevState.editUserInfoModalIsOpen,
    }));
  }

  userEdited = (editedUser) => {
    const {editThisUser} = this.props;
    editThisUser(editedUser);
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
    const { preferredAddress } = this.state;
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
        <button className='btn btn-info' onClick={this.toggleEditUserInfo}>Change Personal Info</button>

        <div>
          <Modal isOpen={this.state.editUserInfoModalIsOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.editUserInfoModalIsOpen}>Edit Account</ModalHeader>
              <EditUserInfoModal
              toggleEditUserInfo= {this.toggleEditUserInfo} 
              userObj= {userObj}  
              userEdited = {this.userEdited}                 
              />
          </Modal>
        </div>
      </div>
    )
  }
}

export default UserProfile;