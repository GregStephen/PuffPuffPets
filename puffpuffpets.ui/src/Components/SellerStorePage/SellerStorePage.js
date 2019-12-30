import React from 'react';

import ProductCard from '../ProductCard/ProductCard';

import UserRequests from '../../Helpers/Data/UserRequests';
import ProductRequests from '../../Helpers/Data/ProductRequests';

import './SellerStorePage.scss';
class SellerStorePage extends React.Component{
  state = {
    seller: {},
    sellersProducts: [],
  }
  componentDidMount() {
    const { sellerId } = this.props.match.params;
    UserRequests.getUserById(sellerId)
      .then((sellerReturned) => {
        this.setState({seller: sellerReturned})
        ProductRequests.getProductsByUserId(sellerReturned.id)
          .then((result) => {
            this.setState({ sellersProducts: result });
          }).catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const {seller, sellersProducts} = this.state;
    const showProducts = sellersProducts.map(product => (
      <ProductCard 
      key={product.id}
      product={product}
      userObj={this.props.userObj}
      />
    ))
    return (
      <div className="SellerStorePage container">
        <h1>{seller.businessName} Store Page</h1>
        <div className="row">
          {showProducts}
        </div>
      </div>
    )
  }
}

export default SellerStorePage;
