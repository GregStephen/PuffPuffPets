import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';

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

// this is for the seller
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
  const sellerStorePage = `/store/${product.sellerId}`; 
  const productPage = `/productPage/${product.id}`
return (
  <div className="ProductCard col-6">
    <div className="card-body">
    <Link className="product-link" to={{pathname: productPage}}>
      <h5 className="card-title">{product.title}</h5>
    </Link>
      <Link to={{ pathname: sellerStorePage }}>{product.businessName}</Link>
      <img className="card-img-top" src={product.imgUrl} alt="Card cap" />
      <p className="card-text">{product.description}</p>
      <p className="card-text">{product.moneyPrice}</p>
      <p className="card-text">{product.categoryName}</p>
      <p className="card-text">{product.typeName}</p>

      
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