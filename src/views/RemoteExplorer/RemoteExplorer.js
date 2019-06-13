import React from 'react';
import "../../utils/Global";
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import ScrollableDiv from "../Base/ScrollableDiv/ScrollableDiv";
import RemoteExplorerContext from "./RemoteExplorerContext";
import {addColonAtLast} from "../../utils/Tools";
import {connect} from "react-redux";
import {getConfigForRemote} from "../../actions/explorerActions";
import PropTypes from 'prop-types';
import {
    changePath,
    changeRemoteName,
    changeRemotePath,
    createPath,
    navigateBack,
    navigateFwd,
    navigateUp
} from "../../actions/explorerStateActions";


class RemoteExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            remoteName: "",
            remotePath: "",
            remoteNameTemp: ""
        };


        this.updateRemoteName = this.updateRemoteName.bind(this);
        this.updateRemotePath = this.updateRemotePath.bind(this);
        this.buttonUpPressed = this.buttonUpPressed.bind(this);

    }

    getFsInfo(remoteName) {
        console.log("config for", remoteName);

        if (!this.props.configs[remoteName])
            this.props.getConfigForRemote(remoteName);

    }

    updateRemoteName(remoteName) {

        this.setState({remoteNameTemp: remoteName});

    }

    openRemote = () => {
        const {remoteNameTemp} = this.state;
        // backStack.empty();
        // backStack.push({remoteName: remoteNameTemp, remotePath: ""});
        // this.setState(backStack.peek());

        this.props.changeRemoteName(this.props.containerID, remoteNameTemp, "");

        this.getFsInfo(remoteNameTemp);

    };

    updateRemotePath(newRemotePath, IsDir, IsBucket) {
        // const {backStack} = this.props;
        const {remoteName, remotePath} = this.props.currentPath;
        // const curRemotePath = backStack.peek().remotePath;

        let updateRemoteName = "";
        let updateRemotePath = "";

        console.log(remoteName, remotePath, newRemotePath)

        if (IsBucket) {
            updateRemoteName = addColonAtLast(remoteName) + newRemotePath;
            updateRemotePath = "";
            // backStack.push({remoteName: addColonAtLast(backStack.peek().remoteName) + remotePath, remotePath: ""});

        } else if (IsDir) {
            updateRemoteName = remoteName;
            updateRemotePath = newRemotePath;
            // backStack.push({remoteName: backStack.peek().remoteName, remotePath: remotePath});
        }
        this.props.changePath(this.props.containerID, updateRemoteName, updateRemotePath);
    }

    buttonUpPressed() {
        this.props.navigateUp(this.props.containerID);
        // const {backStack} = this.state;
        // if (backStack.getLength() > 1) {
        //     backStack.pop();
        //
        //     this.setState(backStack.peek());
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.componentShouldUpdate) {
            this.setState({componentShouldUpdate: false});

        }
    }


    render() {

        const currentPath = this.props.currentPath;
        if (!currentPath) return null;
        console.log(currentPath);


        const {remoteName, remotePath} = currentPath;

        const fsInfo = this.props.configs[remoteName];
        console.log(remotePath, remoteName, fsInfo);
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


const propTypes = {

    containerID: PropTypes.string.isRequired,
    createPath: PropTypes.func.isRequired,
};

const defaultProps = {};

const mapStateToProps = (state, ownProps) => ({
    configs: state.remote.configs,
    hasError: state.remote.hasError,
    error: state.remote.error,
    // backStack: state.explorer.backStacks[ownProps.containerID],
    currentPath: state.explorer.currentPaths[ownProps.containerID],
    // remotePath: state.explorer.currentPaths[ownProps.containerID].remotePath
});

RemoteExplorer.propTypes = propTypes;
RemoteExplorer.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    {
        getConfigForRemote, createPath, changePath,
        changeRemoteName, changeRemotePath, navigateUp,
        navigateBack, navigateFwd
    }
)(RemoteExplorer);
