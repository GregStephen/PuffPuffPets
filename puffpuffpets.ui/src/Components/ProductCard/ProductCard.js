import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import DeleteProductModal from '../DeleteProductModal/DeleteProductModal';
import UnauthorizedModal from '../UnauthorizedModal/UnauthorizedModal';
import EditProductModal from '../EditProductModal/EditProductModal';

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
  <div className="ProductCard col-lg-6 col-sm-12">
    <div className="card-body">
    <Link className="product-link" to={{pathname: productPage}}>
      <h5 className="card-title">{product.title}</h5>
    </Link>
      <Link className="business-link" to={{ pathname: sellerStorePage }}>{product.businessName}</Link>
      <Link to={{pathname: productPage}}>
        <img className="card-img-top" src={product.imgUrl} alt="Card cap" />
      </Link>
      <div className="row col-12 justify-content-between">
        <p className="card-text col-6 text-left">{product.categoryName}</p>
        <p className="card-text col-6 text-right">{product.typeName}</p>
      </div>
      <p className="card-text">{product.description}</p>

      <p className="card-text product-price">{product.moneyPrice}</p>
      
      {userObj.id === product.sellerId 
        ? 
        <div>
          <button className="btn btn-danger" onClick={() => this.toggleModalOpen('delete')}>Delete</button>
          <button className="btn btn-info" onClick={() => this.toggleModalOpen('edit')}>Edit</button>
          <p>Quantity In stock: {product.quantityInStock}</p>
        </div>
        : userObj.userName === 'unauthorized' 
        ? 
        <div>
          <button className="btn btn-primary" onClick={() => this.toggleModalOpen('unauthorized')}>Add To Cart</button>
        </div>
        : ''
        }
      <p className="card-text">{}</p>
      <Modal isOpen={this.state.productPageModalIsOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.productPageModalIsOpen}>
          {modalOpen === 'delete' ? 'Delete Product' : modalOpen === 'edit' ? 'Edit Product' 
          : modalOpen ===' unauthorized' ? 'Must Create an Account Or Log In' : ""}
        </ModalHeader>
        { modalOpen === 'delete' ? 
          <DeleteProductModal
          product= { product }
          toggleDeleteProduct= { this.toggleModalOpen }
          productDeleted= { this.productDeleted }
          />
          : modalOpen === 'edit' ?
          <EditProductModal
          product= { product }
          toggleModalOpen = { this.toggleModalOpen }
          productEdited= { this.productEdited }
          />
          : modalOpen === 'unauthorized' ?
          <UnauthorizedModal
          toggleModalOpen = { this.toggleModalOpen }               
          />
          : ""
          }
      </Modal>
    </div>
  </div>
);
}
}

export default ProductCard;
