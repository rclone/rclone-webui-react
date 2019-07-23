import React from "react";
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import * as PropTypes from "prop-types";
import ReactDOM from "react-dom";
import RunningJobs from "../RunningJobs";
import {connect} from "react-redux";
import {enableCheckStatus, getStatus} from "../../../actions/statusActions";
import {IP_ADDRESS_KEY, MODAL_ROOT_ELEMENT, STATUS_REFRESH_TIMEOUT, USER_NAME_KEY} from "../../../utils/Constants";

/**
 * Functional component Modal which is placed in the element with id "modal-root" in index.html using React.createPortal
 * @returns {{children, implementation, containerInfo, $$typeof, key}}
 * @constructor
 */
function TaskModal() {
    return ReactDOM.createPortal((
        <RunningJobs mode={"modal"}/>

    ), document.getElementById(MODAL_ROOT_ELEMENT));
}

/**
 * Component for display and monitoring of backend rclone status. Auto refresh status in redux store every 5 seconds.
 */
class BackendStatusCard extends React.Component {


    componentWillMount() {

        // Check if the connection to the backend is active
        this.props.getStatus();
        this.refreshInterval = setInterval(() => this.props.getStatus(), STATUS_REFRESH_TIMEOUT);
    }


    componentWillUnmount() {
        // Clear the interval before component is unmounted
        clearInterval(this.refreshInterval);
    }

    /**
     * Enable or disable checking of status request by http request to the backend.
     */
    toggleCheckStatus = () => {
        const {checkStatus, enableCheckStatus} = this.props;
        console.log(checkStatus, enableCheckStatus);
        enableCheckStatus(!checkStatus);
    };

    /**
     * Renders the component with mode.
     * Card: Enables the card mode.
     * Default: Table mode (Grid)
     * @returns {*}
     */
    render() {
        const {isConnected, mode, checkStatus} = this.props;

        const ipAddress = localStorage.getItem(IP_ADDRESS_KEY);
        const username = localStorage.getItem(USER_NAME_KEY);


        if (mode === "card")
            return (

                <Card
                    className={"text-center " + (isConnected ? "card-accent-info" : "card-accent-warning")}>
                    <CardHeader>
                        rclone status
                    </CardHeader>
                    <CardBody>
                        <StatusText checkStatus={checkStatus} connectivityStatus={isConnected} ipAddress={ipAddress}
                                    userName={username}/>

                    </CardBody>
                </Card>
            );
        else /*Default*/
            return (
                <React.Fragment>
                    <Button type="primary" onClick={this.toggleCheckStatus}
                            className={isConnected ? "bg-info  d-none d-lg-block" : "bg-warning d-none d-lg-block"}> {checkStatus ? isConnected ? "CONNECTED" : "DISCONNECTED" : "DISABLED"}</Button>
                    {/*Show current tasks in the side modal*/}
                    <TaskModal/>
                </React.Fragment>
            );
    }
}

/**
 *
 * @param connectivityStatus    {boolean}   Current connectivity status to the backend.
 * @param checkStatus           {boolean}   Specify whether to check the status or skip.
 * @param ipAddress             {string}    IP Address of the backend
 * @param userName              {string}    User name of the currently logged in user.
 * @returns {*}
 * @constructor
 */
function StatusText({connectivityStatus, checkStatus, ipAddress, userName}) {
    if (!checkStatus) {
        return <p>Not monitoring connectivity status. Tap the icon in navbar to start.</p>
    }
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
    /**
     * Used to specify mode of render : card/ grid.
     */
    mode: PropTypes.string.isRequired,
    /**
     * Boolean to represent internet connectivity
     */
    isConnected: PropTypes.bool.isRequired,
    /**
     * Boolean to represent whether checking for status at interval is allowed
     */
    checkStatus: PropTypes.bool.isRequired,


    /**
     * Function to enable or disable status check
     */
    enableCheckStatus: PropTypes.func.isRequired,
    /**
     * Get the current status
     */
    getStatus: PropTypes.func.isRequired
};

const defaultProps = {
    mode: "card",
};


BackendStatusCard.propTypes = propTypes;
BackendStatusCard.defaultProps = defaultProps;

const mapStateToProps = state => ({
    isConnected: state.status.isConnected,
    isDisabled: state.status.isDisabled,
    checkStatus: state.status.checkStatus
});

export default connect(mapStateToProps, {getStatus, enableCheckStatus})(BackendStatusCard);
