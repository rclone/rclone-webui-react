import React from 'react';
import "../../utils/Global";
import {Card, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import CardHeader from "reactstrap/es/CardHeader";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import BackStack from "../../utils/BackStack";
import ScrollableDiv from "../Base/ScrollableDiv/ScrollableDiv";


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
            <React.Fragment>
                {/*Render remotes array*/}
                <Card>
                    <CardHeader>Remotes</CardHeader>
                    <CardBody>
                        <ScrollableDiv height={"200px"}>
                            <RemotesList updateRemoteNameHandle={this.updateRemoteName}/>
                        </ScrollableDiv>
                    </CardBody>
                </Card>

                {/*Render the files in the selected remote*/}
                <Card>
                    <CardHeader>
                        Files: {remoteName}
                    </CardHeader>
                    <CardBody>
                        <ScrollableDiv height={"500px"}>
                            <Row className={"mr-1 ml-1"}>
                                <FilesView remoteName={remoteName} remotePath={remotePath}
                                           updateRemotePathHandle={this.updateRemotePath}
                                           upButtonHandle={this.buttonUpPressed}/>
                            </Row>
                        </ScrollableDiv>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }

}

RemoteExplorer.propTypes = propTypes;
RemoteExplorer.defaultProps = defaultProps;

export default RemoteExplorer;
