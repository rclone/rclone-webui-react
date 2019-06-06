import ReactDOM from "react-dom";
import React from "react";
import RemoteExplorerLayout from "./RemoteExplorerLayout";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RemoteExplorerLayout/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
