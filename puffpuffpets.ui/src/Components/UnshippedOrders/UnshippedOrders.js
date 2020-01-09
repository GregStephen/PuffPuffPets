import React from 'react';

import OrderHistoryData from '../../Helpers/Data/OrderHistoryData';
import UnshippedOrderCard from '../UnshippedOrderCard/UnshippedOrderCard';

class UnshippedOrders extends React.Component {
  state = {
    unshippedOrders: []
  }

  getMyUnshippedOrders = () => {
    OrderHistoryData.getMyUnshippedOrders(this.props.userObj.id)
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
      />
    ));

    return (
      <div className="UnshippedOrders container">
        <h1>Unshipped Orders</h1>
        <form>
          { this.state.unshippedOrders.length === 0 ? 
           <p>You don't have any orders that need shipping</p>
           : makeUnshippedOrderCards
          }
        </form>
      </div>
    );
  }
}

export default UnshippedOrders;
