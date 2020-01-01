import React from 'react';
// import { Link } from 'react-router-dom';

import UnshippedOrdersData from '../../Helpers/Data/UnshippedOrdersData';
import UnshippedOrderCard from '../UnshippedOrderCard/UnshippedOrderCard';

class UnshippedOrders extends React.Component {
  state = {
    unshippedOrders: []
  }

  getMyUnshippedOrders = () => {
    UnshippedOrdersData.getMyUnshippedOrders(this.props.userObj.id)
    .then(unshippedOrders => this.setState({ unshippedOrders }))
    .catch(err => console.error(err, 'could not get unshipped orders'));
  }


  componentDidMount = () => {
    this.getMyUnshippedOrders();
  }

  render() {
    const makeUnshippedOrderCards = this.state.unshippedOrders.map(unshippedOrder => (
      <UnshippedOrderCard
      unshippedOrder={unshippedOrder}
      key={unshippedOrder.productId + unshippedOrder.orderId}
      getMyUnshippedOrders={this.getMyUnshippedOrders}
      // handleAddressChange={this.handleAddressChange}
      />
    ));

    return (
      <div className="UnshippedOrders container">
        <h1>Unshipped Orders</h1>
        <form>
        { makeUnshippedOrderCards }
        </form>
      </div>
    );
  }
}

export default UnshippedOrders;
