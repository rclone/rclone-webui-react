import React from "react";
import {Button, Table} from "reactstrap";
import axiosInstance from "../../utils/API";
import PropTypes from "prop-types";


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

ConfigRow.propTypes = {
    remote: PropTypes.object,
    refreshHandle: PropTypes.func

}

function RemoteRows({remotes, refreshHandle}) {

    let returnMap = [];
    let curKey = 1;
    for (const [key, value] of Object.entries(remotes)) {
        returnMap.push((<ConfigRow sequenceNumber={curKey} key={curKey} remoteName={key} remote={value}
                                   refreshHandle={refreshHandle}/>))
        curKey++;
    }
    // return remotes.map((item, idx) => {
    //     console.log(item);
    //     return (<ConfigRow sequenceNumber={idx+1} key={idx} remoteName={item}/>);
    // })
    return returnMap;
}


class ShowConfig extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            remotes: []
        };
        this.loadConfigDump = this.loadConfigDump.bind(this);
    }

    loadConfigDump() {
        try {
            axiosInstance.post("config/dump").then((res) => this.setState({remotes: res.data}));
        } catch (e) {
            console.log(`Error while processing request to get remote list ${e}`);
        }
    }


    componentDidMount() {
        //Get the configs
        this.loadConfigDump();
    }

    render() {
        return (<div>
            <Table responsive>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <RemoteRows remotes={this.state.remotes} refreshHandle={this.loadConfigDump}/>
                </tbody>
            </Table>
        </div>)
    }
}

export default ShowConfig;
