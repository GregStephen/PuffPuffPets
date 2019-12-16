import React from 'react';
import { Input, Label } from 'reactstrap';


class CheckoutAddressCard extends React.Component {
  render() {
    const { checkoutAddress } = this.props;
    return (
      <div>
      <Label check className="col-4"> 
        <Input
          type="checkbox"
          name= { checkoutAddress.addressLine1 }
        />
        {checkoutAddress.addressLine1}
    </Label>
    </div>
    );
  }
}

export default CheckoutAddressCard;
