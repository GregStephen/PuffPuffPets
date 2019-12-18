import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../SearchBar/SearchBar';

import ProductRequest from '../../Helpers/Data/ProductRequests';
import ProductCard from '../ProductCard/ProductCard';

import './CustomerHome.scss';

class CustomerHome extends React.Component {
  static propTypes = {
    userObj: PropTypes.object.isRequired,
  };
  
  state= {
    products: [],
  }

  getAllProducts =() => {
    ProductRequest.getAllProducts()
    .then(products => this.setState({ products }))
    .catch(err => console.error(err, 'could not get products fam.'))
  }

  componentDidMount(){
    // this is where we will set state of the original products to be displayed
    // const userId = this.props.userObj.id;
    this.getAllProducts();
    
  }

  displaySearchedProducts = (arrayOfProducts) => {
    // this is where you would set the state of the products to the searched results
    console.error('results from the search', arrayOfProducts);
  }

  render () {

    const createProducts = this.state.products.map(product => (
      <ProductCard 
      key={product.id}
      product={product}
      />
  ));

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
              {createProducts}
          </div> 
      </div>
    );
  }
}

export default CustomerHome;