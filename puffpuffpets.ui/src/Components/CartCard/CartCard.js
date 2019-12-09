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

  updateQuantityOrdered = (e) => {
    e.preventDefault();
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
              <button className="col btn btn-outline-danger mx-auto removeFromCart" onClick={this.deleteMe}><b>Remove <br></br>From Cart</b></button>
            </div>
            <div className="row">
              <p className="col quantityOrderedText">Quantity:</p> 
              <input className="col quantityOrderedInput" type="number" onChange={this.updateQuantityOrdered} defaultValue={cartProduct.quantityOrdered} min="1" max="10"></input>
              <p className="col-9 cartProductDescription"><i>{cartProduct.description}</i></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCard;
