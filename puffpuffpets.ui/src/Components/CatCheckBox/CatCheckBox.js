import React from 'react';
import { Label, Input } from 'reactstrap';

class CatCheckBox extends React.Component {
  render(){
    return (
      <div className="CatCheckBox">
        <Label>
          <Input type="checkbox"/>
          {this.props.category}
        </Label>
      </div>
    )
  }
}

export default CatCheckBox;
