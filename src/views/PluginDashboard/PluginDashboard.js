import React from 'react';
import {connect} from "react-redux";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
	Table
} from "reactstrap";
import * as PropTypes from 'prop-types';
import {addPlugin, getPlugins} from "../../actions/pluginActions";
import PluginRowEntries from "./PluginRowEntries";
import {validateURL} from "../../utils/Tools";

// function MountRows({remotes, refreshHandle}) {
//
// 	let returnMap = [];
// 	let curKey = 1;
// 	for (const [key, value] of Object.entries(remotes)) {
// 		returnMap.push((<ConfigRow sequenceNumber={curKey} key={key} remoteName={key} remote={value}
// 								   refreshHandle={refreshHandle}/>));
// 		curKey++;
// 	}
// 	return returnMap;
// }

class PluginDashboard extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			pluginDownloadURL: "",
			showNewPluginCard: false,
		}
	}

	componentDidMount() {
		const {getPlugins} = this.props;
		getPlugins();
	}

	addPluginHandler = (e) => {
		e.stopPropagation();
		const {addPlugin} = this.props;
		const {pluginDownloadURL} = this.state;
		addPlugin(pluginDownloadURL);
	}

	changePluginURL = (e) => {
		const pluginDownloadURL = e.target.value;
		this.setState({pluginDownloadURL})
	}

	toggleShowNewPluginCard = () => {
		this.setState((state) => ({showNewPluginCard: !state.showNewPluginCard}))
	}

	addButtonStatus = () => {
		const {pluginDownloadURL} = this.state;
		return !pluginDownloadURL || this.state.pluginDownloadURL === "" || !validateURL(pluginDownloadURL);
	}

	render() {
		const {showNewPluginCard, pluginDownloadURL} = this.state;
		const {loadedPlugins} = this.props;
		return (
			<div data-test="pluginDashboardComponent">
				<Row style={{display: showNewPluginCard ? "block" : "none"}}>
					<Card
						className={"col-12"}>
						<CardHeader>
							Add Plugin
						</CardHeader>
						<CardBody>
							<FormGroup row>
								<Label for={"mountPoint"} sm={5}>Plugin URL</Label>
								<Col sm={7}>
									<Input type={"text"} value={pluginDownloadURL}
										   name={"mountPoint"}
										   id={"mountPoint"} onChange={this.changePluginURL} required={true}
									>
									</Input>
									<FormFeedback/>

								</Col>
							</FormGroup>
						</CardBody>
						<CardFooter>
							<div className="clear-fix float-right">
								<Button color="primary" disabled={this.addButtonStatus()}
										onClick={this.addPluginHandler}>Verify and add</Button>
							</div>
							<div className="clear-fix float-right mr-2">
								<Button color="danger" onClick={this.toggleShowNewPluginCard}>Cancel</Button>
							</div>
						</CardFooter>
					</Card>
				</Row>

				<Row>
					{!showNewPluginCard && <Col lg={8} className={"mb-4"}>
						<Button color={"primary"} className={"float-left"} onClick={this.toggleShowNewPluginCard}>
							Add new Plugin
						</Button>
					</Col>}
					<Col lg={4}>

					</Col>

				</Row>
				<Table responsive className="table-striped">
					<thead>
					<tr>
						<th>Author/ Name</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					<PluginRowEntries loadedPlugins={loadedPlugins}/>
					</tbody>
				</Table>
			</div>);
	}
}

const mapStateToProps = state => ({
	loadedPlugins: state.plugins.loadedPlugins,
});

PluginDashboard.propTypes = {
	loadedPlugins: PropTypes.object.isRequired,

	getPlugins: PropTypes.func.isRequired,

	addPlugin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getPlugins, addPlugin})(PluginDashboard);
