import React from 'react';
import './UserProfile.scss';

const defaultAddress = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
}

class UserProfile extends React.Component {
  state = {
    preferredAddress: defaultAddress,
  }
  componentDidMount() {
    // need to call database to get preferred address from userObj and then setstate with it to display
  }
  render() {
    const { preferredAddress } = this.state;
    const { userObj } = this.props;

    return (
      <div className="UserProfile">
        <h1>Hey {userObj.firstName} {userObj.lastName}</h1>
        <p>{preferredAddress.city}, {preferredAddress.state} {preferredAddress.zipCode}</p>
        <button className='btn btn-info'>Change Personal Info</button>
      </div>
    )
  }
}

export default UserProfile;