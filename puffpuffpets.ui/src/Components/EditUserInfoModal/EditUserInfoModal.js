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
  }

  static propTypes = {
    userObj: PropTypes.object.isRequired,
    toggleEditUserInfo: PropTypes.func,
    userEdited: PropTypes.func,
  }

  componentDidMount() {
    this.setState({ updatedUser: this.props.userObj})
  };

  toggleModal = () => {
    const { toggleEditUserInfo } = this.props;
    toggleEditUserInfo();
  };

  formSubmit = (e) => {    
    e.preventDefault();
    const { updatedUser } = this.state;
    const { userEdited } = this.props;
    userEdited(updatedUser);
    console.error('form submitted', updatedUser);
    this.toggleModal();
  };

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.updatedUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ updatedUser: tempUser });
  };

  render() {
    const { updatedUser } = this.state;
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
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Edit Account</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Form>
    </div>
    )
  }

}

export default EditUserInfoModal;
