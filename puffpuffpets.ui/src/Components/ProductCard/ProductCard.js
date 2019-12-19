import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import DeleteProductModal from '../DeleteProductModal/DeleteProductModal';

import productShape from '../../Helpers/Props/productShape';

import './ProductCard.scss'

class ProductCard extends React.Component {
    static propTypes = {
       product: productShape.productShape,
    };

    state = {
      modalOpen: '',
      productPageModalIsOpen: false
    }
    productDeleted = () => {

    }

    toggleModalOpen = (value) => {
      this.setState({ modalOpen: value })
      this.setState(prevState => ({
        productPageModalIsOpen: !prevState.productPageModalIsOpen,
      }));
    };

render() {
    const {product, userObj} = this.props;

 
return (
  <div className="ProductCard col-3">
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
      <img className="card-img-top" src={product.imgUrl} alt="Card cap" />
      <p className="card-text">Description: {product.description}</p>
      <p className="card-text">Price: {product.price}</p>
      <button className="btn btn-primary">View</button>
      {userObj.id === product.sellerId 
        ? <button className="btn btn-danger" onClick={this.toggleModalOpen}>Delete</button>
        : <button className="btn btn-primary">Add To Cart</button>}
      <p className="card-text">{}</p>
      <Modal isOpen={this.state.productPageModalIsOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.productPageModalIsOpen}>Delete Product</ModalHeader>
        <DeleteProductModal
        product= { product }
        toggleDeleteProduct= { this.toggleModalOpen }
        productDeleted= { this.productDeleted }
        />
      </Modal>
    </div>
  </div>
);
}
}

export default ProductCard;