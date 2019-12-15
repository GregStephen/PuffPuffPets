import React from 'react';

import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';
import SearchBar from '../SearchBar/SearchBar';

import './Auth.scss';
class Auth extends React.Component {

  componentDidMount(){
    // this is where we will set state of the original products to be displayed
  }

  displaySearchedProducts = (arrayOfProducts) => {
    // this is where you would set the state of the products to the searched results
    console.error('results from the search', arrayOfProducts);
  }

  createUser = (newUser, password) => {
    this.props.createThisUser(newUser, password);
  }

  render() {
    return ( 
        <div className="Auth container">
          <JumbotronDisplay
          createUser= { this.createUser }/>
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
