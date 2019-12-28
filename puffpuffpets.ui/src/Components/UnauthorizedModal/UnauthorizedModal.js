import React from 'react';
import { ModalBody, ModalFooter, Button } from 'reactstrap';

class UnauthorizedModal extends React.Component {

  toggleModal = () => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen();
  }



  render() {
    return (
      <div className="UnauthorizedModal container">
          <ModalBody>
            <h4>HEY! We're happy you want to start shopping, but you gotta log in or create a new account first to either view product details or start adding products to your cart!

            </h4>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleModal}>Okay cool I'll do that now</Button>
          </ModalFooter>
      </div>
    )
  }
}

export default UnauthorizedModal;
