import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import Auth from '../Auth/Auth';
import Home from '../Home/Home';
import MyNavbar from '../MyNavbar/MyNavbar';
import UserRequests from '../../Helpers/Data/UserRequests';
import SellerHome from '../SellerHome/SellerHome';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/sellerhome', state: { from: props.location } }} />);
  return <Route render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />);
  return <Route render={props => routeChecker(props)} />;
};

const defaultUser = {
  UserName: '',
  FirstName: '',
  LastName: '',
  IsSeller: false,
  Password: '',
  Email: '',
  BusinessName: null,
  AddressLine1: '',
  AddresLine2: '',
  City: '',
  State: '',
  ZipCode: ''
};

class App extends React.Component {
  state = {
    authed: true,
    userObj: defaultUser,
  };

  userLoggedIn = (user) => {
    this.setState({
      authed : true,
      userObj : user})
  }

  userLoggedOut = () => {
    this.setState({
      authed : false,
      userObj : defaultUser})
  }

  refreshUserObj = () => {
    const {userObj} = this.state;
    UserRequests.getUserById(userObj.id)
      .then((refreshedUserObj) => {
        this.setState({ userObj : refreshedUserObj })
      })
      .catch()
  }
  componentDidMount() {
  }
  
  render() {
    const { authed, userObj } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavbar authed={ authed } userObj={ userObj } userLoggedOut={ this.userLoggedOut } userLoggedIn={ this.userLoggedIn}/>
            <Switch>
              <PublicRoute path='/auth' component={ Auth } authed={ authed } userLoggedIn={ this.userLoggedIn }/>
              <PublicRoute path='/home' component={ Home } authed={ authed } userLoggedIn = { this.userLoggedIn }/>
              <PrivateRoute path='/sellerhome' component={ SellerHome } authed={ authed } userObj={ userObj }/>
              <Redirect from='*' to='/home'/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;