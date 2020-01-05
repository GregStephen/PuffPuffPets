import React, { Component } from 'react';
import SellerHome from '../SellerHome/SellerHome';
import CustomerHome from '../CustomerHome/CustomerHome';
import PropTypes from 'prop-types';
import './Home.scss';

class Home extends Component {
  static propTypes = {
    userLogIn: PropTypes.func,
    userObj: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.userLogIn();
  }
  
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