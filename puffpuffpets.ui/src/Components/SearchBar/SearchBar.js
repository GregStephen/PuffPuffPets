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
    console.error('term', term)
    const {displaySearchedProducts} = this.props;
    const {checkedCategories} = this.state;
      // takes the searched term and the object of category checkboxes (checked AND unchecked)
      ProductRequests.searchProducts(term, checkedCategories)
      .then((result) => {
        this.updateCheckboxTally(term);
        displaySearchedProducts(result, term)
      })
      .catch(err => console.error(err));  
if (term === '') {
      // if the search bar is empty when searched, mainly for deleted to nothing
      // then the category checkboxes will show the amount of all products
      // should also do the regular product call here
      CategoryRequests.getAllCategories()
      .then((results) => {
        results.forEach((category) => {
          ProductRequests.getAllProductsInCategoryById(category.id)
            .then((result) => {
              category.totalResult = result.length;
            })
        }) 
        this.setState({ categories: results });
      })
    }
  }

  // When the user types on the search bar it changes state and searches
  formFieldStringState = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.search(e.target.value);
  }

  // this is for the checkboxes
  handleChange = (categoryId, isChecked) => {
    const tempCats = { ...this.state.checkedCategories }
    tempCats[categoryId] = isChecked;
    this.setState({
      checkedCategories: tempCats
    })
  }

  // THEORETICALLY this should update the checkboxes number of products in each category
  // dependant on the search term
  updateCheckboxTally = (term) => {
    CategoryRequests.getAllCategories()
      .then((results) => {
        console.error('results of get all categories', results)
        results.forEach((category) => {
          const categorySearched = {}
          categorySearched[category.id] = true;
          console.error(categorySearched, 'categorySearched')
          ProductRequests.searchProducts(term, categorySearched)
            .then((result) => {
              category.totalResult = result.totalProducts;
              console.error(result, 'result from searchProducts')
            })
        })
        console.error(results, 'final results after for each loop')
        this.setState({ categories: results });
      })
  };

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
            category.totalResult = result.totalProducts;
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
