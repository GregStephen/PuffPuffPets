import React from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';

class CatCheckBox extends React.Component{
  static propTypes = {
    category: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    isChecked: false
  };

  onClick = (e) => {
    const { category, onChange } = this.props;
    this.setState({ isChecked: e.target.checked })
    onChange(category.id, e.target.checked);
  }


  render() {
    const { category } = this.props;
    return(
      <Label check className="col-4"> 
        <Input
        type="checkbox"
        name= { category.name }
        onChange= { this.onClick }
        checked= {this.state.isChecked}
        />
        {category.name} ({category.totalResult})
      </Label>
    )
  }
}

export default CatCheckBox;
