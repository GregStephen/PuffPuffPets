import React from 'react';
import {
  Button, ModalBody, ModalFooter, Input, FormGroup, Label, Form
} from 'reactstrap';

import CategoryRequests from '../../Helpers/Data/CategoryRequests';
import ProductTypeRequests from '../../Helpers/Data/ProductTypeRequests';

class EditProductModal extends React.Component {
  state = {
    updatedProduct: {},
    categories: [],
    productTypes: [],
  }

  toggleModal = (e) => {
    // runs the toggle open modal from parent component
    // passes in the value of e so it knows which one to close
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  componentDidMount() {
    // gets the product you are editing
    const product = this.props.product;
    const newPrice = (product.price / 100)
    // sets the price as a decimal for display
    product.price = newPrice.toFixed(2);
    this.setState({ updatedProduct: product});
    // gets the categories from db and sets state for option input
    CategoryRequests.getAllCategories()
      .then(categories => this.setState({ categories }))
      .catch(err => console.error(err));
    // gets the products from db and sets state for option input
    ProductTypeRequests.getAllProductTypes()
      .then(productTypes => this.setState({ productTypes }))
      .catch(err => console.error(err));
  };

  // changes the price to non decimal penny form and quantity to int for db
  // passes updated product and product id to parent element
  // toggles the modal
  formSubmit = (e) => {
    e.preventDefault();
    const { updatedProduct } = this.state;
    const { productEdited } = this.props;
    
    const priceInPennies = (updatedProduct.price * 100)
    const quantityAsInt = parseInt(updatedProduct.quantityInStock, 10);
    updatedProduct.price = priceInPennies;
    updatedProduct.quantityInStock = quantityAsInt;
    productEdited(updatedProduct, updatedProduct.id);
    this.toggleModal();
  }

  // updates the state of whatever was changed
  formFieldStringState = (e) => {
    const tempProduct = { ...this.state.updatedProduct };
    tempProduct[e.target.id] = e.target.value;
    this.setState({ updatedProduct: tempProduct });
  };

  render() {
    const { updatedProduct, categories, productTypes } = this.state;
    return (
      <div className='EditProductModal'>
        <Form className="row justify-content-center" onSubmit={this.formSubmit}>
          <ModalBody>
          <FormGroup>
              <Label for="title">Product Title:</Label>
              <Input
                type="input"
                name="title"
                id="title"
                value={updatedProduct.title}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="categoryId">What animal is it for?</Label>
              <Input
                type="select"
                name="categoryId"
                id="categoryId"
                value={updatedProduct.categoryId}
                onChange={this.formFieldStringState}
                required>
                <option value="">Select a category</option>
              { categories.map(object => (
                  <option key={object.id} value={object.id}>{object.name}</option>
              )) }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="typeId">How intense is this shit?</Label>
              <Input
                type="select"
                name="typeId"
                id="typeId"
                value={updatedProduct.typeId}
                onChange={this.formFieldStringState}
                required>
                <option value="">Select an intensity</option>
              { productTypes.map(object => (
                  <option key={object.id} value={object.id}>{object.type}</option>
              )) }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={updatedProduct.description}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="imgUrl">Image URL:</Label>
              <Input
                type="url"
                name="imgUrl"
                id="imgUrl"
                value={updatedProduct.imgUrl}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price:</Label>
              <Input
                type="number"
                min="1"
                step="0.01"
                data-number-to-fixed="2" 
                data-number-stepfactor="100"
                name="price"
                id="price"
                value={updatedProduct.price}
                onChange={this.formFieldStringState}
                required/>
            </FormGroup>
            <FormGroup>
              <Label for="quantityInStock">Quantity:</Label>
              <Input
                type="number"
                min="1"
                step="1"
                name="quantityInStock"
                id="quantityInStock"
                value={updatedProduct.quantityInStock}
                onChange={this.formFieldStringState}
                required/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Edit this Product</Button>{' '}
            <Button color="secondary" value="edit" onClick={this.toggleModal}>Nevermind</Button>
          </ModalFooter>
        </Form>
      </div>
    )
  }
}

export default EditProductModal;
