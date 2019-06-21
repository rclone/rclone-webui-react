import React from 'react';
import axiosInstance from "../../../utils/API/API";
import PropTypes from "prop-types";
import {Alert} from "reactstrap";

const propTypes = {
    jobId: PropTypes.number.isRequired,
    jobCompleteHandler: PropTypes.func.isRequired,
    cardDismissedHandler: PropTypes.func.isRequired
};


class AutoUpdateJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            job: {},
            isOpen: true
        };
        this.loadJobs = this.loadJobs.bind(this);
    }

    async loadJobs() {
        try {
            let res = await axiosInstance.post("/job/status", {jobid: this.props.jobId});
            console.log("jobStatus", res.data);

            this.setState({job: res.data});

            if (this.state.job.finished) {
                this.props.jobCompleteHandler();
                clearInterval(this.jobRefreshInterval)
            }

        } catch (e) {
            // console.log(`Error loading jobs: core/stats ${e}`);
            console.log("Job is complete");

            // this.props.jobCompleteHandler();

        }
    }

    componentDidMount() {
        this.loadJobs();
        this.jobRefreshInterval = setInterval(this.loadJobs, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.jobRefreshInterval);
    }

    dismissAlert = () => {
        this.setState({isOpen: !this.state.isOpen});
        this.props.cardDismissedHandler();
    };


    render() {
        return (
            <Alert color="info" isOpen={this.state.isOpen} toggle={this.dismissAlert} sm={12}
                   lg={12}>
                {/*<Progress value={percentage} className={"mb-2"}>{percentage} %</Progress> /!*percentage*!/*/}
            </Alert>
        );


    }
}

AutoUpdateJob.propTypes = propTypes;

export default AutoUpdateJob;
