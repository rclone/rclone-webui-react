import React from 'react';
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {connect} from "react-redux";
import {addRemoteContainer, changeActiveRemoteContainer, removeRemoteContainer} from "../../../actions/explorerActions";

function TabsLayout(props) {
	const {addRemoteContainer, removeRemoteContainer, changeActiveRemoteContainer} = props;
	const {containers, currentPaths} = props;
	return (<Nav tabs>
		{
			containers.map((container) => {
				return (
					<NavItem key={"TAB_" + container} className={"col-md-2 pl-0 pr-0"}
							 style={{background: "#1b8eb7", color: "#fff", borderRight: "1px solid #c8ced3"}}>
						<NavLink className={"float-center"} onClick={() => changeActiveRemoteContainer(container)}>
							<i className="fa fa-folder-o pr-1"/>
							{currentPaths[container] && currentPaths[container].remoteName !== "" ? currentPaths[container].remoteName : "Open New"}
							<Button className="btn-no-background btn btn-secondary float-right p-0" onClick={(e) => {
								e.stopPropagation();
								removeRemoteContainer(container)
							}}>
								<i className="fa fa-lg fa-close" style={{color: "#fff"}}/>
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

