import React from 'react';
import { Input, InputGroup, InputGroupAddon, Button, Form } from 'reactstrap';

import ProductRequests from '../../Helpers/Data/ProductRequests';

import './SearchBar.scss';
class SearchBar extends React.Component {
  state = {
    searchTerm : ""
  }

  search = (e) => {
    e.preventDefault();
    ProductRequests.searchProducts(this.state.searchTerm)
      .then(result => console.error(result))
      .catch(err => console.error(err));
    console.error(`searched ${this.state.searchTerm}`)
  }

  formFieldStringState = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    return (
      <div className="SearchBar">
        <Form onSubmit={this.search}>
          <InputGroup>
            <Input 
            type="search"
            name="searchTerm"
            id="searchTerm"
            value={this.state.searchTerm}
            onChange={this.formFieldStringState}/>
            <InputGroupAddon addonType="append">
              <Button type="submit" className="searchBtn">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </div>
    )
  }
}

export default SearchBar;
