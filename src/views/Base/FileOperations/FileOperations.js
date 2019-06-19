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
    Row
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
    setSearchQuery
} from "../../../actions/explorerStateActions";
import {visibilityFilteringOptions} from "../../../utils/Constants";
import {getAbout} from "../../../actions/providerStatusActions";
import {Doughnut} from "react-chartjs-2";
import {addColonAtLast, bytesToGB, isLocalRemoteName} from "../../../utils/Tools";
import axiosInstance from "../../../utils/API/API";
import {toast} from "react-toastify";

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
        this.setState({newFolderModalIsVisible: true});
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

    };

    handleCleanTrash = () => {

        const {currentPath, containerID, fsInfo} = this.props;
        let {remoteName} = currentPath;
        if (fsInfo && fsInfo.Features && fsInfo.Features.CleanUp) {
            if (!isLocalRemoteName(remoteName)) {
                remoteName = addColonAtLast(remoteName);
            }

            axiosInstance.post("operations/cleanup", {
                fs: remoteName
            }).then((res) => {
                    if (res.status === 200) {
                        toast('Trash Cleaned');
                        this.props.getAbout(containerID);

                    }
                },
                (err) => {
                    toast.error("Error clearing trash");
                }
            )
        } else {
            // Cleanup is not allowed
            toast.error("Clearing trash is not allowed on this drive");
        }
    };


    render() {
        const {containerID, getFilesForContainerID, visibilityFilter, gridMode, navigateFwd, navigateBack, searchQuery, currentPath, doughnutData} = this.props;
        const {newFolderModalIsVisible, dropdownOpen, isAboutModalOpen} = this.state;

        const {remoteName, remotePath} = currentPath;

        // const pathBreadCrumbs = remotePath.split('/');
        // pathBreadCrumbs.map((item, idx) => {
        //     return (<li key={idx}
        //                 className={["breadcrumb-item ", idx === pathBreadCrumbs.length ? "active" : ""]}>{item}</li>)
        // });

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
                            <Button className="mr-1 btn-outline-dark" onClick={this.openNewFolderModal}><i
                                className={"fa fa-lg fa-plus"}/> </Button>
                            <Button className="mr-1 btn-outline-dark"
                                    onClick={() => getFilesForContainerID(containerID)}><i
                                className={"fa fa-lg fa-repeat"}/></Button>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button type="button" color="primary"><i className="fa fa-search"/> Search</Button>
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
                                            <option value={"grid"}>Grid</option>
                                            <option value={"card"}>Card</option>
                                        </Input>

                                    </DropdownItem>
                                    <DropdownItem>File Filter{' '}
                                        <Input type={"select"} onClick={(e) => e.stopPropagation()}
                                               onChange={this.handleChangeFilter} value={visibilityFilter}
                                               className="ml-1 mr-1">
                                            <option key={0}>None</option>
                                            {
                                                this.filterOptions.map((item, idx) => {
                                                    return (<option key={item} value={item}>{item}</option>)
                                                })
                                            }
                                        </Input>
                                    </DropdownItem>
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
                                        <p>Space Usage (in GB)</p>
                                        {doughnutData ? <Doughnut data={doughnutData}/> : <p>Loading</p>}
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
    containerID: PropTypes.string.isRequired,
    changeVisibilityFilter: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string,
    gridMode: PropTypes.string,
    setSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string,
    remoteAbout: PropTypes.object,
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

    return {
        visibilityFilter: state.explorer.visibilityFilters[ownProps.containerID],
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
    getAbout
})(FileOperations);