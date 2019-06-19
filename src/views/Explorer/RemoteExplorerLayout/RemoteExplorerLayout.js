import React from "react";
import {Button, Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import RemoteExplorer from "../RemoteExplorer";

import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {connect} from "react-redux";
import {compose} from "redux";
import {createPath} from "../../../actions/explorerStateActions";
import * as PropTypes from 'prop-types';


function RemoteExplorerList({cols}) {
    let remoteExplorers = [];
    const lgSize = 12 / cols;
    for (let i = 0; i < cols; i++) {

        remoteExplorers.push((
            <Col xs={12} sm={12} md={lgSize} lg={lgSize} key={i}>
                <RemoteExplorer containerID={i.toString()}/>
            </Col>
        ));
    }
    return remoteExplorers;
}

class RemoteExplorerLayout extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            cols: 1
        };

        this.props.createPath("0");
        this.changeLayout = this.changeLayout.bind(this);
    }

    changeLayout(nos, mode) {
        const {backStacks, createPath} = this.props;
        // console.log("changing layout");
        if (mode === "side") {
            for (let i = 0; i < nos; i++) {
                if (!backStacks[i.toString()])
                    createPath(i.toString())
            }
            this.setState({cols: nos});
        }

    }

    render() {

        /*Divide the 12 bootstrap columns to fit number of explorers*/
        const {cols} = this.state;
        const {backStacks} = this.props;

        return (
            <React.Fragment>
                <Row className={"d-none d-md-block"} data-test="remoteExplorerLayout">
                    <Col sm={12} lg={12}>
                        <Card>
                            <CardHeader>
                                Choose Layout
                            </CardHeader>
                            <CardBody>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(1, "side")}>1 - side by side</Button>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(2, "side")}>2 - side by side</Button>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(3, "side")}>3 - side by side</Button>
                                <Button color={"primary"} className={"ml-2"}
                                        onClick={() => this.changeLayout(4, "side")}>4 - side by side</Button>
                                {/*<Button onClick={this.changeLayout(4,"grid")}>4 - grid</Button>*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <RemoteExplorerList cols={cols} backStacks={backStacks}/>
                </Row>


            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    backStacks: state.explorer.backStacks,

});

RemoteExplorerLayout.propTypes = {
    backStacks: PropTypes.object.isRequired,
    createPath: PropTypes.func.isRequired
};

export default compose(
    connect(mapStateToProps, {createPath}),
    DragDropContext(HTML5Backend)
)(RemoteExplorerLayout);