import React from "react";
import {validateSizeSuffix} from "../../../utils/Tools";
import {toast} from "react-toastify";
import {Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {getBandwidth, setBandwidth} from "../../../actions/statusActions";
import * as PropTypes from "prop-types";
import {PROP_BANDWIDTH} from "../../../utils/RclonePropTypes";


class BandwidthStatusCard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            bandwidthText: "",
            hasError: false,
            showChangeBandwidth: false
        };
    }

    /**
     * Get the current bandwidth from the backend
     */
    getBandwidth = () => {
        const {getBandwidth} = this.props;
        getBandwidth();
    };

    /**
     * Set the new bandwidth specified in state.bandwidthText
     * Check if text is valid, before sending.
     */
    setBandwidth = (e) => {
        e.preventDefault();
        const {bandwidthText, hasError} = this.state;
        if (!hasError) {
            const {setBandwidth} = this.props;
            if (bandwidthText) {
                setBandwidth(bandwidthText);
                this.toggleShowChangeBandwidth();
            }
            else {
                setBandwidth("0M");
            }
        } else {
            toast.error("Please check the errors before submitting");
        }
    };

    /**
     * Change the state.bandwidthText
     * Validate input before setting, if the input text is invalid, set the hasError in the state.
     * @param e
     */
    changeBandwidthInput = (e) => {
        const inputValue = e.target.value;
        let validateInput = false;
        if (inputValue === "") {
            validateInput = true;
        } else if (inputValue) {
            const splitValue = inputValue.split(":");
            if(splitValue.length === 1) {
                validateInput = validateSizeSuffix(splitValue[0]);
            }else if(splitValue.length === 2) {
                const validateDownloadLimit = validateSizeSuffix(splitValue[0]);
                const validateUploadLimit = validateSizeSuffix(splitValue[1]);
                validateInput = validateDownloadLimit && validateUploadLimit;
            }
        }
        this.setState({
            bandwidthText: inputValue,
            hasError: !validateInput
        })
    };

    /**
     * Upon first shallow, get the current bandwidth
     */
    componentDidMount() {
        this.getBandwidth();
    }

    /**
     * Show or hide the right side modal with the form to change the current bandwidth.
     */
    toggleShowChangeBandwidth = () => {
        this.setState((prevState) => ({

            showChangeBandwidth: !prevState.showChangeBandwidth
        }))
    };

    render() {
        const {bandwidthText, hasError, showChangeBandwidth} = this.state;
        const {bandwidth} = this.props;


        return ( 
        <Card>
            <CardHeader>
                Bandwidth <button className="btn btn-white float-right" onClick={this.toggleShowChangeBandwidth}>Modify</button>
            </CardHeader>
            <CardBody>
                <p>
                    <span className="card-subtitle">Current Max speed: {"  "}</span> 
                    <span className="card-text">{(bandwidth.rate !== "off") ? bandwidth.rate : "Unlimited"}</span>
                </p>
                <Form onSubmit={this.setBandwidth} className={showChangeBandwidth ? "" : "d-none"}>
                    <FormGroup row>
                        <Label for="bandwidthValue" sm={5}>Enter new max speed (upload:download)</Label>
                        <Col sm={7}>
                            <Input type="text" value={bandwidthText}
                                    valid={!hasError} invalid={hasError}
                                    id="bandwidthValue" onChange={this.changeBandwidthInput}>
                            </Input>
                            <FormFeedback valid>Keep empty to reset.</FormFeedback>
                            <FormFeedback>The bandwidth should be of the form 1M|2M|1G|1K|1.1K etc. Can also be specified as (upload:download)</FormFeedback>

                        </Col>
                    </FormGroup>
                    <Button className="float-right" color="success" type="submit">Set</Button>

                </Form>
                
            </CardBody>
        </Card>)
    }
}

const mapStateToProps = state => ({
    /**
     * Connectivity status with backend
     */
    isConnected: state.status.isConnected,
    /**
     * Map with {bytesPerSecond, rate}
     */
    bandwidth: state.status.bandwidth
});

BandwidthStatusCard.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    /**
     * Determines currently set bandwidth
     */
    bandwidth: PROP_BANDWIDTH,
    /**
     * Redux function to get the current bandwidth.
     */
    getBandwidth: PropTypes.func.isRequired,
    /**
     * Redux function to set the new bandwidth in rclone backend.
     */
    setBandwidth: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, {getBandwidth, setBandwidth})(BandwidthStatusCard)
