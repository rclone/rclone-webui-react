import React, {useState} from 'react';
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    UncontrolledTooltip
} from 'reactstrap';
import axiosInstance from "../../../utils/API/API";
import {addColonAtLast} from "../../../utils/Tools";
import {toast} from "react-toastify";
import * as RclonePropTypes from "../../../utils/RclonePropTypes";

/**
 * New Mount Modal shows a button for opening a modal for new mount and then executes okHandle when positive
 * button is clicked
 * @param props
 * @returns {*}
 * @constructor
 */
const FileUploadModal = (props) => {
    const {
        currentPath
    } = props;

    const [modal, setModal] = useState(false);


    const [files, setFiles] = useState(null);


    const toggle = () => setModal(!modal);


    const changeFilesHandler = (e) => {
        setFiles(e.target.files);
    }

    const isUploadDisabled = () => files == null;


    const fileUploadHandler = (_) => {
        const data = new FormData();
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            // get item
            let file = files.item(i);

            data.append("file" + i, file);
        }


        axiosInstance.post(`operations/uploadfile?fs=` +
            `${addColonAtLast(currentPath.remoteName)}` +
            `&remote=${currentPath.remotePath}`, data)
            .then(res => {
                toast.info("File uploaded successfully");
            }, err => {
                toast.error("File upload failed");
            });
    }

    return (
        <div data-test="fileUploadModalComponent">
            <Button className="btn-explorer-action" id="UploadButton"
                    onClick={toggle}>
                <i className="fa fa-lg fa-upload"/>
            </Button>
            <UncontrolledTooltip placement="right" target="UploadButton">
                Upload file(s)
            </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>New Mount</ModalHeader>
                <ModalBody>
                    <Container fluid>
                        <Row className="upload-box">
                            <Col sm={3}/>
                            <Col sm={6}>

                                <label htmlFor="upload-file">
                                    <Row>
                                        <i className="fa fa-lg fa-plus mx-auto mt-5"/>
                                        <p className="text-center mt-2">Click here or drag and drop files to upload</p>
                                    </Row>

                                </label>
                            </Col>
                            <Col sm={3}/>
                        </Row>
                        <Row>
                            <FormGroup row className="pl-2 pr-2">
                                <Input id="upload-file" type="file" name="file" onChange={changeFilesHandler} multiple/>
                            </FormGroup>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button data-test="ok-button" color="primary" onClick={fileUploadHandler}
                            disabled={isUploadDisabled()}>Create</Button>{' '}
                    <Button data-test="cancel-button" color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

FileUploadModal.propTypes = {
    currentPath: RclonePropTypes.PROP_CURRENT_PATH
}

export default FileUploadModal;