import React from 'react';
import { Input, Label } from 'reactstrap';


class checkoutPaymentTypeCard extends React.Component {
  render() {
    const { checkoutPaymentType } = this.props;
    return (
      <div>
      <Label check className="col-4"> 
        <Input
          type="checkbox"
          name= { checkoutPaymentType.type }
        />
        {checkoutPaymentType.type}
    </Label>
    </div>
    );
  }
}

export default checkoutPaymentTypeCard;
