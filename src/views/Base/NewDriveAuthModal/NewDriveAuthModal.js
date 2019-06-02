import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";

const propTypes = {
    isVisible: PropTypes.bool,
};

const defaultProps = {
    isVisible: true,
};

class NewDriveAuthModal extends React.Component {
    constructor(props) {
        super(props);
        const {isVisible} = this.props;
        this.state = {
            modal: isVisible,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const {isVisible} = this.state;
        return (
            <div>
                <Modal isOpen={isVisible} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Configuring your drive.</ModalHeader>
                    <ModalBody>
                        A page will open for you with the authentication for your drive.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

NewDriveAuthModal.propTypes = propTypes;
NewDriveAuthModal.defaultProps = defaultProps;


export default NewDriveAuthModal;