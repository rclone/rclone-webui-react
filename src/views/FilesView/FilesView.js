import React from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/API";
import {Alert, Col, Table} from "reactstrap";
import "../../utils/Global";
import FileOperations from "../Base/NewFolder/FileOperations";
import {DropTarget} from "react-dnd";
import FileComponent from "./FileComponent";
import {ItemTypes} from "./Constants";
import {toast} from "react-toastify";
import {addColonAtLast} from "../../utils/Tools";
import RemoteExplorerContext from "../RemoteExplorer/RemoteExplorerContext";


const propTypes = {
    updateRemotePathHandle: PropTypes.func.isRequired,
    upButtonHandle: PropTypes.func.isRequired,
    remotePath: PropTypes.string.isRequired
};

const defaultProps = {
    remotePath: "",
};



/*
* Start code for react DND
* */

const filesTarget = {
    drop(props, monitor, component) {
        if (monitor.didDrop()) return;
        console.log("drop", props, monitor, monitor.getItem(), component);

        let {Name, Path, IsDir, remoteName} = monitor.getItem();

        let srcRemoteName = addColonAtLast(remoteName);
        let srcRemotePath = Path;
        let destRemoteName = addColonAtLast(props.remoteName);
        let destRemotePath = props.remotePath;

        return {
            srcRemoteName,
            srcRemotePath,
            destRemoteName,
            destRemotePath,
            Name,
            IsDir,
            updateHandler: component.updateHandler
        }

    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

function renderOverlay() {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: 'gray',
            }}
        />
    );
}

/*
* END code for react DND
* */

function UpButtonComponent({upButtonHandle}) {
    return (
        <tr onClick={() => upButtonHandle()} className={"pointer-cursor"}>
            <td></td>
            <td><i className={"fa fa-file-o"}/> Go Up...</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>);
}

class FilesView extends React.Component {
    static contextType = RemoteExplorerContext;


