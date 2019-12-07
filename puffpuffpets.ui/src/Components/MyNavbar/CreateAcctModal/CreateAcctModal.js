import React from 'react';
import {
  Form, Label, Input, Button, ModalBody,FormGroup, ModalFooter, Row, Col, CustomInput, Collapse,
} from 'reactstrap';

const defaultUser = {
  UserName: '',
  FirstName: '',
  LastName: '',
  IsSeller: false,
  Email: '',
  BusinessName: '',
  AddressLine1: '',
  AddressLine2: '',
  City: '',
  State: '',
  ZipCode: '',
  DateCreated: '',
  FirebaseUid: ''
};

class CreateAcctModal extends React.Component {
  state = {
    newUser: defaultUser,
    password: '',
    collapse: false,
    status: 'Closed',
  }

  onEntering = () => {
    this.setState({ status: 'Opening...' });
  }

  onEntered = () => {
    this.setState({ status: 'Opened' });
  }

  onExiting = () => {
    this.setState({ status: 'Closing...' });
  }

  onExited = () => {
    this.setState({ status: 'Closed' });
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  toggleModal = () => {
    const { toggleCreateAccount } = this.props;
    toggleCreateAccount();
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { newUser, password } = this.state;
    newUser.DateCreated = new Date();
    this.props.createNewUser(newUser, password);
    this.toggleModal();
  }

  formFieldStringState = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.id] = e.target.value;
    this.setState({ newUser: tempUser });
  }

  changePasswordField = (e) => {
    let tempPassword = this.state.password;
    tempPassword = e.target.value;
    this.setState({ password: tempPassword});
  }

  formFieldSwitchState = (e) => {
    const tempUser = { ...this.state.newUser };
    tempUser[e.target.id] = e.target.checked;
    this.setState({ newUser: tempUser });
    this.toggle();
  }

  render() {
    const { newUser } = this.state;
    const { error } = this.props;
    return (
      <div className="CreateAcctModal container">
        <Form className="row justify-content-center" onSubmit={this.formSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="UserName">Username:</Label>
              <Input
                type="input"
                name="UserName"
                id="UserName"
                value={newUser.UserName}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="FirstName">First Name:</Label>
              <Input
                type="input"
                name="FirstName"
                id="FirstName"
                value={newUser.FirstName}
                onChange={this.formFieldStringState}
                required />
              <Label for="LastName">Last Name:</Label>
              <Input
                type="input"
                name="LastName"
                id="LastName"
                value={newUser.LastName}
                onChange={this.formFieldStringState}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="input"
                name="Email"
                id="Email"
                value={newUser.Email}
                onChange={this.formFieldStringState}
                required />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.changePasswordField}
                required />
            </FormGroup>
            <FormGroup>
              <Label for="AddressLine1">Address</Label>
              <Input
              type="text"
              name="AddressLine1"
              id="AddressLine1" 
              placeholder="123 Fake St"
              value={newUser.AddressLine1}
              onChange={this.formFieldStringState}
              required/>
            </FormGroup>
            <FormGroup>
              <Label for="AddressLine2">Address 2</Label>
              <Input
              type="text"
              name="AddressLine2"
              id="AddressLine2"
              placeholder="Apartment, studio, or floor"
              value={newUser.AddresLine2}
              onChange={this.formFieldStringState}/>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="City">City</Label>
                  <Input
                  type="text"
                  name="City"
                  id="City"
                  value={newUser.City}
                  onChange={this.formFieldStringState}
                  required/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="State">State</Label>
                  <Input 
                  type="text"
                  name="State"
                  id="State"
                  value={newUser.State}
                  onChange={this.formFieldStringState}
                  required/>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="ZipCode">ZipCode</Label>
                  <Input
                  type="text"
                  name="ZipCode"
                  id="ZipCode"
                  value={newUser.ZipCode}
                  onChange={this.formFieldStringState}
                  required/>
                </FormGroup>  
              </Col>
            </Row>
            <FormGroup check>
              <Label for="IsSeller" check>Are You A Seller?</Label>
              <CustomInput 
              type="switch"
              name="IsSeller"
              id="IsSeller"
              checked={newUser.IsSeller}
              onChange={this.formFieldSwitchState}
              />
            </FormGroup>
            <Collapse
          isOpen={this.state.collapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
           <FormGroup>
              <Label for="BusinessName">Business Name:</Label>
              <Input
                type="input"
                name="BusinessName"
                id="BusinessName"
                value={newUser.BusinessName}
                onChange={this.formFieldStringState}
                 />
            </FormGroup>
        </Collapse>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Create Account</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            <p>{error}</p>
          </ModalFooter>
        </Form>
      </div>
    )
  }
}

export default CreateAcctModal;