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
    const { category, isChecked, onChange } = this.props;
    return(
      <div className="col-4">
        <Label check> 
          <Input
          type= "checkbox"
          id= { category.id }
          name= { category.name }
          onChange= { onChange }
          checked= { !!isChecked }
          />
          { category.name } ({ category.totalProducts })
        </Label>
      </div>
    )
  }
}

export default CatCheckBox;
