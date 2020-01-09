import React from 'react';
import moment from 'moment';

import UserRequests from '../../Helpers/Data/UserRequests';

import './SellerStats.scss';

class SellerStats extends React.Component {
  state = {
    sellerStats: {},
    topProduct: {},
    topMonthProduct: {},
    thisMonth: '',
  }

  componentDidMount() {
    const {userObj} = this.props;
    UserRequests.getSellerStats(userObj.id)
      .then((results) => {
        this.setState({ sellerStats: results, topProduct: results.topProduct, topMonthProduct: results.topMonthProduct })
      })
      .catch(err => console.error(err));
    const month = moment().format('MMMM');
    this.setState({ thisMonth: month })

  }
  render() {
    const { sellerStats, thisMonth, topProduct, topMonthProduct } = this.state;
    const { userObj } = this.props;
    return (
      <div className="SellerStats col-6">
        <h3>Here are your current stats for</h3>
        <h3>{userObj.businessName}</h3>
        {sellerStats.totalSales !== null ?
          <div className="alltime-sales">
            <p>Total sales for all time: {sellerStats.totalSales}</p>
            <p>Top selling product of all time: {topProduct.title} - {sellerStats.topProductAmountSold} units sold</p>
          </div>
         :
         <p>You haven't sold anything yet!</p>
        }
        {sellerStats.monthSales !== null ? 
        <div className="month-sales">
          <p>Total sales for {thisMonth}: {sellerStats.monthSales}</p>
          <p>Top selling product for {thisMonth}: {topMonthProduct.title} - {sellerStats.topMonthProductAmountSold} units sold</p>
        </div>
        :
        <p>You haven't sold anything yet in {thisMonth}</p>
        }
      </div>
    )
  }
}

export default SellerStats;
