import React from 'react';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import NewFolder from "../NewFolder/NewFolder";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    changeGridMode,
    changeVisibilityFilter,
    getFilesForContainerID,
    navigateBack,
    navigateFwd,
    setLoadImages,
    setSearchQuery
} from "../../../actions/explorerStateActions";
import {visibilityFilteringOptions} from "../../../utils/Constants";
import {getAbout} from "../../../actions/providerStatusActions";
import {Doughnut} from "react-chartjs-2";
import {addColonAtLast, bytesToGB, isEmpty, isLocalRemoteName} from "../../../utils/Tools";
import axiosInstance from "../../../utils/API/API";
import {toast} from "react-toastify";
import {PROP_FS_INFO} from "../../../utils/RclonePropTypes";
import urls from "../../../utils/API/endpoint";

/**
 * File Operations component which handles user actions for files in the remote.( Visibility, gridmode, back, forward etc)
 */
class FileOperations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newFolderModalIsVisible: false,
            isAboutModalOpen: false,
            dropdownOpen: false
        };
        this.filterOptions = visibilityFilteringOptions;
    }

    openNewFolderModal = () => {
        const {fsInfo} = this.props;
        if (fsInfo && fsInfo.Features && fsInfo.Features.CanHaveEmptyDirectories) {
            this.setState({newFolderModalIsVisible: true});
        } else {
            toast.error("This remote cannot have empty directories");
        }
    };

    closeNewFolderModal = () => {
        this.setState({newFolderModalIsVisible: false});
    };

    handleChangeFilter = (e) => {
        const newFilter = e.target.value;

        const {changeVisibilityFilter} = this.props;

        changeVisibilityFilter(this.props.containerID, newFilter);
        this.toggleDropDown();

    };


    handleChangeGridMode = (e) => {

        const gridMode = e.target.value;

        const {changeGridMode} = this.props;

        changeGridMode(this.props.containerID, gridMode);
        this.toggleDropDown();

    };

    changeSearch = (e) => {
        e.preventDefault();
        const {containerID} = this.props;
        this.props.setSearchQuery(containerID, e.target.value);
    };


    toggleDropDown = () => {
        this.setState((prevState) => {
            return {
                dropdownOpen: !prevState.dropdownOpen
            }
        })
    };

    toggleAboutModal = () => {
        const {fsInfo} = this.props;
        if (fsInfo && fsInfo.Features && fsInfo.Features.About) {
            this.setState((prevState) => {
                return {
                    isAboutModalOpen: !prevState.isAboutModalOpen
                }
            }, () => {
                if (this.state.isAboutModalOpen) {
                    const {containerID} = this.props;
                    this.props.getAbout(containerID);
                }
            });
        } else {
            toast.error("This remote does not support About");
        }

    };

    handleCleanTrash = () => {
        const {fsInfo} = this.props;
        if (fsInfo && fsInfo.Features && fsInfo.Features.CleanUp) {

            if (window.confirm("Are you sure you want to clear the trash. This operation cannot be undone")) {

                const {currentPath, containerID} = this.props;
                let {remoteName} = currentPath;

                if (!isLocalRemoteName(remoteName)) {
                    remoteName = addColonAtLast(remoteName);
                }

                axiosInstance.post(urls.cleanUpRemote, {
                    fs: remoteName
                }).then((res) => {
                        if (res.status === 200) {
                            toast('Trash Cleaned');
                            this.props.getAbout(containerID);

                        }
                    },
                    (err) => {
                        toast.error("Error clearing trash " + err);
                    }
                )
            }
        } else {
            // Cleanup is not allowed
            toast.error("Clearing trash is not allowed on this remote");
        }
    };

    changeLoadMedia = (e) => {
        e.stopPropagation();
        // console.log(e);
        const {setLoadImages, containerID, loadImages} = this.props;
        setLoadImages(containerID, !loadImages);
    };


    render() {
        const {containerID, loadImages, getFilesForContainerID, visibilityFilter, gridMode, navigateFwd, navigateBack, searchQuery, currentPath, doughnutData} = this.props;
        const {newFolderModalIsVisible, dropdownOpen, isAboutModalOpen} = this.state;

        const {remoteName, remotePath} = currentPath;

        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">{remoteName}:/</li>

                    {remotePath}
                    <li className="breadcrumb-menu">
                        <div className="btn-group" role="group"
                             aria-label="Button group with nested dropdown">
                            {/*<a className="btn" href="#"><i className="cui-speech"></i></a>*/}
                            {/*<a className="btn" href="#"><i className="cui-graph"></i> Dashboard</a>*/}
                            <Button onClick={this.toggleAboutModal} className="btn"><i
                                className="cui-settings"/> Settings</Button>
                        </div>
                    </li>
                </ol>
                <div>
                    <Button color="light" className={"mr-1 btn-outline-dark"}
                            onClick={() => navigateBack(containerID)}><i
                        className={"fa fa-lg fa-angle-left"}/></Button>
                    <Button color="light" className={"mr-1 btn-outline-dark"}
                            onClick={() => navigateFwd(containerID)}><i
                        className={"fa fa-lg fa-angle-right"}/></Button>


                    <div className="float-right mb-3 mt-1 form-inline">

                        <ButtonGroup>
                            <Button className="mr-1 btn-outline-dark" id="CreateFolderButton"
                                    onClick={this.openNewFolderModal}><i
                                className={"fa fa-lg fa-plus"}/> </Button>
                            <UncontrolledTooltip placement="right" target="CreateFolderButton">
                                Create a new Folder
                            </UncontrolledTooltip>
                            <Button className="mr-1 btn-outline-dark" id="RefreshButton"
                                    onClick={() => getFilesForContainerID(containerID)}><i
                                className={"fa fa-lg fa-repeat"}/></Button>
                            <UncontrolledTooltip placement="right" target="RefreshButton">
                                Refresh Files
                            </UncontrolledTooltip>
                            <Button className={"mr-1 " + (loadImages ? "btn-dark" : "btn-outline-dark")}
                                    onClick={this.changeLoadMedia}><i
                                className={"fa fa-lg fa-picture-o"} id="LoadMediaButton"/></Button>
                            <UncontrolledTooltip placement="right" target="LoadMediaButton">
                                Load Media
                            </UncontrolledTooltip>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button style={{zIndex: 1}} type="button" color="primary"><i
                                        className="fa fa-search"/> Search</Button>
                                </InputGroupAddon>
                                <Input type="text" id="input1-group2" placeholder="Search" value={searchQuery}
                                       onChange={this.changeSearch}/>
                            </InputGroup>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggleDropDown}>
                                <DropdownToggle caret>
                                    More
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>View Type{' '}
                                        <Input type={"select"} onClick={(e) => e.stopPropagation()}
                                               onChange={this.handleChangeGridMode} value={gridMode}>
                                            <option value={"grid"}>Table</option>
                                            <option value={"card"}>Card</option>
                                        </Input>

                                    </DropdownItem>
                                    <DropdownItem>File Filter{' '}
                                        <Input type={"select"}
                                               onClick={(e) => e.stopPropagation()/*Stop propagation is required to prevent parent dropdown from closing.*/}
                                               onChange={this.handleChangeFilter} value={visibilityFilter}
                                               className="ml-1 mr-1">
                                            <option key={0}>None</option>
                                            {
                                                this.filterOptions.map((item, _) => {
                                                    return (<option key={item} value={item}>{item}</option>)
                                                })
                                            }
                                        </Input>
                                    </DropdownItem>
                                    {/*{gridMode !== "grid" &&*/}
                                    {/*<DropdownItem onClick={this.changeLoadMedia}>Load Media{' '}*/}

                                    {/*    <Input id={"loadImg" + containerID} checked={loadImages} type="checkbox"*/}
                                    {/*           onClick={(e) => e.stopPropagation()}*/}
                                    {/*           onChange={this.changeLoadMedia/*Stop propagation is required to prevent parent dropdown from closing.*!/*/}
                                    {/*           className="ml-1 mr-1">*/}
                                    {/*    </Input>*/}
                                    {/*</DropdownItem>*/}
                                    {/*}*/}
                                </DropdownMenu>

                            </ButtonDropdown>
                        </ButtonGroup>


                        <NewFolder containerID={containerID} isVisible={newFolderModalIsVisible}
                                   closeModal={this.closeNewFolderModal}/>

                        <Modal isOpen={isAboutModalOpen} toggle={this.toggleAboutModal}>
                            <ModalHeader>
                                Status for {remoteName}
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm={12}>
                                        <div className="chart-wrapper">
                                            <p>Space Usage (in GB)</p>
                                            {doughnutData && !isEmpty(doughnutData) ? <Doughnut data={doughnutData}/> :
                                                <React.Fragment><Spinner color="primary"/>Loading</React.Fragment>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Button color="danger" onClick={this.handleCleanTrash}>Clean Trash <i
                                            className="fa fa-lg fa-trash"/></Button>
                                    </Col>
                                </Row>

                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>

                        </Modal>

                    </div>
                </div>
            </nav>


        );
    }
}

