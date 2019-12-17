import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';

class CatCheckBox extends React.Component{
  static propTypes = {
    category: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool
  };

  render() {
    const { category } = this.props;
    return(
      <Label check className="col-4"> 
        <Input
        type="checkbox"
        id = {category.id}
        name= { category.name }
        onChange= { this.props.onChange }
        checked= {this.props.isChecked}
        />
        {category.name} ({category.totalResult})
      </Label>
    )
  }
}

export default CatCheckBox;
