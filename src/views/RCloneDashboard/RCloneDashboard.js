import React from 'react';
import {Card, CardBody, CardHeader, Row} from "reactstrap";
import axiosInstance from "../../utils/API/API";


function RCloneVersion({data, hasError}) {
    if (hasError) {
        return (<p>Error loading.</p>);
    }
    return (
        <Card sm={12} lg={4} md={6}>
            <CardHeader>Version</CardHeader>
            <CardBody>
                <p><strong>Arch:</strong>{data.arch}</p>
                <p><strong>goVersion:</strong>{data.goVersion}</p>
                <p><strong>OS:</strong>{data.os}</p>
                <p><strong>Rclone version:</strong>{data.version}</p>
                <p><strong>isGit:</strong>{data.isGit}</p>
            </CardBody>
        </Card>
    )
}

function OptionsView({data, hasError}) {
    if (hasError) {
        return (<p>Error loading.</p>);
    }
    return (
        <Card sm={12} lg={4} md={6}>
            <CardHeader>Options</CardHeader>
            <CardBody>
                {}
            </CardBody>
        </Card>
    )


}

class RCloneDashboard extends React.Component {

    getRcloneStatus = () => {
        axiosInstance.post("core/version").then((res) => {
            this.setState({
                version: res.data,
                hasError: false
            })
        }, () => {
            this.setState({
                hasError: true
            })
        })
    };
    getMemStats = () => {
        axiosInstance.post("core/memstats").then((res) => {
            this.setState({
                memStats: res.data
            })
        })
    };
    getOptions = () => {
        axiosInstance.post("options/get").then((res) => {
            this.setState({
                options: res.data
            })
        })
    };

    componentWillMount() {
        this.getRcloneStatus();
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            version: {},
            hasError: false,
            memStats: {},
            options: {}
        }
    }


    render() {
        return (
            <div data-test="backendComponent">
                <Row>
                    <RCloneVersion data={this.state.version} hasError={this.state.hasError}/>
                </Row>
            </div>);
    }
}

// const mapStateToProps = state => ({
//
// });

export default RCloneDashboard;
