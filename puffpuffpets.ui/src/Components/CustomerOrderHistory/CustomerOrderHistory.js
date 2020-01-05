import React from 'react';

import OrderHistoryData from '../../Helpers/Data/OrderHistoryData';
import CustomerOrderHistoryCard from '../CustomerOrderHistoryCard/CustomerOrderHistoryCard';

class CustomerOrderHistory extends React.Component {
  state = {
    soldProducts: []
  }

  getMyOrderHistory = () => {
    OrderHistoryData.getAllCompletedOrdersByCustomerId(this.props.userObj.id)
    .then(soldProducts => this.setState({ soldProducts }))
    .catch(err => console.error(err, 'could not get customer orders'));
  }

  componentDidMount = () => {
    this.getMyOrderHistory();
  }

  render() {
    const makeOrderHistoryCards = this.state.soldProducts.map(soldProduct => (
      <CustomerOrderHistoryCard
      soldProduct={soldProduct}
      key={soldProduct.productId + soldProduct.orderId}
      getMyOrderHistory={this.getMyOrderHistory}
      />
    ));

    return (
      <div className="CustomerOrderHistory container">
        <h1>Order History</h1>
        <form>
        { makeOrderHistoryCards }
        </form>
      </div>
    );
  }
}

export default CustomerOrderHistory;
