import React, { Component } from 'react';
import './SellerHome.scss';

class SellerHome extends Component {

  render () {
    const {userObj} = this.props;
    return (
      <div className="SellerHome">
          <button className="btn btn-success">Bootstrap Button</button>
          <h1>Seller HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
      </div>
    );
  }
}

export default SellerHome;