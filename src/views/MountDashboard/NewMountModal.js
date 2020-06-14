import React, {useState} from 'react';
import {
    Button,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import RemotesList from "../Explorer/RemotesList";
import * as PropTypes from "prop-types"

/**
 * New Mount Modal shows a button for opening a modal for new mount and then executes okHandle when positive
 * button is clicked
 * @param props
 * @returns {*}
 * @constructor
 */
const NewMountModal = (props) => {
    const {
        buttonLabel,
        className,
        okHandle

    } = props;

    const [modal, setModal] = useState(false);

    const [mountFs, setMountFs] = useState("");

    const [mountPoint, setMountPoint] = useState("");

    const toggle = () => setModal(!modal);

    const handleCreateMount = () => {
        if (!okHandle) {
            throw new Error("Ok handle is null");
        }
        okHandle(mountFs, mountPoint);
    }

    const isCreateDisabled = () => {
        return !mountFs || !mountPoint;
    }

    return (
        <div data-test="newMountModalComponent">
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>New Mount</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label for={"mountFs"} sm={5}>Fs</Label>
                        <Col sm={7}>
                            <RemotesList
                                remoteName={mountFs}
                                handleChangeRemoteName={setMountFs}
                            />
                            <FormFeedback/>
                        </Col>
                    </FormGroup>
                    {mountFs && <FormGroup row>
                        <Label for={"mountPoint"} sm={5}>Mount Point</Label>
                        <Col sm={7}>
                            <Input type={"text"} value={mountPoint}
                                   name={"mountPoint"}
                                   id={"mountPoint"} onChange={e => setMountPoint(e.target.value)} required={true}>

                            </Input>
                            <FormFeedback/>

                        </Col>
                    </FormGroup>}

                </ModalBody>
                <ModalFooter>
                    <Button data-test="ok-button" color="primary" onClick={handleCreateMount}
                            disabled={isCreateDisabled()}>Create</Button>{' '}
                    <Button data-test="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

NewMountModal.propTypes = {
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

export default NewMountModal;