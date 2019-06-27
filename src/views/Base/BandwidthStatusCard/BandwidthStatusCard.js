import React from "react";
import BandwidthWidget from "../Widgets/BandwidthWidget";
import {validateSizeSuffix} from "../../../utils/Tools";
import {toast} from "react-toastify";
import {Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {getBandwidth, setBandwidth} from "../../../actions/statusActions";
import * as PropTypes from "prop-types";


class BandwidthStatusCard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            bandwidthText: "",
            hasError: false,
            showChangeBandwidth: false
        };
    }

    getBandwidth = () => {
        const {getBandwidth} = this.props;
        getBandwidth();
    };

    setBandwidth = () => {
        const {bandwidthText, hasError} = this.state;
        console.log(bandwidthText, hasError);
        if (bandwidthText && !hasError) {
            const {setBandwidth} = this.props;
            setBandwidth(bandwidthText);
        } else {
            toast.error("Error in form");
        }
    };

    changeBandwidthInput = (e) => {
        const inputValue = e.target.value;
        const validateInput = validateSizeSuffix(inputValue);
        console.log(validateInput);
        this.setState({
            bandwidthText: inputValue,
            hasError: !validateInput
        })
    };

    componentDidMount() {
        this.getBandwidth();
    }


    toggleShowChangeBandwidth = () => {
        this.setState((prevState) => ({

            showChangeBandwidth: !prevState.showChangeBandwidth
        }))
    }
    render() {
        const {bandwidthText, hasError, showChangeBandwidth} = this.state;
        const {bandwidth} = this.props;

        return (

            <Row>
                <Col lg={showChangeBandwidth ? 6 : 12} sm={12}>
                    <BandwidthWidget icon="icon-speedometer" color="danger" header={bandwidth.rate} lg={6} sm={12}>
                        Current bandwidth <Button color="link" onClick={this.toggleShowChangeBandwidth}><i
                        className="fa fa-lg fa-angle-right"/></Button>
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
    isConnected: state.status.isConnected,
    bandwidth: state.status.bandwidth
});

BandwidthStatusCard.propTypes = {
    getBandwidth: PropTypes.func.isRequired,
    setBandwidth: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, {getBandwidth, setBandwidth})(BandwidthStatusCard)
