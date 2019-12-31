import React from 'react';
import { Link } from 'react-router-dom';

import CartData from '../../Helpers/Data/CartData';
import CheckoutData from '../../Helpers/Data/CheckoutData';
import CheckoutAddressCard from '../CheckoutAddressCard/CheckoutAddressCard';
import CheckoutPaymentTypeCard from '../CheckoutPaymentTypeCard/CheckoutPaymentTypeCard';
import moment from 'moment';


class Checkout extends React.Component {
  state = {
    cartProducts: [],
    addresses: [],
    paymentTypes: [],
    totalPrice: [],
    addressSelected: '',
    paymentTypeSelected: '',
    updatedOrder: '',
    newOrder: ''
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

    updateOrder = () => {
      const { cartProducts } = this.state;
      const { totalPrice } = this.state;
      const { paymentTypeSelected } = this.state;
      const tempUpdatedOrder = { ...this.state.updatedOrder };
      const tempNewOrder = { ...this.state.newOrder };
      const orderId = this.state.cartProducts[0].orderId;

      if(cartProducts.length > 0 && totalPrice.length > 0 && paymentTypeSelected !== '' && this.state.addressSelected !== '') {
        const decimalPrice = totalPrice.reduce((a,b) => a + b, 0);
        tempUpdatedOrder.id = cartProducts[0].orderId;
        tempUpdatedOrder.totalPrice = parseInt(decimalPrice) * 100;
        tempUpdatedOrder.paymentTypeId = paymentTypeSelected;
        tempUpdatedOrder.purchaseDate = moment().format();

        tempNewOrder.userId = this.props.userObj.id;
        tempNewOrder.paymentTypeId = this.state.paymentTypes[0].id;
  
        //Creates the updated/existing order
        const updateOrder = this.setState({ updatedOrder: tempUpdatedOrder }, () => {
          CheckoutData.editOrderCompleted(this.state.updatedOrder, this.state.updatedOrder.id);
        });

        //Posts a newOrder (for future use)
        const postNewOrder = this.setState({ newOrder: tempNewOrder }, () => {
          CheckoutData.addNewOrder(this.state.newOrder);
        });

        //Reroutes to "order complete page" after completion of updateOrder and postNewOrder
        Promise.all([updateOrder, postNewOrder])
        .then(() =>this.props.history.push({ pathname: `/orderComplete/${orderId}`, state: {cartProducts: this.state.cartProducts} }))
        .catch((err) => console.error('error in updateOrder Checkout.js', err))
      }
    }

  componentDidMount = () => {
    this.getMyCartProducts();
    this.getMyAddresses();
    this.getMyPaymentTypes();
  }

  handleAddressChange = (e) => {
   if(e.target) this.setState({ addressSelected: e.target.name })
   else this.setState({ addressSelected: e });
  }

  handlePaymentTypeChange = (e) => {
    if(e.target) this.setState({ paymentTypeSelected: e.target.name })
    else this.setState({ paymentTypeSelected: e });
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
      if (this.state.cartProducts.length > 0 && addressSelected !== '' && paymentTypeSelected !== '') {
      return <Link to={{ state: {cartProducts: this.state.cartProducts} }} onClick={this.updateOrder} id="btnPlaceYourOrder" className="btn-lg btn-success">Place your order</Link>
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
