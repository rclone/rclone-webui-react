import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";
import axiosInstance from "../../../utils/API";
import RemoteExplorerContext from "../../RemoteExplorer/RemoteExplorerContext";
import {toast} from "react-toastify";
import {addColonAtLast} from "../../../utils/Tools";


class NewFolder extends React.Component {
    static contextType = RemoteExplorerContext;

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

        console.log("Form Submitted");
        let {remoteName, remotePath, fsInfo} = this.context;
        let {name} = this.state;

        remoteName = addColonAtLast(remoteName);

        // remotePath = this.state.name;
        try {
            console.log("fsInfo", fsInfo);
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
            console.log("Data", data);

            /*Disable form submit button*/
            this.disableForm(true);
            /*Network Request*/
            let res = await axiosInstance.post("operations/mkdir", data);
            console.log("mkdir", res);
            this.disableForm(false);

            this.toggle();
            toast.info(`Folder created: ${remotePath}`)
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
        const {isVisible} = this.props;
        return (

            <Modal isOpen={isVisible} toggle={this.toggle}>
                <Form onSubmit={this.handleSubmit}>
                    <ModalHeader toggle={this.toggle}>Enter the name for the folder</ModalHeader>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="folderName" sm={3}>Enter the name</Label>
                            <Col sm={9}>
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
                    <ModalFooter>

                    </ModalFooter>
                </Form>
            </Modal>

        );
    }

}

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};


NewFolder.propTypes = propTypes;


export default NewFolder;