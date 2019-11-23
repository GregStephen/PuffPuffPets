import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {

  render () {
    const testText = this.props.testText;
    return (
      <div className="Home">
          <h3 className="testTarget">{testText}</h3>
          <button className="btn btn-success">Bootstrap Button</button>
          <h1>USER/UNAUTHED HOMEPAGE</h1>
      </div>
    );
  }
}

export default Home;