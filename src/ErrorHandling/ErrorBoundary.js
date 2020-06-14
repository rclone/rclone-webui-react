import React from "react";
import {Col, Container, Row} from "reactstrap";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        // Send error to Rclone backend.
        this.setState({error, info});
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="d-flex align-items-center">
                    <Container fluid={true}>
                        <Row>
                            <Col lg={3} sm={12}/>
                            <Col lg={6} sm={12}>
                                <h3>Something went wrong. </h3>
                                <Row>
                                    <Col>
                                        Try refreshing the page.
                                        If the issue persists, please consider opening a new issue on our Github page.
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        Here are some things you can try:<br/>
                                        1. Clear the local storage for this site.<br/>
                                        2. Logout and login again using: <a className="btn btn-primary mb-3"
                                                                            href="/#/login">Logout</a><br/>
                                        3. If the issue persists, please consider opening a new issue on our Github
                                        page.
                                        <a href="https://github.com/negative0/rclone-webui-react/issues"
                                           className="btn btn-primary">
                                            Create new Issue.
                                        </a>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>

                                    </Col>
                                </Row>

                            </Col>
                            <Col lg={3} sm={12}/>
                        </Row>
                    </Container>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;