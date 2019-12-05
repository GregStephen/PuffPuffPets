import React from 'react';
import PropTypes from 'prop-types';
import './CustomerHome.scss';

class CustomerHome extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
  };

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