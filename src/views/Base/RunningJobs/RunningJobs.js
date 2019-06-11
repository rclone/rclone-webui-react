import React from 'react';
import {Card, CardBody, CardHeader, Col, Progress, Row} from "reactstrap";
import "../../../utils/Global";
import {formatBytes, secondsToStr} from "../../../utils/Tools";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getStatus} from "../../../actions/statusActions";

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

function JobCardRow({job}) {
    const {name, percentage, speed, size} = job;
    return (
        <React.Fragment>
            <Row>
                {(size && speed) ? (<Col lg={12}>{name}({formatBytes(size)}) - {formatBytes(speed)}PS </Col>) : (
                    <Col lg={12}>Calculating</Col>)}

            </Row>
            <Row>
                <Col lg={12}><Progress value={percentage} className={"mb-2"}>{percentage} %</Progress></Col>
            </Row>

        </React.Fragment>
    );

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

function TransferringJobsRow({transferring}) {
    // const {transferring} = this.state.jobs;
    if (transferring !== undefined) {
        return transferring.map((item, idx) => {
            return (<JobCardRow key={idx} job={item}/>);
        });
    }
    return null;
}


class RunningJobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: {},
            isConnected: false

        };
        this.loadJobs = this.loadJobs.bind(this);
    }

    async loadJobs() {
        try {
            this.props.getStatus();

            // this.setState({jobs: res.data, isConnected: true});


        } catch (e) {

            // console.log("error", e.response.status);

            // console.log(`Error loading jobs: core/stats ${e}`);
            // this.setState({isConnected: false})
        }
    }

    componentWillMount() {
        this.props.getStatus();
    }

    componentDidMount() {
        this.jobRefreshInterval = setInterval(this.loadJobs, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.jobRefreshInterval);
    }

    render() {
        const {jobs, isConnected} = this.props;
        // const { isConnected} = this.state;
        const {transferring} = jobs;
        const {mode} = this.props;
        if (mode === "full-status") {
            if (isConnected) {
                return (
                    <Row>
                        <Col sm={12} lg={4}>
                            <GlobalStatus stats={jobs}/>
                        </Col>
                        <Col sm={12} lg={4}>
                            <TransferringJobs transferring={transferring}/>
                        </Col>
                    </Row>);
            } else {
                return (<div>Not connected to rclone.</div>)
            }

        } else if (mode === "card") {
            if (isConnected) {
                return (

                    <TransferringJobsRow transferring={transferring}/>
                );
            } else {
                return (<div>Not connected to rclone.</div>);
            }

        } else if (mode === "modal") {
            if (transferring && transferring.length > 0)
                return (
                    <Card className={"progress-modal"}>
                        <CardHeader>Progress</CardHeader>
                        <CardBody>
                            <TransferringJobsRow transferring={transferring}/>

                        </CardBody>
                    </Card>
                );
            return null;
        }

    }
}

RunningJobs.propTypes = propTypes;

const mapStateToProps = state => ({
    jobs: state.status.jobs,
    isConnected: state.status.isConnected
})

export default connect(mapStateToProps, {getStatus})(RunningJobs);
