import React from 'react';
import { Link } from 'react-router-dom';

import CartData from '../../Helpers/Data/CartData';
import CheckoutData from '../../Helpers/Data/CheckoutData';
import CheckoutAddressCard from '../CheckoutAddressCard/CheckoutAddressCard';
import CheckoutPaymentTypeCard from '../CheckoutPaymentTypeCard/CheckoutPaymentTypeCard';


class Checkout extends React.Component {
  state = {
    cartProducts: [],
    addresses: [],
    paymentTypes: [],
    totalPrice: [],
    addressSelected: '',
    paymentTypeSelected: ''
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
    this.state.cartProducts.forEach(cartProduct => (
      totalPriceArray.push((cartProduct.price * cartProduct.quantityOrdered) / 100)
     ))
     
      this.setState({ totalPrice: totalPriceArray })
    }

    getMyCartProducts = () => {
      CartData.getMyCartProducts(this.props.userObj.id)
        .then(cartProducts => this.setState({ cartProducts }))
        .then(() => this.calculateTotalPrice())
        .catch(err => console.error(err, 'could not get user cart products'));
    }  

  componentDidMount = () => {
    this.getMyCartProducts();
    this.getMyAddresses();
    this.getMyPaymentTypes();
  }

  console = () => console.error('123');

  handleAddressChange = (e) => {
    this.setState({ addressSelected: e.target.name });
  }

  handlePaymentTypeChange = (e) => {
    this.setState({ paymentTypeSelected: e.target.name });
  }

  render() {
    const { totalPrice } = this.state;
    const { addressSelected } = this.state;
    const { paymentTypeSelected } = this.state;

    const makeAddressCards = this.state.addresses.map(checkoutAddress => (
      <CheckoutAddressCard
      key={checkoutAddress.id}
      checkoutAddress={checkoutAddress}
      getMyAddresses={this.getMyAddresses}
      addressSelected={addressSelected}
      handleAddressChange={this.handleAddressChange}
      />
    ));

    const makePaymentTypeCards = this.state.paymentTypes.map(checkoutPaymentType => (
      <CheckoutPaymentTypeCard
      key={checkoutPaymentType.id}
      checkoutPaymentType={checkoutPaymentType}
      getMyPaymentTypes={this.checkoutPaymentType}
      paymentTypeSelected={paymentTypeSelected}
      handlePaymentTypeChange={this.handlePaymentTypeChange}
      />
    ));

    const makePlaceYourOrderButton = () => {
      if (this.state.cartProducts.length > 0) {
      const orderId = this.state.cartProducts[0].orderId;
      return <Link to={{ pathname: `/orderComplete/${orderId}`, state: {cartProducts: this.state.cartProducts} }} onClick={this.console} id="btnPlaceYourOrder" className="btn-lg btn-success">Place your order</Link>
      }
    }

    return (
      <div className="Checkout container">
        <h1>CHECKOUT</h1>
        <h3>Shipping Address</h3>
        <form>
        { makeAddressCards }
        <h3>Payment Method</h3>
        { makePaymentTypeCards }
        <div>Total: ${ totalPrice.reduce((a,b) => a + b, 0).toFixed(2) }</div><br></br>
        <div>{ makePlaceYourOrderButton() }</div>
        </form>
      </div>
    );
  }
}

export default Checkout;
