import React from 'react';
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {connect} from "react-redux";
import {addRemoteContainer, changeActiveRemoteContainer, removeRemoteContainer} from "../../../actions/explorerActions";

function TabsLayout(props) {
	const {addRemoteContainer, removeRemoteContainer, changeActiveRemoteContainer, activeRemoteContainerID} = props;
	const {containers, currentPaths} = props;
	return (<Nav tabs>
		{
			containers.map((containerID) => {
				const isActiveTab = containerID === activeRemoteContainerID;
				return (
					<NavItem key={"TAB_" + containerID}
							 className={"col-md-2 pl-0 pr-0 custom-tab " + (isActiveTab ? "tab-active" : "")}>
						<NavLink className={"float-center"} onClick={() => changeActiveRemoteContainer(containerID)}>
							<i className="fa fa-folder-o pr-1"/>
							{currentPaths[containerID] && currentPaths[containerID].remoteName !== "" ? currentPaths[containerID].remoteName : "Open New"}
							<Button className="btn-no-background btn btn-secondary float-right p-0" onClick={(e) => {
								e.stopPropagation();
								removeRemoteContainer(containerID)
							}}>
								<i className="fa fa-lg fa-close"/>
							</Button>
						</NavLink>
					</NavItem>)
			})
		}
		<NavItem key={"ADD_BUTTON"} className={"pl-0 pr-0"}>
			<NavLink className={"float-center"} onClick={addRemoteContainer}>
				<i className="fa fa-lg fa-plus"/>
			</NavLink>
		</NavItem>

	</Nav>)
}

const mapStateToProps = (state, ownProps) => {
	return {
		containers: state.remote.containers,
		numContainers: state.remote.numContainers,
		currentPaths: state.explorer.currentPaths,
		activeRemoteContainerID: state.remote.activeRemoteContainerID
	};
};


export default connect(
	mapStateToProps,
	{
		addRemoteContainer, removeRemoteContainer, changeActiveRemoteContainer
	}
)(TabsLayout);

