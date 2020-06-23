import React from 'react';
import {connect} from "react-redux";
import {Button, Col, Row, Table} from "reactstrap";
import * as PropTypes from 'prop-types';
import {addPlugin, getPlugins} from "../../actions/pluginActions";
import PluginRowEntries from "./PluginRowEntries";
import NewPluginModal from "./NewPluginModal";

class PluginDashboard extends React.Component {

	componentDidMount() {
		const {getPlugins} = this.props;
		getPlugins();
	}

	addPluginHandle = (pluginDownloadURL) => {
		const {addPlugin} = this.props;
		addPlugin(pluginDownloadURL);
	}

	render() {
		const {loadedPlugins, getPlugins} = this.props;
		return (
			<div data-test="pluginDashboardComponent">
				<Row>
					<Col lg={12} className="mb-4 d-flex justify-content-between">
						<NewPluginModal buttonLabel="Add New" okHandle={this.addPluginHandle}/>
						<Button onClick={() => this.props.history.push("/storeDashboard")}>
							Visit Store
						</Button>
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
					<PluginRowEntries loadedPlugins={loadedPlugins} getPlugins={getPlugins}/>
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
