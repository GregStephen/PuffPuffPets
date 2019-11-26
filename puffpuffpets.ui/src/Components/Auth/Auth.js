import React from 'react';
import './Auth.scss';

class Auth extends React.Component {
  render() {
    return ( 
        <div className="Auth container">
          <h1>Welcome to PUFF PUFF PETS</h1>
          <h5>this just looks like the regular page but when you click a button to add to your cart</h5>
          <h5>Or really do anything it throws up a modal that asks you to please log in or create an account</h5>
      </div>
    );
  }
}
export default Auth;