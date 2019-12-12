import React from 'react';
import cartData from '../../Helpers/Data/CartData';


import './CartCard.scss'

const defaultQuantityOrdered = {
  quantityOrdered: '',
  id: ''
};

class CartCard extends React.Component {
  state = {
    newQuantityOrdered: defaultQuantityOrdered
  }

  deleteMe = (e) => {
    e.preventDefault();
    const { cartProduct } = this.props;
    cartData.deleteFromCart(cartProduct.productOrderId)
    .then(() => this.props.getMyCartProducts())
    .catch(err => console.error(err, 'unable to delete from CartCard'));
  }

  formFieldStringState = (e) => {
    const tempQuantityOrdered = { ...this.state.newQuantityOrdered };
    tempQuantityOrdered.quantityOrdered = parseInt(e.target.value, 10);
    tempQuantityOrdered.id = this.props.cartProduct.productOrderId;
    this.setState({ newQuantityOrdered: tempQuantityOrdered });
  }

  updateQuantityOrdered = e => this.formFieldStringState(e);

  componentDidUpdate() {
    const { newQuantityOrdered } = this.state;
    cartData.editQuantityInCart(newQuantityOrdered, newQuantityOrdered.id);
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
              <p className="col-4 cartProductDescription"><i>{cartProduct.description}</i></p>
              <p className="col-4 cartProductDescription"><u>Category</u><br></br><i>{cartProduct.name}</i></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCard;
