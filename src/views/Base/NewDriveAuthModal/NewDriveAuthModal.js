import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

const defaultProps = {
    isVisible: true,
};

class NewDriveAuthModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.closeModal();
    }


    render() {
        const {isVisible} = this.props;
        return (
            <div>
                <Modal isOpen={isVisible} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Configuring your drive.</ModalHeader>
                    <ModalBody>
                        A page will open for you with the authentication for your drive. This modal will automatically
                        dismiss upon successful creation
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
                        {/*<Button color="secondary" onClick={this.toggle}>Cancel</Button>*/}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

NewDriveAuthModal.propTypes = propTypes;
NewDriveAuthModal.defaultProps = defaultProps;


export default NewDriveAuthModal;