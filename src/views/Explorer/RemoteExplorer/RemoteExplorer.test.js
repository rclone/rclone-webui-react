import React from "react";
import {Provider} from "react-redux";
import {testStore} from "../../../../Utils";
import {shallow} from "enzyme";
import RemoteExplorer from "./RemoteExplorer";

const setUp = (props = {}) => {
    const component = shallow(
        <Provider store={testStore()}>
            <RemoteExplorer/>
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

