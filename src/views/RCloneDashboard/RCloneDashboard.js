import React from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axiosInstance from "../../utils/API/API";
import ErrorBoundary from "../../ErrorHandling/ErrorBoundary";
import urls from "../../utils/API/endpoint";

function RCloneVersion({data}) {
    if (data.hasError) {
        return (<p>Error loading.</p>);
    }

    return (
        <Col sm={12} lg={4} md={6}>
            <Card>
                <CardHeader>Version</CardHeader>
                <CardBody>
                    <p><strong>Arch: </strong>{data.arch}</p>
                    <p><strong>goVersion: </strong>{data.goVersion}</p>
                    <p><strong>OS: </strong>{data.os}</p>
                    <p><strong>Rclone version: </strong>{data.version}</p>
                    <p><strong>isGit: </strong>{`${data.isGit}`}</p>
                </CardBody>
            </Card>
        </Col>
    )
}


class RCloneDashboard extends React.Component {
    getMemStats = () => {
        axiosInstance.post(urls.getRcloneMemStats).then((res) => {
            this.setState({
                memStats: res.data
            })
        }).catch((e) => {
            console.log("Rejected" + e);
        })
    };
    getOptions = () => {
        axiosInstance.post(urls.getOptions).then((res) => {
            this.setState({
                options: res.data
            })
        }).catch((e) => {
            console.log("Rejected" + e);
        })
    };
    getOptionViewCards = (head, value) => {
        const elements = [];
        if(value)
        for (const [ele, val] of Object.entries(value)) {
            elements.push((
                <FormGroup key={head + "$" + ele} row>
                    <Label for="driveType" sm={5}>{ele}</Label>
                    <Col sm={7}>
                        <Input onChange={this.handleInputChange} type="text" value={val !== null ? val : ""}
                               name={head + "$" + ele}/>
                    </Col>
                </FormGroup>
            ))
        }
        return elements;
    };

    getOptionsView = () => {
        const {hasError, options} = this.state;
        if (hasError) {
            return (<p>Error loading.</p>);
        }

        const elements = [];
        if(!hasError &&  options)
        for (const [head, value] of Object.entries(options)) {
            elements.push((
                <Col sm={12} lg={4} md={6} key={head}>
                    <Card>
                        <CardHeader>
                            {head}
                        </CardHeader>
                        <CardBody>
                            {this.getOptionViewCards(head, value)}
                        </CardBody>
                    </Card>
                </Col>

            ));

        }
        return (
            <Form onSubmit={(e) => e.preventDefault() && console.log("Hey")}>
                <Row lg={12}>
                    {
                        elements
                    }
                </Row>
            </Form>
        )

    };

    handleInputChange = (e) => {

        let inputName = e.target.name;
        let inputValue = e.target.value;

        const split = inputName.split('$');

        this.setState({
            options: {...this.state.options, [split[0]]: {[split[1]]: inputValue}}
        })
    };

    componentDidMount() {
        this.getOptions();
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            hasError: false,
            memStats: {},
            options: {}
        }
    }


    render() {
        return (
            <div data-test="backendComponent">
                <ErrorBoundary>
                    <Container fluid={true}>
                        <Row>
                            <RCloneVersion data={this.props.version} />
                        </Row>
                        {this.getOptionsView()}
                    </Container>
                </ErrorBoundary>
            </div>);
    }
}

const mapStateToProps = state => ({
    version: state.version,
});

export default connect(mapStateToProps)(RCloneDashboard);

