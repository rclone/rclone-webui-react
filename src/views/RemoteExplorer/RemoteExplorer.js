import React from 'react';
import "../../utils/Global";
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import BackStack from "../../utils/BackStack";
import ScrollableDiv from "../Base/ScrollableDiv/ScrollableDiv";
import RemoteExplorerContext from "./RemoteExplorerContext";


const propTypes = {};

const defaultProps = {};


class RemoteExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backStack: new BackStack(),
            remoteName: "",
            remotePath: "",
            remoteNameTemp: ""

        };

        this.state.backStack.push({remoteName: "", remotePath: ""});


        this.updateRemoteName = this.updateRemoteName.bind(this);
        this.updateRemotePath = this.updateRemotePath.bind(this);
        this.buttonUpPressed = this.buttonUpPressed.bind(this);

    }

    updateRemoteName(remoteName) {
        // const {backStack} = this.state;
        // backStack.empty();
        // backStack.push({remoteName: remoteName, remotePath: ""});
        // this.setState(backStack.peek());

        this.setState({remoteNameTemp: remoteName});

    }

    openRemote = () => {
        const {backStack, remoteNameTemp} = this.state;
        backStack.empty();
        backStack.push({remoteName: remoteNameTemp, remotePath: ""});
        this.setState(backStack.peek());
    };

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
            <RemoteExplorerContext.Provider value={{remoteName: remoteName, remotePath: remotePath}}>
                {/*Render remotes array*/}

                <Card>
                    <CardHeader>Remotes</CardHeader>
                    <CardBody>
                        <Form onSubmit={() => this.openRemote()}>
                            <Row>
                                <Col sm={10} lg={6}>

                                    <RemotesList updateRemoteNameHandle={this.updateRemoteName}
                                                 remoteName={remoteName}/>
                                </Col>
                                <Col sm={2} lg={2}>

                                    <Button className={"btn-lg"} color="success"
                                            type="submit">Open</Button>
                                </Col>
                            </Row>
                        </Form>
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
            </RemoteExplorerContext.Provider>
        );
    }

}

RemoteExplorer.propTypes = propTypes;
RemoteExplorer.defaultProps = defaultProps;

export default RemoteExplorer;
