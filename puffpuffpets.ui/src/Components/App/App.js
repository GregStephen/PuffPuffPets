import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import Auth from '../Auth/Auth';
import Home from '../Home/Home';
import MyNavbar from '../MyNavbar/MyNavbar';
import UserProfile from '../UserProfile/UserProfile'
import UserRequests from '../../Helpers/Data/UserRequests';
import './App.scss';
import MyCart from '../MyCart/MyCart';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />);
  return <Route render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
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
  AddressLine2: '',
  City: '',
  State: '',
  ZipCode: ''
};

class App extends React.Component {
  state = {
    authed: false,
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
      userObj : defaultUser })
  }

  editThisUser = (userToEdit) => {
    UserRequests.editUser(userToEdit)
      .then(() => {
        this.refreshUserObj();
      })
      .catch(err => console.error(err));
  }
  
  deleteThisUser = () => {
    const {userObj} = this.state;
    UserRequests.deleteUser(userObj.id)
      .then(() => {
        this.userLoggedOut();
      })
      .catch(err => console.error(err));
  }
  refreshUserObj = () => {
    const {userObj} = this.state;
    UserRequests.getUserById(userObj.id)
      .then((refreshedUserObj) => {
        this.setState({ userObj : refreshedUserObj })
      })
      .catch(err => console.error(err));
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
              <PublicRoute path='/auth' component={ Auth } authed={ authed }/>
              <PrivateRoute path='/home' component={ Home } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/user' component={ UserProfile } authed={ authed } userObj={ userObj } editThisUser={this.editThisUser} deleteThisUser={this.deleteThisUser}/>
              <PrivateRoute path='/myCart/:userId' component={MyCart} authed={authed} userObj={userObj}/>
              <Redirect from='*' to='/auth'/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;