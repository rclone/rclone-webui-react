import React from "react";
import {Button, Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import RemoteExplorer from "../RemoteExplorer";

import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";

function RemoteExplorerList({cols}) {
    let remoteExplorers = [];
    const lgSize = 12 / cols;
    for (let i = 0; i < cols; i++) {
        remoteExplorers.push((
            <Col sm={12} lg={lgSize} key={i}>
                <RemoteExplorer/>
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
        this.changeLayout = this.changeLayout.bind(this);
    }

    changeLayout(nos, mode) {
        console.log("changing layout");
        if (mode === "side") {
            this.setState({cols: nos});

        }
    }

    render() {

        /*Divide the 12 bootstrap columns to fit number of explorers*/
        const {cols} = this.state;

        return (
            <div>
                <Row>
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
                    <RemoteExplorerList cols={cols}/>
                </Row>
            </div>
        );
    }


}

export default DragDropContext(HTML5Backend)(RemoteExplorerLayout);