import React from 'react';
import {connect} from "react-redux";

class PluginsDashboard extends React.Component {
	render() {
		return (
			<div data-test="pluginsDashboardComponent">


			</div>);
	}
}

const mapStateToProps = state => ({});

PluginsDashboard.propTypes = {};

export default connect(mapStateToProps, {})(PluginsDashboard);
