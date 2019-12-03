import React from 'react';
import {
  Button, ModalBody, ModalFooter,
} from 'reactstrap';

class DeleteUserModal extends React.Component {
  toggleModal = () => {
    const { toggleDeleteUser } = this.props;
    toggleDeleteUser();
  };
  confirmDeletion = () => {
    const {userDeleted} = this.props;
    this.toggleModal();
    userDeleted();
  }
  render() {
    return (
      <div className='DeleteUserModal'>
        <ModalBody>
          <p>Are you sure you want to delete your account?!</p>
          <p>This can NOT be undone...</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.confirmDeletion}>Yes, Delete My Account</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>No, I fucked up take me back</Button>
        </ModalFooter>
      </div>
    )
  }
}

export default DeleteUserModal;
