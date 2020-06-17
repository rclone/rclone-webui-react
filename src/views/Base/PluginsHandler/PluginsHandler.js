import React from 'react';
import * as PropTypes from 'prop-types'
import {IP_ADDRESS_KEY} from "../../../utils/Constants";
import {connect} from "react-redux";
import {PROP_CURRENT_PATH, PROP_FS_INFO} from "../../../utils/RclonePropTypes";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";
import {Button} from "reactstrap";

function PluginsHandler(props) {

	const openPlugin = () => {
		const {fsInfo, item, currentPath, loadedPlugins, loadedTestPlugins} = props;
		const {remoteName, remotePath} = currentPath;
		const {MimeType} = item;
		let downloadURL = "";

		const ipAddress = localStorage.getItem(IP_ADDRESS_KEY);


		if (fsInfo.Features.BucketBased) {
			downloadURL = ipAddress + `[${remoteName}]/${remotePath}/${item.Name}`;
		} else {
			downloadURL = ipAddress + `[${remoteName}:${remotePath}]/${item.Name}`;
		}

		// const availableTestPlugins = [];
		const availablePlugins = [];

		for (let m in loadedTestPlugins) {
			let p = loadedTestPlugins[m];
			if (p["rclone"]["handlesType"].includes(MimeType))
				availablePlugins.push(p)
		}

		for (let m in loadedPlugins) {
			let p = loadedPlugins[m];
			if (p["rclone"]["handlesType"].includes(MimeType))
				availablePlugins.push(p)
		}

		console.log("Available Plugins", availablePlugins);
		if (availablePlugins.length <= 0) {
			// No plugins available, show modal for redirecting to the store


		} else if (availablePlugins.length === 1) {
			// open the default available plugin

			const author = availablePlugins[0].author;
			const pluginName = availablePlugins[0].name;
			const pluginUrl = `${ipAddress}/plugins/${author}/${pluginName}/?loadUrl=${downloadURL}&mimeType=${MimeType}`

			window.open(pluginUrl);
		} else {
			// display modal with multiple options
		}


	}

	const getRenderForItem = () => {
		return <Button color={"link"} onClick={openPlugin}>
			<i className={"fa fa-external-link fa-lg d-inline"}/>
		</Button>

	};

	return <ErrorBoundary>
		{getRenderForItem()}
	</ErrorBoundary>
}

PluginsHandler.propTypes = {
	/**
	 * Item: Contains the referenced item
	 */
	item: PropTypes.object.isRequired,
	/**
	 * FS Information
	 */
	fsInfo: PROP_FS_INFO.isRequired,
	/**
	 * Current Path
	 */
	currentPath: PROP_CURRENT_PATH.isRequired,
	/**
	 * Container ID
	 */
	containerID: PropTypes.string.isRequired,
	/**
	 * Map of loaded test plugins
	 */
	loadedTestPlugins: PropTypes.object.isRequired,
	/**
	 * Map of loaded plugins
	 */
	loadedPlugins: PropTypes.object.isRequired


};

const mapStateToProps = (state, ownProps) => {
	const currentPath = state.explorer.currentPaths[ownProps.containerID];

	let fsInfo = {};
	const {remoteName} = currentPath;

	if (currentPath && state.remote.configs) {

		const tempRemoteName = remoteName.split(':')[0];
		if (state.remote.configs[tempRemoteName])

			fsInfo = state.remote.configs[tempRemoteName];
	}
	return {
		currentPath,
		fsInfo,
		loadedTestPlugins: state.plugins.loadedTestPlugins,
		loadedPlugins: state.plugins.loadedPlugins
	}
};

export default connect(mapStateToProps, {})(PluginsHandler);