    constructor(props) {
        super(props);
        this.state = {
            filesList: [],
            isLoading: false,
            isDownloadProgress: false,
            downloadingItems: 0,
            isOperationInProgress: false,
            shouldUpdate: true,

        };
        this.handleFileClick = this.handleFileClick.bind(this);
        this.downloadHandle = this.downloadHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    componentDidMount() {
        this.getFilesList();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {remoteName, remotePath} = this.props;
        const {shouldUpdate} = this.state;
        // console.log("componentDidUpdate");
        if (prevProps.remoteName !== remoteName || prevProps.remotePath !== remotePath || prevState.shouldUpdate !== shouldUpdate) {
            this.getFilesList(prevState.shouldUpdate === shouldUpdate);
        }
    }

    handleFileClick(e, item) {
        const {Path, IsDir, IsBucket} = item;
        const {updateRemotePathHandle} = this.props;
        console.log("Clicked" + Path);
        if (IsDir || IsBucket) {
            updateRemotePathHandle(Path, IsDir, IsBucket);
        } else {
            this.downloadHandle(item);
        }

    }


    async getFilesList(showLoading = true) {
        let {remoteName, remotePath} = this.props;

        if (remoteName !== "") {

            console.log(remoteName, remotePath);

            remoteName = addColonAtLast(remoteName);


            let data = {
                fs: remoteName,
                remote: remotePath
            };
            if (showLoading)
                this.setState({isLoading: true});

            try {

                let res = await axiosInstance.post("/operations/list", data);
                this.setState({filesList: res.data.list});
            } catch (e) {
                console.log("Error loading files");
                toast.warn('Error loading files');
                // Pop current state
                this.props.upButtonHandle();
            }

            if (showLoading)
                this.setState({isLoading: false});
        }
    }

    async downloadHandle(item) {
        // let {remoteName, remotePath} = this.props;
        let {remoteName, remotePath, fsInfo} = this.context;
        let downloadUrl = ""
        if (fsInfo.Features.BucketBased) {
            downloadUrl = `/[${remoteName}]/${remotePath}/${item.Name}`;

        } else {
            downloadUrl = `/[${remoteName}:${remotePath}]/${item.Name}`;
        }
        // openInNewTab(downloadUrl);

        this.setState((prevState) => {
            return {
                downloadingItems: prevState.downloadingItems + 1,
                isDownloadProgress: true
            };
        });

        let response = await axiosInstance({
            url: downloadUrl,
            method: 'GET',
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', item.Name);
        document.body.appendChild(link);
        link.click();

        this.setState((prevState) => {
            return {
                downloadingItems: prevState.downloadingItems - 1,
            };
        }, () => {
            if (this.state.downloadingItems === 0) {
                this.setState({isDownloadProgress: false})
            }
        });
    }

    async deleteHandle(item) {
        console.log("Delete pressed");
        let {remoteName} = this.props;

        const data = {
            fs: addColonAtLast(remoteName),
            remote: item.Path,
        };
        try {
            if (item.IsDir) {

                let res = await axiosInstance.post("/operations/purge", data);
                console.log("deletefile", res);

                this.updateHandler();
                toast.info(`${item.Name} deleted.`);

            } else {

                let res = await axiosInstance.post("/operations/deletefile", data);
                console.log("deletefile", res);
                this.updateHandler();
                toast.info(`${item.Name} deleted.`, {
                    autoClose: false
                });
            }
        } catch (e) {
            console.log(`Error in deleting file`);
            toast.error(`Error deleting file. ${e}`, {
                autoClose: false
            });
        }

    }

    updateHandler = () => {
        this.setState((prevState) => {
            return {shouldUpdate: !prevState.shouldUpdate}
        })

    }

    dismissAlert = (e) => {
        this.setState({isDownloadProgress: false});
    };

    getFileComponents = (filesList, remoteName, isDir) => {
        return filesList.map((item, idx) => {
            let {ID, Name} = item;
            // Using fallback as fileName when the ID is not available (for local file system)
            if (ID === undefined) {
                ID = Name;
            }
            if (item.IsDir === isDir) {
                return (
                    <React.Fragment key={ID}>
                        <FileComponent item={item} clickHandler={this.handleFileClick}
                                       downloadHandle={this.downloadHandle} deleteHandle={this.deleteHandle}
                                       remoteName={remoteName}/>
                    </React.Fragment>
                )
            }
            return null;
        });
    }


    render() {
        const {isLoading, isDownloadProgress, downloadingItems, isOperationInProgress} = this.state;
        const {connectDropTarget, isOver, upButtonHandle, remoteName} = this.props;

        if (isLoading) {
            return (<div><i className={"fa fa-circle-o-notch fa-lg"}/> Loading</div>);
        } else {

            const {filesList} = this.state;
            if (remoteName === "") {
                return (<div>No remote is selected. Select a remote from above to show files.</div>);
            }

            console.log("filesList", filesList);


            let dirComponentMap = this.getFileComponents(filesList, remoteName, true);

            let fileComponentMap = this.getFileComponents(filesList, remoteName, false);

            const renderElement = (


                <React.Fragment>
                    <tr>
                        <td></td>
                        <th>Directories</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {dirComponentMap}
                    <tr>
                        <td></td>
                        <th>Files</th>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {fileComponentMap}
                </React.Fragment>

            );


            return connectDropTarget(
                <div className={"col-12"} style={{height: "100%"}}>
                    {isOver && renderOverlay()}

                    <Alert color="info" isOpen={isDownloadProgress} toggle={this.dismissAlert} sm={12}
                           lg={12}>
                        Downloading {downloadingItems} file(s). Please wait.
                    </Alert>

                    <Col sm={12}>
                        <FileOperations updateHandler={this.updateHandler}/>
                    </Col>


                    <Table sm={12} lg={12}>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Modified</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <UpButtonComponent upButtonHandle={upButtonHandle}/>
                        {filesList.length > 0 ? renderElement :
                            <tr>
                                <td></td>
                                <td>No files</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

}

FilesView.propTypes = propTypes;
FilesView.defaultProps = defaultProps;

export default DropTarget(ItemTypes.FILECOMPONENT, filesTarget, collect)(FilesView);
