import React from 'react';
import Product from '../../Helpers/Data/ProductRequests';

import {Label,Input} from 'reactstrap';
import './ProductPage.scss';
import UserRequests from '../../Helpers/Data/UserRequests';

class ProductPage extends React.Component {
    state ={
        product: { },
        quantity: 1
    }

    getProductId = (e)=>{
        console.error(e.target.id)
    }
    
    componentDidMount() {
        const {productId} = this.props.match.params;
        Product.getProductByProductId(productId)
        .then(result => this.setState({product: result}))
        .catch(err => console.error(err));
    }

    formFieldStringState =(e) =>{
        let tempquantity = this.state.quantity;
        tempquantity = e.target.value;
        this.setState({quantity: tempquantity})
    }

    addToCart = () => {
        const productAdd = { };
        productAdd.productId = this.state.product.id;
        const intquant = parseInt(this.state.quantity,10)
        productAdd.quantityOrdered = intquant;
        productAdd.userId = this.props.userObj.id;
        UserRequests.addToCart(productAdd);
    }
    
    render () {
        const {product} = this.state;
        return (
            <div className="ProductPage container">
            <h1>{product.title}</h1>
            <img className="card-img-top" src={product.imgUrl} alt="Card cap" />
        <p className="text-align">{product.typeName}</p>
        <p>{product.description}</p>
        <p>{product.moneyPrice}</p>
        <Label for="quantity">Quantity</Label>
        <Input
          type="number"
          name="quantity"
          id="quantity"
          value={this.state.quantity}
          onChange={this.formFieldStringState}
          min="1"
          max={product.quantityInStock}
        />
            <button className="btn btn-primary" onClick={this.addToCart}>Add to Cart</button>
        </div>
    )
};    

};

    export default ProductPage;