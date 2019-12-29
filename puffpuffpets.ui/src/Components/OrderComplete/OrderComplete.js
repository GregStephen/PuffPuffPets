import React from 'react';

class OrderComplete extends React.Component {
  render() {
    return (
      <div className="OrderComplete container">
        <h1>Your order is complete!</h1>
        <h3>Order Id: {this.props.location.state.cartProducts[0].orderId}</h3>
      </div>
    );
  }
}

export default OrderComplete;
