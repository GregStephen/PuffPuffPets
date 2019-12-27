import React from 'react';
import {
  Form, Label, Input, Button, ModalBody,FormGroup, ModalFooter
} from 'reactstrap';

import CategoryRequests from '../../Helpers/Data/CategoryRequests';
import ProductTypeRequests from '../../Helpers/Data/ProductTypeRequests';

const defaultProduct = {
  Title: '',
  SellerId: '',
  ImgUrl: '',
  TypeId: '',
  Description: '',
  CategoryId: '',
  Price: 1.99,
  QuantityInStock: 1
};


class NewProductModal extends React.Component {
  state = {
    newProduct: defaultProduct,
    categories: [],
    productTypes: []
  }

  componentDidMount() {
    CategoryRequests.getAllCategories()
      .then(categories => this.setState({ categories }))
      .catch(err => console.error(err));
    ProductTypeRequests.getAllProductTypes()
      .then(productTypes => this.setState({ productTypes }))
      .catch(err => console.error(err));
  }

  toggleModal = () => {
    const { toggleNewProductModal } = this.props;
    toggleNewProductModal();
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { newProduct } = this.state;
    const priceInPennies = (newProduct.Price * 100)
    newProduct.Price = priceInPennies;
    newProduct.SellerId = this.props.userObj.id;
    this.props.addNewProduct(newProduct);
    this.toggleModal();
  }

  formFieldStringState = (e) => {
    const tempProduct = { ...this.state.newProduct };
    tempProduct[e.target.id] = e.target.value;
    this.setState({ newProduct: tempProduct });
  }


  render() {
    const { newProduct, categories, productTypes } = this.state;
    return (
      <div className="NewProductModal container">
        <Form className="row justify-content-center" onSubmit={this.formSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="Title">Product Title:</Label>
              <Input
                type="input"
                name="Title"
                id="Title"
                value={newProduct.Title}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="CategoryId">What animal is it for?</Label>
              <Input
                type="select"
                name="CategoryId"
                id="CategoryId"
                value={newProduct.CategoryId}
                onChange={this.formFieldStringState}
                required>
                <option value="">Select a category</option>
              { categories.map(object => (
                  <option key={object.id} value={object.id}>{object.name}</option>
              )) }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="TypeId">How intense is this shit?</Label>
              <Input
                type="select"
                name="TypeId"
                id="TypeId"
                value={newProduct.TypeId}
                onChange={this.formFieldStringState}
                required>
                <option value="">Select an intensity</option>
              { productTypes.map(object => (
                  <option key={object.id} value={object.id}>{object.type}</option>
              )) }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description:</Label>
              <Input
                type="textarea"
                name="Description"
                id="Description"
                value={newProduct.Description}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="ImgUrl">Image URL:</Label>
              <Input
                type="url"
                name="ImgUrl"
                id="ImgUrl"
                value={newProduct.ImgUrl}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="Price">Price:</Label>
              <Input
                type="number"
                min="1"
                step="0.01"
                data-number-to-fixed="2" 
                data-number-stepfactor="100"
                name="Price"
                id="Price"
                value={newProduct.Price}
                onChange={this.formFieldStringState}
                required/>
            </FormGroup>
            <FormGroup>
              <Label for="QuantityInStock">Quantity:</Label>
              <Input
                type="number"
                min="1"
                step="1"
                name="QuantityInStock"
                id="QuantityInStock"
                value={newProduct.QuantityInStock}
                onChange={this.formFieldStringState}
                required/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Add Product</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </div>
    )
  }
}

export default NewProductModal;