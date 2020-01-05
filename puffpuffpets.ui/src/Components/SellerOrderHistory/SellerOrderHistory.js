import React from 'react';

import OrderHistoryData from '../../Helpers/Data/OrderHistoryData';
import SellerOrderHistoryCard from '../SellerOrderHistoryCard/SellerOrderHistoryCard';

class SellerOrderHistory extends React.Component {
  state = {
    soldProducts: []
  }

  getMyOrderHistory = () => {
    OrderHistoryData.getAllShippedOrdersBySellerId(this.props.userObj.id)
    .then(soldProducts => this.setState({ soldProducts }))
    .catch(err => console.error(err, 'could not get products sold'));
  }


  componentDidMount = () => {
    this.getMyOrderHistory();
  }

  render() {
    const makeOrderHistoryCards = this.state.soldProducts.map(soldProduct => (
      <SellerOrderHistoryCard
      soldProduct={soldProduct}
      key={soldProduct.productId + soldProduct.orderId}
      getMyOrderHistory={this.getMyOrderHistory}
      />
    ));

    return (
      <div className="SellerOrderHistory container">
        <h1>Order History</h1>
        <form>
        { makeOrderHistoryCards }
        </form>
      </div>
    );
  }
}

export default SellerOrderHistory;
