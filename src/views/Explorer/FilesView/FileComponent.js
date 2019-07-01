import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    UncontrolledButtonDropdown
} from "reactstrap";

import {ItemTypes} from './Constants'
import {DragSource} from 'react-dnd'
import {formatBytes} from "../../../utils/Tools";
import axiosInstance, {performCopyFile, performMoveFile} from "../../../utils/API/API";
import {toast} from "react-toastify";
import * as PropTypes from "prop-types";
import {IP_ADDRESS_KEY} from "../../../utils/Constants";


const fileComponentSource = {
    beginDrag(props) {
        // console.log("props", props, props.remoteName);
        const {Name, Path, IsDir} = props.item;
        return {
            Name: Name, Path: Path, IsDir: IsDir, remoteName: props.remoteName, remotePath: props.remotePath
        }
    },

    async endDrag(props, monitor, component) {
        // console.log("EndDrag", monitor.getDropResult());
        console.log(props, "Component:", component);
        try {
            if (monitor.getDropResult() && component) {


                const {srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir, dropEffect, updateHandler} = monitor.getDropResult();

                if (dropEffect === "move") { /*Default operation without holding alt is copy, named as move in react-dnd*/
                    // if (component.props.canCopy) {
                    let res = await performCopyFile(srcRemoteName, srcRemotePath, destRemoteName, destRemotePath, Name, IsDir);
                    console.log("Copy", res);
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
    let {ID, Name} = item;
    // Using fallback as fileName when the ID is not available (for local file system)
    if (ID === undefined) {
        ID = Name;
    }


    if (!IsDir) {

        return (
            <React.Fragment>
                <Button color="link" onClick={() => downloadHandle(item)}>
                    <i className={"fa fa-cloud-download fa-lg d-inline"}/>
                </Button>
                <Button color="link">
                    <i className="fa fa-info-circle"/>
                </Button>
                {/* TODO: Find a way to make this work*/}
                {/*<UncontrolledTooltip placement="right" target={"#tooltip"+ID}>*/}
                {/*    {item}*/}
                {/*</UncontrolledTooltip>*/}

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

// Non used props are required for drag-and-drop functionality
class FileComponent extends React.Component {

    async loadImage(url) {
        this.setState({isLoading: true});

        const res = await axiosInstance.get(url, {
            responseType: 'arraybuffer'
        });
        const imgFile = new Blob([res.data]);
        const imgUrl = URL.createObjectURL(imgFile);
        this.setState({imgUrl: imgUrl, isLoading: false});

    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            imgUrl: ""
        };
        this.loadImage = this.loadImage.bind(this);
    }


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

    componentDidMount() {
        const {item, isBucketBased, /*isDragging, remoteName*/} = this.props;

        const {MimeType} = item;
        let isImage = MimeType === "image/jpeg";

        const ipAddress = localStorage.getItem(IP_ADDRESS_KEY);
        let url;
        if (isImage) {
            const {remoteName, remotePath} = this.props;
            if (isBucketBased) {
                url = ipAddress + `[${remoteName}]/${remotePath}/${item.Name}`;

            } else {
                url = ipAddress + `[${remoteName}:${remotePath}]/${item.Name}`;
            }
        }
        this.loadImage(url);
    }

    render() {
        const {item, loadImages, clickHandler, downloadHandle, linkShareHandle, deleteHandle, connectDragSource, gridMode, itemIdx/*isDragging, remoteName*/} = this.props;

        const {IsDir, MimeType, ModTime, Name, Size} = item;

        const {isLoading, imgUrl} = this.state;

        // console.log("item", item);

        let modTime = new Date(Date.parse(ModTime));
        // console.log("card", gridMode);


        let isImage = MimeType === "image/jpeg";



        if (gridMode === "card") {
            return connectDragSource(
                <div className={IsDir ? "" : "col-md-4"}>
                    <Card>
                        <CardBody onClick={(e) => clickHandler(e, item)}>

                            {loadImages && isImage ?
                                isLoading ? <Spinner>Loading...</Spinner> :
                                    <img className="img-thumbnail pd-0 m-0" src={imgUrl} alt=""/>
                                : <FileIcon IsDir={IsDir} MimeType={MimeType}/>} {Name}
                        </CardBody>
                        <CardFooter>
                            <Actions downloadHandle={downloadHandle} linkShareHandle={linkShareHandle}
                                     deleteHandle={deleteHandle} item={item}/>
                        </CardFooter>
                    </Card>
                </div>
            )
        } else {
            return connectDragSource(
                <tr className={"pointer-cursor"}>
                    <td className="d-none d-md-table-cell"><input type="checkbox"/></td>
                    <td onClick={(e) => clickHandler(e, item)} id={"file" + itemIdx}>
                        <FileIcon IsDir={IsDir} MimeType={MimeType}/> {Name}

                        {/*<UncontrolledTooltip target={"file"+itemIdx} placement="right">*/}
                        {/*    <p><strong>Mime Type: </strong>{MimeType}</p>*/}
                        {/*    <p><strong>Path: </strong>{Path}</p>*/}
                        {/*</UncontrolledTooltip>*/}
                    </td>
                    <td>{Size === -1 ? "-" : formatBytes(Size, 2)}</td>
                    <td className="d-none d-md-table-cell">{modTime.toLocaleDateString()}</td>
                    <td><Actions downloadHandle={downloadHandle} linkShareHandle={linkShareHandle}
                                 deleteHandle={deleteHandle} item={item}/></td>
                </tr>
            )
        }
    }
}


FileComponent.propTypes = {
    item: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired,
    downloadHandle: PropTypes.func.isRequired,
    deleteHandle: PropTypes.func.isRequired,
    linkShareHandle: PropTypes.func.isRequired,
    remoteName: PropTypes.string.isRequired,
    remotePath: PropTypes.string.isRequired,
    gridMode: PropTypes.string,
    containerID: PropTypes.string.isRequired,
    canMove: PropTypes.bool.isRequired,
    canCopy: PropTypes.bool.isRequired,
    loadImages: PropTypes.bool.isRequired,
    isBucketBased: PropTypes.bool.isRequired

};

export default DragSource(ItemTypes.FILECOMPONENT, fileComponentSource, collect)(FileComponent);
