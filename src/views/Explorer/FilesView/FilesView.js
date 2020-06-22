import React from "react";
import axiosInstance from "../../../utils/API/API";
import {Alert, Col, Container, Row, Spinner, Table} from "reactstrap";
import {DropTarget} from "react-dnd";
import FileComponent from "./FileComponent";
import {ItemTypes} from "./Constants";
import {toast} from "react-toastify";
import {
    addColonAtLast,
    changeListVisibility,
    changeSearchFilter,
    getSortCompareFunction,
    isEmpty
} from "../../../utils/Tools";
import {connect} from "react-redux";
import {getFiles} from "../../../actions/explorerActions";
import {compose} from "redux";
import {changePath, changeSortFilter, navigateUp} from "../../../actions/explorerStateActions";
import LinkShareModal from "../../Base/LinkShareModal/LinkShareModal";
import ScrollableDiv from "../../Base/ScrollableDiv/ScrollableDiv";
import {FILES_VIEW_HEIGHT} from "../../../utils/Constants";
import {PROP_CURRENT_PATH, PROP_FS_INFO} from "../../../utils/RclonePropTypes";
import * as PropTypes from 'prop-types';
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";
import {createNewPublicLink, deleteFile, purgeDir} from "rclone-api";
import {createSelector} from "reselect";
import DropOverlay from "../../Base/DropOverlay/DropOverlay";

/*
* Start code for react DND
* */

