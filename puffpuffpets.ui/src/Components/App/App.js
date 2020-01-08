import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../Auth/Auth';
import Checkout from '../Checkout/Checkout';
import Home from '../Home/Home';
import OrderComplete from '../OrderComplete/OrderComplete';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyCart from '../MyCart/MyCart';
import UserProfile from '../UserProfile/UserProfile';
import SellerProducts from '../SellerProducts/SellerProducts';
import SellerStorePage from '../SellerStorePage/SellerStorePage';
import sellerOrderHistory from '../SellerOrderHistory/SellerOrderHistory';
import customerOrderHistory from '../CustomerOrderHistory/CustomerOrderHistory'

import fbConnect from '../../Helpers/Data/fbConnection';
import UserRequests from '../../Helpers/Data/UserRequests';

import './App.scss';

fbConnect();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === false ? <Component authed={authed}{...props} {...rest}/> : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />);
  return <Route {...rest} render={props => routeChecker(props)} />; 
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // props contains Location, Match, and History
  const routeChecker = props => (authed === true ? <Component authed={authed} {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const defaultUser = {
  id: 0,
  userName: 'unauthorized',
  firstName: '',
  lastName: '',
  isSeller: false,
  businessName: null,
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  firebaseUid: ''
};

class App extends React.Component {
  state = {
    authed: false,
    userObj: defaultUser,
  };

  componentDidMount () {
    // const { userObj } = this.state;
    // if (userObj.id === 0)
    // {
      // firebase.auth().signOut();
    // }
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false, userObj: defaultUser });
      }
    });
  };

  componentWillUnmount () {
    this.removeListener();
  };

  userCreated = (newUser, firebaseInfo) => {
    UserRequests.addUser(newUser, firebaseInfo)
    .then()
    .catch(err => console.error(err))
  }

  userLogIn = () => {
    // gets the user data from PPP database by firebaseUid
      UserRequests.logInUser(firebase.auth().currentUser.uid)
      .then((loggedInUserObj) => {
        this.setState({ userObj: loggedInUserObj });
      }).catch(err => console.error('hey', err));
  };

  userLoggedOut = () => {
    firebase.auth().signOut();
    this.setState({
      userObj: defaultUser
    })
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
  
  render() {
    const { authed, userObj } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavbar authed={ authed } userObj={ userObj } userLoggedOut={ this.userLoggedOut } userCreated={ this.userCreated } userLogIn={ this.userLogIn }/>
            <Switch>
              <PublicRoute path='/auth' component={ Auth } authed={ authed } userObj={ userObj } userCreated={ this.userCreated }/>
              <PrivateRoute path='/home' component={ Home } authed={ authed } userObj={ userObj } userLogIn={ this.userLogIn }/>
              <PrivateRoute path='/user' component={ UserProfile } authed={ authed } userObj={ userObj } editThisUser={ this.editThisUser } deleteThisUser={ this.deleteThisUser }/>
              <PrivateRoute path='/myCart/:userId' component={ MyCart } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/checkout/:userId' component={Checkout} authed={authed} userObj={userObj}/>
              <PrivateRoute path='/orderComplete/:orderId' component={OrderComplete} authed={authed}/>
              <PrivateRoute path='/products/:userId' component={ SellerProducts } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/store/:sellerId' component={ SellerStorePage } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/sellerOrderHistory/:sellerId' component={ sellerOrderHistory } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/customerOrderHistory/:sellerId' component={ customerOrderHistory } authed={ authed } userObj={ userObj }/>
              <Redirect from='*' to='/auth'/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
