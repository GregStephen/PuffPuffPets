import React from 'react';
import './Auth.scss';
import JumbotronDisplay from '../JumbotronDisplay/JumbotronDisplay';

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
      </div>
    );
  }
}
export default Auth;