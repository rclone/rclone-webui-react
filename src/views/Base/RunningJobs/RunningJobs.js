import React, {useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, Container, Progress, Row} from "reactstrap";
import {bytesToKB, formatBytes, groupByKey, secondsToStr} from "../../../utils/Tools";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {Line} from "react-chartjs-2";
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import axiosInstance from "../../../utils/API/API";
import urls from "../../../utils/API/endpoint";

const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            ticks: {
                display: false
            }
        }]
    }
};
function JobCard({job}) {
    const {name, eta, percentage, speed, speedAvg, size, bytes} = job;
    if (name && !isNaN(speed)) {

        return (<Card>
            <CardHeader>Running Jobs</CardHeader>
            <CardBody>
                <p>{name}</p> {/*Name of the file*/}
                <Progress value={percentage} className={"mb-2"}>{percentage} %</Progress> {/*percentage*/}
                <p><strong>Speed: </strong>{formatBytes(speed)}PS</p> {/*speed*/}
                <p><strong>Average Speed: </strong>{formatBytes(speedAvg)}PS</p> {/*speedAvg*/}
                <p><strong>Total transferred: </strong>{formatBytes(bytes)}</p> {/*bytes: convert to mb*/}
                <p><strong>Size: </strong>{formatBytes(size)}</p>
                <p><strong>ETA: </strong>{secondsToStr(eta)}</p>
            </CardBody>

        </Card>);
    }
    return null;
}

function getCroppedName(name) {
    const leftChars = 30;
    const rightChars = 5;

    if (name.length > leftChars) {
        const croppedName = name.substr(0, leftChars) + " ... " + name.substr(-rightChars);
        return croppedName;
    }
    return name;

}

function JobCardRow({job}) {
    const {name, percentage, speed, size} = job;
    return (
        <React.Fragment>
            <Row className="runningJobs">
                {(size && speed) ? (

                    <Col lg={12} className="itemName"> {getCroppedName(name)} {" "}
                        ({formatBytes(size)}) - {formatBytes(speed)}PS </Col>
                ) : (
                    <Col lg={12}>Calculating</Col>)}

            </Row>
            <Row>
                <Col lg={12}><Progress value={percentage} className={"mb-2"}>{percentage} %</Progress></Col>
            </Row>

        </React.Fragment>
    );


}

function GlobalStatus({stats}) {
    const {speed, bytes, checks, elapsedTime, deletes, errors, transfers, lastError} = stats;
    return (
        <Card>
            <CardHeader><strong>Global Stats</strong></CardHeader>
            <CardBody>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>Bytes Transferred:</td>
                        <td>{formatBytes(bytes)}</td>
                    </tr>
                    <tr>
                        <td>Average Speed:</td>
                        <td>{formatBytes(speed)}PS</td>
                    </tr>
                    <tr>
                        <td>Checks:</td>
                        <td>{checks}</td>
                    </tr>
                    <tr>
                        <td>Deletes:</td>
                        <td>{deletes}</td>
                    </tr>
                    <tr>
                        <td>Running since:</td>
                        <td>{secondsToStr(elapsedTime)}</td>
                    </tr>
                    <tr className={errors > 0 ? "table-danger" : ""}>
                        <td>Errors:</td>
                        <td>{errors}</td>
                    </tr>
                    <tr>
                        <td>Transfers:</td>
                        <td>{transfers}</td>
                    </tr>
                    <tr>
                        <td>Last Error:</td>
                        <td>{lastError}</td>
                    </tr>

                    </tbody>
                </table>

            </CardBody>
            {/*<CardFooter></CardFooter>*/}

        </Card>);
}

function TransferringJobs({transferring}) {
    if (transferring !== undefined) {
        return transferring.map((item, idx) => {
            return (<JobCard key={item.name} job={item}/>);
        });
    }
    return null;
}

