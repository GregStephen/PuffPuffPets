import React from 'react';
import moment from 'moment';

class SellerOrderHistoryCard extends React.Component {
  render() {
    const { soldProduct } = this.props;
    return (
      <div className="sellerOrderHistory col-7">
        <div className="sellerOrderHistory-card card container">
          <div className="card-body">
          <p><b>Order#:</b> {soldProduct.orderId}</p>
            <div className="row">
              <img className="productImg" src={soldProduct.imgUrl} alt="product"></img>
              <h3 className="col-3 card-title">{soldProduct.title}</h3>
            </div>
            <div className="row">
              <p className="col-4 sellerOrderHistoryPurchaseDate"><b>Purchase Date:</b><br></br><i>{moment(soldProduct.purchaseDate).format('lll')}</i></p>
              <div>
                <p className="qtyOrderedTxt"><b>Quantity Ordered:</b> <i>{soldProduct.quantityOrdered}</i></p>
              </div>
              <p className="col-5">
                <b>Customer Name:</b> {soldProduct.firstName} {soldProduct.lastName}<br/>
                <b>User Name:</b> {soldProduct.userName}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SellerOrderHistoryCard;
