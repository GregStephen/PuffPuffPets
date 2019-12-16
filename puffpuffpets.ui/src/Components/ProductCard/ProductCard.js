import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProductRequests from '../../Helpers/Data/ProductRequests'
import productShape from '../../Helpers/Props/productShape';

class ProductCard extends React.Component {
    static propTypes = {
       product: productShape.productShape,
    };


render() {
    const {product} = this.props;

 
return (
    <div className="ProductCard col-3">
    <div className="card-body">
      <h5 className="card-title">{product.Title}</h5>
    <img className="card-img-top" src={product.ImgUrl} alt="Card cap" />
      <p className="card-text">Description: {product.Description}</p>
      <p className="card-text">Price: {product.Price}</p>
      <p className="card-text">{}</p>
    </div>
  </div>
);
}
}

export default ProductCard;