import React from "react";
import {Button, Col, Row, Table} from "reactstrap";
import axiosInstance from "../../utils/API";
import ConfigRow from "./ConfigRow";
import {toast} from "react-toastify";


function RemoteRows({remotes, refreshHandle}) {

    let returnMap = [];
    let curKey = 1;
    for (const [key, value] of Object.entries(remotes)) {
        returnMap.push((<ConfigRow sequenceNumber={curKey} key={key} remoteName={key} remote={value}
                                   refreshHandle={refreshHandle}/>));
        curKey++;
    }
    return returnMap;
}


class ShowConfig extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            remotes: []
        };
        this.loadConfigDump = this.loadConfigDump.bind(this);
    }

    async loadConfigDump() {
        try {
            let res = await axiosInstance.post("config/dump");
            this.setState({remotes: res.data});
        } catch (e) {
            console.log(`Error while processing request to get remote list ${e}`);
            toast.error(`Error loading remotes list. ${e}`, {
                autoClose: false
            });
        }
    }


    componentDidMount() {
        //Get the configs
        this.loadConfigDump();
    }

    render() {


        return (
            <div>
                <Row>
                    <Col lg={8}/>
                    <Col lg={4} className={"mb-3"}>
                        <Button color={"primary"} className={"float-right"}
                                onClick={() => this.props.history.push("/newdrive")}>
                            New Config
                        </Button>
                    </Col>

                </Row>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <RemoteRows remotes={this.state.remotes} refreshHandle={this.loadConfigDump}/>
                    </tbody>
                </Table>
            </div>
        )

    }
}

export default ShowConfig;
