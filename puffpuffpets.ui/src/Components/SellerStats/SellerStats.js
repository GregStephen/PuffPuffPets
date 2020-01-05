import React from 'react';

class SellerStats extends React.Component {
  state = {
    sellerStats: [],
    thisMonth: 'January',
  }

  componentDidMount() {
    const {userObj} = this.props;
    // get the month to display
    // get the stats to display

  }
  render() {
    const {sellerStats, thisMonth } = this.state;
    return (
      <div className="SellerStats">
        <h1>Here are your current stats</h1>
        <p>Total sales for all time:</p>
        <p>Total sales for {thisMonth}:</p>
        <p>Top selling product: </p>
      </div>
    )
  }
}

export default SellerStats;
