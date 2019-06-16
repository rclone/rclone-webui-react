import ReactDOM from "react-dom";
import React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import RemoteExplorer from "./RemoteExplorer";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const TestComp = DragDropContext(HTML5Backend)(RemoteExplorer);
    ReactDOM.render(<TestComp/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
