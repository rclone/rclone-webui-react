import React from "react";
import Iframe from "react-iframe";
import * as PropTypes from "prop-types";

/**
 * Dashboard plugin loads a plugin in an iframe
 * @param pluginUrl {string}
 * @return {*}
 * @constructor
 */
function DashboardPlugin({pluginUrl}) {
    return (
        <div data-test="dashboardPluginComponent">
            {(pluginUrl) ? <Iframe url={pluginUrl}
                                   style={{border: "none"}}
                                   allowTransparency="true"
                                   allowFullScreen="true"
                                   width="100%"
                                   height="100%"
                                   display="initial"/>
                : <p>Could not find any appropriate plugin to load</p>}
        </div>
    );
}

DashboardPlugin.propTypes = {
    pluginUrl: PropTypes.string.isRequired
}

export default DashboardPlugin;