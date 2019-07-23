import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    UncontrolledAlert
} from 'reactstrap';
import {connect} from "react-redux";
import {changeIPAddress, changeUserNamePassword, signOut} from "../../../actions/userActions";
import axiosInstance from "../../../utils/API/API";
import {IP_ADDRESS_KEY} from "../../../utils/Constants";
import urls from "../../../utils/API/endpoint";

class Login extends Component {

    constructor(props) {
        super(props);
        let ipAddress = "http://localhost:5572/";
        if (localStorage.getItem(IP_ADDRESS_KEY))
            ipAddress = localStorage.getItem(IP_ADDRESS_KEY);
        this.state = {
            username: "",
            password: "",
            ipAddress,
            connectionSuccess: false,
            error: ""
        };
    }

    changeUserName = e => {
        this.setState({
            username: e.target.value,
            connectionSuccess: false
        });
    };
    changePassword = e => {
        this.setState({
            password: e.target.value,
            connectionSuccess: false

        })
    };
    changeIPAddress = e => {

        this.setState({
            ipAddress: e.target.value,
            connectionSuccess: false
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const {ipAddress, username, password} = this.state;

        Promise.all([
            changeUserNamePassword(username, password),
            changeIPAddress(ipAddress)
        ]).then(() => {
            this.props.history.push('/dashboard');
        });
        // localStorage.setItem('username', username);
        // localStorage.setItem('password', password);
        // localStorage.setItem('ipAddress', ipAddress);

    };

    checkConnection = (e) => {
        e.preventDefault();

        // Set the localStorage parameters temporarily.
        const {ipAddress, username, password} = this.state;
        const {changeUserNamePassword, changeIPAddress} = this.props;

        Promise.all([
            changeUserNamePassword(username, password),
            changeIPAddress(ipAddress)
        ]).then(() => {
            axiosInstance.post(urls.noopAuth).then((data) => {
                console.log("Connection successful.");
                this.setState({
                    connectionSuccess: true,
                    error: ""
                })
            }, (error) => {
                console.log(error);
                this.setState({
                    connectionSuccess: false,
                    error: "Error connecting. Please check username password and verify if rclone is working at the specified IP."
                })
            })
        })


    };

    componentDidMount() {
        localStorage.clear();
        this.props.signOut();
    }


    render() {
        const {username, password, ipAddress, connectionSuccess, error} = this.state;

        return (
            <div className="app flex-row align-items-center" data-test="loginComponent">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.onSubmit}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            {error && <UncontrolledAlert color="danger" children={error}/>}
                                            {connectionSuccess && <UncontrolledAlert color="success"
                                                                                     children={"Connection verified. You may now login."}/>}
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="IP Address / URL"
                                                       autoComplete="ipAddress"
                                                       onChange={this.changeIPAddress} value={ipAddress}/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" autoComplete="username"
                                                       onChange={this.changeUserName} value={username}/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password"
                                                       autoComplete="current-password" onChange={this.changePassword}
                                                       value={password}/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4"
                                                            disabled={!connectionSuccess}>Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button onClick={this.checkConnection} color="primary"
                                                            className="px-4">Verify</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default connect(null, {signOut, changeUserNamePassword, changeIPAddress})(Login);
