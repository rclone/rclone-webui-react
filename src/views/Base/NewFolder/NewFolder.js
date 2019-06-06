import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";
import axiosInstance from "../../../utils/API";
import RemoteExplorerContext from "../../RemoteExplorer/RemoteExplorerContext";

const propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

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

    async createNewFolder() {

        console.log("Form Submitted");
        let {remoteName, remotePath} = this.context;
        let {name} = this.state;
        if (remoteName[-1] !== ":") {
            remoteName += ":";
        }
        if (remotePath === "") {
            remotePath = name;
        } else {
            remotePath += "/" + name;
        }
        // remotePath = this.state.name;
        try {
            const data = {
                fs: remoteName,
                remote: remotePath
            };
            console.log("Data", data);

            /*Disable form submit button*/
            this.setState({disableForm: true});

            let res = await axiosInstance.post("operations/mkdir", data);
            console.log("mkdir", res);
            this.setState({disableForm: false});

            this.toggle();
        } catch (e) {
            this.setState({disableForm: false});
            console.log(`Error occurred at operations/mkdir: ${e}`);
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

NewFolder.propTypes = propTypes;


export default NewFolder;