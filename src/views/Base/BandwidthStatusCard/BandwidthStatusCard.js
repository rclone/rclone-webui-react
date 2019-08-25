import React from "react";
import BandwidthWidget from "../Widgets/BandwidthWidget";
import {validateSizeSuffix} from "../../../utils/Tools";
import {toast} from "react-toastify";
import {Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
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
    setBandwidth = () => {
        const {bandwidthText, hasError} = this.state;
        if (!hasError) {
            const {setBandwidth} = this.props;
            if (bandwidthText)
                setBandwidth(bandwidthText);
            else {
                setBandwidth("0M");
            }
        } else {
            toast.error("Error in form");
        }
    };

    /**
     * Change the state.bandwidthText
     * Validate input before setting, if the input text is invalid, set the hasError in the state.
     * @param e
     */
    changeBandwidthInput = (e) => {
        const inputValue = e.target.value;
        const validateInput = validateSizeSuffix(inputValue);
        this.setState({
            bandwidthText: inputValue,
            hasError: (inputValue !== "" ? !validateInput : false)
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

            <Row>
                <Col lg={showChangeBandwidth ? 6 : 12} sm={12}>
                    <BandwidthWidget icon="icon-speedometer" color="danger"
                                     header={(bandwidth.rate !== "off") ? bandwidth.rate : "Unlimited"} lg={6} sm={12}>
                        Current bandwidth <Button color="link"
                                                  onClick={this.toggleShowChangeBandwidth}>{!showChangeBandwidth ? "Change" : "Close"}
                        <i
                            className={"fa fa-lg fa-angle-" + (!showChangeBandwidth ? "right" : "left")}/></Button>
                    </BandwidthWidget>
                </Col>
                <Col lg={6} sm={12} className={showChangeBandwidth ? "" : "d-none"}>
                    <Card>
                        <CardHeader>Change bandwidth</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.setBandwidth}>
                                <FormGroup row>
                                    <Label for="bandwidthValue" sm={5}>New Bandwidth</Label>
                                    <Col sm={7}>
                                        <Input type="text" value={bandwidthText}
                                               valid={!hasError} invalid={hasError}
                                               id="bandwidthValue" onChange={this.changeBandwidthInput}>
                                        </Input>
                                        <FormFeedback valid>Keep empty to reset.</FormFeedback>
                                        <FormFeedback>The bandwidth should be of the form 1M|2M|1G|1K|1.1K
                                            etc</FormFeedback>

                                    </Col>
                                </FormGroup>
                                <Button className="float-right" color="success" type="submit">Set</Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        )
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
