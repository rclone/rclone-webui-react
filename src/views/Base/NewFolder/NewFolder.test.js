import ReactDOM from "react-dom";
import React from "react";
import NewFolder from "./NewFolder";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewFolder isVisible={true} closeModal={() => {
        console.log("Closed Modal")
    }}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
