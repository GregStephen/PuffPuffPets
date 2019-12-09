import React from 'react';

class SearchBar extends React.Component {
  state = {
    searchTerm = ""
  }

  search = () => {
    console.error(`searched ${this.state.searchTerm}`)
  }

  render() {
    return (
      <div className="SearchBar">
        <InputGroup>
          <InputGroupAddon addonType="append">
            <Button onClick={this.search}>Search</Button>
          </InputGroupAddon>
          <Input 
          type="search"
          name="searchTerm"
          id="searchTerm"/>
        </InputGroup>
      </div>
    )
  }
}