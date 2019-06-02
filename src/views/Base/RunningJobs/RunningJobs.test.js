import ReactDOM from "react-dom";
import React from "react";
import RunningJobs from "./RunningJobs";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RunningJobs/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
