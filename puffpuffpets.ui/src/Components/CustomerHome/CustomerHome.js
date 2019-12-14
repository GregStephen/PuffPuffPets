import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';

import './CustomerHome.scss';

class CustomerHome extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
  };

  render () {
    const {userObj} = this.props;
    return (
      <div className="CustomerHome container">
          <h1>Customer HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
          <div className="row justify-content-center">
            <div className="col-8">
              <SearchBar/>
            </div>
          </div> 
      </div>
    );
  }
}

export default CustomerHome;