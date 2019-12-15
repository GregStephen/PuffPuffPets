import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, Button, Form, Collapse, FormGroup } from 'reactstrap';

import CatCheckBox from '../CatCheckBox/CatCheckBox';
import ProductRequests from '../../Helpers/Data/ProductRequests';
import CategoryRequests from '../../Helpers/Data/CategoryRequests';

import './SearchBar.scss';

class SearchBar extends React.Component {
  static propTypes = {
    displaySearchedProducts: PropTypes.func.isRequired,
  };

  state = {
    searchTerm : "",
    categories: [],
    collapse: false,
    status: 'Closed',
    checkedCategories: {}
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

  removeFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
    this.resetCheckboxes();
  }

  searchOnSubmit = (e) => {
    e.preventDefault();
    this.search(this.state.searchTerm);
  }

  search = (term) => {
    const {displaySearchedProducts} = this.props;
    const {checkedCategories} = this.state;
    if (term !== '') {
      this.updateCheckboxTally();
      ProductRequests.searchProducts(term, checkedCategories)
      .then(result => displaySearchedProducts(result, term))
      .catch(err => console.error(err));
    }
    // if term does === '' then just do the regular products call and regular checkbox tally
  }

  formFieldStringState = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.search(e.target.value);
  }

  handleChange = (categoryId, isChecked) => {
    const tempCats = { ...this.state.checkedCategories }
    tempCats[categoryId] = isChecked;
    this.setState({
      checkedCategories: tempCats
    })
  }

  updateCheckboxTally = () => {
    CategoryRequests.getAllCategories()
      .then((results) => {
        results.forEach((category) => {
          const categorySearched = {}
          categorySearched[category.id] = true;
          ProductRequests.searchProducts(this.state.searchTerm, categorySearched)
            .then((result) => {
              category.totalResult = result.totalProducts;
            })
        })
        this.setState({ categories: results });
      })
  };

  resetCheckboxes = () => {
    this.setState({categories: []})
    CategoryRequests.getAllCategories()
      .then((results) => {
        results.forEach((category) => {
          ProductRequests.getAllProductsInCategoryById(category.id)
            .then((result) => {
              category.totalResult = result.length;
            })
        }) 
        this.setState({ categories: results });
        let checkboxes = {};
        results.forEach((result => {
          checkboxes[result.id] = false
        })) 
        this.setState({ checkedCategories: checkboxes})
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.resetCheckboxes();
  }

  render() {
    const { categories } = this.state;
    const makeCheckboxes = categories.map(category => (
        <CatCheckBox
        key={ category.id }
        category={ category }
        onChange={ this.handleChange }
        />
    ))
  
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
              <Button type="submit" className="searchBtn btn btn-success">Search</Button>
            </InputGroupAddon>
          </InputGroup>
          {this.state.collapse 
          ? <Button className="btn btn-warning" onClick={this.removeFilter}>Remove Category Filter</Button>
          : <Button className="btn btn-info" onClick={this.toggle}>Filter by Category</Button>}
          <Collapse
          className="no-transition"
          isOpen={this.state.collapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
          >
            <FormGroup check className="row">
                {makeCheckboxes}
            </FormGroup>
          </Collapse>
        </Form>
      </div>
    )
  }
}

export default SearchBar;
