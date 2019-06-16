import React from "react";
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import {Provider} from "react-redux";

// it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<FilesView upButtonHandle={() => {
//     }} remotePath={"local1"} updateRemotePathHandle={() => {
//     }}/>, div);
//     ReactDOM.unmountComponentAtNode(div);
// });


const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
        </Provider>
    );
    return component;
}

describe('Files View', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});