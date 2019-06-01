import React from 'react';
import {Col, Row} from "reactstrap";
import BackendStatusCard from "../BackendStatusCard/BackendStatusCard";
import "../../utils/Global";
import BandwidthStatusCard from "../BandwidthStatusCard/BandwidthStatusCard";

class Home extends React.Component {


    render() {
        return (<div>
            <p>Welcome to Rclone dashboard. Begin by creating a new drive from the left sidebar.</p>
            <Row>
                <Col lg={4} sm={12}>
                    <BackendStatusCard ipAddress={global.ipAddress} mode={"card"}/>
                </Col>
                <Col lg={4} sm={12}>
                    <BandwidthStatusCard/>
                </Col>
            </Row>
        </div>);
    }
}

export default Home;
