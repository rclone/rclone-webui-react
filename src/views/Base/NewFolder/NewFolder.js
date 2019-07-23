import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";
import axiosInstance from "../../../utils/API/API";
import {toast} from "react-toastify";
import {addColonAtLast} from "../../../utils/Tools";
import {connect} from "react-redux";
import {getFilesForContainerID} from "../../../actions/explorerStateActions";
import urls from "../../../utils/API/endpoint";


class NewFolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            disableForm: false
        };
        this.createNewFolder = this.createNewFolder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    disableForm = (shouldDisable) => {
        this.setState({disableForm: shouldDisable});
    };

    async createNewFolder() {

        // console.log("Form Submitted");
        let {name} = this.state;
        let {remoteName, remotePath} = this.props.currentPath;
        const {fsInfo} = this.props;

        remoteName = addColonAtLast(remoteName);

        // remotePath = this.state.name;
        try {
            // console.log("fsInfo", fsInfo);
            if (fsInfo.Features.BucketBased && remotePath === "") {/*Trying to create a bucket, not a dir*/
                remoteName += name;
            } else { /*Normal directory*/
                if (remotePath === "") {
                    remotePath = name;
                } else {
                    remotePath += "/" + name;
                }
            }
            const data = {
                fs: remoteName,
                remote: remotePath
            };

            /*Disable form submit button*/
            this.disableForm(true);

            /*Network Request*/
            await axiosInstance.post(urls.mkdir, data);

            this.disableForm(false);

            this.toggle();
            toast.info(`Folder created: ${remotePath}`);
            this.props.getFilesForContainerID(this.props.containerID);
        } catch (error) {
            this.disableForm(false);

            if (error.response) {
                toast.error(`Error creating folder: ${error.response.data.error}`)
            } else {
                toast.error(`Error creating folder: ${error}`);
            }

            // console.log(`Error occurred at operations/mkdir: ${e}, ${e.response}`);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.createNewFolder();
    }

    changeName = e => {
        const value = e.target.value;
        this.setState(
            {name: value}
        );
    };

    toggle() {
        this.props.closeModal();
    }

    render() {
        const {name, disableForm} = this.state;
        const {isVisible, currentPath} = this.props;
        return (

            <Modal isOpen={isVisible} toggle={this.toggle} data-test="newFolderComponent">
                <Form onSubmit={this.handleSubmit}>
                    <ModalHeader toggle={this.toggle}>Create New folder
                        at {currentPath.remoteName}: {currentPath.remotePath}</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="folderName" sm={5}>Enter the name</Label>
                            <Col sm={7}>
                                <Input type="text" name="folderName" id="folderName" value={name}
                                       onChange={this.changeName} required autoFocus>
                                </Input>
                            </Col>
                        </FormGroup>
                        <div className="clearfix">
                            <Button type="submit" color="success" className="float-right" disabled={disableForm}><i
                                className="fa fa-check fa-lg"/>Create folder</Button>
                        </div>
                        {/*<Input type={"text"} value={name} onChange={this.changeName}*/}
                        {/*       ref={(input) => this.NameInput = input}/>*/}
                    </ModalBody>
                </Form>
            </Modal>

        );
    }

}

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    containerID: PropTypes.string.isRequired,
    getFilesForContainerID: PropTypes.func.isRequired
};


NewFolder.propTypes = propTypes;


const mapStateToProps = (state, ownProps) => {

    const currentPath = state.explorer.currentPaths[ownProps.containerID];
    let fsInfo = {};

    if (currentPath && state.remote.configs && state.remote.configs[currentPath.remoteName]) {
        fsInfo = state.remote.configs[currentPath.remoteName];
    }
    return {
        currentPath,
        fsInfo
    }
};

export default connect(mapStateToProps, {getFilesForContainerID})(NewFolder);