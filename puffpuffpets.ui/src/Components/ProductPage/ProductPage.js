import React from 'react';
import Product from '../../Helpers/Data/ProductRequests';

import './ProductPage.scss';

class ProductPage extends React.Component {
    state ={
        product: { },
    }
    
    componentDidMount() {
        const {productId} = this.props.match.params;
        Product.getProductByProductId(productId)
        .then(result => this.setState({product: result}))
        .catch(err => console.error(err));
    }
    
    render () {
        const {product} = this.state;
        return (
            <div className="ProductPage container">
            <h1>{product.title}</h1>
            <button className="btn btn-primary">Add to Cart</button>
        </div>
    )
};    

};

    export default ProductPage;