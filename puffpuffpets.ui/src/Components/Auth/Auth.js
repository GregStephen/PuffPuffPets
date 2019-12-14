import React from 'react';
import './Auth.scss';
import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';
import SearchBar from '../SearchBar/SearchBar';

class Auth extends React.Component {
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