import React from 'react';
import {
  Form, Label, Input, Button, ModalBody,FormGroup, ModalFooter
} from 'reactstrap';

import CategoryRequests from '../../Helpers/Data/CategoryRequests';
import ProductTypeRequests from '../../Helpers/Data/ProductTypeRequests';

const defaultProduct = {
  title: '',
  sellerId: '',
  imgUrl: '',
  typeId: '',
  description: '',
  categoryId: '',
  price: 1.99,
  quantityInStock: 1
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
    const priceInPennies = (newProduct.price * 100)
    newProduct.price = priceInPennies;
    newProduct.sellerId = this.props.userObj.id;
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
              <Label for="title">Product Title:</Label>
              <Input
                type="input"
                name="title"
                id="title"
                value={newProduct.title}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="categoryId">What animal is it for?</Label>
              <Input
                type="select"
                name="categoryId"
                id="categoryId"
                value={newProduct.categoryId}
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
                value={newProduct.typeId}
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
                value={newProduct.description}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="imgUrl">Image URL:</Label>
              <Input
                type="url"
                name="imgUrl"
                id="imgUrl"
                value={newProduct.imgUrl}
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
                value={newProduct.price}
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
                value={newProduct.quantityInStock}
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