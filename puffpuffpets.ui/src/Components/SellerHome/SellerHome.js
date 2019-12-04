import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SellerHome.scss';

class SellerHome extends Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
  };
  
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