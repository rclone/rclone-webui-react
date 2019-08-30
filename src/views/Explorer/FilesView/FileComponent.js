import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown
} from "reactstrap";

import {ItemTypes} from './Constants'
import {DragSource} from 'react-dnd'
import {formatBytes} from "../../../utils/Tools";
import {performCopyFile, performMoveFile} from "../../../utils/API/API";
import {toast} from "react-toastify";
import * as PropTypes from "prop-types";
import handleViewport from 'react-in-viewport';
import MediaWidget, {isMedia} from "../../Base/MediaWidget/MediaWidget";
import {PROP_ITEM} from "../../../utils/RclonePropTypes";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";

async function performCopyMoveOperation(params) {
    const {srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir, dropEffect, updateHandler} = params;
    if (dropEffect === "move") { /*Default operation without holding alt is copy, named as move in react-dnd*/
        // if (component.props.canCopy) {
        await performCopyFile(srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir);
        updateHandler();
        if (IsDir) {
            toast.info(`Directory copying started in background: ${Name}`);
        } else {
            toast.info(`File copying started in background: ${Name}`);
        }
        // } else {
        //     toast.error("This remote does not support copying");
        // }

    } else {
        // if (component.props.canMove) {
        await performMoveFile(srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir);
        updateHandler();
        if (IsDir) {
            toast.info(`Directory moving started in background: ${Name}`);
        } else {
            toast.info(`Directory moving started in background: ${Name}`);
        }
        // } else {
        //     toast.error("This remote does not support moving");
        // }

    }
}


