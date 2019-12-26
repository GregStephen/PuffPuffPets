import React from 'react';
import { Input, Label } from 'reactstrap';


class checkoutPaymentTypeCard extends React.Component {

  checkPaymentType = () => {
    const { checkoutPaymentType } = this.props;
    const { paymentTypeSelected } = this.props;

    //paymentTypeSelected is always empty unless the user selects a paymentType
    //checks if a box has been selected - if not, then isPreferred will be selected automatically
    if (checkoutPaymentType.addressLine1 === paymentTypeSelected){
       return true
    } else if (paymentTypeSelected === '' && checkoutPaymentType.isPreferred === true) {
      return true
    } else return false;
  }

  render() {
    const { checkoutPaymentType } = this.props;

    return (
      <div>
      <Label check className="col-4"> 
        <Input
          type="radio"
          name= { checkoutPaymentType.type }
          onChange={ this.props.handlePaymentTypeChange }
          checked={this.checkPaymentType()}
        />
        {checkoutPaymentType.type}
    </Label>
    </div>
    );
  }
}

export default checkoutPaymentTypeCard;
