import React from 'react';
import {Input} from 'reactstrap';

class CatCheckBox extends React.Component{
  state = {
    isChecked: false
  }
  
  onClick = (e) => {
    const {category, onChange } = this.props;
    this.setState({ isChecked: e.target.checked })
    onChange( category, e.target.checked );
  }

  render() {
    const { category } = this.props;
    return(
      <Input
      type="checkbox"
      name= { category }
      onChange= { this.onClick }
      checked= {this.state.isChecked}
      />
    )
  }
}

export default CatCheckBox;
