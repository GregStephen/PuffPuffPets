import React from 'react';
import { Link } from 'react-router-dom';


class ProductOrderCard extends React.Component {
  render() {
    const { productOrder } = this.props;
    const editLink = `/edit/${productOrder.id}`;
    return (
      <div className="ProductOrder col-3">
        <div className="productOrder-card card">
          <div className="card-body">
            <h5 className="card-title">{productOrder.shippedDate}</h5>
            <Link className="btn btn-warning" to={editLink}>Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductOrderCard;
