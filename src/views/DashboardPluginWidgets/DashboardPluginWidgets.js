import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {filterPluginsByType, getPluginBaseUrl, getPluginsArray} from "../../utils/PluginTools";
import pluginTypes from "../../pluginTypes";
import {Col, Row} from "reactstrap";
import DashboardPlugin from "../Base/DashboardPlugin/DashboardPlugin";
import {getIPAddress} from "../../utils/API/API";
import {connect} from "react-redux";
import {getPlugins} from "../../actions/pluginActions";

/**
 *
 * @param loadedPlugins {object}
 * @param getPlugins    {function}
 * @return {*}          {jsx}
 * @constructor
 */
function DashboardPluginWidgets({loadedPlugins, getPlugins}) {

    const [dashboardWidgets, setDashboardWidgets] = useState([]);
    useEffect(() => {
        getPlugins();
        let dashboardPlugins = getPluginsArray(loadedPlugins);
        dashboardPlugins = filterPluginsByType(dashboardPlugins, pluginTypes.DASHBOARD)
        setDashboardWidgets(dashboardPlugins);
    }, [])


    return (
        <Row>
            {dashboardWidgets.map(element => <Col lg={6}>
                <DashboardPlugin pluginUrl={getPluginBaseUrl(getIPAddress(), element.name, element.author)}/>
            </Col>)}
        </Row>
    )
}

const mapStateToProps = state => ({
    loadedPlugins: state.plugins.loadedPlugins,
});

DashboardPluginWidgets.propTypes = {
    loadedPlugins: PropTypes.object.isRequired,
    getPlugins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {getPlugins})(DashboardPluginWidgets);