function TransferringJobsRow({transferring}) {
    if (transferring !== undefined) {
        const grouped = groupByKey(transferring, job => job.group);
        console.log(grouped);

        const array = [];

        grouped.forEach((val, keys) => {
            console.log(val, keys);
            array.push (<JobGroup job={val} groupId={keys} key={keys}/>);
        });
        return array;

        // return grouped.values().map((item, idx) => {
        // 	return (<JobCardRow key={item.name} job={item}/>);
        // });
    }
    return null;
}

function JobGroup({job, groupId}) {
    const [showCollapse, setShowCollapse] = useState(false);
    const [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
    console.log(job);

    const stopJob = (e, groupId) => {
        e.stopPropagation();
        if(groupId && groupId.indexOf('/') !== -1) {
            setCancelButtonEnabled(false);
            const jobid = groupId.split('/')[1];
            axiosInstance.post(urls.stopJob, {jobid, _async:true}).then(function (res) {
                console.log(res);
            }).catch(err => {
                console.error(err);
            })
        }
    };
    // setCancelButtonEnabled((groupId && groupId !== "undefined"));
    if(job) {
        return (
            <>
                {groupId &&
                <Card>

                    <CardHeader onClick={() => setShowCollapse(!showCollapse)}>
                        <Container>
                            <Row>
                                <Col sm={10}>
                                    Transferring {job.length} file(s)
                                </Col>
                                <Col sm={2}>
                                    <Button color={"light"} disabled={!cancelButtonEnabled}
                                            onClick={(e) => stopJob(e, groupId)}
                                            className={"btn-outline-danger btn-pill"}><i
                                        className="fa fa-close fa-sm"/></Button>
                                </Col>
                            </Row>
                        </Container>
                    </CardHeader>
                    <Collapse isOpen={showCollapse}>
                        <CardBody>
                            {
                                job.map((item, idx) => {
                                    return (<JobCardRow key={item.name} job={item}/>);
                                })
                            }
                        </CardBody>
                    </Collapse>
                </Card>
                }
            </>
        );
    }
    return null;
}


class RunningJobs extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isShowing: true
        }
    }

    toggleShowing = () => {
        this.setState((prevState) => {
            return {
                isShowing: !prevState.isShowing
            }
        })
    };





    render() {
        const {jobs, isConnected, lineChartData} = this.props;
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
                            <Card>
                                <CardHeader>
                                    Speed
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-wrapper">
                                        <Line data={lineChartData} options={options}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={12} lg={4}>
                            <TransferringJobs transferring={transferring}/>
                        </Col>
                    </Row>
                );
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
                    <Card className="progress-modal d-none d-sm-block">
                        <CardHeader onClick={() => this.toggleShowing()}>Progress
                            <div className="card-header-actions">
                                <Button color="link">
                                    <i className="fa fa-close fa-lg"/>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className={!this.state.isShowing ? "d-none" : "progress-modal-body"}  style={{overflowY: 'scroll'}}>
                            <TransferringJobsRow transferring={transferring}/>

                        </CardBody>
                    </Card>
                );
            return null;
        }
    }
}

RunningJobs.propTypes = {
    mode: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
    jobs: PropTypes.object.isRequired,
    error: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {

    const speedData = state.status.speed;
    let lineChartData = {};
    if (speedData) {
        let labels = [];
        let data1 = [];
        let data2 = [];

        const dataLength = speedData.length;
        //
        const limitedData = speedData.slice(dataLength - 50, dataLength - 1);
        // console.log(limitedData.length);
        limitedData.forEach((item, idx) => {
            labels.push(Math.ceil(item.elapsedTime));
            data1.push(bytesToKB(item.speed).toFixed(2));
            data2.push(bytesToKB(item.speedAvg).toFixed(2));
        });

        // console.log(data1, data2);
        lineChartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Speed (kbps)',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data1,
                },
                {
                    label: 'Average Speed (kbps)',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(187,69,14,0.4)',
                    borderColor: 'rgb(192,76,58)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(187,69,14)',
                    pointBackgroundColor: '#ff7459',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data2,
                }
            ],
        };
    }


    return {
        jobs: state.status.jobs,
        isConnected: state.status.isConnected,
        error: state.status.error,
        lineChartData
    }
};

export default connect(mapStateToProps, {})(RunningJobs);
