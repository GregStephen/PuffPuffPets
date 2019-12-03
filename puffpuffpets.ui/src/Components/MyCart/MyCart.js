import React from 'react';
import CartData from '../../Helpers/Data/CartData';
import CartCard from '../CartCard/CartCard';


class MyCart extends React.Component {
  state = {
    cartProducts: []
  }

  getMyCartProducts = uid => {
    CartData.getMyCartProducts(uid)
      .then(CartProducts => this.setState({ CartProducts }))
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
    const makeCartProductCardNewest = this.sortDates().map(CartProduct => (
      <CartCard
      key={CartProduct.id}
      CartProduct={CartProduct}
      />
    ));
    return (
      <div className="MyCart container">
        MY CART
        { makeCartProductCardNewest }
      </div>
    );
  }
}

export default MyCart;
