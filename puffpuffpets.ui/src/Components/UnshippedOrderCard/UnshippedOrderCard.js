import React from 'react';
import moment from 'moment';
import unshippedOrdersData from '../../Helpers/Data/UnshippedOrdersData';


class UnshippedOrderCard extends React.Component {
  state = {
    updatedProduct: {}
  }

  updateQuantityInStock = (e) =>{
    e.preventDefault();
    const { unshippedOrder } = this.props;
    const { updatedProduct } = this.state;

      updatedProduct.title = unshippedOrder.title;
      updatedProduct.imgUrl = unshippedOrder.imgUrl;
      updatedProduct.typeId = unshippedOrder.typeId;
      updatedProduct.quantityInStock = (unshippedOrder.quantityInStock - unshippedOrder.quantityOrdered);
      updatedProduct.description = unshippedOrder.description;
      updatedProduct.price = unshippedOrder.price;
      updatedProduct.categoryId = unshippedOrder.categoryId;

    unshippedOrdersData.updateQuantityInStock(updatedProduct, unshippedOrder.productId)
    .then(() => this.props.getMyUnshippedOrders());
  }

  // componentDidUpdate() {
  //   const { newQuantityOrdered } = this.state;
  //   //Without this conditional an invalid put request would occur if no updates were made and the user logged out while on the cart page.
  //   if (newQuantityOrdered.quantityOrdered > 0) {
  //     cartData.editQuantityInCart(newQuantityOrdered, newQuantityOrdered.id);
  //   }
  // }

  // componentDidMount() {
  //   //Deletes product from cart if the seller no longer has any in stock.
  //   if (this.props.cartProduct.quantityInStock === 0) {
  //     this.deleteMe();
  //   }
  // }

  // componentWillUnmount() {
  //   this.setState.mounted = false;
  // }

  render() {
    const { unshippedOrder } = this.props;
    return (
      <div className="UnshippedOrder col-8">
        <div className="UnshippedOrder-card card container">
          <div className="card-body">
            <div className="row">
              <img className="productImg" src={unshippedOrder.imgUrl} alt="product"></img>
              <h3 className="col-3 card-title">{unshippedOrder.title}</h3>
              <button className="col-2 btn btn-success mx-auto" onClick={this.updateQuantityInStock}><b>Ship Order</b></button>
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
