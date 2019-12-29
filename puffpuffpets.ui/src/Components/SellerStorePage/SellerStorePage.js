import React from 'react';

import './SellerStorePage.scss';

class SellerStorePage extends React.Component{

  componentDidMount() {
    const { sellerId } = this.props.match.params;
    console.error(this.props.match.params);
    console.error(sellerId, 'seller Id');
  }

  render() {
    return (
      <div className="SellerStorePage">
        <h1>Seller Store Page</h1>
      </div>
    )
  }
}

export default SellerStorePage;