FileOperations.propTypes = {
    /**
     * Container ID of the current remote explorer
     */
    containerID: PropTypes.string.isRequired,
    /**
     * Redux function to change the visibility of images/ pdf etc.
     */
    changeVisibilityFilter: PropTypes.func.isRequired,
    /**
     * The current visibility filter setting
     */
    visibilityFilter: PropTypes.string,
    /**
     * Render mode: Grid/Card
     */
    gridMode: PropTypes.string,
    /**
     * Redux function to set the search query as typed by user.
     */
    setSearchQuery: PropTypes.func.isRequired,
    /**
     * Currently set search Query from redux
     */
    searchQuery: PropTypes.string,
    /**
     * A map which gives the information about the remote about.
     */
    remoteAbout: PropTypes.object,
    /**
     * File system information and features about the current remote
     */
    fsInfo: PROP_FS_INFO,
    /**
     * Map of data to be passed to the doughnutChart.
     */
    doughnutData: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const remoteAbout = state.providerStatus.about[ownProps.containerID];
    let doughnutData = {};
    const currentPath = state.explorer.currentPaths[ownProps.containerID];
    let fsInfo = {};

    if (currentPath && state.remote.configs && state.remote.configs[currentPath.remoteName]) {
        fsInfo = state.remote.configs[currentPath.remoteName];
    }

    if (remoteAbout) {

        let labels = [];
        let data = [];

        for (const [key, value] of Object.entries(remoteAbout)) {
            if (key !== "total") {
                labels.push(key);
                data.push(bytesToGB(value).toFixed(2));
            }
        }
        if (labels.length > 1 && data.length > 1) {
            doughnutData = {
                labels: labels, datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#ff7459',
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#ff7459',
                        ],
                    }
                ]
            };
        }
    }

    return {
        visibilityFilter: state.explorer.visibilityFilters[ownProps.containerID],
        loadImages: state.explorer.loadImages[ownProps.containerID],
        currentPath: state.explorer.currentPaths[ownProps.containerID],
        gridMode: state.explorer.gridMode[ownProps.containerID],
        searchQuery: state.explorer.searchQueries[ownProps.containerID],
        fsInfo,
        doughnutData

    }
};


export default connect(mapStateToProps, {
    changeVisibilityFilter,
    changeGridMode,
    navigateBack,
    navigateFwd,
    getFilesForContainerID,
    setSearchQuery,
    getAbout,
    setLoadImages
})(FileOperations);
