import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {

  render () {
    return (
      <div className="Home">
          <button className="btn btn-success">Bootstrap Button</button>
          <h1>USER/UNAUTHED HOMEPAGE</h1>
      </div>
    );
  }
}

export default Home;