import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

const customStyles = {
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '20%',
    right                      : '20%',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '5px',
    outline                    : 'none',
    padding                    : '20px'
  }
};

class ModalTrigger extends Component {

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    

    // see http://stackoverflow.com/a/32371612/649299
    const childrenWithProps = React.Children.map(this.props.children, (child) => {

      // if child component already has a successCallback, create new callback 
      // that both calls original callback and also closes modal
      let successCallback;
      if (child.props.successCallback) {
        successCallback = (document) => {
          child.props.successCallback(document);
          this.closeModal();
        }
      } else {
        successCallback = this.closeModal;
      }

      return React.cloneElement(child, { successCallback: successCallback });

    });

    const triggerComponent = React.cloneElement(this.props.component, { onClick: this.openModal });

    return (
      <div className="modal-trigger">
        {triggerComponent}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} 
        >
          {childrenWithProps}
        </Modal>
      </div>
    )
  }
};

ModalTrigger.propTypes = {
  component: React.PropTypes.object.isRequired
}

module.exports = ModalTrigger;
export default ModalTrigger;