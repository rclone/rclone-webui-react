import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import ScrollableDiv from "../../Base/ScrollableDiv/ScrollableDiv";
import {addColonAtLast} from "../../../utils/Tools";
import {connect} from "react-redux";
import {getFsInfo} from "../../../actions/explorerActions";
import PropTypes from 'prop-types';
import {
    changePath,
    changeRemoteName,
    changeRemotePath,
    createPath,
    navigateBack,
    navigateFwd,
    navigateUp
} from "../../../actions/explorerStateActions";
import FileOperations from "../../Base/FileOperations/FileOperations";


class RemoteExplorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remoteNameTemp: ""
        };

        this.updateRemoteName = this.updateRemoteName.bind(this);
        this.updateRemotePath = this.updateRemotePath.bind(this);
    }

    getFsInfo() {
        const {remoteName} = this.props.currentPath;
        if (!this.props.configs[remoteName])
            this.props.getFsInfo(remoteName);
    }

    updateRemoteName(remoteName) {
        this.setState({remoteNameTemp: remoteName});
    }

    updateRemotePath(newRemotePath, IsDir, IsBucket) {
        const {remoteName} = this.props.currentPath;

        let updateRemoteName = "";
        let updateRemotePath = "";

        if (IsBucket) {
            updateRemoteName = addColonAtLast(remoteName) + newRemotePath;
            updateRemotePath = "";

        } else if (IsDir) {
            updateRemoteName = remoteName;
            updateRemotePath = newRemotePath;
        }
        this.props.changePath(this.props.containerID, updateRemoteName, updateRemotePath);
    }

    render() {


        const {remoteName} = this.props.currentPath;
        const {containerID} = this.props;

        const isValidPath = remoteName && remoteName !== "";

        return (
            <React.Fragment>
                {/*Render remotes array*/}

                <Card>
                    <CardHeader>Remotes</CardHeader>
                    <CardBody>


                        <RemotesList
                            remoteName={remoteName}
                            containerID={containerID}
                        />

                    </CardBody>
                </Card>

                {/*Render the files in the selected remote*/}
                <Card className={isValidPath ? "" : "d-none"}>
                    <CardHeader>
                        <FileOperations containerID={containerID}/>
                    </CardHeader>
                    <CardBody>
                        <ScrollableDiv height={"700px"}>
                            <FilesView containerID={containerID}/>
                        </ScrollableDiv>
                    </CardBody>
                </Card>
            </React.Fragment>
        );

    }

}


const propTypes = {

    containerID: PropTypes.string.isRequired,
    createPath: PropTypes.func.isRequired,
    currentPath: PropTypes.shape({
        remoteName: PropTypes.string.isRequired,
        remotePath: PropTypes.string.isRequired
    }),
    fsInfo: PropTypes.oneOfType([
        PropTypes.shape({
            Features: PropTypes.object.isRequired,
            Hashes: PropTypes.array.isRequired,
            Name: PropTypes.string.isRequired,
            Precision: PropTypes.number.isRequired,
            String: PropTypes.string.isRequired
        }),
        PropTypes.object
    ]),
    hasError: PropTypes.bool,

};

const defaultProps = {};

const mapStateToProps = (state, ownProps) => {

    const currentPath = state.explorer.currentPaths[ownProps.containerID];
    let fsInfo = {};

    if (currentPath && state.remote.configs && state.remote.configs[currentPath.remoteName]) {
        fsInfo = state.remote.configs[currentPath.remoteName];
    }
    return {
        configs: state.remote.configs,
        hasError: state.remote.hasError,
        error: state.remote.error,
        currentPath: state.explorer.currentPaths[ownProps.containerID],
        fsInfo
    }
};

RemoteExplorer.propTypes = propTypes;
RemoteExplorer.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    {
        getFsInfo, createPath, changePath,
        changeRemoteName, changeRemotePath, navigateUp,
        navigateBack, navigateFwd
    }
)(RemoteExplorer);
