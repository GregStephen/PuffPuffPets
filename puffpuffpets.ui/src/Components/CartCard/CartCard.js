import React from 'react';
import { Link } from 'react-router-dom';


class CartCard extends React.Component {
  render() {
    const { cartProduct } = this.props;
    const editLink = `/edit/${cartProduct.id}`;
    return (
      <div className="Cart col-3">
        <div className="cart-card card">
          <div className="card-body">
            <h3 className="card-title">{cartProduct.productId}</h3>
            <h5>{cartProduct.userId}</h5>
            <img src={cartProduct.imgUrl} alt="product"></img>
            <Link className="btn btn-warning" to={editLink}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CartCard;
