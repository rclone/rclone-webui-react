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
import {changeAuthKey, changeIPAddress, changeUserNamePassword, signOut} from "../../../actions/userActions";
import axiosInstance from "../../../utils/API/API";
import urls from "../../../utils/API/endpoint";
import logo from '../../../assets/img/brand/logo_symbol.png';
import {LOGIN_TOKEN} from "../../../utils/Constants";


function removeParam(parameter) {
    let url = document.location.href;
    let urlparts = url.split('?');

    if (urlparts.length >= 2) {
        let urlBase = urlparts.shift();
        let queryString = urlparts.join("?");

        let prefix = encodeURIComponent(parameter) + '=';
        let pars = queryString.split(/[&;]/g);
        for (let i = pars.length; i-- > 0;)
            if (pars[i].lastIndexOf(prefix, 0) !== -1)
                pars.splice(i, 1);
        if (pars.length > 0)
            url = urlBase + '?' + pars.join('&');
        else
            url = urlBase;
        url = url.replace(window.location.origin, ''); // history.pushState requires same-origin
        window.history.pushState('', document.title, url); // added this line to push the new url directly to url bar .

    }
    return url;
}

class Login extends Component {

    constructor(props) {
        super(props);
        let ipAddress = window.location.href.split("#/")[0];
        if (ipAddress.indexOf("?") !== -1)
            ipAddress = window.location.href.split("?")[0];
        // if (localStorage.getItem(IP_ADDRESS_KEY))
        //     ipAddress = localStorage.getItem(IP_ADDRESS_KEY);
        this.state = {
            username: "",
            password: "",
            ipAddress,
            error: ""
        };
    }

    changeUserName = e => {
        this.setState({
            username: e.target.value,
        });
    };
    changePassword = e => {
        this.setState({
            password: e.target.value,

        })
    };
    changeIPAddress = e => {

        this.setState({
            ipAddress: e.target.value,
        });
    };

    redirectToDashboard = () => {
        this.props.history.push('/dashboard');
    };


    onSubmit = e => {
		if (e)
			e.preventDefault();

		const {ipAddress, username, password} = this.state;
		const {changeUserNamePassword, changeIPAddress} = this.props;


		Promise.all([
			changeUserNamePassword(username, password),
			changeIPAddress(ipAddress)
		]).then(() => {
			axiosInstance.post(urls.noopAuth).then((data) => {
				console.log("Connection successful.");
				this.redirectToDashboard();
			}, (error) => {
				console.log(error);
				this.setState({
					error: "Error connecting. Please check username password and verify if rclone is working at the specified IP."
				})
			})

		});

	};

	// checkConnection = (e) => {
	//     e.preventDefault();
	//
	//     // Set the localStorage parameters temporarily.
	//     const {ipAddress, username, password} = this.state;
	//     const {changeUserNamePassword, changeIPAddress} = this.props;
	//
	//     Promise.all([
	//         changeUserNamePassword(username, password),
	//         changeIPAddress(ipAddress)
	//     ]).then(() => {
	//         axiosInstance.post(urls.noopAuth).then((data) => {
	//             console.log("Connection successful.");
	//             this.setState({
	//                 connectionSuccess: true,
	//                 error: ""
	//             })
	//         }, (error) => {
	//             console.log(error);
	//             this.setState({
	//                 connectionSuccess: false,
	//                 error: "Error connecting. Please check username password and verify if rclone is working at the specified IP."
	//             })
	//         })
	//     })
	//
	//
	// };

	componentDidMount() {
		localStorage.clear();
		this.props.signOut();

		let url_string = window.location.href;
		let url = new URL(url_string);
		let loginToken = url.searchParams.get(LOGIN_TOKEN);
		let ipAddress = this.state.ipAddress;
		if (url.searchParams.get("ip_address")) {
            ipAddress = url.searchParams.get("ip_address");
        }
        // console.log(loginToken);
        // If login token is present in url, process that.
        if (loginToken) {
            Promise.all([
                this.props.changeAuthKey(loginToken),
                this.props.changeIPAddress(ipAddress)
            ]);
            removeParam(LOGIN_TOKEN);
            removeParam("ip_address");
            this.redirectToDashboard();
        }
    }



    render() {
		const {username, password, ipAddress, error} = this.state;

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
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user"/>
													</InputGroupText>
												</InputGroupAddon>
												<Input type="text" placeholder="IP Address / URL"
													   autoComplete="ipAddress"
													   onChange={this.changeIPAddress} value={ipAddress}
													   data-testid="LoginForm-ipAddress"/>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
														<i className="icon-user"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" autoComplete="username"
                                                       data-testid="LoginForm-userName"
                                                       onChange={this.changeUserName} value={username}/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
														<i className="icon-lock"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password"
                                                       data-testid="LoginForm-password"
                                                       autoComplete="current-password" onChange={this.changePassword}
                                                       value={password}/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" type="submit"
                                                            data-testid="LoginForm-BtnLogin">Login</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-white py-5 d-md-down-none" style={{width: '44%'}}>
                                    <CardBody className="text-center">
										<img src={logo} alt="RClone logo"/>
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


export default connect(null, {signOut, changeUserNamePassword, changeIPAddress, changeAuthKey})(Login);