const filesTarget = {
    drop(props, monitor, component) {
        if (monitor.didDrop()) return;
        // console.log("drop", props, monitor, monitor.getItem(), component);

        let {Name, Path, IsDir, remoteName} = monitor.getItem();

        let srcRemoteName = addColonAtLast(remoteName);
        let srcRemotePath = Path;
        let destRemoteName = addColonAtLast(props.currentPath.remoteName);
        let destRemotePath = props.currentPath.remotePath;

        // console.log("drop:this", this);

        return {
            srcRemoteName,
            srcRemotePath,
            destRemoteName,
            destRemotePath,
            Name,
            IsDir,
            updateHandler: component.updateHandler
        }

    },
    canDrop(props, monitor) {
        const {remoteName, remotePath} = monitor.getItem();
        const destRemoteName = props.currentPath.remoteName;
        const destRemotePath = props.currentPath.remotePath;
        if (destRemoteName === remoteName) {
            return destRemotePath !== remotePath;
        }
        return true;
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}


/*
* END code for react DND
* */

// Provides the up button view in the files view
// function UpButtonComponent({upButtonHandle, gridMode}) {
//     if (gridMode === "card") {
//         return (
//             <Col lg={12}>
//                 <Button onClick={() => upButtonHandle()}>Go Up</Button>
//             </Col>
//         )
//     } else {
//         return (
//             <tr onClick={() => upButtonHandle()} className={"pointer-cursor"}>
//                 <td colSpan={1}/>
//                 <td colSpan={4}><i className={"fa fa-file-o"}/> Go Up...</td>
//             </tr>);
//     }
// }

/**
 * FilesView component renders files in the file explorer.
 */
class FilesView extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isDownloadProgress: false,
            downloadingItems: 0,
            shouldUpdate: true,
            showLinkShareModal: false,
            generatedLink: "",


        };
        this.handleFileClick = this.handleFileClick.bind(this);
        this.downloadHandle = this.downloadHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
    }

    closeLinkShareModal = () => {
        this.setState({
            showLinkShareModal: false
        })
    };

    showLinkShareModal = () => {
        this.setState({
            showLinkShareModal: true

        })
    };


    handleFileClick(e, item) {
        const {Path, IsDir, IsBucket} = item;
        if (IsDir || IsBucket) {
            this.updateRemotePath(Path, IsDir, IsBucket);
        } else {
            this.downloadHandle(item);
        }

    }

    updateRemotePath(newRemotePath, IsDir, IsBucket) {
        const {remoteName} = this.props.currentPath;

        let updateRemoteName = "";
        let updateRemotePath = "";


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


    getFilesList() {
        const {remoteName, remotePath} = this.props.currentPath;

        this.props.getFiles(remoteName, remotePath);

    }

    async downloadHandle(item) {
        // let {remoteName, remotePath} = this.props;
        let {remoteName, remotePath} = this.props.currentPath;
        const {fsInfo} = this.props;
        let downloadUrl = "";
        if (fsInfo.Features.BucketBased) {
            downloadUrl = `/[${remoteName}]/${remotePath}/${item.Name}`;

        } else {
            downloadUrl = `/[${remoteName}:${remotePath}]/${item.Name}`;
        }

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
        let {remoteName} = this.props.currentPath;

        try {
            if (item.IsDir) {

                await purgeDir(remoteName, item.Path);

                this.updateHandler();
                toast.info(`${item.Name} deleted.`);

            } else {

                await deleteFile(remoteName, item.Path);
                this.updateHandler();
                toast.info(`${item.Name} deleted.`, {
                    autoClose: true
                });
            }
        } catch (e) {
            // console.log(`Error in deleting file`);
            toast.error(`Error deleting file. ${e}`, {
                autoClose: false
            });
        }

    }

    updateHandler = () => {

        // const {remoteName, remotePath} = this.props.currentPath;
        this.getFilesList();
    };

    dismissAlert = (_) => {
        this.setState({isDownloadProgress: false});
    };

    linkShareHandle = (item) => {
        const {fsInfo} = this.props;
        if (fsInfo.Features.PublicLink) {
            // console.log("Sharing link" + item.Name);
            const {remoteName} = this.props.currentPath;
            createNewPublicLink(remoteName, item.Path)
                .then((res) => {
                    // console.log("Public Link: " + res.data.url);

                    this.setState({
                        generatedLink: res.url,
                        showLinkShareModal: true
                    })
                }, (error) => {
                    toast.error("Error Generating link: " + error)
                })
        } else {
            toast.error("This remote does not support public link");
        }

    };

    getFileComponents = (isDir) => {
        const {files, containerID, gridMode, fsInfo, loadImages} = this.props;
        const {remoteName, remotePath} = this.props.currentPath;
        // console.log(fsInfo, files);
        if (fsInfo && !isEmpty(fsInfo)) {
            return files.reduce((result, item) => {
                let {ID, Name} = item;
                // Using fallback as fileName when the ID is not available (especially for local file system)
                if (ID === undefined) {
                    ID = Name;
                }
                if (item.IsDir === isDir) {
                    result.push(
                        <FileComponent key={ID} item={item} clickHandler={this.handleFileClick}
                                       downloadHandle={this.downloadHandle} deleteHandle={this.deleteHandle}
                                       remoteName={remoteName} remotePath={remotePath} gridMode={gridMode}
                                       containerID={containerID}
                                       linkShareHandle={this.linkShareHandle}
                                       loadImages={loadImages}
                                       isBucketBased={fsInfo.Features.BucketBased}
                                       canCopy={fsInfo.Features.Copy} canMove={fsInfo.Features.Move} itemIdx={1}>

                        </FileComponent>
                    );
                }
                return result;
            }, []);
        }
    };

    applySortFilter = (sortFilter) => {
        const {changeSortFilter, containerID} = this.props;

        if (this.props.sortFilter === sortFilter) {
            return changeSortFilter(containerID, sortFilter, (this.props.sortFilterAscending !== true));
        } else {
            return changeSortFilter(containerID, sortFilter, true);
        }

    };


    render() {
        const {isLoading, isDownloadProgress, downloadingItems, generatedLink, showLinkShareModal} = this.state;
        const {connectDropTarget, isOver, files, gridMode, canDrop, sortFilter, sortFilterAscending} = this.props;
        const {remoteName} = this.props.currentPath;

        if (isLoading || !files) {
            return (<div><Spinner color="primary"/> Loading</div>);
        } else {


            if (remoteName === "") {
                return (<div>No remote is selected. Select a remote from above to show files.</div>);
            }


            let dirComponentMap = this.getFileComponents(true);

            let fileComponentMap = this.getFileComponents(false);

            let renderElement = "";

            if (gridMode === "card") {

                renderElement = (

                    <Container fluid={true}>

                        <Row>
                            <Col lg={3}>
                                <h3>Directories</h3>
                                <ScrollableDiv height={FILES_VIEW_HEIGHT}>
                                    {dirComponentMap}
                                </ScrollableDiv>
                            </Col>
                            <Col lg={9}>
                                <h3>Files</h3>
                                <ScrollableDiv height={FILES_VIEW_HEIGHT}>
                                    <Row>
                                        {fileComponentMap}
                                    </Row>
                                </ScrollableDiv>
                            </Col>

                        </Row>


                    </Container>

                )
            } else {
                let filterIconClass = "fa fa-lg fa-arrow-down";
                if(sortFilterAscending){
                    filterIconClass = "fa fa-lg fa-arrow-up";
                }
                renderElement = (

                    <Container fluid={true} className={"p-0"}>

                        <ScrollableDiv height={FILES_VIEW_HEIGHT}>

                            <Table className="table table-responsive-sm table-striped table-fix-head">
                                <thead>
                                <tr>
                                    <th className="pointer-cursor"
                                        onClick={() => this.applySortFilter("name")}>Name {sortFilter === "name" &&
                                    <i className={filterIconClass}/>}</th>
                                    <th className="pointer-cursor"
                                        onClick={() => this.applySortFilter("size")}>Size {sortFilter === "size" &&
                                    <i className={filterIconClass}/>}</th>
                                    <th className="d-none d-md-table-cell pointer-cursor"
                                        onClick={() => this.applySortFilter("modified")}>Modified {sortFilter === "modified" &&
                                    <i className={filterIconClass}/>}</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {files.length > 0 ? (
                                        <React.Fragment>
                                            <tr>
                                                <th colSpan={4}>Directories</th>
                                            </tr>
                                            {dirComponentMap}
                                            <tr>
                                                <th colSpan={4}>Files</th>
                                            </tr>
                                            {fileComponentMap}
                                        </React.Fragment>
                                    ) :
                                    <tr>
                                        <th colSpan={4}>Files</th>
                                    </tr>
                                }
                                </tbody>
                            </Table>
                        </ScrollableDiv>
                    </Container>


                );
            }


            return connectDropTarget(
                <div className={"row"}>
                    {isOver && canDrop && <DropOverlay/>}
                    <ErrorBoundary>

                        <Alert color="info" isOpen={isDownloadProgress} toggle={this.dismissAlert} sm={12}
                               lg={12}>
                            Downloading {downloadingItems} file(s). Please wait.
                        </Alert>

                        {renderElement}

                        <LinkShareModal closeModal={this.closeLinkShareModal} isVisible={showLinkShareModal}
                                        linkUrl={generatedLink}/>
                    </ErrorBoundary>
                </div>
            );
        }
    }

}

