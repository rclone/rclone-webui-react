import ReactDOM from "react-dom";
import React from "react";
import NewDrive from "./NewDrive";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewDrive/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