const fileComponentSource = {
    canDrag(props) {

        // You can disallow drag based on props
        return true;
    },
    beginDrag(props) {
        // console.log("props", props, props.remoteName);
        const {Name, Path, IsDir} = props.item;
        return {
            Name: Name, Path: Path, IsDir: IsDir, remoteName: props.remoteName, remotePath: props.remotePath
        }
    },

    endDrag(props, monitor, component) {
        // console.log("EndDrag", monitor.getDropResult());
        console.log(props, "Component:", component);
        try {
            if (monitor.getDropResult() && component) {
                performCopyMoveOperation(monitor.getDropResult());
            }
        } catch (e) {
            const error = e.response ? e.response : e;
            console.log(JSON.stringify(error));

            toast.error(`Error copying file(s). ${error}`, {
                autoClose: false
            });

        }
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

function FileIcon({IsDir, MimeType}, ...props) {
    let className = "fa-file";
    if (IsDir) {
        className = "fa-folder";
    } else if (MimeType === "application/pdf") {
        className = "fa-file-pdf-o";
    } else if (MimeType === "image/jpeg") {
        className = "fa-file-image-o";
    } else if (MimeType === "application/rar" || MimeType === "application/x-rar-compressed" || MimeType === " application/zip") {
        className = "fa-file-archive-o";
    } else if (MimeType === "text/plain") {
        className = "fa-file-text-o";
    } else if (MimeType === "text/x-vcard") {
        className = "fa-address-card-o";
    }
    return <i className={className + " fa fa-lg"}/>;
}

function confirmDelete(deleteHandle, item) {
    if (window.confirm(`Are you sure you want to delete ${item.Name}`)) {
        deleteHandle(item);
    }
}

function Actions({downloadHandle, deleteHandle, item, linkShareHandle}) {

    const {IsDir} = item;
    // let {ID, Name} = item;
    // // Using fallback as fileName when the ID is not available (for local file system)
    // if (ID === undefined) {
    //     ID = Name;
    // }


    if (!IsDir) {

        return (
            <React.Fragment>
                <Button color="link" onClick={() => downloadHandle(item)}>
                    <i className={"fa fa-cloud-download fa-lg d-inline"}/>
                </Button>
                <Button color="link">
                    <i className="fa fa-info-circle"/>
                </Button>

                <UncontrolledButtonDropdown>
                    <DropdownToggle color="link">
                        <i className="fa fa-ellipsis-v"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Actions</DropdownItem>
                        <DropdownItem onClick={() => linkShareHandle(item)}><i
                            className="fa fa-share fa-lg d-inline"/> Share with link</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={() => confirmDelete(deleteHandle, item)}><i
                            className="fa fa-remove fa-lg d-inline text-danger"/> Delete </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </React.Fragment>

        );
    } else {
        return (
            <React.Fragment>

                <UncontrolledButtonDropdown>
                    <DropdownToggle color="link">
                        <i className="fa fa-ellipsis-v"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Actions</DropdownItem>
                        <DropdownItem onClick={() => linkShareHandle(item)}><i
                            className="fa fa-share fa-lg d-inline"/> Share with link</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={() => confirmDelete(deleteHandle, item)}><i
                            className="fa fa-remove fa-lg d-inline text-danger"/> Delete </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </React.Fragment>
        )
    }
}

/**
 * Main class for individual render of file/directory in the files view.
 */
// Non used props are required for drag-and-drop functionality
class FileComponent extends React.Component {

    /*
    MimeTypes: https://www.freeformatter.com/mime-types-list.html
    * {
    * For Directory
			"ID": "18DsZ4ne6XV3qwDZQCBj2nAEwouFMxudB",
			"IsDir": true,
			"MimeType": "inode/directory",
			"ModTime": "2019-02-12T14:23:33.440Z",
			"Name": "two pass 28-1-19",
			"Path": "two pass 28-1-19",
			"Size": -1
		},
		*
		* // For non-directory
		* {
			"ID": "1u4D6-UdxhJYY8AVd8FcTN2Tl73W1RXsk",
			"IsDir": false,
			"MimeType": "application/octet-stream",
			"ModTime": "2018-11-18T13:14:54.068Z",
			"Name": "streamlined-gdoc.gdoc",
			"Path": "streamlined-gdoc.gdoc",
			"Size": 173
		},

    * */

    handleClick(IsDir, clickHandler, e, item) {
        if (IsDir) {
            clickHandler(e, item)
        }
    }
    render() {
        const {containerID, inViewport, item, loadImages, clickHandler, downloadHandle, linkShareHandle, deleteHandle, connectDragSource, gridMode, itemIdx /*isDragging, remoteName*/} = this.props;

        const {IsDir, MimeType, ModTime, Name, Size} = item;


        let modTime = new Date(Date.parse(ModTime));
        let element;
        if (gridMode === "card") {
            element = connectDragSource(
                <div className={IsDir ? "" : "col-md-4"}>
                    <Card>
                        <CardBody onClick={(e) => this.handleClick(IsDir, clickHandler, e, item)}>

                            {loadImages && isMedia(MimeType) ?
                                <MediaWidget containerID={containerID} item={item} inViewport={inViewport}/> :
                                <FileIcon IsDir={IsDir} MimeType={MimeType}/>
                            }
                            {Name}
                        </CardBody>
                        <CardFooter>
                            <Actions downloadHandle={downloadHandle} linkShareHandle={linkShareHandle}
                                     deleteHandle={deleteHandle} item={item}/>
                        </CardFooter>
                    </Card>
                </div>
            )
        } else {
            element = connectDragSource(
                <tr className={"pointer-cursor"}>
                    <td className="d-none d-md-table-cell"><input type="checkbox"/></td>
                    <td onClick={(e) => clickHandler(e, item)} id={"file" + itemIdx}>
                        <FileIcon IsDir={IsDir} MimeType={MimeType}/> {Name}


                    </td>
                    <td>{Size === -1 ? "-" : formatBytes(Size, 2)}</td>
                    <td className="d-none d-md-table-cell">{modTime.toLocaleDateString()}</td>
                    <td><Actions downloadHandle={downloadHandle} linkShareHandle={linkShareHandle}
                                 deleteHandle={deleteHandle} item={item}/></td>
                </tr>
            )
        }
        return <ErrorBoundary>
            {element}
        </ErrorBoundary>;
    }
}


FileComponent.propTypes = {
    /**
     * Item as returned from the rclone backend
     */
    item: PROP_ITEM.isRequired,
    /**
     * Function which handles the clicks on the current item.
     */
    clickHandler: PropTypes.func.isRequired,
    /**
     * Function to handle the download of the current file
     */
    downloadHandle: PropTypes.func.isRequired,
    /**
     * Function to delete a file.
     */
    deleteHandle: PropTypes.func.isRequired,
    /**
     * Function to share the link of a file.
     */
    linkShareHandle: PropTypes.func.isRequired,
    /**
     * Name of the remote containing the {item}.
     */
    remoteName: PropTypes.string.isRequired,
    /**
     * Remote path of the current item. remoteName + remotePath gives the full path.
     */
    remotePath: PropTypes.string.isRequired,
    /**
     * Denotes the current grid mode:
     * card: Card mode with Media support.
     */
    gridMode: PropTypes.string,
    /**
     * Container ID of the FilesExplorer this component is contained in.
     */
    containerID: PropTypes.string.isRequired,
    /**
     * Boolean value to represent if the current item can be moved to another destination.
     */
    canMove: PropTypes.bool.isRequired,
    /**
     * Boolean value to represent if the current item can be copied to another destination.
     */
    canCopy: PropTypes.bool.isRequired,
    /**
     * Boolean value to represent if loading media files is enabled by the user.
     */
    loadImages: PropTypes.bool.isRequired,
    /**
     * Boolean value to represent if the current remote is bucketbased, the url of a bucket based remote is different.
     */
    isBucketBased: PropTypes.bool.isRequired

};

/**
 * Handles view port to check if the current item is visible on the screen.
 */
const MyViewPort = handleViewport(FileComponent, {rootMargin: '-1.0px'});

export default DragSource(ItemTypes.FILECOMPONENT, fileComponentSource, collect)(MyViewPort);
