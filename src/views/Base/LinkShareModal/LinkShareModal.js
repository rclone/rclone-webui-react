import React from "react";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import * as PropTypes from "prop-types";


class LinkShareModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copySuccess: ""
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.closeModal();
    }

    copyToClipboard = () => {
        let textField = document.createElement('textarea');
        textField.innerText = this.props.linkUrl;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    };

    handleFocus = (event) => event.target.select();

    render() {
        const {isVisible, linkUrl} = this.props;
        const {copySuccess} = this.state;
        let isCopyAllowed = (document && document.queryCommandSupported) ? document.queryCommandSupported('copy') : true;

        return (
            <div>
                <Modal isOpen={isVisible} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} data-test="modalHeader">Public link generated.</ModalHeader>
                    <ModalBody data-test="modalBody">
                        <Input readOnly value={linkUrl} onFocus={this.handleFocus}/>
                        {

                            /* Logical shortcut for only displaying the
                               button if the copy command exists */
                            isCopyAllowed &&
                            <div>
                                <Button color="link" onClick={this.copyToClipboard}><i
                                    className="fa fa-clipboard fa-2x"/></Button>
                            </div>
                        }
                        {copySuccess}
                    </ModalBody>
                    <ModalFooter data-test="modalFooter">
                        <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

LinkShareModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    linkUrl: PropTypes.string.isRequired
};
LinkShareModal.defaultProps = {
    isVisible: true,
};

export default LinkShareModal;