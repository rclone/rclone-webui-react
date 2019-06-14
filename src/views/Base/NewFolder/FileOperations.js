import React from 'react';
import {Button} from "reactstrap";
import NewFolder from "./NewFolder";
import PropTypes from "prop-types";
import Input from "reactstrap/es/Input";
import {connect} from "react-redux";
import {changeGridMode, changeVisibilityFilter} from "../../../actions/explorerStateActions";

class FileOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFolderModalIsVisible: false
        };
        this.filterOptions = ["Images", "Pdf", "Videos"];
    }

    openNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: true})
    };

    closeNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: false});
        // this.props.updateHandler();
    };

    handleChangeFilter = (e) => {
        const newFilter = e.target.value;

        this.props.changeVisibilityFilter(this.props.containerID, newFilter);

    };


    handleChangeGridMode = (e) => {
        const gridMode = e.target.value;

        this.props.changeGridMode(this.props.containerID, gridMode);

    };


    render() {

        return (

            <div className="float-right mb-3 mt-1 form-inline">
                <Button color="success" className="mr-1" onClick={this.openNewFolderModal}>New Folder</Button>
                {/*<Button color="success" className="ml-2">Copy from URL</Button>*/}
                {/*<Button color="success" className="ml-2">Copy</Button>*/}
                {/*<Button color="success" className="ml-2">Rename</Button>*/}
                {/*<Button color="success" className="ml-2">Upload</Button>*/}
                <NewFolder containerID={this.props.containerID} isVisible={this.state.newFolderModalIsVisible}
                           closeModal={this.closeNewFolderModal}/>


                <Input type={"select"} onChange={this.handleChangeFilter} value={this.props.visibilityFilter}
                       className="ml-1 mr-1">
                    <option key={0}>None</option>
                    {
                        this.filterOptions.map((item, idx) => {
                            return (<option key={item} value={item}>{item}</option>)
                        })
                    }
                </Input>
                <Input type={"select"} onChange={this.handleChangeGridMode} value={this.props.gridMode}>
                    <option value={"grid"}>Grid</option>
                    <option value={"card"}>Card</option>
                </Input>

            </div>


        );
    }
}

FileOperations.propTypes = {
    updateHandler: PropTypes.func.isRequired,
    containerID: PropTypes.string.isRequired,
    changeVisibilityFilter: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string,
    gridMode: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    visibilityFilter: state.explorer.visibilityFilters[ownProps.containerID],
    gridMode: state.explorer.gridMode[ownProps.containerID]


});


export default connect(mapStateToProps, {changeVisibilityFilter, changeGridMode})(FileOperations);