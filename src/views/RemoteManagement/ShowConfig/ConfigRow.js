import React from "react";
import axiosInstance from "../../../utils/API/API";
import {Button} from "reactstrap";
import * as  PropTypes from "prop-types";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import urls from "../../../utils/API/endpoint";


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


    onUpdateClicked = () => {
        const {name} = this.state.remote;
        this.props.history.push("/newdrive/edit/" + name);
    };

    // TODO: Delete config functionality
    onDeleteClicked() {
        const {name} = this.state.remote;
        let {refreshHandle} = this.props;

        // Delete http request
        if (window.confirm(`Are you sure you wish to delete ${name}? You cannot restore it once it is deleted.`)) {

            axiosInstance.post(urls.deleteConfig, {name: name}).then(
                (res) => {
                    // console.log(res);
                    // Refresh the parent component
                    refreshHandle();
                    toast.info('Config deleted');
                }, (err) => {
                    // console.log(`Error occurred: ${err}`);
                    toast.error('Error deleting config')
                }
            )
        }
    }


    render() {
        const {name, type} = this.state.remote;
        const {sequenceNumber} = this.props;
        return (
            <tr data-test="configRowComponent">
                <th scope="row">{sequenceNumber}</th>
                <td>{name}</td>
                <td>{type}</td>
                <td>

                    <Button className={"bg-info"} onClick={this.onUpdateClicked}>Update</Button>
                </td>
                <td><Button className={"bg-danger"} onClick={this.onDeleteClicked}>Delete</Button></td>
            </tr>
        );
    }
}

const propTypes = {
    remote: PropTypes.object.isRequired, // Name of the remote to perform operations
    refreshHandle: PropTypes.func.isRequired, // Used to refresh the parent component upon change
    sequenceNumber: PropTypes.number.isRequired,
    remoteName: PropTypes.string.isRequired,

};

ConfigRow.propTypes = propTypes;

export default withRouter(ConfigRow);