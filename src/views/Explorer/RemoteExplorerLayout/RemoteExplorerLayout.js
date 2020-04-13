import React from "react";
import {Button, Col, Row} from "reactstrap";
import RemoteExplorer from "../RemoteExplorer";

import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {connect} from "react-redux";
import {compose} from "redux";
import {createPath} from "../../../actions/explorerStateActions";
import * as PropTypes from 'prop-types';
import {changeDistractionFreeMode, changeNumCols} from "../../../actions/explorerActions";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";

import singlePaneImg from '../../../assets/img/single-pane.png';
import doublePaneImg from '../../../assets/img/double-pane1.png';
import triplePaneImg from '../../../assets/img/triple-pane.png';
import TabsLayout from "../TabsLayout/TabsLayout";


class RemoteExplorerLayout extends React.Component {


    changeLayout = (nos, mode) => {
        const {changeNumCols} = this.props;
        // Check if the current layout is not same as previous
        if(nos !== changeNumCols){
            changeNumCols(nos, mode);
        }
    };

    componentDidMount() {
        //Load one explorer layout
        const {numCols, changeNumCols} = this.props;

        if (numCols < 1) {
            changeNumCols(1, "horizontal");
        }
    }

    toggleDistractionFreeMode = (e) => {
        const {distractionFreeMode, changeDistractionFreeMode} = this.props;
        // this.setState((prevState) => ({
        //     distractionFreeMode: !prevState.distractionFreeMode
        // }));
        changeDistractionFreeMode(!distractionFreeMode);

    };

    Panes = ({numCols, activeRemoteContainerID, distractionFreeMode}) => {
        let returnData = [];
        const lgSize = 12 / numCols;
        for (let i = 0; i < numCols; i++) {
            returnData.push((
                <Col lg={lgSize} key={i}>
                    <Row>
                        <Col lg={12}>
                            <TabsLayout paneID={i}/>
                        </Col>
                    </Row>
                    {activeRemoteContainerID && activeRemoteContainerID[i] && activeRemoteContainerID[i] !== "" &&
                    <RemoteExplorer containerID={activeRemoteContainerID[i]}
                                    distractionFreeMode={distractionFreeMode}/>}

                </Col>
            ))
        }
        return returnData;
    };

    render() {

        /*Divide the 12 bootstrap columns to fit number of explorers*/
        const {numCols, distractionFreeMode, activeRemoteContainerID} = this.props;
        return (
            <ErrorBoundary>
                <Row className={"d-none d-md-block"} data-test="remoteExplorerLayout">

                    {distractionFreeMode && <div className="clearfix float-right">
                        <Button color={"success"} className={"ml-2"}
                                onClick={this.toggleDistractionFreeMode}><i className="fa fa-arrows"/></Button>
                    </div>}

                    {(!distractionFreeMode) &&
                    <Col sm={12} lg={12} className="mb-3">
                            

                        <span className="text-choose-layout">
                            Choose Layout: {"  "}
                        </span>

                        <Button color={"primary"} className={"ml-2 layout-change-button"}
                                onClick={() => this.changeLayout(1, "horizontal")}>
                            <img style={{height: 24}} src={singlePaneImg} alt="Single Vertical Pane"/>
                        </Button>
                        <Button color={"primary"} className={"ml-2 layout-change-button"}
                                onClick={() => this.changeLayout(2, "horizontal")}>
                            <img style={{height: 24}} src={doublePaneImg} alt="Double Vertical Pane"/>
                        </Button>
                        <Button color={"primary"} className={"ml-2 layout-change-button"}
                                onClick={() => this.changeLayout(3, "horizontal")}>
                            <img style={{height: 24}} src={triplePaneImg} alt="Triple Vertical Pane"/>
                        </Button>

                        <Button color={"success"} className={"ml-2"}
                                onClick={this.toggleDistractionFreeMode}><i className="fa fa-arrows"/> Full Screen
                        </Button>
                        {/*<Button onClick={this.changeLayout(4,"grid")}>4 - grid</Button>*/}

                    </Col>
                    }
                </Row>

                <Row>
                    <this.Panes
                        numCols={numCols}
                        distractionFreeMode={distractionFreeMode}
                        activeRemoteContainerID={activeRemoteContainerID}
                    />
                </Row>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => ({
    backStacks: state.explorer.backStacks,
    numCols: state.remote.numCols,
    distractionFreeMode: state.remote.distractionFreeMode,
    splitMode: state.remote.splitMode,
    activeRemoteContainerID: state.remote.activeRemoteContainerID,
    containers: state.remote.containers,
});

RemoteExplorerLayout.propTypes = {
    backStacks: PropTypes.object.isRequired,
    createPath: PropTypes.func.isRequired,
    changeNumCols: PropTypes.func.isRequired,
    distractionFreeMode: PropTypes.bool.isRequired
};

export default compose(
    connect(mapStateToProps, {createPath, changeNumCols, changeDistractionFreeMode}),
    DragDropContext(HTML5Backend)
)(RemoteExplorerLayout);
