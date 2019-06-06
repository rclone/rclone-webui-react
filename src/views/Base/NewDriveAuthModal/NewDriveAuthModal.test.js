import ReactDOM from "react-dom";
import React from "react";
import NewDriveAuthModal from "./NewDriveAuthModal";
import {formatBytes} from "../../../utils/Tools";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewDriveAuthModal closeModal={() => {
    }} isVisible={true}/>, div);
    ReactDOM.unmountComponentAtNode(div);
    ReactDOM.render(<NewDriveAuthModal closeModal={() => {
    }} isVisible={false}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should format bytes properly', function () {
    expect(formatBytes(0.1, 0)).toEqual("0 B");
    expect(formatBytes(1024, 0)).toEqual("1 KB");
    expect(formatBytes(1024 * 1024, 0)).toEqual("1 MB");
});