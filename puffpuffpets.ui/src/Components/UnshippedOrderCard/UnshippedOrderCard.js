import React from 'react';
import moment from 'moment';
import unshippedOrdersData from '../../Helpers/Data/UnshippedOrdersData';


class UnshippedOrderCard extends React.Component {
  state = {
    updatedProduct: {},
    newShippedDate: {}
  }

  updateQuantityInStock = (e) =>{
    e.preventDefault();
    const { unshippedOrder } = this.props;
    const { updatedProduct } = this.state;
    const { newShippedDate } = this.state;

    newShippedDate.shippedDate = moment().format();
    newShippedDate.id = unshippedOrder.productOrderId;

    updatedProduct.title = unshippedOrder.title;
    updatedProduct.imgUrl = unshippedOrder.imgUrl;
    updatedProduct.typeId = unshippedOrder.typeId;
    updatedProduct.quantityInStock = (unshippedOrder.quantityInStock - unshippedOrder.quantityOrdered);
    updatedProduct.description = unshippedOrder.description;
    updatedProduct.price = unshippedOrder.price;
    updatedProduct.categoryId = unshippedOrder.categoryId;

    const updateQtyInStock = unshippedOrdersData.updateQuantityInStock(updatedProduct, unshippedOrder.productId);
    const updateShippingDate = unshippedOrdersData.updateShippedDate(newShippedDate, unshippedOrder.productOrderId);

    Promise.all([updateQtyInStock, updateShippingDate]).then(() => this.props.getMyUnshippedOrders());
  }

  render() {
    const { unshippedOrder } = this.props;
    return (
      <div className="UnshippedOrder col-8">
        <div className="UnshippedOrder-card card container">
          <div className="card-body">
            <div className="row">
              <img className="productImg" src={unshippedOrder.imgUrl} alt="product"></img>
              <h3 className="col-3 card-title">{unshippedOrder.title}</h3>
              <button className="col-2 btn btn-success mx-auto removeFromCart" onClick={this.updateQuantityInStock}><b>Ship Order</b></button>
            </div>
            <div className="row">
              {/* <p className="col-md-auto quantityOrderedText">Quantity:</p>  */}
              {/* <input className="col-md-auto quantityOrderedInput" type="number" onChange={this.updateQuantityOrdered} defaultValue={this.checkQuantityInCart()} min="1" max={cartProduct.quantityInStock}></input> */}
              <p className="col-4 unshippedOrderPurchaseDate">Purchase Date:<br></br><i>{moment(unshippedOrder.purchaseDate).format('lll')}</i></p>
              <div>
                <p className="qtyOrderedTxt">Quantity Ordered: <i>{unshippedOrder.quantityOrdered}</i></p>
                <p className="qtyInStockTxt">Quantity In Stock: <i>{unshippedOrder.quantityInStock}</i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UnshippedOrderCard;
