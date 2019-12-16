import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import ProductRequest from '../../Helpers/Data/ProductRequests';

import './SellerHome.scss';

class SellerHome extends Component {
 
  // static PropTypes = {
  //   userObj: PropTypes.object.isRequired,
  // };

  state = {
    Products: [],
  }

  getMyProducts = uid => {
    ProductRequest.getMyProducts(uid)
      .then(Products => this.setState({ Products }))
      .catch(err => console.error(err, 'could not get user cart products'));
  }

  componentDidMount() {
    const userId = this.props.userObj.id;
    this.getMyProducts(userId);
  }
  
  render () {
    const makeProductCards = this.state.map(product => (
      <ProductCard 
      key={product.id}
      product={product}
      />

    ));
    const {userObj} = this.props;
    return (
      <div className="SellerHome">
          <h1>Seller HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
          {makeProductCards}
      </div>
    );
  }
}

export default SellerHome;