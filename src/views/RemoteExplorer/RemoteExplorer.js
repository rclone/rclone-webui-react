import React from 'react';
import "../../utils/Global";
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import BackStack from "../../utils/BackStack";
import ScrollableDiv from "../Base/ScrollableDiv/ScrollableDiv";
import RemoteExplorerContext from "./RemoteExplorerContext";
import {addColonAtLast} from "../../utils/Tools";
import {toast} from "react-toastify";
import axiosInstance from "../../utils/API";


const propTypes = {};

const defaultProps = {};


class RemoteExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backStack: new BackStack(),
            remoteName: "",
            remotePath: "",
            remoteNameTemp: "",
            fsInfo: {}

        };

        this.state.backStack.push({remoteName: "", remotePath: ""});


        this.updateRemoteName = this.updateRemoteName.bind(this);
        this.updateRemotePath = this.updateRemotePath.bind(this);
        this.buttonUpPressed = this.buttonUpPressed.bind(this);

    }

    async getFsInfo(remoteName) {
        // const {remoteName} = this.state;
        console.log("FsInfo: remoteName:" + remoteName);

        remoteName = addColonAtLast(remoteName);
        try {
            let res = await axiosInstance.post("operations/fsinfo", {fs: remoteName});
            console.log("FSConfig res for " + remoteName, res);
            return res.data;
        } catch (e) {
            if (e.response) {
                console.log(e.response);
            } else {
                toast.warn(`Error loading fs info config: ${e}`)
            }
        }
    }

    updateRemoteName(remoteName) {

        this.setState({remoteNameTemp: remoteName});

    }

    openRemote = () => {
        const {backStack, remoteNameTemp} = this.state;
        backStack.empty();
        backStack.push({remoteName: remoteNameTemp, remotePath: ""});
        this.setState(backStack.peek());
        this.getFsInfo(remoteNameTemp).then((data) => {
            this.setState({fsInfo: data})

        })

    };

    updateRemotePath(remotePath, IsDir, IsBucket) {
        const {backStack} = this.state;

        if (IsBucket) {
            backStack.push({remoteName: addColonAtLast(backStack.peek().remoteName) + remotePath, remotePath: ""});
        } else if (IsDir) {
            backStack.push({remoteName: backStack.peek().remoteName, remotePath: remotePath});
        }

        // console.log(backStack.peek());

        this.setState(backStack.peek());
    }

    buttonUpPressed() {
        const {backStack} = this.state;
        if (backStack.getLength() > 1) {
            backStack.pop();

            this.setState(backStack.peek());
        }
    }

    // updateHandle = () => {
    //     console.log("componentShouldUpdate");
    //     this.setState({componentShouldUpdate: true});
    // };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.componentShouldUpdate) {
            this.setState({componentShouldUpdate: false});

        }
    }


    render() {
        const {remoteName, remotePath} = this.state.backStack.peek();
        const {fsInfo} = this.state;
        return (
            <RemoteExplorerContext.Provider
                value={{remoteName: remoteName, remotePath: remotePath, fsInfo: fsInfo}}>
                {/*Render remotes array*/}

                <Card>
                    <CardHeader>Remotes</CardHeader>
                    <CardBody>
                        <Form onSubmit={() => this.openRemote()}>
                            <Row>
                                <Col xs={12} sm={8} lg={6}>

                                    <RemotesList updateRemoteNameHandle={this.updateRemoteName}
                                                 remoteName={remoteName}/>
                                </Col>
                                <Col xs={12} sm={2} lg={2}>

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
                        <ScrollableDiv height={"700px"}>
                            {/*<Row className={"mr-0 ml-0"}>*/}
                                <FilesView remoteName={remoteName} remotePath={remotePath}
                                           updateRemotePathHandle={this.updateRemotePath}
                                           upButtonHandle={this.buttonUpPressed}
                                           componentShouldUpdate={this.state.componentShouldUpdate}
                                />
                            {/*</Row>*/}
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
