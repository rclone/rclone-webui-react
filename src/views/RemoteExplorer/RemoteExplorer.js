import React from 'react';
import "../../utils/Global";
import {Card, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";


const propTypes = {};

const defaultProps = {};


class RemoteExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remoteName: "",
            remotePath: ""
        };
        this.updateRemoteName = this.updateRemoteName.bind(this);
        this.updateRemotePath = this.updateRemotePath.bind(this);

    }

    updateRemoteName(remoteName) {
        this.setState({remoteName: remoteName, remotePath: ""});
    }

    updateRemotePath(remotePath) {
        this.setState({remotePath: remotePath});
    }


    render() {
        const {remoteName, remotePath} = this.state;
        return (
            <div>
                <Card>
                    <CardHeader>Remotes</CardHeader>
                    <CardBody>
                        <RemotesList updateRemoteNameHandle={this.updateRemoteName}/>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        Files
                    </CardHeader>
                    <CardBody className="pl-5 pr-5">
                        <Row>
                            <FilesView remoteName={remoteName} remotePath={remotePath}
                                       updateRemotePathHandle={this.updateRemotePath}/>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

RemoteExplorer.propTypes = propTypes;
RemoteExplorer.defaultProps = defaultProps;

export default RemoteExplorer;