const propTypes = {
    containerID: PropTypes.string.isRequired,
    currentPath: PROP_CURRENT_PATH.isRequired,
    fsInfo: PROP_FS_INFO,
    gridMode: PropTypes.string,
    searchQuery: PropTypes.string,
    loadImages: PropTypes.bool.isRequired
};

const defaultProps = {};


FilesView.propTypes = propTypes;
FilesView.defaultProps = defaultProps;


const getVisibleFiles = createSelector(
    (state, props) => props.containerID,
    (state, props) => state.explorer.currentPaths[props.containerID],
    (state, props) => state.explorer.visibilityFilters[props.containerID],
    (state, props) => state.explorer.sortFilters[props.containerID],
    (state, props) => state.explorer.searchQueries[props.containerID],
    (state, props) => state.explorer.sortFiltersAscending[props.containerID],
    (state, props) => state.remote.files[`${state.explorer.currentPaths[props.containerID].remoteName}-${state.explorer.currentPaths[props.containerID].remotePath}`],
    (containerID, currentPath, visibilityFilter, sortFilter, searchQuery, sortFilterAscending, files) => {
        files = files.files;
        // Filter according to visibility filters
        if (visibilityFilter && visibilityFilter !== "") {
            files = changeListVisibility(files, visibilityFilter);
        }

        //Filter according to search query, if any
        if (searchQuery) {
            files = changeSearchFilter(files, searchQuery);
        }
        files.sort(getSortCompareFunction(sortFilter, sortFilterAscending));

        return files;
    }
)

const mapStateToProps = (state, ownProps) => {
    const {currentPaths, gridMode, searchQueries, loadImages, sortFilters, sortFiltersAscending} = state.explorer;
    const {containerID} = ownProps;
    const currentPath = currentPaths[containerID];
    const mgridMode = gridMode[containerID];
    const searchQuery = searchQueries[containerID];
    const mloadImages = loadImages[containerID];
    const sortFilter = sortFilters[containerID];
    const sortFilterAscending = sortFiltersAscending[containerID];

    let fsInfo = {};
    const {remoteName, remotePath} = currentPath;

    if (currentPath && state.remote.configs) {
        const tempRemoteName = remoteName.split(':')[0];
        if (state.remote.configs[tempRemoteName])
            fsInfo = state.remote.configs[tempRemoteName];
    }

    const pathKey = `${remoteName}-${remotePath}`;

    let files = state.remote.files[pathKey];

    if (files) {
        files = getVisibleFiles(state, ownProps);
    }

    // Sort the files
    return {
        files,
        currentPath,
        fsInfo,
        gridMode: mgridMode,
        searchQuery,
        loadImages: mloadImages,
        sortFilter,
        sortFilterAscending
    }
};

export default compose(
    connect(
        mapStateToProps, {getFiles, navigateUp, changePath, changeSortFilter}
    ),
    DropTarget(ItemTypes.FILECOMPONENT, filesTarget, collect)
)(FilesView)
