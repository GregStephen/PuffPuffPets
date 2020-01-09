import React, { Component } from 'react';
import moment from 'moment';
import SellerStats from '../SellerStats/SellerStats';
import UnshippedOrders from '../UnshippedOrders/UnshippedOrders'

import './SellerHome.scss';


class SellerHome extends Component {
  state = {
    userSince: '',
  }
  componentDidMount() {
    const {userObj} = this.props;
    const now = moment(userObj.dateCreated).fromNow(true)
    this.setState({ userSince: now });
  }
  
  render () {
    const {userSince} = this.state;
    const {userObj} = this.props;
    return (
      <div className="SellerHome container">
        <h1>Welcome {userObj.firstName}</h1>
        <h5>You've been a valued member for {userSince}</h5>
        <div className="row">
          <SellerStats 
          userObj = { userObj } />
        </div>
        <br/>
        <div className="row unshippedOrders">
          <UnshippedOrders 
          userObj={userObj}/>
        </div>
      </div>
    );
  }
}

export default SellerHome;