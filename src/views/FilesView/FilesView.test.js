import ReactDOM from "react-dom";
import React from "react";
import FilesView from "./FilesView";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FilesView upButtonHandle={() => {
    }} remotePath={"local1"} updateRemotePathHandle={() => {
    }}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
