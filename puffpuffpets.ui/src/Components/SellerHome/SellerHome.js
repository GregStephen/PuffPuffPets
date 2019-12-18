import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import ProductRequest from '../../Helpers/Data/ProductRequests';

import './SellerHome.scss';

class SellerHome extends Component {
  
  componentDidMount() {
    const userId = this.props.userObj.id;
    this.getMyProducts(userId);
  }
  
  render () {

    const {userObj} = this.props;
    return (
      <div className="SellerHome">
          <h1>Seller HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
      </div>
    );
  }
}

export default SellerHome;