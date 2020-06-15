import React from 'react';
import {connect} from "react-redux";
import {Col, Table} from "reactstrap";
import * as PropTypes from 'prop-types';
import {addPlugin, getPlugins} from "../../actions/pluginActions";
import PluginRowEntries from "./PluginRowEntries";
import NewPluginModal from "./NewPluginModal";

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

	componentDidMount() {
		const {getPlugins} = this.props;
		getPlugins();
	}

	addPluginHandle = (pluginDownloadURL) => {
		const {addPlugin} = this.props;
		addPlugin(pluginDownloadURL);
	}

	render() {
		const {loadedPlugins} = this.props;
		return (
			<div data-test="pluginDashboardComponent">
				<Col lg={12} className="mb-4 d-flex justify-content-between">
					<NewPluginModal buttonLabel="Add New" okHandle={this.addPluginHandle}/>
					<NewPluginModal buttonLabel="Visit Store" okHandle={this.addPluginHandle}/>
				</Col>

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
