import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProductRequests from '../../Helpers/Data/ProductRequests'
import productShape from '../../Helpers/Props/productShape';

import './ProductCard.scss'

class ProductCard extends React.Component {
    static propTypes = {
       product: productShape.productShape,
    };


render() {
    const {product} = this.props;

 
return (
    <div className="ProductCard col-3">
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
    <img className="card-img-top" src={product.imgUrl} alt="Card cap" />
      <p className="card-text">Description: {product.description}</p>
      <p className="card-text">Price: {product.price}</p>
      <button className="btn btn-primary">View</button>
      <button className="btn btn-primary">Add To Cart</button>
      <p className="card-text">{}</p>
    </div>
  </div>
);
}
}

export default ProductCard;