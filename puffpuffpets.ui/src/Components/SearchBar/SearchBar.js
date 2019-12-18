import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, Button, Form, Collapse, FormGroup } from 'reactstrap';

import CatCheckBox from '../CatCheckBox/CatCheckBox';
import ProductRequests from '../../Helpers/Data/ProductRequests';
import CategoryRequests from '../../Helpers/Data/CategoryRequests';

import './SearchBar.scss';

const defaultCategories = [
  {
    id: '',
    name: '',
    totalProducts: 0
  }
];

const defaultCheckedCategories = {
 id: false
}

class SearchBar extends React.Component {
  static propTypes = {
    displaySearchedProducts: PropTypes.func.isRequired,
  };

  state = {
    searchTerm : "",
    categories: defaultCategories,
    collapse: false,
    status: 'Closed',
    checkedCategories: defaultCheckedCategories
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

  // when you close the category filters it clears out the checkboxes that have been clicked
  removeFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
    this.resetCheckboxes();
  }

  // this searches the database when the user clicks on the search button
  searchOnSubmit = (e) => {
    e.preventDefault();
    this.search(this.state.searchTerm);
  }

  // this is the actual search function
  search = (term) => {
    const {displaySearchedProducts} = this.props;
    const {checkedCategories} = this.state;
      // takes the searched term and the object of category checkboxes (checked AND unchecked)
      ProductRequests.searchProducts(term, checkedCategories)
      .then((result) => {
        displaySearchedProducts(result, term)
        this.setState({ categories : result.totalForEachCategory })
      })
      .catch(err => console.error(err));  
  }

  // When the user types on the search bar it changes state and searches
  formFieldStringState = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.search(e.target.value);
  }

  // this is for the checkboxes
  handleChange = (e) => {
    const tempCats = { ...this.state.checkedCategories }
    tempCats[e.target.id] = e.target.checked;
    this.setState({
      checkedCategories: tempCats
    })
  }


  // this should reset the checkboxes when the button is clicked so they are no longer checked
  resetCheckboxes = () => {
    this.setState({categories: []})
    CategoryRequests.getAllCategories()
    .then((results) => {
      results.forEach((category) => {
        const categorySearched = {}
        categorySearched[category.id] = true;
        ProductRequests.searchProducts(this.state.searchTerm, categorySearched)
          .then((result) => {
            category.totalProducts = result.totalProducts;
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
    // sets the initial state of the checkboxes, gets all products available for each category
    // and sets each checkbox to a false value
    CategoryRequests.getAllCategories()
      .then((results) => {
        results.forEach((category) => {
          ProductRequests.getAllProductsInCategoryById(category.id)
            .then((result) => {
              category.totalProducts = result.length;
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

  render() {
    const { categories } = this.state;
    const makeCheckboxes = categories.map(category => (
        <CatCheckBox
        key={ category.id }
        category={ category }
        onChange={ this.handleChange }
        isChecked={ this.state.checkedCategories[category.id] }
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
