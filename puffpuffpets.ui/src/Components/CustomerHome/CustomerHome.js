import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';

import './CustomerHome.scss';

class CustomerHome extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
  };

  componentDidMount(){
    // this is where we will set state of the original products to be displayed
  }

  displaySearchedProducts = (arrayOfProducts) => {
    // this is where you would set the state of the products to the searched results
    console.error('results from the search', arrayOfProducts);
  }

  render () {
    const {userObj} = this.props;
    return (
      <div className="CustomerHome container">
          <h1>Customer HOMEPAGE</h1>
          <h1>WELCOME {userObj.firstName}</h1>
          <div className="row justify-content-center">
            <div className="col-8">
              <SearchBar
              displaySearchedProducts= { this.displaySearchedProducts}/>
            </div>
          </div> 
      </div>
    );
  }
}

export default CustomerHome;