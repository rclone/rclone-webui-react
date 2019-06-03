import React from "react";
import {Table} from "reactstrap";
import axiosInstance from "../../utils/API";
import ConfigRow from "./ConfigRow";


function RemoteRows({remotes, refreshHandle}) {

    let returnMap = [];
    let curKey = 1;
    for (const [key, value] of Object.entries(remotes)) {
        returnMap.push((<ConfigRow sequenceNumber={curKey} key={key} remoteName={key} remote={value}
                                   refreshHandle={refreshHandle}/>));
        curKey++;
    }
    // return remotes.map((item, idx) => {
    //     console.log(item);
    //     return (<ConfigRow sequenceNumber={idx+1} key={idx} remoteName={item}/>);
    // })
    return returnMap;
}


class ShowConfig extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            remotes: []
        };
        this.loadConfigDump = this.loadConfigDump.bind(this);
    }

    loadConfigDump() {
        try {
            axiosInstance.post("config/dump").then((res) => this.setState({remotes: res.data}));
        } catch (e) {
            console.log(`Error while processing request to get remote list ${e}`);
        }
    }


    componentDidMount() {
        //Get the configs
        this.loadConfigDump();
    }

    render() {
        return (<div>
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
        </div>)
    }
}

export default ShowConfig;
