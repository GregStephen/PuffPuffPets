import React, { Component } from 'react';

import SellerStats from '../SellerStats/SellerStats';

import './SellerHome.scss';

class SellerHome extends Component {
  
  componentDidMount() {
   
  }
  
  render () {

    const {userObj} = this.props;
    return (
      <div className="SellerHome">
          <h1>Seller HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
          <SellerStats 
          userObj = { userObj } />
      </div>
    );
  }
}

export default SellerHome;