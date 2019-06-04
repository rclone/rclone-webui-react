import React from 'react';
import {Card, Col, Progress, Row} from "reactstrap";
import "../../../utils/Global";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import axiosInstance from "../../../utils/API";
import {formatBytes, secondsToStr} from "../../../utils/Tools";
import PropTypes from "prop-types";

const propTypes = {
    mode: PropTypes.string.isRequired
};

function JobCard({job}) {
    const {name, eta, percentage, speed, speedAvg, size, bytes} = job;
    return (<Card>
        <CardHeader>Running Jobs</CardHeader>
        <CardBody>
            <p>{name}</p> {/*Name of the file*/}
            <Progress value={percentage} className={"mb-2"}>{percentage} %</Progress> {/*percentage*/}
            <p><strong>Speed: </strong>{formatBytes(speed)}PS</p> {/*speed*/}
            <p><strong>Average Speed: </strong>{formatBytes(speedAvg)}PS</p> {/*speedAvg*/}
            <p><strong>Total transferred: </strong>{formatBytes(bytes)}</p> {/*bytes: convert to mb*/}
            <p><strong>Size: </strong>{formatBytes(size)}</p>
            <p><strong>ETA: </strong>{secondsToStr(eta)} seconds</p>
        </CardBody>

    </Card>);

}

function GlobalStatus({stats}) {
    const {speed, bytes, checks, elapsedTime, deletes, errors, transfers} = stats;
    return (
        <Card>
            <CardHeader><strong>Global Stats</strong></CardHeader>
            <CardBody>
                <p><strong>Bytes Transferred: </strong>{formatBytes(bytes)}</p>
                <p><strong>Average Speed: </strong>{formatBytes(speed)}PS</p>
                <p><strong>Checks: </strong>{checks}</p>
                <p><strong>Deletes: </strong>{deletes}</p>
                <p><strong>Running since: </strong>{secondsToStr(elapsedTime)}</p>
                <p><strong>Errors: </strong>{errors}</p>
                <p><strong>Transfers: </strong>{transfers}</p>

            </CardBody>
            {/*<CardFooter></CardFooter>*/}

        </Card>);

}

function TransferringJobs({transferring}) {
    // const {transferring} = this.state.jobs;
    if (transferring !== undefined) {
        return transferring.map((item, idx) => {
            return (<JobCard key={idx} job={item}/>);
        });
    }
    return null;
}

class RunningJobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: {},
        };
        this.loadJobs = this.loadJobs.bind(this);
    }

    async loadJobs() {
        try {
            let res = await axiosInstance.post("/core/stats");
            // console.log(`Job Refresh`);
            // console.log(res.data);
            this.setState({jobs: res.data});
        } catch (e) {
            console.log(`Error loading jobs: core/stats ${e}`);
        }
    }

    componentDidMount() {
        this.loadJobs();
        this.jobRefreshInterval = setInterval(this.loadJobs, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.jobRefreshInterval);
    }

    render() {
        const {jobs} = this.state;
        const {transferring} = jobs;
        const {mode} = this.props;
        if (mode === "full-status") {
            return (
                <Row>
                    <Col sm={12} lg={4}>
                        <GlobalStatus stats={jobs}/>
                    </Col>
                    <Col sm={12} lg={4}>
                        <TransferringJobs transferring={transferring}/>
                    </Col>
                </Row>);
        }

    }
}

RunningJobs.propTypes = propTypes;

export default RunningJobs;
