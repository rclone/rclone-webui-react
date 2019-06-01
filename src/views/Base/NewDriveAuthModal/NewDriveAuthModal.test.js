import ReactDOM from "react-dom";
import React from "react";
import NewDriveAuthModal from "./NewDriveAuthModal";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewDriveAuthModal/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
