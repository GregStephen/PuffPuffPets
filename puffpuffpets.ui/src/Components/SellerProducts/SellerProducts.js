import React from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

import NewProductModal from '../NewProductModal/NewProductModal';

import ProductRequests from '../../Helpers/Data/ProductRequests';

import './SellerProducts.scss'
class SellerProducts extends React.Component {
  state = {
    newProductModal: false,
    sellersProducts: []
  }

  getSellersProducts = () => {
    const uid = this.props.userObj.id
    ProductRequests.getProductById(uid)
      .then((results) => {
        this.setState({ sellersProducts: results });
      })
      .catch(err => console.error(err))
  }

  addNewProduct = (product) => {
    console.error(product);
    ProductRequests.addProduct(product)
      .then(() => {
        this.getSellersProducts();
      })
      .catch(err => console.error(err));
  }

  toggleNewProductModal = () => {
    this.setState(prevState => ({
      newProductModal: !prevState.newProductModal,
    }));
  };


  componentDidMount() {
    this.getSellersProducts();
  }
  render() {
    return (
      <div className="SellerProducts">
        <h1>SELLER PRODUCTS</h1>
        <Button className="btn btn-success" onClick={this.toggleNewProductModal}>Add A Product</Button>
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