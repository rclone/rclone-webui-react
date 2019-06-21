import React from "react";
import AutoUpdateJob from "./AutoUpdateJob";
import axiosInstance from "../../../utils/API/API";

class AutoUpdateJobsLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        }
        this.refreshInterval = null;
        this.getJobs = this.getJobs.bind(this);
    }

    // addJob = (jobId) => {
    //     const jobs = this.state.jobs;
    //     if (jobs.indexOf(jobId) === -1) {
    //         jobs.push(jobId);
    //     }
    //
    // };

    jobCompleteHandler = (jobId) => {
        console.log("Job complete: " + jobId);
    };

    cardDismissedHandler = (jobId) => {
        console.log("Card dismissed: " + jobId);
    };

    async getJobs() {
        let res = await axiosInstance.post("/job/list", {});
        console.log(res);
        const currentJobs = this.state.jobs;
        const jobList = res.data.jobids;

        jobList.map((item, idx) => {
            if (currentJobs.indexOf(item) === -1) {
                currentJobs.push(item);
            }
        });
        this.setState({jobs: currentJobs});
    }

    componentDidMount() {
        if (this.refreshInterval === null) {
            this.refreshInterval = setInterval(() => this.getJobs(), 2000);
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.jobs.map((item, idx) => {
                        return (<AutoUpdateJob key={idx} jobId={item} jobCompleteHandler={this.jobCompleteHandler}
                                               cardDismissedHandler={this.cardDismissedHandler}/>)
                    })
                }
            </React.Fragment>
        );
    }
}

export default AutoUpdateJobsLayout;