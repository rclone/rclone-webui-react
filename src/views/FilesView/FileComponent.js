import React from "react";
import {Button, Card, CardBody, CardFooter} from "reactstrap";

import {ItemTypes} from './Constants'
import {DragSource} from 'react-dnd'
import {formatBytes} from "../../utils/Tools";
import {performCopyFile, performMoveFile} from "../../utils/API";
import {toast} from "react-toastify";
import {compose} from "redux";
import {connect} from "react-redux";


const fileComponentSource = {
    beginDrag(props) {
        console.log("props", props, props.remoteName);
        const {Name, Path, IsDir} = props.item;
        return {
            Name: Name, Path: Path, IsDir: IsDir, remoteName: props.remoteName
        }
    },

    async endDrag(props, monitor, component) {
        // console.log("EndDrag", monitor.getDropResult());
        try {
            if (monitor.getDropResult()) {


                const {srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir, dropEffect, updateHandler} = monitor.getDropResult();

                if (dropEffect === "move") { /*Default operation without holding alt is copy, named as move in react-dnd*/
                    if (component.fsInfo.Features.Copy) {
                        await performCopyFile(srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir);
                        updateHandler();
                        if (IsDir) {
                            toast.info(`Directory copied: ${Name}`);
                        } else {
                            toast.info(`File copied: ${Name}`);
                        }
                    } else {
                        toast.error("This remote does not support copying");
                    }

                } else {
                    if (component.fsInfo.Features.Move) {
                        await performMoveFile(srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir);
                        updateHandler();
                        if (IsDir) {
                            toast.info(`Directory moved: ${Name}`);
                        } else {
                            toast.info(`File moved: ${Name}`);
                        }
                    } else {
                        toast.error("This remote does not support moving");
                    }

                }
            }
        } catch (e) {
            const error = e.response ? e.response : e;
            console.log(JSON.stringify(error));

            toast.error(`Error copying file(s). ${error.data.error}`, {
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


// TODO: Add mode parameter for card view or list view
function FileIcon({IsDir, MimeType}) {
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

function Actions({downloadHandle, deleteHandle, item}) {

    const {IsDir} = item;

    if (!IsDir) {

        return (
            <React.Fragment>
                <Button color="link" onClick={() => downloadHandle(item)}>
                    <i className={"fa fa-cloud-download fa-lg d-inline"}/>
                </Button>
                <Button color="link" className="text-danger" onClick={() => confirmDelete(deleteHandle, item)}>
                    <i className={"fa fa-remove fa-lg d-inline"}/>
                </Button>
            </React.Fragment>

        );
    } else {
        return (
            <Button color="link" className="text-danger" onClick={() => confirmDelete(deleteHandle, item)}>
                <i className={"fa fa-remove fa-lg d-inline"}/>
            </Button>
        )
    }
}

// Non used props are required for drag-and-drop functionality
function FileComponent({item, clickHandler, downloadHandle, deleteHandle, connectDragSource, gridMode/*isDragging, remoteName*/}, ...props) {
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
    const {IsDir, MimeType, ModTime, Name, Size} = item;

    let modTime = new Date(Date.parse(ModTime));
    // console.log("card", gridMode);

    if (gridMode === "card") {
        return connectDragSource(
            <div className={"col-lg-3"}>
                <Card>
                    <CardBody>
                        <FileIcon IsDir={IsDir} MimeType={MimeType}/> {Name}
                    </CardBody>
                    <CardFooter>
                        <Actions downloadHandle={downloadHandle} deleteHandle={deleteHandle} item={item}/>
                    </CardFooter>
                </Card>
            </div>
        )
    } else {
        return connectDragSource(
            <tr className={"pointer-cursor"}>
                <td><input type="checkbox"/></td>
                <td onClick={(e) => clickHandler(e, item)}><FileIcon IsDir={IsDir} MimeType={MimeType}/> {Name}</td>
                <td>{Size === -1 ? "NA" : formatBytes(Size, 2)}</td>
                <td>{modTime.toLocaleDateString()}</td>
                <td><Actions downloadHandle={downloadHandle} deleteHandle={deleteHandle} item={item}/></td>
            </tr>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentPath = state.explorer.currentPaths[ownProps.containerID];

    let fsInfo = {};

    if (currentPath && state.remote.configs && state.remote.configs[currentPath.remoteName]) {
        fsInfo = state.remote.configs[currentPath.remoteName];
    }


    return {
        // files,
        // currentPath,
        fsInfo,
        // gridMode
    }
};

export default compose(
    connect(
        mapStateToProps, {}
    ),
    DragSource(ItemTypes.FILECOMPONENT, fileComponentSource, collect)
)(FileComponent)
