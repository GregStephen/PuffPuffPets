import React from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

import NewProductModal from '../NewProductModal/NewProductModal';
import ProductCard from '../ProductCard/ProductCard';
import ProductRequests from '../../Helpers/Data/ProductRequests';

import './SellerProducts.scss'
class SellerProducts extends React.Component {
  state = {
    newProductModal: false,
    sellersProducts: []
  }

  getSellersProducts = () => {
    const uid = this.props.userObj.id
    ProductRequests.getProductsByUserId(uid)
      .then((results) => {
        this.setState({ sellersProducts: results });
      })
      .catch(err => console.error(err))
  }

  addNewProduct = (product) => {
    ProductRequests.addProduct(product)
      .then(() => {
        this.getSellersProducts();
      })
      .catch(err => console.error(err));
  }

  editThisProduct = (product, id) => {
    ProductRequests.editProduct(product, id)
    .then(() => { this.getSellersProducts();
    })
    .catch(err => console.error(err));
  }

  toggleNewProductModal = () => {
    this.setState(prevState => ({
      newProductModal: !prevState.newProductModal,
    }));
  };

  deleteThisProduct = (productId) => {
    ProductRequests.deleteProduct(productId)
      .then(() => {
        // should maybe return an array of customer id's that have a pending shipment of the product
        // then runs a function that sends out an apology and tells them a refund will occur
        // so need to build a message table in the db for that...
        this.getSellersProducts();
      }).catch(err => console.error(err));
  };

  componentDidMount() {
    this.getSellersProducts();
  }

  render() {
    const {sellersProducts} = this.state;
    const showProducts = sellersProducts.map(product => (
      <ProductCard 
      key={product.id}
      product={product}
      editThisProduct={this.editThisProduct}
      deleteThisProduct={this.deleteThisProduct}
      userObj={this.props.userObj}
      />
    ))
    return (
      <div className="SellerProducts container">
        <h1>Your Products</h1>
        <Button className="btn btn-success" onClick={this.toggleNewProductModal}>Add A Product</Button>
        {
        this.state.sellersProducts.length === 0 ?
        <p>You gotta add some products to your profile!</p>
      : <div className="row">
          {showProducts}
        </div>
        }
        <div>
          <Modal isOpen={this.state.newProductModal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleNewProductModal}>Add a new product</ModalHeader>
              <NewProductModal
              toggleNewProductModal={ this.toggleNewProductModal }
              addNewProduct={ this.addNewProduct }
              userObj={ this.props.userObj }
              />
          </Modal>
        </div>
      </div>
    )
  }
}

export default SellerProducts;