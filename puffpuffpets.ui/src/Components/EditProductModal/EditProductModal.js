import React from 'react';
import {
  Button, ModalBody, ModalFooter,
} from 'reactstrap';



class EditProductModal extends React.Component {

  toggleModal = (e) => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  confirmEdit = () => {
    // this does all the stuff with all the things
  }
  render() {
    return (
      <div className='EditProductModal'>
        <ModalBody>
          <p>Edit this product</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.confirmEdit}>Edit this Product</Button>{' '}
          <Button color="secondary" value="edit" onClick={this.toggleModal}>Nevermind</Button>
        </ModalFooter>
      </div>
    )
  }
}

export default EditProductModal;
