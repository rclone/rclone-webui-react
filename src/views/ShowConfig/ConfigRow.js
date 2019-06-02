import React from "react";
import axiosInstance from "../../utils/API";
import {Button} from "reactstrap";
import PropTypes from "prop-types";

const propTypes = {
    remote: PropTypes.object.isRequired, // Name of the remote to perform operations
    refreshHandle: PropTypes.func.isRequired // Used to refresh the parent component upon change
};

class ConfigRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        let {remote, remoteName} = this.props;
        remote["name"] = remoteName;
        this.state = {
            remote: remote
        };
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onUpdateClicked = this.onUpdateClicked.bind(this);

    }


    // TODO: Update config functionality
    onUpdateClicked() {
        console.log("Update Clicked")
    }

    // TODO: Delete config functionality
    onDeleteClicked() {
        const {name} = this.state.remote;
        let {refreshHandle} = this.props;

        // Delete http request
        if (window.confirm(`Are you sure you wish to delete ${name}? You cannot restore it once it is deleted.`)) {

            axiosInstance.post("/config/delete", {name: name}).then(
                (res) => {
                    console.log(res);
                    // Refresh the parent component
                    refreshHandle();
                }, (err) => {
                    console.log(`Error occurred: ${err}`);
                }
            )
        }
    }


    render() {
        const {name, type} = this.state.remote;
        const {sequenceNumber} = this.props;
        return (
            <tr>
                <th scope="row">{sequenceNumber}</th>
                <td>{name}</td>
                <td>{type}</td>
                <td><Button className={"bg-info"} onClick={this.onUpdateClicked}>Update</Button></td>
                <td><Button className={"bg-danger"} onClick={this.onDeleteClicked}>Delete</Button></td>
            </tr>
        );
    }
}

ConfigRow.propTypes = propTypes;

export default ConfigRow;