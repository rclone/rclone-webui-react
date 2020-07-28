import React, {useState} from 'react';
import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import * as PropTypes from "prop-types"

/**
 * NewPluginModal shows a button for opening a modal for new mount and then executes okHandle when positive
 * button is clicked
 * @param props
 * @returns {*}
 * @constructor
 */
const NewPluginModal = (props) => {
    const {
        buttonLabel,
        className,
        okHandle
    } = props;

    const [modal, setModal] = useState(false);

    const [pluginDownloadURL, setPluginDownloadURL] = useState("");

    const [pluginType, setPluginType] = useState("");

    const toggle = () => setModal(!modal);

    const handleCreateMount = () => {
        if (!okHandle) {
            throw new Error("Ok handle is null");
        }
        okHandle(pluginDownloadURL, pluginType);
    }

    const isCreateDisabled = () => {
        return !pluginDownloadURL || pluginDownloadURL === "";
    }

    const submitForm = (e) => {
        e.preventDefault();
        handleCreateMount();
    }

    return (
        <div data-test="newMountModalComponent">
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Form onSubmit={submitForm}>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>New Mount</ModalHeader>
                    <ModalBody>

                        <FormGroup row>
                            <Label for={"pluginURL"} sm={5}>Plugin URL</Label>
                            <Col sm={7}>
                                <Input type={"text"} value={pluginDownloadURL}
                                       name={"pluginURL"}
                                       id={"pluginURL"} onChange={e => setPluginDownloadURL(e.target.value)}
                                       required={true}
                                >
                                </Input>
                                <FormFeedback/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for={"pluginType"} sm={5}>Plugin Type</Label>
                            <Col sm={7}>
                                <Input type={"text"} value={pluginDownloadURL}
                                       name={"pluginType"}
                                       id={"pluginType"} onChange={e => setPluginType(e.target.value)}
                                       required={true}>
                                </Input>
                                <FormFeedback/>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button data-test="ok-button" color="primary" onClick={handleCreateMount}
                                disabled={isCreateDisabled()}>Add</Button>{' '}
                        <Button data-test="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Form>
        </div>
    );
}

NewPluginModal.propTypes = {
    /**
     * Text for open modal button
     */
    buttonLabel: PropTypes.string,
    /**
     * Class for open modal button
     */
    buttonClass: PropTypes.string,
    /**
     * Function to be called when ok button is clicked.
     */
    okHandle: PropTypes.func.isRequired,
}

export default NewPluginModal;