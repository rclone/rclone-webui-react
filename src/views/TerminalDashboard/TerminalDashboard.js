import React, {useEffect, useState} from 'react';
import Iframe from "react-iframe";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPlugins} from "../../actions/pluginActions";
import {filterPluginsByType, getPluginBaseUrl, getPluginsArray} from "../../utils/PluginTools";
import {getIPAddress} from "../../utils/API/API";
import pluginTypes from "../../pluginTypes";

function TerminalDashboard(props) {
    const {
        getPlugins,
        loadedPlugins
    } = props;

    const [pluginUrl, setPluginUrl] = useState("");

    const [pluginArray, setPluginArray] = useState([]);

    useEffect(() => {
        getPlugins();
        let availablePlugins = getPluginsArray(loadedPlugins);
        availablePlugins = filterPluginsByType(availablePlugins, pluginTypes.TERMINAL);
        setPluginArray(availablePlugins);

        if (availablePlugins.length > 0) {
            // open the default (first) available plugin
            setPluginUrl(getPluginBaseUrl(getIPAddress(), availablePlugins[0].name, availablePlugins[0].author));
        } else {

        }

    }, []);

    return (
        <div data-test="mountDashboardComponent" style={{height: "80vh"}}>
            {(pluginArray.length > 0) ? <Iframe url={pluginUrl}
                                                allowTransparency="true"
                                                allowFullScreen="true"
                                                width="100%"
                                                height="100%"
                                                display="initial"/>
                : <p>Could not find any appropriate plugin to load</p>}
        </div>
    );
}

const mapStateToProps = state => ({
    loadedPlugins: state.plugins.loadedPlugins,
});

TerminalDashboard.propTypes = {
    loadedPlugins: PropTypes.object.isRequired,

    getPlugins: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {getPlugins})(TerminalDashboard);
