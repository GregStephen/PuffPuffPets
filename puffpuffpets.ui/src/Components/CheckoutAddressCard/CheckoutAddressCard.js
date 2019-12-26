import React from 'react';
import { Input, Label } from 'reactstrap';


class CheckoutAddressCard extends React.Component {

  checkAddress = () => {
    const { checkoutAddress } = this.props;
    const { addressSelected } = this.props;

    //addressSelected is always empty unless the user selects an address
    //checks if a box has been selected - if not, then isPreferred will be selected automatically
    if (checkoutAddress.addressLine1 === addressSelected){
       return true
    } else if (addressSelected === '' && checkoutAddress.isPreferred === true) {
      return true
    } else return false;
  }

  render() {
    const { checkoutAddress } = this.props;

    return (
      <div>
      <Label check className="col-4"> 
        <Input
          type="radio"
          name = { checkoutAddress.addressLine1 }
          onChange={this.props.handleAddressChange}
          checked={this.checkAddress()}
        />
        {checkoutAddress.addressLine1}
    </Label>
    </div>
    );
  }
}

export default CheckoutAddressCard;
