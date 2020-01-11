import React from 'react';
import {
  Form, Label, Input, Button, ModalBody,FormGroup, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

const defaultUser = {
  id: '',
  userName: '',
  firstName: '',
  lastName: '',
}

class EditUserInfoModal extends React.Component {
  state = {
    updatedUser: defaultUser,
    businessName: ''
  }

  static propTypes = {
    userObj: PropTypes.object.isRequired,
    toggleEditUserInfo: PropTypes.func,
    userEdited: PropTypes.func,
  }

  componentDidMount() {
    const {userObj} = this.props;
    this.setState({ updatedUser: userObj})
    if (userObj.isSeller)
    {
      this.setState({businessName: userObj.businessName})
    }
  };

  toggleModal = (e) => {
    const { toggleEditUserInfo } = this.props;
    toggleEditUserInfo(e);
  };

  formSubmit = (e) => {    
    e.preventDefault();
    const { updatedUser, businessName } = this.state;
    const { userEdited, userObj } = this.props;
    if (userObj.isSeller) {
      updatedUser.businessName = businessName;
    }
  
    userEdited(updatedUser);
    this.toggleModal();
  };

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.updatedUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ updatedUser: tempUser });
  };

  formFieldBusinessState = (e) => {
    let tempBusinessName = this.state.businessName;
    tempBusinessName = e.target.value;
    this.setState({ businessName: tempBusinessName});
  }

  render() {
    const { updatedUser, businessName } = this.state;
    return (
      <div className="EditUserInfoModal container">
      <Form className="row justify-content-center" onSubmit={this.formSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="userName">Username:</Label>
            <Input
              type="input"
              name="userName"
              id="userName"
              value={updatedUser.userName}
              onChange={this.formFieldStringState}
              required />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name:</Label>
            <Input
              type="input"
              name="firstName"
              id="firstName"
              value={updatedUser.firstName}
              onChange={this.formFieldStringState}
              required />
            <Label for="lastName">Last Name:</Label>
            <Input
              type="input"
              name="lastName"
              id="lastName"
              value={updatedUser.lastName}
              onChange={this.formFieldStringState}
              required />
            <Label for="businessName">Business Name:</Label>
            <Input
              type="input"
              name="businessName"
              id="businessName"
              value={businessName}
              onChange={this.formFieldBusinessState}
              required />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Account</Button>{' '}
          <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Form>
    </div>
    )
  }

}

export default EditUserInfoModal;
