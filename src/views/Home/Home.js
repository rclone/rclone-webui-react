import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";

function StatusText({connectivityStatus, ipAddress}) {
    if (connectivityStatus) {
        return (
            <p>The rclone backend is connected and working as expected.</p>
        );
    } else {
        return (
            <p>Cannot connect to rclone backend. There is a problem with connecting to {ipAddress}.</p>

        )
    }
}


class StatusCard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            connectivityStatus: false
        };
        this.tryConnection = this.tryConnection.bind(this);
    }

    async tryConnection() {
        try {
            await fetch('http://localhost:5572/rc/noop');
            this.setState({connectivityStatus: true});
        } catch (e) {
            console.log(`😱 Rclone backend connection request failed: ${e}`);
            this.setState({connectivityStatus: false});
        }
    }

    async componentDidMount() {

        this.tryConnection();

        setInterval(this.tryConnection, 5000);
    }

    render() {
        const {connectivityStatus} = this.state;
        return (

            <Card className={"text-white text-center " + (connectivityStatus ? "bg-info" : "bg-warning")}>
                <CardHeader>
                    rclone status
                </CardHeader>
                <CardBody>
                    <StatusText connectivityStatus={connectivityStatus} ipAddress={this.props.ipAddress}/>

                </CardBody>
            </Card>
        );
    }
}

class Home extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            ipAddress: "localhost:5572"
        };
    }


    render() {
        return (<div>
            <p>Welcome to Rclone dashboard. Begin by creating a new drive from the left sidebar.</p>
            <Row>
                <Col lg={4} sm={12}>
                    <StatusCard ipAddress={this.state.ipAddress}/>
                </Col>
            </Row>
        </div>);
    }
}

export default Home;
