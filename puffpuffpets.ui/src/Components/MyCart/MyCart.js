import React from 'react';
import CartData from '../../Helpers/Data/CartData';
import CartCard from '../CartCard/CartCard';


class MyCart extends React.Component {
  state = {
    cartProducts: []
  }

  getMyCartProducts = uid => {
    CartData.getMyCartProducts(uid)
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
    const makeCartCardsNewest = this.sortDates().map(cartProduct => (
      <CartCard
      key={cartProduct.id}
      cartProduct={cartProduct}
      />
    ));
    return (
      <div className="MyCart container">
        <h1>CART</h1>
        { makeCartCardsNewest }
      </div>
    );
  }
}

export default MyCart;