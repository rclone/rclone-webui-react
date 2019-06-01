import React from "react";
import "../../utils/Global.js";
import BandwidthWidget from "../Base/Widgets/BandwidthWidget";

class BandwidthStatusCard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (<BandwidthWidget icon="icon-speedometer" color="danger" header="100 Mbps" value="25">Current
            bandwidth</BandwidthWidget>)
    }
}


export default BandwidthStatusCard;