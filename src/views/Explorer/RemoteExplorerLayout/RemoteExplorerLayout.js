import React from "react";
import {Button, Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import RemoteExplorer from "../RemoteExplorer";

import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {connect} from "react-redux";
import {compose} from "redux";
import {createPath} from "../../../actions/explorerStateActions";
import * as PropTypes from 'prop-types';
import {changeDistractionFreeMode, changeNumCols} from "../../../actions/explorerActions";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";


function RemoteExplorerList({cols, distractionFreeMode}) {
    let remoteExplorers = [];
    const lgSize = 12 / cols;
    for (let i = 0; i < cols; i++) {

        remoteExplorers.push((
            <Col xs={12} sm={12} md={lgSize} lg={lgSize} key={i}>

                <RemoteExplorer containerID={i.toString()} distractionFreeMode={distractionFreeMode}/>
            </Col>
        ));
    }
    return remoteExplorers;
}

class RemoteExplorerLayout extends React.Component {


    constructor(props) {
        super(props);
        this.changeLayout = this.changeLayout.bind(this);
    }

    changeLayout = (nos, mode) => {
        const {changeNumCols} = this.props;
        // console.log("changing layout");
        if (mode === "side" && nos !== changeNumCols) {
            changeNumCols(nos);
        }
    };

    componentDidMount() {
        //Load one explorer layout
        const {numCols, changeNumCols} = this.props;

        if (numCols < 1) {
            changeNumCols(1);
        }
    }

    toggleDistractionFreeMode = (e) => {
        const {distractionFreeMode, changeDistractionFreeMode} = this.props;
        // this.setState((prevState) => ({
        //     distractionFreeMode: !prevState.distractionFreeMode
        // }));
        changeDistractionFreeMode(!distractionFreeMode);

    };

    render() {

        /*Divide the 12 bootstrap columns to fit number of explorers*/
        const {numCols, backStacks, distractionFreeMode} = this.props;

        return (
            <ErrorBoundary>
                <Row className={"d-none d-md-block"} data-test="remoteExplorerLayout">

                    {distractionFreeMode && <div className="clearfix float-right">
                        <Button color={"success"} className={"ml-2"}
                                onClick={this.toggleDistractionFreeMode}><i className="fa fa-arrows"/></Button>
                    </div>}

                    {(!distractionFreeMode) &&
                    <Col sm={12} lg={12}>
                        <Card>

                            <CardHeader>
                                Choose Layout
                            </CardHeader>
                            <CardBody>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(1, "side")}>
                                    1 - side by side
                                </Button>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(2, "side")}>
                                    2 - side by side
                                </Button>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(3, "side")}>
                                    3 - side by side
                                </Button>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(4, "side")}>
                                    4 - side by side
                                </Button>
                                <Button color={"success"} className={"ml-2"}
                                        onClick={this.toggleDistractionFreeMode}><i className="fa fa-arrows"/>
                                </Button>
                                {/*<Button onClick={this.changeLayout(4,"grid")}>4 - grid</Button>*/}
                            </CardBody>
                        </Card>
                    </Col>
                    }
                </Row>


                <Row>
                    <RemoteExplorerList cols={numCols} backStacks={backStacks}
                                        distractionFreeMode={distractionFreeMode}/>
                </Row>


            </ErrorBoundary>
        );
    }
}

const mapStateToProps = (state) => ({
    backStacks: state.explorer.backStacks,
    numCols: state.remote.numCols,
    distractionFreeMode: state.remote.distractionFreeMode
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