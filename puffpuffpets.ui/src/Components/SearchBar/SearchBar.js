import React from 'react';
import { Input, InputGroup, InputGroupAddon, Button, Form } from 'reactstrap';

import ProductRequests from '../../Helpers/Data/ProductRequests';

import './SearchBar.scss';
class SearchBar extends React.Component {
  state = {
    searchTerm : "",
    collapse: false,
    status: 'Closed'
  }

  onEntering = () => {
    this.setState({ status: 'Opening...' });
  }

  onEntered = () => {
    this.setState({ status: 'Opened' });
  }

  onExiting = () => {
    this.setState({ status: 'Closing...' });
  }

  onExited = () => {
    this.setState({ status: 'Closed' });
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  searchOnSubmit = (e) => {
    e.preventDefault();
    this.search(this.state.searchTerm);
  }

  search = (term) => {
    if (term !== '')
    {
      ProductRequests.searchProducts(term)
      .then(result => console.error(result))
      .catch(err => console.error(err));
    }
  }

  formFieldStringState = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.search(e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <Form onSubmit={this.searchOnSubmit}>
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
          <Button className="btn btn-info" onClick={this.toggle}>Filter by Category</Button>
          <Collapse
          isOpen={this.state.collapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
          >
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                Check me out
              </Label>
            </FormGroup>
          </Collapse>
        </Form>
      </div>
    )
  }
}

export default SearchBar;
