import React from 'react';

import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';
import SearchBar from '../SearchBar/SearchBar';


import './Auth.scss';
class Auth extends React.Component {
  state = {
    totalResults: 0,
    searchTerm: ''
  }

  componentDidMount(){
    // this is where we will set state of the original products to be displayed
    
  }

  displaySearchedProducts = (searchResults, searchTerm) => {
    this.setState({ totalResults: searchResults.totalProducts, searchTerm: searchTerm })
    // this is where you would set the state of the products to the searched results
    console.error('results from the search', searchResults);
  }

  createUser = (newUser, password) => {
    this.props.createThisUser(newUser, password);
  }

  render() {
    const { totalResults, searchTerm } = this.state;
    return ( 
        <div className="Auth container">
          <JumbotronDisplay
          createUser= { this.createUser }/>
          
          <div className="row justify-content-center">
            {searchTerm !== '' ? 
            totalResults === 1 
            ? <p>{totalResults} result for '{searchTerm}'</p>
            : <p>{totalResults} results for '{searchTerm}'</p>
            : <p>{totalResults} results</p>}
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
