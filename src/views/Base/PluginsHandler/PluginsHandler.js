import React, {useState} from 'react';
import * as PropTypes from 'prop-types'
import {IP_ADDRESS_KEY} from "../../../utils/Constants";
import {connect} from "react-redux";
import {PROP_CURRENT_PATH, PROP_FS_INFO} from "../../../utils/RclonePropTypes";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";
import {Button} from "reactstrap";
import NoPluginAvailableModal from "./NoPluginAvailableModal/NoPluginAvailableModal";
import {getPluginServeUrl} from "../../../utils/PluginTools";
import {openInWindow} from "../../../utils/Tools";
import {toast} from "react-toastify";

function PluginsHandler(props) {
	const {fsInfo, item, currentPath, loadedPlugins, loadedTestPlugins} = props;

	const [showPluginsModal, setShowPluginsModal] = useState(false);

	const [availablePlugins, setAvailablePlugins] = useState([]);

	let downloadURL = "";

	const processOpenPlugin = (pluginName, author) => {
		const {remoteName, remotePath} = currentPath;
		const {MimeType} = item;
		const ipAddress = localStorage.getItem(IP_ADDRESS_KEY);
		if (fsInfo.Features.BucketBased) {
			downloadURL = ipAddress + `[${remoteName}]/${remotePath}/${item.Name}`;
		} else {
			downloadURL = ipAddress + `[${remoteName}:${remotePath}]/${item.Name}`;
		}
		try {
			const pluginUrl = getPluginServeUrl(ipAddress, pluginName, author, downloadURL, MimeType);
			openInWindow(pluginUrl)
		} catch (e) {
			toast.error("Error loading URL: " + e);
		}
	}


	const openPlugin = () => {
		const {MimeType} = item;

		// const availableTestPlugins = [];
		const availablePlugins = [];

		for (let m in loadedTestPlugins) {
			let p = loadedTestPlugins[m];
			if (p["rclone"] && p["rclone"]["handlesType"] && p["rclone"]["handlesType"].includes(MimeType))
				availablePlugins.push(p)
		}

		for (let m in loadedPlugins) {
			let p = loadedPlugins[m];
			if (p["rclone"]["handlesType"].includes(MimeType))
				availablePlugins.push(p)
		}
		// Set in state to pass to modal
		setAvailablePlugins(availablePlugins);
		if (availablePlugins.length === 0) {
			// No plugins available, show modal for redirecting to the store
			setShowPluginsModal(true);

		} else if (availablePlugins.length === 1) {
			// open the default available plugin
			processOpenPlugin(availablePlugins[0].name, availablePlugins[0].author);
		} else {
			// display modal with multiple options
			setShowPluginsModal(true);
		}
	}


	return <ErrorBoundary>
		<Button color={"link"} onClick={openPlugin}>
			<i className={"fa fa-external-link fa-lg d-inline"}/>
		</Button>
		<NoPluginAvailableModal
			className=""
			isOpen={showPluginsModal}
			setIsOpen={setShowPluginsModal}
			availablePlugins={availablePlugins}
			processOpenPlugin={processOpenPlugin}
		/>
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
