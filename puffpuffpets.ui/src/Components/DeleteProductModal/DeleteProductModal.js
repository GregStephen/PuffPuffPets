import React from 'react';
import {
  Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';


class DeleteProductModal extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    toggleDeleteProduct: PropTypes.func,
    productDeleted: PropTypes.func,
  };

  toggleModal = (e) => {
    const { toggleDeleteProduct } = this.props;
    toggleDeleteProduct(e);
  };

  confirmDeletion = () => {
    const {productDeleted} = this.props;
    this.toggleModal();
    productDeleted();
  };

  render() {
    const {product} = this.props;
    return (
      <div className='DeleteProductModal'>
        <ModalBody>
          <p>Are you sure you want to delete {product.title}?!</p>
          <p>All users with shipments needing this product will be notified</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.confirmDeletion}>Yes, Delete {product.title}</Button>{' '}
          <Button color="secondary" value="delete" onClick={this.toggleModal}>No, I fucked up take me back</Button>
        </ModalFooter>
      </div>
    )
  }
}

export default DeleteProductModal;
