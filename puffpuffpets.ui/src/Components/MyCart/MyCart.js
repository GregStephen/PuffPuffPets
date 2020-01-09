import React from 'react';
import { Link } from 'react-router-dom';
import CartData from '../../Helpers/Data/CartData';
import CartCard from '../CartCard/CartCard';

import './MyCart.scss';

class MyCart extends React.Component {
  state = {
    cartProducts: []
  }

  getMyCartProducts = () => {
    CartData.getMyCartProducts(this.props.userObj.id)
      .then(cartProducts => this.setState({ cartProducts }))
      .catch(err => console.error(err, 'could not get user cart products'));
  }

  componentDidMount() {
    const userId = this.props.userObj.id;
    this.getMyCartProducts(userId);
  }

  sortDates = () => {
    const descendingDates = this.state.cartProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  render() {
    const uid = `${this.props.userObj.id}`
    const makeCartCardsNewest = this.sortDates().map(cartProduct => (
      <CartCard
      key={cartProduct.productOrderId}
      cartProduct={cartProduct}
      getMyCartProducts={this.getMyCartProducts}
      />
    ));

    const proceedToCheckout = 
    this.state.cartProducts.length > 0 ?
    <Link to={{ pathname: `/checkout/${uid}`, state: {cartProducts: this.state.cartProducts} }} id="btnProceedToCheckout" className="btn-lg btn-success">Proceed to Checkout</Link>
    : null;

    return (
      <div className="MyCart container">
        <h1>CART</h1>
        { this.state.cartProducts.length === 0 ? 
        <div>
          <h5>Hey your cart is empty! Your pets are in need!</h5>
          <h5>Please look at our products <Link to={'/home'}>here</Link></h5>
        </div>
      : makeCartCardsNewest
      }
        { proceedToCheckout }
        </div>
    );
  }
}

export default MyCart;
