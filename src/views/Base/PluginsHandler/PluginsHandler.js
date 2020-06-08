import React from 'react';
import * as PropTypes from 'prop-types'
import {IP_ADDRESS_KEY} from "../../../utils/Constants";
import {connect} from "react-redux";
import {PROP_CURRENT_PATH, PROP_FS_INFO} from "../../../utils/RclonePropTypes";
import ErrorBoundary from "../../../ErrorHandling/ErrorBoundary";


class PluginsHandler extends React.Component {


	getRenderForItem = () => {
		const {fsInfo, item, inViewport, currentPath} = this.props;
		const {remoteName, remotePath} = currentPath;
		const {MimeType} = item;

		let downloadURL = "";

		const ipAddress = localStorage.getItem(IP_ADDRESS_KEY);


		if (fsInfo.Features.BucketBased) {
			downloadURL = ipAddress + `[${remoteName}]/${remotePath}/${item.Name}`;
		} else {
			downloadURL = ipAddress + `[${remoteName}:${remotePath}]/${item.Name}`;
		}

		const author = "rclone";
		const pluginName = "rclone-webui-react";


		return (
			<a href={`${ipAddress}/plugins/rclone/video-plugin/?loadUrl=${downloadURL}&mimeType=${MimeType}`}
			   color="link" target="_blank">
				<i className={"fa fa-external-link fa-lg d-inline"}/>
			</a>
		)

	};


	render() {
		const {loadMedia, item} = this.props;
		const {MimeType} = item;

		let element = this.getRenderForItem()

		return (
			<ErrorBoundary>
				{element}
			</ErrorBoundary>
		);
	}
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


};

const mapStateToProps = (state, ownProps) => {
	// console.log(ownProps);
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
	}
};

export default connect(mapStateToProps, {})(PluginsHandler);
