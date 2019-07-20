import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import * as  PropTypes from "prop-types";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";


class NewDriveAuthModal extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.closeModal();
    }


    render() {
        const {isVisible} = this.props;
        return (
            <div>
                <ErrorBoundary>
                    <Modal isOpen={isVisible} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle} data-test="modalHeader">Configuring your drive.</ModalHeader>
                        <ModalBody data-test="modalBody">
                            A page will open for you with the authentication for your drive. This modal will
                            automatically
                            dismiss upon successful creation
                        </ModalBody>
                        <ModalFooter data-test="modalFooter">
                            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
                            {/*<Button color="secondary" onClick={this.toggle}>Cancel</Button>*/}
                        </ModalFooter>
                    </Modal>
                </ErrorBoundary>
            </div>
        );
    }
}

NewDriveAuthModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};
NewDriveAuthModal.defaultProps = {
    isVisible: true,
};


export default NewDriveAuthModal;