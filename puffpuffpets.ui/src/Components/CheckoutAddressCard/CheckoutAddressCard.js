import React from 'react';
// import cartData from '../../Helpers/Data/CartData';


class CheckoutAddressCard extends React.Component {
  // componentDidMount() {
  //   //Deletes product from cart if the seller no longer has any in stock.
  //   if (this.props.cartProduct.quantityInStock === 0) {
  //     this.deleteMe();
  //   }
  // }

  render() {
    const { checkoutAddress } = this.props;
    return (
      <div className="Cart col-10">
        <div className="cart-card card container">
          <div className="card-body">
            <div className="row">
              <h3 className="col-3 card-title">{checkoutAddress.addressLine1}</h3>
              {/* <h4 className="col-2 card-price">Total: <i>${this.state.price}</i></h4>
              <button className="col-2 btn btn-outline-danger mx-auto removeFromCart" onClick={this.deleteMe}><b>Remove <br></br>From Cart</b></button> */}
            </div>
            {/* <div className="row">
              <p className="col-md-auto quantityOrderedText">Quantity:</p> 
              <input className="col-md-auto quantityOrderedInput" type="number" onChange={this.updateQuantityOrdered} defaultValue={this.checkQuantityInCart()} min="0" max={cartProduct.quantityInStock}></input>
              <p className="col-4 cartProductDescription"><i>{cartProduct.description}</i></p>
              <p className="col cartProductCategory"><u>Category</u><br></br><i>{cartProduct.name}</i></p>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutAddressCard;
