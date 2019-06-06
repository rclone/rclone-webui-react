import ReactDOM from "react-dom";
import React from "react";
import RemoteExplorer from "./RemoteExplorer";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RemoteExplorer/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
