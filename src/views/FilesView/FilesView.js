import React from "react";
import Table from "reactstrap/es/Table";
import {formatBytes} from "../../utils/Tools";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/API";

const propTypes = {
    remoteName: PropTypes.string.isRequired,
    remotePath: PropTypes.string.isRequired,
    updateRemotePathHandle: PropTypes.func.isRequired,
};

const defaultProps = {
    remotePath: "",
};

// TODO: return a file-icon based on the directory and mimeType attribute
function FileIcon({IsDir, MimeType}) {
    return null;
}

// TODO: Add mode parameter for card view or list view
function FileComponent({item}) {
    /*
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
    const {IsDir, MimeType, ModTime, Name, Path, Size} = item;
    return (
        <tr>
            <th><FileIcon IsDir={IsDir} MimeType={MimeType}/> {Name}</th>
            <td>{Size === -1 ? "NA" : formatBytes(Size, 2)}</td>
            {/*TODO: change the time format to required time using timezone as well*/}
            <td>{ModTime}</td>
        </tr>
    )
}

class FilesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filesList: [],
            isLoading: false,
        }
    }

    componentDidMount() {
        const {remoteName, remotePath} = this.props;
        console.log("component did mount FilesView");
        this.getFilesList(remoteName, remotePath);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {remoteName, remotePath} = this.props;
        if (prevProps.remoteName !== remoteName || prevProps.remotePath !== remotePath) {
            this.getFilesList();
        }
    }


    async getFilesList() {
        let {remoteName, remotePath} = this.props;

        if (remoteName !== "") {

            console.log(remoteName, remotePath);

            if (remoteName[-1] !== ":") {
                remoteName = remoteName + ":"
            }
            let data = {
                fs: remoteName,
                remote: remotePath
            };
            this.setState({isLoading: true});
            let res = await axiosInstance.post("/operations/list", data);
            console.log(res);

            this.setState({filesList: res.data.list, isLoading: false});
        }
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (<div>Loading</div>);
        } else {
            const {filesList} = this.state;
            if (filesList.length > 0) {
                let fileComponentMap = filesList.map((item, idx) => {
                    return (<FileComponent key={item.ID} item={item}/>)
                });
                return (
                    <Table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Modified</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fileComponentMap}
                        </tbody>
                    </Table>

                );
            } else if (this.state.remoteName === "") {
                return (<div>No remote is selected. Select a remote from above to show files</div>);
            } else {
                return (<div>No files to display</div>);
            }
        }
    }
}

FilesView.propTypes = propTypes;
FilesView.defaultProps = defaultProps;

export default FilesView;