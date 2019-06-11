import ReactDOM from "react-dom";
import React from "react";
import BandwidthStatusCard from "./BandwidthStatusCard";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BandwidthStatusCard mode={"full-status"}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
