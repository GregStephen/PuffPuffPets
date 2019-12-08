import React from 'react';
import cartData from '../../Helpers/Data/CartData';


import './CartCard.scss'


class CartCard extends React.Component {

  deleteMe = (e) => {
    e.preventDefault();
    const { cartProduct } = this.props;
    cartData.deleteFromCart(cartProduct.productOrderId)
    .then(() => this.props.getMyCartProducts())
    .catch(err => console.error(err, 'unable to delete from CartCard'));
  }

  render() {
    const { cartProduct } = this.props;
    return (
      <div className="Cart col-8">
        <div className="cart-card card container">
          <div className="card-body">
            <div className="row">
              <img className="productImg" src={cartProduct.imgUrl} alt="product"></img>
              <h3 className="col card-title">{cartProduct.title}</h3>
              <h4 className="col card-price">Total: <i>${cartProduct.totalPrice}</i></h4>
              <button className="col btn btn-outline-danger mx-auto" onClick={this.deleteMe}>Delete</button>
            </div>
            <div className="row">
              Quantity: 
              <input type="number" value={cartProduct.quantityOrdered} max="10"></input>
            {/* <NumericInput className="col"/>Quantity: <b>{cartProduct.quantityOrdered}</b> */}
            <p className="col-9"><i>{cartProduct.description}</i></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCard;
