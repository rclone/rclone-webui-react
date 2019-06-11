import ReactDOM from "react-dom";
import React from "react";
import BackendStatusCard from "./BackendStatusCard";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BackendStatusCard mode={"full-status"}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
