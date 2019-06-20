import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import RemotesList from "../RemotesList";
import FilesView from "../FilesView/FilesView";
import ScrollableDiv from "../../Base/ScrollableDiv/ScrollableDiv";
import {addColonAtLast} from "../../../utils/Tools";
import {connect} from "react-redux";
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
                {isValidPath && <Card>
                    <CardHeader>
                        <FileOperations containerID={containerID}/>
                    </CardHeader>
                    <CardBody>
                        <ScrollableDiv height={"700px"}>
                            <FilesView containerID={containerID}/>
                        </ScrollableDiv>
                    </CardBody>
                </Card>}

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

    const {remoteName} = currentPath;

    if (currentPath && state.remote.configs) {

        const tempRemoteName = remoteName.split(':')[0];
        if (state.remote.configs[tempRemoteName])

            fsInfo = state.remote.configs[tempRemoteName];
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
        createPath, changePath,
        changeRemoteName, changeRemotePath, navigateUp,
        navigateBack, navigateFwd
    }
)(RemoteExplorer);
