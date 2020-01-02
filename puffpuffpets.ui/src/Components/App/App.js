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
import UnshippedOrders from '../UnshippedOrders/UnshippedOrders';

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
    //const { userObj } = this.state;
   // if (userObj.id === 0)
   // {
   //   firebase.auth().signOut();
   // }
    
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        UserRequests.logInUser(user.uid)
          .then((userObj) => {
            this.setState({ userObj, authed: true});
        })
      } else {
        this.setState({ authed: false, userObj: defaultUser });
      }
    });
  };

  componentWillUnmount () {
    this.removeListener();
  };

  userLogIn = () => {
    // gets the user data from PPP database by firebaseUid
    if(this.state.authed) {
      UserRequests.logInUser(firebase.auth().currentUser.uid)
      .then((loggedInUserObj) => {
        console.error('here2')
        this.setState({ userObj: loggedInUserObj });
      })
    }
  };

  userLoggedOut = () => {
    firebase.auth().signOut();
    this.setState({
      userObj: defaultUser
    })
  }
  
  createThisUser = (userToCreate, firebaseInfo) => {
    UserRequests.addUser(userToCreate, firebaseInfo)
      .then(() => {
        this.userLogIn();
      })
      .catch(err => console.error(err))
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
          <MyNavbar authed={ authed } userObj={ userObj } userLoggedOut={ this.userLoggedOut } createThisUser={ this.createThisUser } userLogIn={ this.userLogIn }/>
            <Switch>
              <PublicRoute path='/auth' component={ Auth } authed={ authed } userObj={ userObj } createThisUser={ this.createThisUser }/>
              <PrivateRoute path='/home' component={ Home } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/user' component={ UserProfile } authed={ authed } userObj={ userObj } editThisUser={ this.editThisUser } deleteThisUser={ this.deleteThisUser }/>
              <PrivateRoute path='/myCart/:userId' component={ MyCart } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/checkout/:userId' component={Checkout} authed={authed} userObj={userObj}/>
              <PrivateRoute path='/orderComplete/:orderId' component={OrderComplete} authed={authed}/>
              <PrivateRoute path='/products/:userId' component={ SellerProducts } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/store/:sellerId' component={ SellerStorePage } authed={ authed } userObj={ userObj }/>
              <PrivateRoute path='/unshippedOrders/:sellerId' component={ UnshippedOrders } authed={ authed } userObj={ userObj }/>
              <Redirect from='*' to='/auth'/>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
