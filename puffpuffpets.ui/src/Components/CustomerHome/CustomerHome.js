import React from 'react';
import './CustomerHome.scss';

class CustomerHome extends React.Component {

  render () {
    const {userObj} = this.props;
    return (
      <div className="CustomerHome">
          <h1>Customer HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
      </div>
    );
  }
}

export default CustomerHome;