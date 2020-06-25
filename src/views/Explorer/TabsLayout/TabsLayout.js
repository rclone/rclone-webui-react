import React from 'react';
import {Button, Nav, NavItem, NavLink} from "reactstrap";
import {connect} from "react-redux";
import {addRemoteContainer, changeActiveRemoteContainer, removeRemoteContainer} from "../../../actions/explorerActions";

function TabsLayout(props) {
    const {addRemoteContainer, removeRemoteContainer, changeActiveRemoteContainer, activeRemoteContainerID} = props;
    const {containers, currentPaths, paneID: currentPaneID} = props;
    const activeContainerIDInPane = activeRemoteContainerID ? activeRemoteContainerID[currentPaneID] : "";
    return (<Nav tabs className="d-flex">
        {
            containers.map(({ID, paneID}) => {
                if (currentPaneID === paneID) {
                    const isActiveTab = ID === activeContainerIDInPane;
                    return (
                        <NavItem key={"TAB_" + ID}
                                 className={"pl-0 pr-0 custom-tab " + (isActiveTab ? "tab-active" : "")}>
                            <NavLink className={"float-center"} onClick={() => changeActiveRemoteContainer(ID, paneID)}>
                                <i className="fa fa-folder-o pr-1"/>
                                <span className="overflow-hidden">
									{currentPaths[ID] && currentPaths[ID].remoteName !== "" ? currentPaths[ID].remoteName : "Open New"}
								</span>
                                <Button className="btn-no-background btn btn-secondary p-0 pl-1 pr-2 ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeRemoteContainer(ID, paneID)
                                        }}>
                                    <i className="fa fa-lg fa-close"/>
                                </Button>
                            </NavLink>
						</NavItem>)
				}
				return null;
			})
		}
		<NavItem key={"ADD_BUTTON"} className={"pl-0 pr-0"}>
			<NavLink className={"float-center"} onClick={() => addRemoteContainer(currentPaneID)}>
				<i className="fa fa-lg fa-plus"/>
			</NavLink>
		</NavItem>

	</Nav>)
}

const mapStateToProps = (state, _) => {
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

