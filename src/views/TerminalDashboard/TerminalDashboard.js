import React, {useEffect, useState} from 'react';
import Iframe from "react-iframe";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPlugins} from "../../actions/pluginActions";
import {getPluginBaseUrl} from "../../utils/PluginTools";
import {getIPAddress} from "../../utils/API/API";

function TerminalDashboard(props) {
    const {
        getPlugins,
        loadedPlugins
    } = props;

    const [pluginUrl, setPluginUrl] = useState("");

    useEffect(() => {
        getPlugins();
        const availablePlugins = [];

        for (let m in loadedPlugins) {
            let p = loadedPlugins[m];
            if (p["rclone"]["pluginType"] === "Terminal")
                availablePlugins.push(p)
        }
        // open the default available plugin
        setPluginUrl(getPluginBaseUrl(getIPAddress(), availablePlugins[0].name, availablePlugins[0].author));

    }, []);

    return (
        <div data-test="mountDashboardComponent" style={{height: "80vh"}}>
            <Iframe url={pluginUrl}
                    allowTransparency="true"
                    allowFullScreen="true"
                    width="100%"
                    height="100%"
                    display="initial"/>
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
