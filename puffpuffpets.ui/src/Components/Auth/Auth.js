import React from 'react';
import './Auth.scss';
import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';
import SearchBar from '../SearchBar/SearchBar';

class Auth extends React.Component {
  thisIsTheUserLoggingIn = (user) => {
    const {userLoggedIn} = this.props;
    userLoggedIn(user);
  }
  render() {
    return ( 
        <div className="Auth container">
          <JumbotronDisplay
          thisIsTheUserLoggingIn = {this.thisIsTheUserLoggingIn}
          />
          <div className="row justify-content-center">
            <div className="col-8">
            <SearchBar
          />
            </div>
          
          </div>
          
      </div>
    );
  }
}
export default Auth;