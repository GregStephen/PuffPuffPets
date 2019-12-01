import React from 'react';
import productOrdersData from '../../Helpers/Data/ProductOrderData';
import ProductOrderCard from '../ProductOrderCard/ProductOrderCard';


class MyProductOrders extends React.Component {
  state = {
    productOrders: []
  }

  getMyProductOrders = uid => {
    productOrdersData.getMyProductOrders(uid)
      .then(productOrders => this.setState({ productOrders }))
      .catch(err => console.error(err, 'could not get user productOrders'));
  }

  componentDidMount() {
    const userId = this.props.userObj.id;
    this.getMyProductOrders(userId);
  }

  sortDates = () => {
    const descendingDates = this.state.productOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    return descendingDates;
  }

  render() {
    const makeProductOrderCardsNewest = this.sortDates().map(productOrder => (
      <ProductOrderCard
      key={productOrder.id}
      productOrder={productOrder}
      />
    ));
    return (
      <div className="MyProductOrders container">
        MY PRODUCT ORDERS
        { makeProductOrderCardsNewest }
      </div>
    );
  }
}

export default MyProductOrders;
