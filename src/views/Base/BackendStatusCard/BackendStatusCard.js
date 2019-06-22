import React from "react";
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import RunningJobs from "../RunningJobs";
import {connect} from "react-redux";
import {getStatus} from "../../../actions/statusActions";


function TaskModal() {
    return ReactDOM.createPortal((
        <RunningJobs mode={"modal"}/>

    ), document.getElementById("modal-root"));
}

class BackendStatusCard extends React.Component {


    componentWillMount() {

        // Check if the connection to the backend is active
        this.props.getStatus();
        this.refreshInterval = setInterval(() => this.props.getStatus(), 1000);
    }


    componentWillUnmount() {
        // Clear the interval before component is unmounted
        clearInterval(this.refreshInterval);
    }

    render() {
        const {isConnected, mode} = this.props;

        const ipAddress = localStorage.getItem('ipAddress');
        const username = localStorage.getItem("username");


        if (mode === "card")
            return (

                <Card
                      className={"text-center " + (isConnected ? "card-accent-info" : "card-accent-warning")}>
                    <CardHeader>
                        rclone status
                    </CardHeader>
                    <CardBody>
                        <StatusText connectivityStatus={isConnected} ipAddress={ipAddress} userName={username}/>

                    </CardBody>
                </Card>
            );
        else /*Default*/
            return (
                <React.Fragment>
                    <Button type="primary"
                            className={isConnected ? "bg-info  d-none d-lg-block" : "bg-warning d-none d-lg-block"}> {isConnected ? "CONNECTED" : "DISCONNECTED"}</Button>
                    {/*Show current tasks in the side modal*/}
                    <TaskModal/>
                </React.Fragment>
            )
    }
}

function StatusText({connectivityStatus, ipAddress, userName}) {
    if (connectivityStatus) {
        return (
            <p>The rclone backend is connected and working as expected.<br/>Current IP address is {ipAddress}
                <br/><strong> Username: </strong>{userName}</p>
        );
    } else {
        return (
            <p>Cannot connect to rclone backend. There is a problem with connecting to {ipAddress}.</p>

        )
    }
}

const propTypes = {
    mode: PropTypes.string.isRequired,
    isConnected: PropTypes.bool.isRequired,
};

const defaultProps = {
    mode: "card",
};


BackendStatusCard.propTypes = propTypes;
BackendStatusCard.defaultProps = defaultProps;

const mapStateToProps = state => ({
    isConnected: state.status.isConnected
});

export default connect(mapStateToProps, {getStatus})(BackendStatusCard);
