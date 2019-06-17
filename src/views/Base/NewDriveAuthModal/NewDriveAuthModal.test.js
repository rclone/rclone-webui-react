import ReactDOM from "react-dom";
import React from "react";
import NewDriveAuthModal from "./NewDriveAuthModal";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewDriveAuthModal closeModal={() => {
    }} isVisible={true}/>, div);
    ReactDOM.unmountComponentAtNode(div);
    ReactDOM.render(<NewDriveAuthModal closeModal={() => {
    }} isVisible={false}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

