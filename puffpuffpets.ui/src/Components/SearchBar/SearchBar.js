import React from 'react';
import { Input, InputGroup, InputGroupAddon, Button, Form, Collapse, FormGroup } from 'reactstrap';

import CatCheckBox from '../CatCheckBox/CatCheckBox';

import ProductRequests from '../../Helpers/Data/ProductRequests';
import CategoryRequests from '../../Helpers/Data/CategoryRequests';

import './SearchBar.scss';

class SearchBar extends React.Component {
  state = {
    searchTerm : "",
    categories: [],
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

  componentDidMount() {
    CategoryRequests.getAllCategories()
      .then((results) => {
        this.setState( {categories: results })
      })
      .catch(err => console.error(err));
  }

  render() {
    const { categories } = this.state;
    const makeCheckboxes = categories.map(category => (
      
      <CatCheckBox
      key={ category.id }
      category={ category.name}
      />
    ));
  
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
              {makeCheckboxes}
            </FormGroup>
          </Collapse>
        </Form>
      </div>
    )
  }
}

export default SearchBar;
