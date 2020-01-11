import React from 'react';

import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';
import SearchBar from '../SearchBar/SearchBar';
import ProductCard from '../ProductCard/ProductCard';

import ProductRequests from '../../Helpers/Data/ProductRequests';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    totalResults: 0,
    searchTerm: '',
    productsToShow: []
  }

  componentDidMount(){
    ProductRequests.getAllProducts()
      .then((results) => {
        this.setState({ productsToShow: results.products, totalResults: results.totalProducts });
      })
      .catch(err => console.error(err));
  }

  displaySearchedProducts = (searchResults, searchTerm) => {
    this.setState({ totalResults: searchResults.totalProducts, searchTerm: searchTerm, productsToShow: searchResults.products})
  }

  createUser = (newUser, password) => {
    this.props.userCreated(newUser, password);
  }

  render() {
    const { totalResults, searchTerm, productsToShow } = this.state;
    
    const showProducts = productsToShow.map(product => (
      <ProductCard
      key={ product.id }
      product={ product }
      userObj={ this.props.userObj }
      />
  ))

    return ( 
        <div className="Auth container">
          <JumbotronDisplay
          createUser= { this.createUser }/>
          <div className="row">
            <div className="col-lg-4 col-sm-12">
            {searchTerm !== '' ? 
            totalResults === 1 
            ? <p>{totalResults} result for '{searchTerm}'</p>
            : <p>{totalResults} results for '{searchTerm}'</p>
            : <p>{totalResults} results</p>}
            </div>
            <div className="col-lg-8 col-sm-12">
              <SearchBar
              displaySearchedProducts= { this.displaySearchedProducts }/>
            </div>
              {productsToShow.length === 0 ? 
              <div className="row col-12 justify-content-center">
                <div className="no-match off-set-4 col-6">
                <h3>Sorry, no items matched your search</h3>
                <p>Maybe try changing your search term or clear your categories</p>
                </div>
              </div>
              : 
              <div className="row col-12 justify-content-start">
              { showProducts }
              </div>}
          </div>     
      </div>
    );
  }
}
export default Auth;
