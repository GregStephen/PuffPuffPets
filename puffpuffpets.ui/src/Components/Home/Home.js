import React, { Component } from 'react';
import SellerHome from '../SellerHome/SellerHome';
import CustomerHome from '../CustomerHome/CustomerHome';

import './Home.scss';

class Home extends Component {

  render () {
    const {userObj} = this.props;
    return (
      <div className="Home">
        {userObj.isSeller ? <SellerHome userObj={userObj}/> 
        : <CustomerHome userObj={userObj}/>}
      </div>
    );
  }
}

export default Home;