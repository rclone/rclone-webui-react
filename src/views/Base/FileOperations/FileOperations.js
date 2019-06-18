import React from 'react';
import {Button, Input} from "reactstrap";
import NewFolder from "../NewFolder/NewFolder";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    changeGridMode,
    changeVisibilityFilter,
    getFilesForContainerID,
    navigateBack,
    navigateFwd
} from "../../../actions/explorerStateActions";
import {visibilityFilteringOptions} from "../../../utils/Constants";

class FileOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFolderModalIsVisible: false
        };
        this.filterOptions = visibilityFilteringOptions;
    }

    openNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: true});
    };

    closeNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: false});
    };

    handleChangeFilter = (e) => {
        const newFilter = e.target.value;

        const {changeVisibilityFilter} = this.props;

        changeVisibilityFilter(this.props.containerID, newFilter);

    };


    handleChangeGridMode = (e) => {
        const gridMode = e.target.value;

        const {changeGridMode} = this.props;

        changeGridMode(this.props.containerID, gridMode);

    };


    render() {
        const {containerID, getFilesForContainerID, visibilityFilter, gridMode, navigateFwd, navigateBack} = this.props;
        const {newFolderModalIsVisible} = this.state;

        return (
            <div>
                <Button color="light" className={"mr-1 btn-outline-dark"}
                        onClick={() => navigateBack(containerID)}><i
                    className={"fa fa-lg fa-angle-left"}/></Button>
                <Button color="light" className={"mr-1 btn-outline-dark"}
                        onClick={() => navigateFwd(containerID)}><i
                    className={"fa fa-lg fa-angle-right"}/></Button>

                <div className="float-right mb-3 mt-1 form-inline">
                    <Button className="mr-1 btn-outline-dark" onClick={this.openNewFolderModal}><i
                        className={"fa fa-lg fa-plus"}/> </Button>

                    <Button className="mr-1 btn-outline-dark"
                            onClick={() => getFilesForContainerID(containerID)}><i
                        className={"fa fa-lg fa-repeat"}/></Button>

                    <NewFolder containerID={containerID} isVisible={newFolderModalIsVisible}
                               closeModal={this.closeNewFolderModal}/>


                    <Input type={"select"} onChange={this.handleChangeFilter} value={visibilityFilter}
                           className="ml-1 mr-1">
                        <option key={0}>None</option>
                        {
                            this.filterOptions.map((item, idx) => {
                                return (<option key={item} value={item}>{item}</option>)
                            })
                        }
                    </Input>
                    <Input type={"select"} onChange={this.handleChangeGridMode} value={gridMode}>
                        <option value={"grid"}>Grid</option>
                        <option value={"card"}>Card</option>
                    </Input>

                </div>
            </div>


        );
    }
}

FileOperations.propTypes = {
    containerID: PropTypes.string.isRequired,
    changeVisibilityFilter: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string,
    gridMode: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    visibilityFilter: state.explorer.visibilityFilters[ownProps.containerID],
    gridMode: state.explorer.gridMode[ownProps.containerID]


});


export default connect(mapStateToProps, {changeVisibilityFilter, changeGridMode, navigateBack, navigateFwd, getFilesForContainerID})(FileOperations);