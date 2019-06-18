import React from 'react';
import {Col, Row} from "reactstrap";
import BackendStatusCard from "../Base/BackendStatusCard/BackendStatusCard";
import RunningJobs from "../Base/RunningJobs";

class Home extends React.Component {


    render() {
        return (
            <div data-test="homeComponent">
                <h2>Welcome to Rclone dashboard. </h2>
                <p>Begin by creating a new remote config from the left sidebar.</p>
                <Row>
                    <Col lg={4} sm={12}>
                        <BackendStatusCard ipAddress={global.ipAddress} mode={"card"}/>
                    </Col>
                    {/*<Col lg={4} sm={12}>*/}
                    {/*    <BandwidthStatusCard/>*/}
                    {/*</Col>*/}
                </Row>
                <h2>Jobs</h2>

                <RunningJobs mode={"full-status"}/>

            </div>);
    }
}

export default Home;
