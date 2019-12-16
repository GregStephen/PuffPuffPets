import React from 'react';

import CheckoutData from '../../Helpers/Data/CheckoutData';
import CheckoutAddressCard from '../CheckoutAddressCard/CheckoutAddressCard';
import CheckoutPaymentTypeCard from '../CheckoutPaymentTypeCard/CheckoutPaymentTypeCard';


class Checkout extends React.Component {
  state = {
    addresses: [],
    paymentTypes: [],
    totalPrice: []
  }

  getMyAddresses = () => {
    CheckoutData.getMyAddresses(this.props.userObj.id)
    .then(addresses => this.setState({ addresses }))
    .catch(err => console.error(err, 'could not get addresses'));
  }

  getMyPaymentTypes = () => {
    CheckoutData.getMyPaymentTypes(this.props.userObj.id)
    .then(paymentTypes => this.setState({ paymentTypes }))
    .catch(err => console.error(err, 'could not get payment types'));
  }

  calculateTotalPrice = () => {
    const totalPriceArray = [];
    this.props.location.state.cartProducts.forEach(cartProduct => (
      totalPriceArray.push((cartProduct.price * cartProduct.quantityOrdered) / 100)
     ))
     
      this.setState({ totalPrice: totalPriceArray })
    }

  componentDidMount= () => {
    this.getMyAddresses();
    this.getMyPaymentTypes();
    this.calculateTotalPrice();
  }

  render() {
    const { totalPrice } = this.state;
    const makeAddressCards = this.state.addresses.map(checkoutAddress => (
      <CheckoutAddressCard
      key={checkoutAddress.id}
      checkoutAddress={checkoutAddress}
      getMyAddresses={this.getMyAddresses}
      />
    ));

    const makePaymentTypeCards = this.state.paymentTypes.map(checkoutPaymentType => (
      <CheckoutPaymentTypeCard
      key={checkoutPaymentType.id}
      checkoutPaymentType={checkoutPaymentType}
      getMyPaymentTypes={this.checkoutPaymentType}
      />
    ));

    return (
      <div className="Checkout container">
        <h1>CHECKOUT</h1>
        <h3>Shipping Address</h3>
        { makeAddressCards }
        <h3>Payment Method</h3>
        { makePaymentTypeCards }
        Total: ${ totalPrice.reduce((a,b) => a + b, 0).toFixed(2) }
      </div>
    );
  }
}

export default Checkout;
