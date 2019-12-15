import React from 'react';
import PropTypes from 'prop-types';

import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';
import SearchBar from '../SearchBar/SearchBar';

import './Auth.scss';
class Auth extends React.Component {
  static propTypes = {
    userLoggedIn: PropTypes.func.isRequired,
  }

  componentDidMount(){
    // this is where we will set state of the original products to be displayed
  }

  thisIsTheUserLoggingIn = (user) => {
    const {userLoggedIn} = this.props;
    userLoggedIn(user);
  }

  displaySearchedProducts = (arrayOfProducts) => {
    // this is where you would set the state of the products to the searched results
    console.error('results from the search', arrayOfProducts);
  }

  render() {
    return ( 
        <div className="Auth container">
          <JumbotronDisplay
          thisIsTheUserLoggingIn = {this.thisIsTheUserLoggingIn}
          />
          <div className="row justify-content-center">
            <div className="col-8">
              <SearchBar
              displaySearchedProducts= { this.displaySearchedProducts }/>
            </div>
          </div>     
      </div>
    );
  }
}
export default Auth;
