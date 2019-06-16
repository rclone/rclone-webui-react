import ReactDOM from "react-dom";
import React from "react";
import RemotesList from "./RemotesList";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RemotesList/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
