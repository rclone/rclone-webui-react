import React from 'react';
import {Button} from "reactstrap";
import NewFolder from "./NewFolder";
import PropTypes from "prop-types";

class FileOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFolderModalIsVisible: false
        };
    }

    openNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: true})

    };

    closeNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: false});
        this.props.updateHandler();
    };


    render() {
        return (

            <div className="clearfix mb-3">
                <Button color="success" className="ml-2" onClick={this.openNewFolderModal}>New Folder</Button>
                <Button color="success" className="ml-2">Copy from URL</Button>
                {/*<Button color="success" className="ml-2">Copy</Button>*/}
                {/*<Button color="success" className="ml-2">Rename</Button>*/}
                {/*<Button color="success" className="ml-2">Upload</Button>*/}
                <NewFolder isVisible={this.state.newFolderModalIsVisible} closeModal={this.closeNewFolderModal}/>
            </div>

        );
    }
}

FileOperations.propTypes = {
    updateHandler: PropTypes.func.isRequired
};

export default FileOperations;