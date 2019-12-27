import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';

import DeleteProductModal from '../DeleteProductModal/DeleteProductModal';
import UnauthorizedModal from '../UnauthorizedModal/UnauthorizedModal';

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

productDeleted = (productId) => {
  const {deleteThisProduct} = this.props;
  deleteThisProduct(productId);
}

toggleModalOpen = (value) => {
  this.setState({ modalOpen: value })
  this.setState(prevState => ({
    productPageModalIsOpen: !prevState.productPageModalIsOpen,
  }));
};

render() {
  const {modalOpen} = this.state;
  const {product, userObj} = this.props;
return (
  <div className="ProductCard col-3">
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
      <img className="card-img-top" src={product.imgUrl} alt="Card cap" />
      <p className="card-text">Description: {product.description}</p>
      <p className="card-text">Price: {product.price}</p>
      
      {userObj.id === product.sellerId 
        ? 
        <div>
          <button className="btn btn-primary">View</button>
          <button className="btn btn-danger" onClick={() => this.toggleModalOpen('delete')}>Delete</button>
        </div>
        : userObj.userName === 'unauthorized' 
        ? 
        <div>
          <button className="btn btn-primary" onClick={() => this.toggleModalOpen('unauthorized')}>View</button>
          <button className="btn btn-primary" onClick={() => this.toggleModalOpen('unauthorized')}>Add To Cart</button>
        </div>
        :
        <div>
          <button className="btn btn-primary">View</button>
          <button className="btn btn-primary">Add To Cart</button>
        </div>
        }
      <p className="card-text">{}</p>
      <Modal isOpen={this.state.productPageModalIsOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.productPageModalIsOpen}>
          {modalOpen === 'delete' ? 'Delete Product' : 
          'Must Create an Account Or Log In'}
        </ModalHeader>
        { modalOpen === 'delete' ? 
          <DeleteProductModal
          product= { product }
          toggleDeleteProduct= { this.toggleModalOpen }
          productDeleted= { this.productDeleted }
          />
          :
          <UnauthorizedModal
          toggleModalOpen = { this.toggleModalOpen }               
          />
          }
      </Modal>
    </div>
  </div>
);
}
}

export default ProductCard;