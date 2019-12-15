import React from 'react';
import cartData from '../../Helpers/Data/CartData';


import './CartCard.scss'

const defaultQuantityOrdered = {
  quantityOrdered: '',
  id: ''
};

class CartCard extends React.Component {
  state = {
    newQuantityOrdered: defaultQuantityOrdered,
    price: ((this.props.cartProduct.price * this.props.cartProduct.quantityOrdered) / 100).toFixed(2)
  }

  deleteMe = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { cartProduct } = this.props;
    cartData.deleteFromCart(cartProduct.productOrderId)
    .then(() => this.props.getMyCartProducts())
    .catch(err => console.error(err, 'unable to delete from CartCard'));
  }

  //Passes productOrderId and new quantityOrdered to state.
  //Update is sent to the backend using componentDidUpdate.
  //Update to total price on frontend only. 
  //Total price update is done in the final checkout stage to avoid additional api call here.
  formFieldStringState = (e) => {
    const tempQuantityOrdered = { ...this.state.newQuantityOrdered };
    const { cartProduct } = this.props;

    tempQuantityOrdered.quantityOrdered = parseInt(e.target.value, 10);
    tempQuantityOrdered.id = this.props.cartProduct.productOrderId;
    this.setState({ 
    newQuantityOrdered: tempQuantityOrdered,
    price: ((cartProduct.price * tempQuantityOrdered.quantityOrdered) / 100).toFixed(2)
    });
  }

  updateQuantityOrdered = e => this.formFieldStringState(e);

  //Sets default value of quantityOrdered-input as user's last updated amount; sets value as 1 if user has not updated.
  checkQuantityInCart = () => {
    const { quantityOrdered } = this.props.cartProduct;
    return (quantityOrdered > 1 ? quantityOrdered : 1);
  }

  componentDidUpdate() {
    const { newQuantityOrdered } = this.state;
    //Without this conditional an invalid put request would occur if no updates were made and the user logged out while on the cart page.
    if (newQuantityOrdered.quantityOrdered > 0) {
      cartData.editQuantityInCart(newQuantityOrdered, newQuantityOrdered.id);
    }
  }

  componentDidMount() {
    //Deletes product from cart if the seller no longer has any in stock.
    if (this.props.cartProduct.quantityInStock === 0) {
      this.deleteMe();
    }
  }

  render() {
    const { cartProduct } = this.props;
    return (
      <div className="Cart col">
        <div className="cart-card card container">
          <div className="card-body">
            <div className="row">
              <img className="productImg" src={cartProduct.imgUrl} alt="product"></img>
              <h3 className="col card-title">{cartProduct.title}</h3>
              <h4 className="col card-price">Total: <i>${this.state.price}</i></h4>
              <button className="col btn btn-outline-danger mx-auto removeFromCart" onClick={this.deleteMe}><b>Remove <br></br>From Cart</b></button>
            </div>
            <div className="row">
              <p className="col-1 quantityOrderedText">Quantity:</p> 
              <input className="col-1 quantityOrderedInput" type="number" onChange={this.updateQuantityOrdered} defaultValue={this.checkQuantityInCart()} min="0" max={cartProduct.quantityInStock}></input>
              <p className="col-4 cartProductDescription"><i>{cartProduct.description}</i></p>
              <p className="col cartProductCategory"><u>Category</u><br></br><i>{cartProduct.name}</i></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCard;
