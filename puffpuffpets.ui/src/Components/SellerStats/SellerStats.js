import React from 'react';
import UserRequests from '../../Helpers/Data/UserRequests';
import moment from 'moment';

class SellerStats extends React.Component {
  state = {
    sellerStats: {},
    topProduct: {},
    thisMonth: 'feb',
  }

  componentDidMount() {
    const {userObj} = this.props;
    UserRequests.getSellerStats(userObj.id)
      .then((results) => {
        this.setState({ sellerStats: results, topProduct: results.topProduct })
        console.error(results);
      })
      .catch(err => console.error(err));
    const month = moment().format('MMMM');
    this.setState({ thisMonth: month })

  }
  render() {
    const { sellerStats, thisMonth, topProduct } = this.state;
    return (
      <div className="SellerStats">
        <h1>Here are your current stats</h1>
        <p>Total sales for all time: { sellerStats.totalSales}</p>
        <p>Total sales for {thisMonth}: {sellerStats.monthSales}</p>
        <p>Top selling product: {topProduct.title} </p>
        <p>{sellerStats.topProductAmountSold} units sold!</p>
      </div>
    )
  }
}

export default SellerStats;
