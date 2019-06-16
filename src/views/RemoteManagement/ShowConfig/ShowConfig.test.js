import React from "react";
import ShowConfig from "./ShowConfig";
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import {Provider} from "react-redux";

// it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render((<ShowConfig/>), div);
//     ReactDOM.unmountComponentAtNode(div);
// });


const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <ShowConfig/>
        </Provider>
    );
    return component;
}

describe('Bandwidth Status Card', function () {

    let wrapper;
    beforeEach(() => {
        const props = {};
        wrapper = setUp(props)
    });

    it('should render without crashing', function () {
        expect(wrapper).toHaveLength(1)
    });
});