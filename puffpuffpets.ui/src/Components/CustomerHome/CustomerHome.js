import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';

import ProductRequests from '../../Helpers/Data/ProductRequests';
import ProductCard from '../ProductCard/ProductCard';

import './CustomerHome.scss';

class CustomerHome extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
  };
  
  state= {
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
    // this is where you would set the state of the products to the searched results
  }

  render () {
    const {productsToShow, totalResults, searchTerm } = this.state;
    const showProducts = productsToShow.map(product => (
      <ProductCard
      key={ product.id }
      product={ product }
      userObj={ this.props.userObj }
      />
  ))

    const {userObj} = this.props;
    return (
      <div className="CustomerHome container">
          <h1>Welcome {userObj.firstName}</h1>
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
              displaySearchedProducts= { this.displaySearchedProducts}/>
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

export default CustomerHome;