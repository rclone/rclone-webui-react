import React from 'react';
import "../../utils/Global";
import {Card, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import BackStack from "../FilesView/BackStack";


const propTypes = {};

const defaultProps = {};


class RemoteExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // remoteName: "",
            // remotePath: "",
            backStack: new BackStack()
        };

        this.state.backStack.push({remoteName: "", remotePath: ""});


        this.updateRemoteName = this.updateRemoteName.bind(this);
        this.updateRemotePath = this.updateRemotePath.bind(this);
        this.buttonUpPressed = this.buttonUpPressed.bind(this);

    }

    updateRemoteName(remoteName) {
        const {backStack} = this.state;
        backStack.empty();
        backStack.push({remoteName: remoteName, remotePath: ""});
        this.setState(backStack.peek());
    }

    updateRemotePath(remotePath) {
        const {backStack} = this.state;
        backStack.push({remoteName: backStack.peek().remoteName, remotePath: remotePath});

        this.setState(backStack.peek());
    }

    buttonUpPressed() {
        const {backStack} = this.state;
        if (backStack.getLength() > 1) {
            backStack.pop();

            this.setState(backStack.peek());
        }
    }


    render() {
        const {remoteName, remotePath} = this.state.backStack.peek();
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
                                       updateRemotePathHandle={this.updateRemotePath}
                                       upButtonHandle={this.buttonUpPressed}/>
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
