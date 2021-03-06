import React from 'react';
import moment from 'moment';

class CustomerOrderHistoryCard extends React.Component {
  render() {
    const { soldProduct } = this.props;
    return (
      <div className="CustomerOrderHistory col-8">
        <div className="CustomerOrderHistory-card card container">
          <div className="card-body">
          <p><b>Order#:</b> {soldProduct.orderId}</p>
            <div className="row">
              <img className="productImg" src={soldProduct.imgUrl} alt="product"></img>
              <h3 className="col-3 card-title">{soldProduct.title}</h3>
            </div>
            <div className="row">
              <p className="col-4 CustomerOrderHistoryPurchaseDate">Purchase Date:<br></br><i>{moment(soldProduct.purchaseDate).format('lll')}</i></p>
              <div>
                <p className="qtyOrderedTxt">Quantity Ordered: <i>{soldProduct.quantityOrdered}</i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerOrderHistoryCard;
